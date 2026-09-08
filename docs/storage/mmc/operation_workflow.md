# Operation Workflow

During communication between the host and the device, they may be in different operational modes and states. The entire process can be divided into the **device identification phase** and the **data transfer phase**.

## Mode States

The eMMC standard defines five system operation modes, encompassing both the host and the device. In each operation mode, the device exists in one or more states, transitioned via control commands. The corresponding command line (CMD) mode may also differ.

| Operation Mode | Device State | CMD Line Mode | Current Device State Field Encoding |
| :--- | :--- | :--- | :--- |
| **Inactive mode** | Inactive state | Open-drain | - |
| **Boot mode** | Pre-idle state | - | - |
| | Pre-boot state | - | - |
| **Device identification mode** | Idle state | Open-drain | `0000b` |
| | Ready state | | `0001b` |
| | Identification state | | `0010b` |
| **Data transfer mode** | Stand-by state | Push-pull | `0011b` |
| | Sleep state | | `1010b` |
| | Transfer state | | `0100b` |
| | Bus-test state | | `1001b` |
| | Sending-data state | | `0101b` |
| | Receive-data state | | `0110b` |
| | Programming state | | `0111b` |
| | Disconnect state | | `1000b` |
| **Boot mode** | Boot state | - | - |
| **Interrupt mode** | Wait-IRQ State | Open-drain | - |

* After power-on, the device can enter Boot Mode or Device Identification Mode by receiving specific commands, while the host accesses all devices on the bus. Devices requiring communication enter Data Transfer Mode after receiving specific commands, and the host enters Data Transfer Mode once all devices on the bus have been identified.
* Boot mode can be skipped; it is used to check device health status (such as temperature and voltage) and load configuration information including capacity, sector size, and bad block tables.
* The host and device simultaneously enter and exit Interrupt Mode to service interrupt requests originating from either the device or the host.
* The device enters Inactive State when its operating voltage or access mode is invalid. The host can also force the device into Inactive State by sending specific commands, particularly when the device is unaccessed for long periods, to lower power consumption and extend device life.

## Device Identification

After power-on, the host resets or boots all devices, identifies them, and assigns relative card addresses. This entire process uses only the command line for transmission, with a default clock frequency ($f_{od}$) of 0 ~ 400 kHz.

* If the device supports boot mode, the host sends the software reset command `CMD0`, pulls the command line low, and waits for 1 millisecond or at least 74 clock cycles until the power supply stabilizes. It then sends the boot initiation command `CMD0` to make the device enter boot mode. Upon entering boot mode, the device reads data from the boot partition according to the settings in the `BOOT_PARTITION_ENABLE` byte of the `EXT_CSD` register and sends it to the host via the data lines.
* If the boot sequence is not triggered, the reset command `CMD0` software-resets the device post-power-on to ensure all devices enter the idle state. Following the reset, the host no longer needs to determine the device's power supply voltage range; the host and device exchange command responses in a fixed manner to indicate supported capacities.
* The host shall continuously send the open-drain command `CMD1` for 1 second until all devices respond with R3 where the card power-up status bit is 1, indicating that startup is complete. If it times out and cannot receive a response, the host should exit sending and close the bus, causing the device to enter the inactive state. For devices previously able to respond to command `CMD1`, the returned response R3 should reflect their corresponding access mode, at which point the device enters the ready state.
* Once startup is complete, the host sends command `CMD2` to obtain the device-unique card identification (CID). Unidentified devices send response R2 returning their CID. The host detects bits on the line in real-time; non-matching devices stop sending and remain in the ready state, while matching devices enter the identification state.
* Afterwards, the host sends command `CMD3` to assign a relative card address (RCA) to the matched device. The RCA is shorter than the CID, making it easier for subsequent addressing in transfer mode. Once the RCA is received, the device enters the stand-by state, no longer responds to identification flow commands, and switches its output mode from open-drain to push-pull.
* The host repeatedly sends commands `CMD2` and `CMD3` to identify all devices on the bus.

## Data Transfer

Data read and write operations can only be performed when the device is in the data transfer mode. Both command and data lines operate in push-pull output mode, and the clock frequency is $f_{pp}$. Multiple state transition relationships exist between the host and device:

* While in the stand-by state, the host can send command `CMD40` to make the device enter interrupt mode. When the device receives an internal interrupt event, it returns a response to the host, then switches to data transfer mode, awaiting subsequent data read/write commands from the host.
* While in the stand-by state, the host can send command `CMD5` to put the device into a low-power sleep state. Sending command `CMD5` can similarly cause the device to exit the sleep state.
* While in the stand-by state, the host can send command `CMD4` to configure the device's DSR register.
* Before acquiring the contents of the device's CSD register, the clock frequency $f_{pp}$ remains at $f_{od}$. The host can send command `CMD9` and wait for the device to reply with response R2 to obtain the CSD register contents.
* While in the stand-by state, the host can send command `CMD7` to select or deselect a designated device. Devices cannot perform data communication while in the stand-by state because multiple devices on the bus may be in stand-by; a target device must be selected via its relative card address to enter the transfer state before data communication can occur.
* If the version indicated in the returned CSD register contents is greater than 4.0, it denotes a high-speed device supporting commands to operate the `EXT_CSD` register. The host can then send command `CMD8` to retrieve the `EXT_CSD` register contents.
* While in the transfer state, the host can send command `CMD6` to configure device attributes such as bus width (`EXT_CSD` reg offset: `0xB7`) and high-speed interface (`EXT_CSD` reg offset: `0xB9`).
* Data communication in data transfer mode is conducted point-to-point via addressing commands between the host and the selected device. In the transfer state, the host can use block read, block write, and erase commands to perform read/write and erase operations. Specific commands correspond to their respective command categories: block-oriented read commands (class 2), block-oriented write commands (class 4), and erase commands (class 5).
* During transmission, the host can send command `CMD12` to interrupt ongoing data communication, returning the device to the transfer state. Commands `CMD0` and `CMD15` will abort any data programming operations and return the device to the device identification mode, which may also cause device data corruption.
* The speed at which a device writes to flash is typically lower than the host's data transmission speed. Before data is written to the flash, it is first written to the device buffer. When the buffer is full, the device continuously pulls data line `DATA0` low as a busy signal. Upon receiving the busy signal, the host pauses sending data, resuming transmission only after the device finishes processing the data and releases the busy signal.
* When the device finishes receiving data, it enters the programming state to write the remaining data from the internal buffer into the flash. During this process, data line `DATA0` is continuously held low as a busy signal. If a new write command is received before the write is complete, the device returns to the receive-data state to accept data; otherwise, it returns to the transfer state once the write finishes.

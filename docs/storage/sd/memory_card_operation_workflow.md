# Memory Card Operation WorkFlow

During communication between the host and the card, they may be in different modes and states. The entire process can be divided into the **device identification phase** and the **data transfer phase**.

## Mode States

Both the host and the card have a card identification mode and a data transfer mode. In each operation mode, the card has several states, and state transitions are controlled via commands.

<table>
  <thead>
    <tr>
      <th>Operation Mode</th>
      <th>Card State</th>
      <th>Memory Card Field Encoding</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Inactive</strong></td>
      <td>Inactive state</td>
      <td>-</td>
    </tr>
    <tr>
      <td rowspan="3"><strong>Card identification mode</strong></td>
      <td>Idle state</td>
      <td>0000b</td>
    </tr>
    <tr>
      <td>Ready state</td>
      <td>0001b</td>
    </tr>
    <tr>
      <td>Identification state</td>
      <td>0010b</td>
    </tr>
    <tr>
      <td rowspan="6"><strong>Data transfer mode</strong></td>
      <td>Stand-by state</td>
      <td>0011b</td>
    </tr>
    <tr>
      <td>Transfer state</td>
      <td>0100b</td>
    </tr>
    <tr>
      <td>Sending-data state</td>
      <td>0101b</td>
    </tr>
    <tr>
      <td>Receive-data state</td>
      <td>0110b</td>
    </tr>
    <tr>
      <td>Programming state</td>
      <td>0111b</td>
    </tr>
    <tr>
      <td>Disconnect state</td>
      <td>1000b</td>
    </tr>
  </tbody>
</table>

After reset, the host enters the **card identification mode** to query available devices on the bus, while the devices are also in card identification mode until recognized by the host. Devices requiring communication receive specific commands to enter the data transfer mode, while the host enters the data transfer mode once all devices on the bus have been identified.

## Device Identification

After the card is powered on, the host resets all cards, confirms their voltage ranges, identifies the card types, and obtains their relative card addresses. The entire process uses only the command line for transmission. During the power-on process, the default relative card address for all cards is `RCA = 0x0000`, and the default clock frequency $f_{od}$ is $0 \sim 400\text{ kHz}$.

* After power-on, all cards enter the **idle state**, including cards previously in the inactive state. However, inactive cards are not affected by the reset command `CMD0`. Command `CMD0` can soft-reset cards in any other state to force them into the idle state. At this point, the card command line is in input mode, waiting for the transmission of the next command.
* After a reset, the host needs to determine the supply voltage range of the card. Command `CMD8` is used to verify the interface operating conditions of the memory card. If the card can operate properly at the supply voltage provided by the host, it returns a correct response `R7`. Based on this, the host determines whether the card is version 2.0 or higher. The device also uses the received command `CMD8` to determine whether the host supports physical layer protocol version 2.0 and above, thereby enabling new features. Otherwise, the card returns no response and remains in the idle state.
* Following command `CMD8`, the host needs to send command `ACMD41` to identify and reject cards. By setting the Card Operation Conditions Register (OCR) parameter to 0, it queries all cards to determine a common voltage range. Then, it sends command `ACMD41` again, containing the card capacity and voltage range supported by the host. Incompatible cards are placed in the inactive state.
* The host should continuously send command `ACMD41` within one second until the card power-up status bit in response `R3` is `1`, indicating that initialization is complete. If a response is not received within the timeout period, the host should stop sending. For cards that previously responded to command `CMD8`, the corresponding card capacity should be reflected in the returned response `R3`, at which point the card enters the **ready state**.
* After initialization is complete, the host sends command `CMD2` to obtain the card-unique Card Identification (CID). Unrecognized cards send response `R2` containing their CID and then enter the **identification state**.
* Afterward, the host sends command `CMD3` to request the card to issue a new Relative Card Address (RCA) via response `R6`. It is shorter than the CID, making addressing easier in subsequent transfer modes. Once the RCA is received, the card enters the **stand-by state**. During this period, the host can continue sending command `CMD3` to request updated relative card addresses.

## Data Transfer

Data read and write operations can only be performed when the card is in the data transfer mode. In data transfer mode, the default clock frequency $f_{pp}$ is up to $25\text{ MHz}$, and there are multiple state transition relationships. Frequency switching can be achieved via command `CMD4`.

* Command `CMD7` is used to select and deselect specified cards. A card in the stand-by state cannot yet perform data communication because there may be multiple cards in the stand-by state on the bus. A target device with a specific relative card address must be selected to enter the transfer state to enable data communication. Simultaneously, command `CMD7` can also return the selected target device back to the stand-by state.
* Data communication in data transfer mode is performed point-to-point between the host and the target device using addressing commands. When the device is in the transfer state, block read, write, and erase commands can be used to read, write, or erase data.
* Command `CMD12` can interrupt ongoing data communication, returning the device to the transfer state. Commands `CMD0` and `CMD15` will terminate any data programming operations and return the card to the identification mode, which may result in data corruption on the device.

# Common Commands

eMMC standard commands differ slightly from those defined by the SD standard, so care should be taken to distinguish them during use.

## GO_IDLE_STATE (CMD0)

The reset command. The host can send a reset command with an argument of 0x00000000 to make the device enter the idle state.

* All commands with parameters other than 0xF0F0F0F0 or 0xFFFFFFFA are treated as reset commands by CMD0.

| Field | Start bit | Transmission bit | Command index | Argument | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | [47] | [46] | [45:40] | [39:8] | [7:1] | [0] |
| **Length** | 1 bit | 1 bit | 6 bits | 32 bits | 7 bits | 1 bit |
| **Value** | 0 | 1 | 000000b | all 0 | x | 1 |

## GO_PRE_IDLE_STATE (CMD0)

The software reset command. The host can send a software reset command with an argument of 0xF0F0F0F0 to make the device enter the pre-idle state.

| Field | Start bit | Transmission bit | Command index | Argument | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | [47] | [46] | [45:40] | [39:8] | [7:1] | [0] |
| **Length** | 1 bit | 1 bit | 6 bits | 32 bits | 7 bits | 1 bit |
| **Value** | 0 | 1 | 000000b | 0xF0F0F0F0 | x | 1 |

## BOOT_INITIATION (CMD0)

The boot initiation command. This makes the device enter the boot mode, and the device will actively send data onto the bus. The size of the data area is controlled by the EXT_CSD register.

| Field | Start bit | Transmission bit | Command index | Argument | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | [47] | [46] | [45:40] | [39:8] | [7:1] | [0] |
| **Length** | 1 bit | 1 bit | 6 bits | 32 bits | 7 bits | 1 bit |
| **Value** | 0 | 1 | 000000b | 0xFFFFFFFA | x | 1 |

## SEND_OP_COND (CMD1)

Requests devices in the idle state to send the contents of their operation condition register. Requires the device to return response R3.

| Field | Start bit | Transmission bit | Command index | Argument | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | [47] | [46] | [45:40] | [39:8] | [7:1] | [0] |
| **Length** | 1 bit | 1 bit | 6 bits | 32 bits | 7 bits | 1 bit |
| **Value** | 0 | 1 | 000000b | x | x | 1 |

## ALL_SEND_CID (CMD2)

Requests all devices to send their Card Identification (CID) to the host. Each device's card identifier is defined by different manufacturers, and the content is returned via response R2.

| Field | Start bit | Transmission bit | Command index | Stuff bits | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | [47] | [46] | [45:40] | [39:8] | [7:1] | [0] |
| **Length** | 1 bit | 1 bit | 6 bits | 32 bits | 7 bits | 1 bit |
| **Value** | 0 | 1 | 000010b | all 0 | x | 1 |

## SET_RELATIVE_ADDR (CMD3)

Assigns a Relative Card Address (RCA) to the selected device. The device returns response R1.

* The relative card address assigned by the host typically increments starting from 1, with address 0 reserved as the broadcast address.

| Field | Start bit | Transmission bit | Command index | RCA | Stuff bits | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | [47] | [46] | [45:40] | [39:24] | [23:8] | [7:1] | [0] |
| **Length** | 1 bit | 1 bit | 6 bits | 16 bits | 16 bits | 7 bits | 1 bit |
| **Value** | 0 | 1 | 000011b | x | all 0 | x | 1 |

## SET_DSR (CMD4)

Sets the Driver Stage Register (DSR).

| Field | Start bit | Transmission bit | Command index | DSR | Stuff bits | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | [47] | [46] | [45:40] | [39:24] | [23:8] | [7:1] | [0] |
| **Length** | 1 bit | 1 bit | 6 bits | 16 bits | 16 bits | 7 bits | 1 bit |
| **Value** | 0 | 1 | 000100b | x | all 0 | x | 1 |

## SLEEP_AWAKE (CMD5)

Puts the selected device to sleep or wakes it up based on the relative card address to switch the device state. The device returns response R1b.

| Field | Start bit | Transmission bit | Command index | RCA | Sleep/Awake | Stuff bits | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | [47] | [46] | [45:40] | [39:24] | [23] | [22:8] | [7:1] | [0] |
| **Length** | 1 bit | 1 bit | 6 bits | 16 bits | 1 bit | 15 bits | 7 bits | 1 bit |
| **Value** | 0 | 1 | 000101b | x | 0: Awake<br>1: Sleep | all 0 | x | 1 |

## SWITCH (CMD6)

Switches the operation mode of the selected device or modifies the corresponding Extended Card Specific Data (EXT_CSD) register. Requires the device to return response R1/R1b.

| Field | Start bit | Transmission bit | Command index | Stuff bits | Access mode | Index |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | [47] | [46] | [45:40] | [39:34] | [33:32] | [31:24] |
| **Length** | 1 bit | 1 bit | 6 bits | 6 bits | 2 bits | 8 bits |
| **Value** | 0 | 1 | 100111b | all 0 | 00: Command set<br>01: Set bits<br>10: Clear bits<br>11: Write byte | x |

| Field | Value | Cmd set | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- |
| **Position** | [23:16] | [15:11] | [10:8] | [7:1] | [0] |
| **Length** | 8 bits | 5 bits | 3 bits | 7 bits | 1 bit |
| **Value** | x | all 0 | Access mode 00: Command to switch<br>Other access modes: all 0 | x | 1 |

## SELECT/DESELECT_CARD (CMD7)

Selects or deselects a device based on the relative card address to change its state. The device returns response R1/R1b.

* Sending any other relative card address will deselect the currently selected device and change its state.
* If the device is in the programming state, it returns to the disconnect state, returning response R1b.
* If the device is in the transfer state, it returns to the standby state, returning response R1.

| Field | Start bit | Transmission bit | Command index | RCA | Stuff bits | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | [47] | [46] | [45:40] | [39:24] | [23:8] | [7:1] | [0] |
| **Length** | 1 bit | 1 bit | 6 bits | 16 bits | 16 bits | 7 bits | 1 bit |
| **Value** | 0 | 1 | 000111b | x | all 0 | x | 1 |

## SEND_EXT_CSD (CMD8)

Retrieves the contents of the selected device's EXT_CSD register. The device returns response R1 and sends the EXT_CSD register contents via data line DATA0.

| Field | Start bit | Transmission bit | Command index | Stuff bits | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | [47] | [46] | [45:40] | [39:8] | [7:1] | [0] |
| **Length** | 1 bit | 1 bit | 6 bits | 32 bits | 7 bits | 1 bit |
| **Value** | 0 | 1 | 001000b | all 0 | x | 1 |

## SEND_CSD (CMD9)

Requests the selected device to send its Card-Specific Data (CSD) to the host. The content is returned via response R2.

| Field | Start bit | Transmission bit | Command index | RCA | Stuff bits | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | [47] | [46] | [45:40] | [39:24] | [23:8] | [7:1] | [0] |
| **Length** | 1 bit | 1 bit | 6 bits | 16 bits | 16 bits | 7 bits | 1 bit |
| **Value** | 0 | 1 | 001001b | x | all 0 | x | 1 |

## SEND_CID (CMD10)

Requests the selected device to send its Card Identification (CID) to the host. The content is returned via response R2.

| Field | Start bit | Transmission bit | Command index | RCA | Stuff bits | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | [47] | [46] | [45:40] | [39:24] | [23:8] | [7:1] | [0] |
| **Length** | 1 bit | 1 bit | 6 bits | 16 bits | 16 bits | 7 bits | 1 bit |
| **Value** | 0 | 1 | 001010b | x | all 0 | x | 1 |

## STOP_TRANSMISSION (CMD12)

Forces the selected device to stop data transmission. The device returns response R1/R1b.

* All read commands can be interrupted at any time by this command, and the device returns to the transfer state, returning response R1.
* All write commands can be aborted by this command, but it needs to be sent before command CMD7, returning response R1b.

| Field | Start bit | Transmission bit | Command index | RCA | Stuff bits | HPI | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | [47] | [46] | [45:40] | [39:24] | [23:9] | [8] | [7:1] | [0] |
| **Length** | 1 bit | 1 bit | 6 bits | 16 bits | 15 bits | 1 bit | 7 bits | 1 bit |
| **Value** | 0 | 1 | 001100b | x | all 0 | 0: Continue internal operation<br>1: Interrupt internal operation | x | 1 |

## SEND_STATUS (CMD13)

Requests the selected device to send its Status Register or Queue Status Register (QSR) contents. The device returns response R1/R1b.

* Primarily used to monitor device status during data transmission or operations to ensure transmission normalcy and device reliability.

| Field | Start bit | Transmission bit | Command index | RCA | SQS | Stuff bits | HPI | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | [47] | [46] | [45:40] | [39:24] | [23] | [22:9] | [8] | [7:1] | [0] |
| **Length** | 1 bit | 1 bit | 6 bits | 16 bits | 1 bit | 14 bits | 1 bit | 7 bits | 1 bit |
| **Value** | 0 | 1 | 001100b | x | 0: Status<br>1: Queue status | all 0 | 0: Continue internal operation<br>1: Interrupt internal operation | x | 1 |

## GO_INACTIVE_STATE (CMD15)

Requests the selected device to enter the inactive state. No response is returned.

| Field | Start bit | Transmission bit | Command index | RCA | Stuff bits | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | [47] | [46] | [45:40] | [39:24] | [23:8] | [7:1] | [0] |
| **Length** | 1 bit | 1 bit | 6 bits | 16 bits | 16 bits | 7 bits | 1 bit |
| **Value** | 0 | 1 | 001111b | x | all 0 | x | 1 |

## APP_CMD (CMD55)

Before sending any application-specific commands, this command must be sent to notify the device that the next command is an application command. It can only be sent after receiving response R1, and it is only valid for the immediate next command. If the device detects that the command following this is an application command, it executes the specific application function.

| Field | Start bit | Transmission bit | Command index | Stuff bits | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | [47] | [46] | [45:40] | [39:8] | [7:1] | [0] |
| **Length** | 1 bit | 1 bit | 6 bits | 32 bits | 7 bits | 1 bit |
| **Value** | 0 | 1 | 110111b | all 0 | x | 1 |

## FAST_IO (CMD39)

Accesses a single device register to read or write a single byte. Requires the device to return response R4.

| Field | Start bit | Transmission bit | Command index | RCA | Register write flag | Register address | Register data | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | [47] | [46] | [45:40] | [39:24] | [23] | [15:8] | [7:1] | [7:1] *(Note)* | [0] |
| **Length** | 1 bit | 1 bit | 6 bits | 16 bits | 1 bit | 8 bits | 7 bits | 7 bits | 1 bit |
| **Value** | 0 | 1 | 100111b | x | x | x | x | x | 1 |

## GO_IRQ_STATE (CMD40)

Requests the system to enter interrupt mode. Requires the device to return response R5.

| Field | Start bit | Transmission bit | Command index | Argument | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | [47] | [46] | [45:40] | [39:8] | [7:1] | [0] |
| **Length** | 1 bit | 1 bit | 6 bits | 32 bits | 7 bits | 1 bit |
| **Value** | 0 | 1 | 101000b | all 0 | x | 1 |

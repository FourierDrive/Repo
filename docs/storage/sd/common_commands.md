# Common Commands

Certain commands apply to SDMEM devices, while others are dedicated to SDIO devices. Application scopes are defined as:
* **Storage**: Applicable only to the storage portion of a memory card or combo card (the I/O portion of an SDIO or combo card will not use this command).
* **I/O**: Applicable only to the I/O portion of an SDIO or combo card.

## GO_IDLE_STATE (CMD0)
**Reset Command**
The host can reset the memory card via power-on. Memory cards typically feature built-in power-on detection circuits to complete the power-on sequence, though the host can also explicitly send a reset command to force the card into the idle state. SDIO cards do not use this command for resetting; instead, their I/O reset mechanism is used.

| Field | Start bit | Direction | Command index | Stuff bits | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | `[47]` | `[46]` | `[45:40]` | `[39:8]` | `[7:1]` | `[0]` |
| **Length** | 1 bit | 1 bit | 6 bits | 32 bits | 7 bits | 1 bit |
| **Value** | `0` | `1` | `000000b` | `all 0` | `x` | `1` |

## ALL_SEND_CID (CMD2)
Requests all devices to send their Card Identification (CID) to the host. Each device's card identifier is defined by different manufacturers, and the content is returned via response **R2**.

| Field | Start bit | Direction | Command index | Stuff bits | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | `[47]` | `[46]` | `[45:40]` | `[39:8]` | `[7:1]` | `[0]` |
| **Length** | 1 bit | 1 bit | 6 bits | 32 bits | 7 bits | 1 bit |
| **Value** | `0` | `1` | `000010b` | `all 0` | `x` | `1` |

## SEND_RELATIVE_ADDR (CMD3)
Requests the card to publish a new Relative Card Address (RCA). The device returns response **R6**.

| Field | Start bit | Direction | Command index | Stuff bits | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | `[47]` | `[46]` | `[45:40]` | `[39:8]` | `[7:1]` | `[0]` |
| **Length** | 1 bit | 1 bit | 6 bits | 32 bits | 7 bits | 1 bit |
| **Value** | `0` | `1` | `000011b` | `all 0` | `x` | `1` |

## SELECT/DESELECT_CARD (CMD7)
Selects or deselects a card. Switches the card's state based on the relative card address. The device returns response **R1b**.

| Field | Start bit | Direction | Command index | RCA | Stuff bits | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | `[47]` | `[46]` | `[45:40]` | `[39:24]` | `[23:8]` | `[7:1]` | `[0]` |
| **Length** | 1 bit | 1 bit | 6 bits | 16 bits | 16 bits | 7 bits | 1 bit |
| **Value** | `0` | `1` | `000111b` | `x` | `all 0` | `x` | `1` |

## SEND_IF_COND (CMD8)
When the memory card is in the idle state, sends the memory card interface condition command, including host power supply information and whether the card can operate at this supply voltage. Cards accepting the supply voltage return response **R7**. If the card does not accept the supply voltage, no response is returned, and the card remains in the idle state.

| Field | Start bit | Direction | Command index | Reserved bits | PCIe 1.2 V support | PCIe availability |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | `[47]` | `[46]` | `[45:40]` | `[39:22]` | `[21]` | `[20]` |
| **Length** | 1 bit | 1 bit | 6 bits | 18 bits | 1 bit | 1 bit |
| **Value** | `0` | `1` | `001000b` | `all 0` | `0` (Do not query)<br>`1` (Query support) | `0` (Do not query)<br>`1` (Query availability) |

| Field | Supply voltage (VHS) | Check pattern | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- |
| **Position** | `[19:16]` | `[15:8]` | `[7:1]` | `[0]` |
| **Length** | 4 bits | 8 bits | 7 bits | 1 bit |
| **Value** | `0001b` (2.7 V ~ 3.6 V)<br>`0010b` (Reserved for low voltage) | `x` | `x` | `1` |

## SEND_CSD (CMD9)
Requests the selected card to send its Card-Specific Data (CSD) to the host. Content is returned via response **R2**.

| Field | Start bit | Direction | Command index | RCA | Stuff bits | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | `[47]` | `[46]` | `[45:40]` | `[39:24]` | `[23:8]` | `[7:1]` | `[0]` |
| **Length** | 1 bit | 1 bit | 6 bits | 16 bits | 16 bits | 7 bits | 1 bit |
| **Value** | `0` | `1` | `001001b` | `x` | `all 0` | `x` | `1` |

## SEND_CID (CMD10)
Requests the selected card to send its Card Identification (CID) to the host. Content is returned via response **R2**.

| Field | Start bit | Direction | Command index | RCA | Stuff bits | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | `[47]` | `[46]` | `[45:40]` | `[39:24]` | `[23:8]` | `[7:1]` | `[0]` |
| **Length** | 1 bit | 1 bit | 6 bits | 16 bits | 16 bits | 7 bits | 1 bit |
| **Value** | `0` | `1` | `001010b` | `x` | `all 0` | `x` | `1` |

## VOLTAGE_SWITCH (CMD11)
Requests the card to switch its signal voltage to 1.8 V. The device returns response **R1**.

| Field | Start bit | Direction | Command index | Stuff bits | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | `[47]` | `[46]` | `[45:40]` | `[39:8]` | `[7:1]` | `[0]` |
| **Length** | 1 bit | 1 bit | 6 bits | 32 bits | 7 bits | 1 bit |
| **Value** | `0` | `1` | `001011b` | `all 0` | `x` | `1` |

## STOP_TRANSMISSION (CMD12)
Forces the card to stop transmission. The device returns response **R1b**.

| Field | Start bit | Direction | Command index | Stuff bits | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | `[47]` | `[46]` | `[45:40]` | `[39:8]` | `[7:1]` | `[0]` |
| **Length** | 1 bit | 1 bit | 6 bits | 32 bits | 7 bits | 1 bit |
| **Value** | `0` | `1` | `001100b` | `all 0` | `x` | `1` |

## GO_INACTIVE_STATE (CMD15)
Requests the selected card to enter the inactive state. No response is returned.

| Field | Start bit | Direction | Command index | RCA | Stuff bits | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | `[47]` | `[46]` | `[45:40]` | `[39:24]` | `[23:8]` | `[7:1]` | `[0]` |
| **Length** | 1 bit | 1 bit | 6 bits | 16 bits | 16 bits | 7 bits | 1 bit |
| **Value** | `0` | `1` | `001111b` | `x` | `all 0` | `x` | `1` |

## APP_CMD (CMD55)
Before sending any application-specific commands, this command must be sent to notify the memory card that the next command is an application command. It can only be sent after receiving response **R1**. It is valid only for the very next command. If the card detects that the command immediately following is an application command, it executes the specific application function.

| Field | Start bit | Direction | Command index | Stuff bits | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | `[47]` | `[46]` | `[45:40]` | `[39:8]` | `[7:1]` | `[0]` |
| **Length** | 1 bit | 1 bit | 6 bits | 32 bits | 7 bits | 1 bit |
| **Value** | `0` | `1` | `110111b` | `all 0` | `x` | `1` |

## SET_BUS_WIDTH (ACMD6)
Used by the memory card host to define the data transmission bus width. Requires the card to return response **R1**.

| Field | Start bit | Direction | Command index | Stuff bits | Bus width | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | `[47]` | `[46]` | `[45:40]` | `[39:10]` | `[9:8]` | `[7:1]` | `[0]` |
| **Length** | 1 bit | 1 bit | 6 bits | 30 bits | 2 bits | 7 bits | 1 bit |
| **Value** | `0` | `1` | `000110b` | `all 0` | `00` (1-bit)<br>`10` (4-bit) | `x` | `1` |

## SD_SEND_OP_COND (ACMD41)
Sends host capacity support and voltage support range information. Provides a mechanism to match memory cards meeting relevant conditions. Requires the card to return response **R3**, which contains the contents of the Operation Conditions Register (OCR). Cards generally do not use 2.0 V ~ 2.7 V during communication.

| Field | Start bit | Direction | Command index | Reserved | Host capacity support (HCS) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | `[47]` | `[46]` | `[45:40]` | `[39]` | `[38]` |
| **Length** | 1 bit | 1 bit | 6 bits | 1 bit | 1 bit |
| **Value** | `0` | `1` | `101001b` | `0` | `0` (SDSC only)<br>`1` (Support higher capacity with HO2T) |

| Field | Reserved | SDXC power control (XPC) | Host over 2 TB capacity support (HO2T) | Reserved |
| :--- | :--- | :--- | :--- | :--- |
| **Position** | `[37]` | `[36]` | `[35]` | `[34:33]` |
| **Length** | 1 bit | 1 bit | 1 bit | 2 bits |
| **Value** | `0` | `0` (Max 0.36 W, no speed class support)<br>`1` (Max 0.54 W, speed class support) | `0` (Support SDHC & SDXC)<br>`1` (Support SDUC) | `all 0` |

| Field | Switching to 1.8 V request (S18R) | VDD voltage window | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- |
| **Position** | `[32]` | `[31:8]` | `[7:1]` | `[0]` |
| **Length** | 1 bit | 24 bits | 7 bits | 1 bit |
| **Value** | `0` (No 1.8 V switch request)<br>`1` (Request 1.8 V switch) | See definition table below | `x` | `1` |

### Voltage Window Field Definitions

| OCR Bit Position | `[23]` | `[22]` | `[21]` | `[20]` | `[19]` | `[18]` | `[17]` | `[16]` | `[15]` | `[14:0]` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Host Supported Voltage Range (V)** | 3.5 ~ 3.6 | 3.4 ~ 3.5 | 3.3 ~ 3.4 | 3.2 ~ 3.3 | 3.1 ~ 3.2 | 3.0 ~ 3.1 | 2.9 ~ 3.0 | 2.8 ~ 2.9 | 2.7 ~ 2.8 | Reserved |

## IO_SEND_OP_COND (CMD5)
Functionally similar to the memory card command `ACMD41`, used to query the voltage range required by an I/O card. The device returns its supported voltage range via response **R4**. The common overlapping section represents the operable voltage range. Cards that cannot perform data transfer within the given voltage range will be disconnected from the bus and enter an inactive state.

| Field | Start bit | Direction | Command index | Stuff bits | Switching to 1.8 V request (S18R) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | `[47]` | `[46]` | `[45:40]` | `[39:33]` | `[32]` |
| **Length** | 1 bit | 1 bit | 6 bits | 7 bits | 1 bit |
| **Value** | `0` | `1` | `000101b` | `all 0` | `0` (No 1.8 V request)<br>`1` (Request 1.8 V switch) |

| Field | I/O OCR | CRC7 | End bit |
| :--- | :--- | :--- | :--- |
| **Position** | `[31:8]` | `[7:1]` | `[0]` |
| **Length** | 24 bits | 7 bits | 1 bit |
| **Value** | See definition table below | `x` | `1` |

### I/O Operation Condition Field Definitions

| I/O OCR Bit Position | `[23]` | `[22]` | `[21]` | `[20]` | `[19]` | `[18]` | `[17]` | `[16]` | `[15]` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **VDD Corresponding Voltage Range (V)** | 3.5 ~ 3.6 | 3.4 ~ 3.5 | 3.3 ~ 3.4 | 3.2 ~ 3.3 | 3.1 ~ 3.2 | 3.0 ~ 3.1 | 2.9 ~ 3.0 | 2.8 ~ 2.9 | 2.7 ~ 2.8 |

| I/O OCR Bit Position | `[14]` | `[13]` | `[12]` | `[11]` | `[10]` | `[9]` | `[8]` | `[7:0]` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **VDD Corresponding Voltage Range (V)** | 2.6 ~ 2.7 | 2.5 ~ 2.6 | 2.4 ~ 2.5 | 2.3 ~ 2.4 | 2.2 ~ 2.3 | 2.1 ~ 2.2 | 2.0 ~ 2.1 | Reserved |

## IO_RW_DIRECT (CMD52)
Accesses a single register of an I/O device, reading or writing a single byte. Requires the device to return response **R5**.

| Field | Start bit | Direction | Command index | R/W flag | Function number | RAW flag |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | `[47]` | `[46]` | `[45:40]` | `[39]` | `[38:36]` | `[35]` |
| **Length** | 1 bit | 1 bit | 6 bits | 1 bit | 3 bits | 1 bit |
| **Value** | `0` | `1` | `110100b` | `0` (Read specific address)<br>`1` (Write specific address) | I/O card function number (Function 0 is public I/O area) | Write flag:<br>`0` Return written value<br>`1` Read back written value |

| Field | Stuff bits | Register address | Stuff bits | Write data or stuff bits | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | `[34]` | `[33:17]` | `[16]` | `[15:8]` | `[7:1]` | `[0]` |
| **Length** | 1 bit | 17 bits | 1 bit | 8 bits | 7 bits | 1 bit |
| **Value** | `0` | 128 KB address range | `0` | Read flag: Stuff `0`<br>Write flag: Byte to write | `x` | `1` |

## IO_RW_EXTENDED (CMD53)
Accesses multiple registers of an I/O device, reading or writing multiple bytes. No response is returned.

| Field | Start bit | Direction | Command index | R/W flag | Function number |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | `[47]` | `[46]` | `[45:40]` | `[39]` | `[38:36]` |
| **Length** | 1 bit | 1 bit | 6 bits | 1 bit | 3 bits |
| **Value** | `0` | `1` | `110101b` | `0` (Read specific address)<br>`1` (Write specific address) | I/O card function number (Function 0 is public I/O area) |

| Field | Block mode | OP code | Register address | Byte/Block count | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | `[35]` | `[34]` | `[33:17]` | `[16:8]` | `[7:1]` | `[0]` |
| **Length** | 1 bit | 1 bit | 17 bits | 9 bits | 7 bits | 1 bit |
| **Value** | `0` (Byte-based R/W)<br>`1` (Block-based R/W) | `0` (Fixed address)<br>`1` (Incrementing address) | 128 KB address range | Byte transfer: `0` corresponds to 512<br>Block transfer: `0` corresponds to infinite | `x` | `1` |

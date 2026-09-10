# Common Responses

SD standards define that all response lengths depend on the response type. Each response format varies slightly. SDMEM cards support five types of responses, while SDIO cards support two additional response types on top of those.
The physical layer specification defines several fixed card registers, among which I/O cards only support the Operation Conditions Register (OCR).

| Name | Acronym | Width | Description | Implementation |
| :--- | :--- | :--- | :--- | :--- |
| Card identification | CID | 128 bits | Unique identifier for each card | Mandatory |
| Relative card address | RCA | 16 bits | Card publishes its relative address for host addressing | Mandatory |
| Driver stage register | DSR | 16 bits | Configures card output driver to adapt to different electrical characteristics | Optional |
| Card-specific data | CSD | 128 bits | Card-specific data containing card operating conditions such as read/write speed, block size, etc. | Mandatory |
| SD card configuration register | SCR | 64 bits | Card configuration information | Mandatory |
| Card status register | CSR | 32 bits | Card status information | Mandatory |
| SD status register | SSR | 512 bits | Bus width, speed class, protected area size, erase-related parameters, etc. | Mandatory |
| Operation conditions register | OCR | Storage: 32 bits<br>I/O: 24 bits | Used in broadcast commands to identify card voltage types | Mandatory |

## Normal Response Command (R1/R1b)
Returns the card's status. `R1b` can optionally send a busy signal on the data line.

| Field | Start bit | Direction | Command index | Card status | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | `[47]` | `[46]` | `[45:40]` | `[39:8]` | `[7:1]` | `[0]` |
| **Length** | 1 bit | 1 bit | 6 bits | 32 bits | 7 bits | 1 bit |
| **Value** | `0` | `0` | Responding command index | See definition table below | `x` | `1` |

### Common Card Status

| Position | RCA Position | Identifier | Type | Description | Value | Clear Condition | Scope |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `[23]` | `[15]` | `COM_CRC_ERROR` | E R | Previous command CRC check | `0` No error<br>`1` Error | B | Storage, I/O |
| `[22]` | `[14]` | `ILLEGAL_COMMAND` | E R | Command validity for current card state | `0` Legal<br>`1` Illegal | B | Storage, I/O |
| `[19]` | `[13]` | `ERROR` | E R X | Unknown error during operation | `0` No error<br>`1` Error | C | Storage, I/O |
| `[12:9]` | `[12:9]` | `CURRENT_STATE` | S X | Current card status | Storage card reference mode state table<br>I/O card fixed to `1111b` | B | Storage, I/O |
| `[8]` | `-` | `READY_FOR_DATA` | S X | Bus signal | `0` Not ready<br>`1` Ready to receive data | A | Storage |
| `[5]` | `-` | `APP_CMD` | S R | Card waiting to receive app command | `0` Not ready to receive<br>`1` Ready to receive | C | Storage |

#### Type Definitions
* **E**: Error bit
* **S**: Status bit
* **R**: Set based on actual command response
* **X**: Checked and set during command execution

#### Clear Condition Definitions
* **A**: According to the card's current status
* **B**: Related to the previous command; cleared upon receiving a valid command
* **C**: Cleared by read

## CID/CSD Register (R2)
Returns the upper 127 bits of the CID or CSD register.

| Field | Start bit | Direction | Reserved | CID or CSD register | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | `[135]` | `[134]` | `[133:128]` | `[127:1]` (`CID/CSD [127:1]`) | `[0]` |
| **Length** | 1 bit | 1 bit | 6 bits | 127 bits | 1 bit |
| **Value** | `0` | `0` | `all 1` | `x` | `1` |

## OCR Register (R3)
The OCR content of the SD memory card as a response to `ACMD41`.

| Field | Start bit | Direction | Reserved | Card power up status bit (busy) | Card capacity status (CCS) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | `[47]` | `[46]` | `[45:40]` | `[39]` (`OCR [31]`) | `[38]` (`OCR [30]`) |
| **Length** | 1 bit | 1 bit | 6 bits | 1 bit | 1 bit |
| **Value** | `0` | `0` | `all 1` | `0` (Card initialization incomplete)<br>`1` (Card initialization complete) | `0` (SDSC card)<br>`1` (With CO2T field) |

| Field | UHS-II card status | Reserved | Card over 2 TB support status (CO2T) | Reserved |
| :--- | :--- | :--- | :--- | :--- |
| **Position** | `[37]` (`OCR [29]`) | `[36]` (`OCR [28]`) | `[35]` (`OCR [27]`) | `[34:33]` (`OCR [26:25]`) |
| **Length** | 1 bit | 1 bit | 1 bit | 2 bits |
| **Value** | `0` (Not UHS-II)<br>`1` (Is UHS-II) | `1` | `0` (SDHC or SDXC)<br>`1` (SDUC) | `all 1` |

| Field | Switching to 1.8 V accepted (S18A) | VDD voltage window | Reserved | End bit |
| :--- | :--- | :--- | :--- | :--- |
| **Position** | `[32]` (`OCR [24]`) | `[31:8]` (`OCR [23:0]`) | `[7:1]` | `[0]` |
| **Length** | 1 bit | 24 bits | 7 bits | 1 bit |
| **Value** | `0` (1.8V switch not accepted)<br>`1` (1.8V switch accepted) | See definition table below | `x` | `1` |

### Voltage Window Field Definitions

| OCR Bit Position | `[23]` | `[22]` | `[21]` | `[20]` | `[19]` | `[18]` | `[17]` | `[16]` | `[15]` | `[14:0]` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **VDD Corresponding Voltage Range (V)** | 3.5 ~ 3.6 | 3.4 ~ 3.5 | 3.3 ~ 3.4 | 3.2 ~ 3.3 | 3.1 ~ 3.2 | 3.0 ~ 3.1 | 2.9 ~ 3.0 | 2.8 ~ 2.9 | 2.7 ~ 2.8 | Reserved |

## Published RCA Response (R6)
Used as a response to command `CMD3`. The RCA register contents returned by memory cards and I/O cards differ slightly.

| Field | Start bit | Direction | Command index | New published RCA |
| :--- | :--- | :--- | :--- | :--- |
| **Position** | `[47]` | `[46]` | `[45:40]` | `[39:24]` (`RCA [31:16]`) |
| **Length** | 1 bit | 1 bit | 6 bits | 16 bits |
| **Value** | `0` | `0` | `000011b` | `x` |

| Field | Card status | CRC7 | End bit |
| :--- | :--- | :--- | :--- |
| **Position** | `[23:8]` (`RCA [15:0]`) | `[7:1]` | `[0]` |
| **Length** | 16 bits | 7 bits | 1 bit |
| **Value** | Memory card returns status bits `[23]`, `[22]`, `[19]`, `[12:9]`<br>I/O card returns status bits `[23]`, `[22]`, `[19]` | `x` | `1` |

## Card Interface Condition Response (R7)
Includes operating voltages supported by the card and check responses, used as a response to command `CMD8`.

| Field | Start bit | Direction | Command index | Reserved | PCIe 1.2V support | PCIe response |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | `[47]` | `[46]` | `[45:40]` | `[39:22]` | `[21]` | `[20]` |
| **Length** | 1 bit | 1 bit | 6 bits | 18 bits | 1 bit | 1 bit |
| **Value** | `0` | `0` | `001000b` | `all 0` | `0` (Supported)<br>`1` (Not supported) | `0` (Accepted)<br>`1` (Not accepted) |

| Field | Voltage accepted | Echo back of check pattern | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- |
| **Position** | `[19:16]` | `[15:8]` | `[7:1]` | `[0]` |
| **Length** | 4 bits | 8 bits | 7 bits | 1 bit |
| **Value** | `0001b` (2.7 V ~ 3.6 V)<br>`0010b` (Reserved for low voltage) | Matches corresponding command `CMD8` check byte value | `x` | `1` |

## IO_SEND_OP_COND Response (R4)
The contents of the SDIO card's OCR as a response to command `CMD5`.

| Field | Start bit | Direction | Reserved | Operating status | Number of I/O functions | Memory present |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | `[47]` | `[46]` | `[45:40]` | `[39]` | `[38:36]` | `[35]` |
| **Length** | 1 bit | 1 bit | 6 bits | 1 bit | 3 bits | 1 bit |
| **Value** | `0` | `0` | `all 1` | `0` (Initialization incomplete)<br>`1` (Initialization complete) | Number of I/O functions (excluding function 0, must be deployed sequentially from 1) | `0` (I/O only)<br>`1` (Includes memory) |

| Field | Stuff bits | Switching to 1.8 V accepted (S18A) | I/O OCR | Reserved | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | `[34:33]` | `[32]` | `[31:8]` (`OCR [23:0]`) | `[7:1]` | `[0]` |
| **Length** | 2 bits | 1 bit | 24 bits | 7 bits | 1 bit |
| **Value** | `all 0` | `0` (1.8V switch not accepted)<br>`1` (1.8V switch accepted) | `x` | `all 1` | `1` |

## IO_RW_DIRECT Response (R5)
Response to command `CMD52`. Returns the device's current working status.

| Field | Start bit | Direction | Command index | Stuff bits | Response flags bit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | `[47]` | `[46]` | `[45:40]` | `[39:24]` | `[23:16]` |
| **Length** | 1 bit | 1 bit | 6 bits | 16 bits | 8 bits |
| **Value** | `0` | `0` | `110100b` | `all 0` | See definition table below |

| Field | Read or write data | CRC7 | End bit |
| :--- | :--- | :--- | :--- |
| **Position** | `[15:8]` | `[7:1]` | `[0]` |
| **Length** | 8 bits | 7 bits | 1 bit |
| **Value** | `R/W=0`: Returns specific address content<br>`R/W=1` & `RAW=0`: Returns passed value<br>`R/W=1` & `RAW=1`: Returns read-back value | `x` | `1` |

### Response Flags Bit Definitions

| Position | Identifier | Type | Description | Clear Condition |
| :--- | :--- | :--- | :--- | :--- |
| `[7]` | Checksum error | E R | Previous command checksum check error | B |
| `[6]` | Illegal command | E R | Command illegal under current card state | B |
| `[5:4]` | I/O current state | S | `00`: Init, standby, inactive (no data transfer)<br>`01`: Command state (sending command/requesting response)<br>`10`: Data transfer state (command executed, data transfer allowed) | B |
| `[3]` | Error | E R X | General or unknown error during operation | C |
| `[2]` | Reserved | - | Reserved bits, all values are `0` | C |
| `[1]` | Function number | E R | Invalid function number request | C |
| `[0]` | Out of range | E R X | Command parameters exceed allowed device range | C |

# Bus Protocol

Communication between the host and the device is always initiated by commands from the host, with responses returned by the device. All commands and responses are transmitted via the command line (CMD). Additionally, all data exchanges, such as data block reads/writes or device busy states, are conducted through the data lines (DAT).

* **Command**: Transmitted from the host to the device, used to execute various operations. Each command is serially transmitted on the command line.
* **Response**: Transmitted from the device to the host, used to reply to a received command. Each response is serially transmitted on the command line.
* **Data**: Can be transferred in either direction (host-to-device or device-to-host) at any given time, serially or in parallel depending on specific conditions.

## General Format

All commands and responses start with a transmission logic `0` and end with logic `1`. Every message is protected by a 7-bit CRC checksum, transmitted most significant bit (MSB) first.

* All commands have a fixed length of 48 bits.

| Field | Start bit | Transmission bit/Direction | Command index | Argument | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | `[47]` | `[46]` | `[45:40]` | `[39:8]` | `[7:1]` | `[0]` |
| **Length** | 1 bit | 1 bit | 6 bits | 32 bits | 7 bits | 1 bit |

* All responses can be categorized by length into short responses (48 bits) and long responses (136 bits).

| Response Format 48-bit | | | | |
| :--- | :--- | :--- | :--- | :--- |
| **Field** | Start bit | Transmission bit/Direction | Content | CRC7 | End bit |
| **Position** | `[47]` | `[46]` | `[45:8]` | `[7:1]` | `[0]` |
| **Length** | 1 bit | 1 bit | 38 bits | 7 bits | 1 bit |

| Response Format 136-bit | | | | |
| :--- | :--- | :--- | :--- | :--- |
| **Field** | Start bit | Transmission bit/Direction | Content | CRC7 | End bit |
| **Position** | `[135]` | `[134]` | `[133:8]` | `[7:1]` | `[0]` |
| **Length** | 1 bit | 1 bit | 126 bits | 7 bits | 1 bit |

### Field Names and Descriptions

* **Start bit**: Indicates the start of command or response transmission; value is `0`.
* **Transmission bit/Direction**: Host-to-device transmission (command) value is `1`; device-to-host transmission (response) value is `0`.
* **Command index**: Binary representation of the command index; supports `CMD0` through `CMD63` (up to 64 commands).
* **Argument**: Certain commands require arguments, such as address information.
* **Content**: Responded command index, register contents, status information, etc.
* **CRC7**: Error detection ensuring data integrity.
* **End bit**: Indicates the end of command or response transmission; value is `1`.

## Command Types

Sent commands include both broadcast and addressed types. Based on the presence of responses and data transfer, they can be further subdivided into four command types:

* **Broadcast commands (bc)**: Sent to all devices; broadcast characteristics require the command lines of all devices to be tied together.
* **Broadcast commands with response (bcr)**: All devices respond simultaneously; requires separate command line connections for all devices.
* **Addressed (point-to-point) commands (ac)**: Sent to a selected device with no data transfer on the data lines.
* **Addressed (point-to-point) data transfer commands (adtc)**: Sent to a selected device with data transfer on the data lines.

## Command Categories

The SD standard aims to provide a unified interface for various applications. All commands are categorized into standard commands (`CMD`) and application-specific commands (`ACMD`). Some commands return general responses, while others correspond to specific responses.

Commands are grouped into multiple classes based on their functionality. The main command sets include basic commands (class 0), block-oriented read commands (class 2), block-oriented write commands (class 4), erase commands (class 5), block-oriented write protection commands (class 6), lock commands (class 7), application-specific commands (class 8), I/O mode commands (class 9), function switching commands (class 10), and function extension commands (class 11).

| Command Index | Command Type | Corresponding Response | Brief Description | Command Category | Application Scope |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CMD0** | bc | - | Reset | class 0 | Memory |
| **CMD2** | bcr | R2 | Tell all cards to return identifier | class 0 | Memory |
| **CMD3** | bcr | R6 | Tell all cards to publish relative address | class 0 | Memory, I/O |
| **CMD7** | ac | R1b | Select/deselect card | class 0 | Memory, I/O |
| **CMD8** | bcr | R7 | Send interface condition to query card support | class 0 | Memory |
| **CMD9** | ac | R2 | Get selected card's specific parameters | class 0 | Memory |
| **CMD10** | ac | R2 | Get selected card's identifier | class 0 | Memory |
| **CMD11** | ac | R1 | Switch signal voltage to 1.8 V | class 0 | Memory, I/O |
| **CMD12** | ac | R1b | Force card to stop transmission | class 0 | Memory |
| **CMD15** | ac | - | Force card into inactive state | class 0 | Memory |
| **CMD55** | ac | R1 | Application command prefix | class 8 | Memory |
| **ACMD6** | ac | R1 | Define bus width | class 8 | Memory |
| **ACMD41** | bcr | R3 | Get operating conditions | class 8 | Memory |
| **CMD5** | ac | R4 | Get operating conditions | class 0 | I/O |
| **CMD52** | adtc | R5 | Access single register | class 9 | I/O |
| **CMD53** | adtc | - | Access multiple registers | class 9 | I/O |

The biggest difference between memory cards and SDIO cards is that memory cards use memory access, whereas SDIO cards use I/O access, which allows reading and writing individual registers. Memory access relies on the concept of fixed block lengths, but SDIO devices do not necessarily have fixed block lengths, and read sizes may differ from write sizes.

SDIO supports relatively few commands, and configuration of SDIO devices is primarily achieved through their internal registers, which have certain correspondences with memory card commands.

| SDMEM Command | SDIO Command | Comments |
| :--- | :--- | :--- |
| **CMD0** | `CMD52` CCCR `06h`: RES | Memory card, I/O card, or combo card reset |
| **CMD12** | `CMD52` CCCR `06h`: ASx | Terminate partial transmission (used by I/O cards in `CMD53` byte mode) |
| **ACMD6** | `CMD52` CCCR `07h`: Bus Width `1:0` | Define data transmission bus width |
| **CMD17**<br>**CMD18**<br>**CMD24**<br>**CMD25** | `CMD53` | Data read/write commands |

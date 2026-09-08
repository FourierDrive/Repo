# Bus Protocol

Communication between the host and the device is initiated by the host sending commands, with responses returned by the device. All commands and responses are transmitted via the command line. Additionally, all data exchanges, such as reading and writing data blocks or checking the device busy state, are conducted through the data lines.

* **Command**: Transmitted from the host to the device to implement various operations. Each command is serially transmitted on the command line.
* **Response**: Transmitted from the device to the host to reply to a just-received command. Each response is serially transmitted on the command line.
* **Data**: Can be transferred from host to device or device to host at any given time, utilizing single-line, four-line, or eight-line transmission based on specific conditions.

## General Format

All commands and responses start with a logical '0' and end with a logical '1'. Each message is protected by a 7-bit CRC check, and the transmission order is most significant bit (MSB) first.

* All commands have a length of 48 bits.

| Field | Start bit | Transmission bit/Direction | Command index | Argument | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | [47] | [46] | [45:40] | [39:8] | [7:1] | [0] |
| **Length** | 1 bit | 1 bit | 6 bits | 32 bits | 7 bits | 1 bit |

* All responses can be categorized by length into short responses (48 bits) and long responses (136 bits).

| Response Format 48-bit | Start bit | Transmission bit/Direction | Content | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | [47] | [46] | [45:8] | [7:1] | [0] |
| **Length** | 1 bit | 1 bit | 38 bits | 7 bits | 1 bit |

| Response Format 136-bit | Start bit | Transmission bit/Direction | Content | CRC7 | End bit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Position** | [135] | [134] | [133:8] | [7:1] | [0] |
| **Length** | 1 bit | 1 bit | 126 bits | 7 bits | 1 bit |

### Field Name and Definition

* **Start bit**: Indicates the start of command or response transmission; value is 0.
* **Transmission bit/Direction**: Transmitted from host to device (command) has a value of 1; transmitted from device to host (response) has a value of 0.
* **Command index**: Binary representation of the command index, supporting CMD0 ~ CMD63 (up to 64 commands).
* **Argument**: Some commands require parameters, such as address information.
* **Content**: Responded command index, register contents, status information, etc.
* **CRC7**: Error detection to ensure data integrity.
* **End bit**: Indicates the end of command or response transmission; value is 1.

## Command Types

Sent commands include broadcast and addressed types, and can be further subdivided into four command types based on the presence of a response and data transmission:

* **Broadcast commands (bc)**: Sends commands to all devices. Broadcast characteristics require the command lines of all devices to be connected together.
* **Broadcast commands with response (bcr)**: All devices respond simultaneously, requiring the command lines of all devices to be connected separately.
* **Addressed (point-to-point) commands (ac)**: Sent to a selected device with no data transmission on the data lines.
* **Addressed (point-to-point) data transfer commands (adtc)**: Sent to a selected device with data transmission on the data lines.

## Command Categories

According to functionality, commands can be divided into multiple categories. Each command belongs to a different command set. The main command sets include Basic commands (class 0), Block read commands (class 2), Block write commands (class 4), Erase commands (class 5), Write protection commands (class 6), Lock commands (class 7), Application-specific commands (class 8), I/O mode commands (class 9), Security protocol commands (class 10), and Command queue commands (class 11).

| Command Index | Command Type | Corresponding Response | Brief Description | Command Category |
| :--- | :--- | :--- | :--- | :--- |
| CMD0 | bc/- | - | Reset / Start | class 0 |
| CMD1 | bcr | R3 | Get operating conditions | class 0 |
| CMD2 | bcr | R2 | Notify all devices to return identifier | class 0 |
| CMD3 | ac | R1 | Assign relative address to selected device | class 0 |
| CMD4 | bc | - | Set device driver stage register | class 0 |
| CMD5 | ac | R1b | Sleep/awake selected device | class 0 |
| CMD6 | ac | R1b | Switch device mode or configure extended device-specific data register | class 0 |
| CMD7 | ac | R1/R1b | Select/deselect device | class 0 |
| CMD8 | adtc | R1 | Get extended device-specific data | class 0 |
| CMD9 | ac | R2 | Get selected device-specific parameters | class 0 |
| CMD10 | ac | R2 | Get selected device identifier | class 0 |
| CMD12 | ac | R1/R1b | Force selected device to stop transmission | class 0 |
| CMD13 | ac | R1 | Selected device sends current status | class 0 |
| CMD15 | ac | - | Selected device enters inactive state | class 0 |
| CMD55 | ac | R1 | Application command prefix | class 8 |
| CMD39 | ac | R4 | Access single register | class 9 |
| CMD40 | bcr | R5 | System enters interrupt mode | class 9 |

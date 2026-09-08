# Electrical Characteristics

The system voltage range and the constraint relationship between the core voltage ($V_{cc}$) and the communication voltage ($V_{ccq}$) are shown below. Note that the communication voltage is generally lower than the core voltage.

| Core Voltage ($V_{cc}$) \ Communication Voltage ($V_{ccq}$) | 1.1 V ~ 1.3 V | 1.70 V ~ 1.95 V | 2.7 V ~ 3.6 V |
| :--- | :--- | :--- | :--- |
| **1.70 V ~ 1.95 V** | Valid | Valid | - |
| **2.7 V ~ 3.6 V** | Valid | Valid | Valid |

*Note: The 3.3 V communication voltage range is not supported under HS200 and HS400 speed modes.*

The bus includes a clock line, command line, and data lines. eMMC version 4.5 and later versions added pins such as hardware reset and data strobe.

| Pin Name | Abbreviation | Type | Description |
| :--- | :--- | :--- | :--- |
| Clock | CLK | Input | Clock |
| Data strobe | DS | Output / Push-pull | Data strobe (Used in HS400 mode for data synchronization) |
| Data line | DAT0 ~ DAT7 | Input / Output / Push-pull | Data lines |
| Command/Response line | CMD | Input / Output / Push-pull / Open-drain | Command / Response line |
| Hardware reset | RST_n | Input | Hardware reset |
| Supply voltage for core | Vcc | Supply | Core power supply |
| Supply voltage for I/O | Vccq | Supply | I/O power supply |
| Supply voltage ground for core | Vss | Supply | Core ground |
| Supply voltage ground for I/O | Vss | Supply | I/O ground |

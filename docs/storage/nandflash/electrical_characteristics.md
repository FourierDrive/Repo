# Electrical Characteristics

This section details the peripheral IP configuration, command dispatch mechanisms, FIFO management, and the hardware pin definitions required for SPI/QSPI bus communications with the NAND flash device.



## Interface Definitions

The serial NAND flash device communicates with the host controller through dedicated hardware pins, supporting standard SPI, Dual SPI, and Quad SPI operations.

| Name | Type | Description |
| :--- | :--- | :--- |
| **CS#** | I | Chip Select: Enables and disables device operation.<br>Must transition from high to low after power-up. |
| **SI / SIO0** | I/O | Serial Data Input: Unidirectional data input for standard SPI.<br>SIO0: Bidirectional data line (IO0) for Dual and Quad SPI operations. |
| **SO / SIO1** | I/O | Serial Data Output: Unidirectional data output for standard SPI.<br>SIO1: Bidirectional data line (IO1) for Dual and Quad SPI operations. |
| **WP# / SIO2** | I/O | Write Protect: Active low write protection pin for status registers.<br>SIO2: Bidirectional data line (IO2) for Quad SPI operations. |
| **HOLD# / SIO3** | I/O | Hold Input: Pauses device operation during standard/dual SPI without deselecting.<br>SIO3: Bidirectional data line (IO3) for Quad SPI operations. |
| **SCLK / CLK** | I | Serial Clock: Provides the timing for serial input and output operations. |
| **VCC** | S | Power Supply: Core and I/O power supply voltage. |
| **VSS / GND** | S | Ground: Reference ground potential. |
| **NC** | NC | No Connection: Not internally connected, can be driven or floated. |
| **DQS** | O | Data Strobe Signal Output: Available only for BGA24 packages to synchronize data output. |

*NOTE: I: input; O: output; NC: Not connected (or logical high); S: power supply.*

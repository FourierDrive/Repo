# Electrical Characteristics

This section details the peripheral IP configuration, command dispatch mechanisms, FIFO management, and the hardware pin definitions required for SPI/QSPI bus communications with the NAND flash device.

## Controller Interface

The flash controller IP represents the internal MCU peripheral logic responsible for translating host register commands into raw physical pin signaling across the SPI/QSPI bus.

* **Command Dispatch**: Initiating hardware tasks via control registers. The processor configures the internal IP controller registers to orchestrate SPI timing sequences, sending specific hardware command codes (such as 02h for Page Program or 0Fh for Get Feature) directly to the external chip.
* **Hardware Busy State**: Microscopic blocking on the internal peripheral bus. The controller register tracks the active transmission status of the physical serial lines via internal flags. The processor must block or wait until the controller finishes pumping serial bits down the wire.
* **Operation In Progress (OIP)**: Macroscopic tracking of external silicon execution. While the controller IP becomes free quickly after delivering a command, the external flash chip remains busy for milliseconds executing high-voltage physical erasure or program execution. The software must poll the OIP bit in the external chip status register.
* **TX/RX FIFO Management**: Buffer-based serial data flow. The controller utilizes internal hardware FIFOs (First-In, First-Out) to decouple the processor from the serial clock domain. Data to be programmed is written into the TX FIFO, while incoming read data is captured in the RX FIFO. The driver must monitor FIFO status flags (e.g., threshold, empty, or full) to prevent underflow or overflow during high-speed burst transfers.
* **SPI/QSPI Modes**: Bus protocol configuration. The controller supports different communication modes defined by the Clock Polarity (CPOL) and Clock Phase (CPHA) settings, which dictate the timing relationship between the clock and data edges. Note that SPI NAND devices typically support only two modes: Mode 0 (CPOL=0, CPHA=0) and Mode 3 (CPOL=1, CPHA=1). Furthermore, the interface can be configured for Single, Dual, or Quad I/O modes, enabling the controller to utilize multiple data pins (IO0-IO3) concurrently to significantly increase data throughput during high-speed page read and load operations.

## Interface Definitions

The serial NAND flash device communicates with the host controller through dedicated hardware pins, supporting standard SPI, Dual SPI, and Quad SPI operations.

| Name | Type* | Description |
| :--- | :--- | :--- |
| **CS#** | I | Chip Select: Enables and disables device operation. When CS# is high, the device is deselected and data output pins are at high impedance. Must transition from high to low after power-up before instructions are accepted. |
| **SI / SIO0** | I/O | Serial Data Input / SIO0: Unidirectional data input for standard SPI, bidirectional data line (IO0) for Dual and Quad SPI operations. |
| **SO / SIO1** | I/O | Serial Data Output / SIO1: Unidirectional data output for standard SPI, bidirectional data line (IO1) for Dual and Quad SPI operations. |
| **WP# / SIO2** | I/O | Write Protect / SIO2: Active low write protection pin for status registers / bidirectional data line (IO2) for Quad SPI operations. |
| **HOLD# / SIO3** | I/O | Hold Input / SIO3: Pauses device operation during standard/dual SPI without deselecting / bidirectional data line (IO3) for Quad SPI operations. |
| **SCLK / CLK** | I | Serial Clock: Provides the timing for serial input and output operations. |
| **VCC** | S | Power Supply: Core and I/O power supply voltage. |
| **VSS / GND** | S | Ground: Reference ground potential. |
| **NC** | NC | Not connected: Not internally connected, can be driven or floated. |
| **DQS** | O | Data Strobe Signal Output: Available only for BGA24 packages to synchronize data output. |

*NOTE: I: input; O: output; NC: Not connected (or logical high); S: power supply.*

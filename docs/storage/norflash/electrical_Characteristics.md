# Electrical Characteristics

This section outlines the physical pin configurations, interface definitions, and signal behaviors for bus communications with the NOR flash device.

## Interface Definitions

The pin definitions and signal directions defined below are viewed from the Serial NOR Flash device's perspective, covering standard SPI and Multi-I/O configurations.

| Name | Type* | Description |
| :--- | :--- | :--- |
| **CS#** | I | Chip Select input, active low |
| **SI / SIO0** | I/O | Serial Data Input (Standard SPI) / SIO0 (Dual/Quad SPI) |
| **SO / SIO1** | I/O | Serial Data Output (Standard SPI) / SIO1 (Dual/Quad SPI) |
| **WP# / SIO2** | I/O | Write Protect input / SIO2 (Quad SPI) |
| **HOLD# / RESET# / SIO3** | I/O | Hold or Reset input / SIO3 (Quad SPI) |
| **SCLK / CLK** | I | Serial Clock synchronization input |
| **VCC** | S | Power Supply |
| **VSS / GND** | S | Ground |
| **NC** | NC | Not Connected |

*NOTE: I: input; O: output; I/O: bidirectional; S: power supply; NC: not connected.*

## Signal Behaviors

* **Chip Select (CS#)**: Must be held high when the device is unselected. A high-to-low transition initiates a new command cycle, and CS# must return high at the end of instruction boundaries.
* **Serial Clock (SCLK / CLK)**: Synchronizes all data input and output operations. Serial NOR devices typically support SPI Bus Mode 0 (CPOL=0, CPHA=0) and Mode 3 (CPOL=1, CPHA=1).
* **Data Lines (SIO0–SIO3)**: Transition from single-ended bidirectional channels (MOSI/MISO) in standard SPI to quad-multiplexed data lines during Quad-SPI operations to maximize instruction fetch bandwidth.
* **Write Protect (WP#)**: Used in conjunction with status register bits to hardware-protect specified memory address ranges from accidental program or erase modifications.
* **Hold / Reset (HOLD# / RESET#)**: Pauses serial communication without deselecting the device, or acts as a hardware reset pin depending on the specific package and device configuration.

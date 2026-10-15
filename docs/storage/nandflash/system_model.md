# System Model

This section outlines the system-level architectural modeling and control logic, bridging host-side controller peripheral operations and device-side internal register management for NAND flash communication.

## Host Controller Interface

The flash controller IP represents the internal MCU/SoC peripheral logic responsible for translating host register commands into raw physical pin signaling across the SPI/QSPI bus.

- **Command Dispatch**: Initiating hardware tasks via control registers. The processor configures the internal IP controller registers to orchestrate SPI timing sequences, sending specific hardware command codes (such as 02h for Page Program or 0Fh for Get Feature) directly to the external chip.
- **Hardware Busy State**: Microscopic blocking on the internal peripheral bus. The controller register tracks the active transmission status of the physical serial lines via internal flags. The processor must block or wait until the controller finishes pumping serial bits down the wire.
- **TX/RX FIFO Management**: Buffer-based serial data flow. The controller utilizes internal hardware FIFOs to decouple the processor from the serial clock domain. Data to be programmed is written into the TX FIFO, while incoming read data is captured in the RX FIFO. The driver must monitor FIFO status flags (e.g., threshold, empty, or full) to prevent underflow or overflow during high-speed burst transfers.
- **SPI/QSPI Modes**: Bus protocol configuration. The controller supports different communication modes defined by the Clock Polarity (CPOL) and Clock Phase (CPHA) settings, which dictate the timing relationship between the clock and data edges. Note that SPI NAND devices typically support only two modes: Mode 0 (CPOL=0, CPHA=0) and Mode 3 (CPOL=1, CPHA=1). Furthermore, the interface can be configured for Single, Dual, or Quad I/O modes, enabling the controller to utilize multiple data pins (IO0-IO3) concurrently to significantly increase data throughput during high-speed page read and load operations.

## Device Control Logic

This layer manages the internal control state, feature configurations, and execution tracking implemented directly within the external NAND flash silicon.

- **Operation In Progress (OIP)**: Macroscopic tracking of external silicon execution. While the host controller IP becomes free quickly after delivering a command, the external flash chip remains busy for milliseconds executing high-voltage physical erasure or program execution. The software must poll the OIP bit in the external chip status register.
- **Feature Registers & Status Monitoring**: The flash device provides internal volatile/non-volatile registers accessed via Get Features (0Fh) and Set Features (1Fh) commands. These registers manage configurations such as block protection, driver strength, and status flags (e.g., WEL, OIP, and ECC error status) to ensure reliable operational state tracking.

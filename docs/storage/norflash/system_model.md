# System Model

This section outlines the system-level architectural modeling and control logic, bridging host-side controller peripheral operations and device-side internal register management for NOR flash communication.

## Host Controller Interface

The flash controller IP represents the internal MCU/SoC peripheral logic responsible for translating host memory-mapped or register-driven commands into physical bus signaling.

* **Command Dispatch**: Initiating hardware operations via control registers. The processor configures controller registers to issue specific instruction opcodes (such as 03h for Read, 06h for Write Enable, or 20h for Sector Erase) across the serial or parallel interface.
* **Memory-Mapped Direct Access (XIP Support)**: Direct bus bridging. Advanced SPI-NOR or external bus controllers map the flash address space directly into the CPU's system memory map, converting read cycles transparently into serial instruction fetch sequences.
* **FIFO and Buffer Management**: Data staging during burst operations. Controllers utilize internal hardware FIFOs to handle data streams during page programming or high-speed read cache fetches, preventing bus stalls.
* **Bus Protocol Modes**: Communication configuration. Supports standard SPI, Multi-I/O (Dual/Quad/Octal SPI), and DDR (Double Transfer Rate) protocols, managing clock phases, dummy cycles, and command-address-data phase routing.

## Device Control Logic

This layer manages the internal control state, status monitoring, and feature configurations implemented directly within the external NOR flash silicon.

* **Write in Progress (WIP)**: A read-only status bit that tracks when the device is actively executing an internal program or erase cycle.
* **Write Enable Latch (WEL)**: A read-only status bit indicating whether the device is currently enabled to accept program, erase, or configuration commands.
* **Block Protection Bits (BP2, BP1, BP0)**: Non-volatile or volatile status bits used to implement hardware block-level write protection, shielding boot code areas from accidental overwrites.
* **Status Register Write Disable (SRWD)**: A configuration bit that works in conjunction with the hardware write protection pin to lock down status register settings.
* **Quad Enable Bit (QE)**: A configuration bit that switches quad-capable serial NOR devices into Quad I/O mode, repurposing hold and write-protect pins as bidirectional data lines.
* **Output Driver Strength**: Configuration options used to tune the output impedance and match signal integrity requirements on high-speed printed circuit boards.

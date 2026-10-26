# Overview

This section provides a comprehensive introduction to NOR flash memory, covering its historical background, core characteristics, and the foundational advantages that make it optimal for direct code execution.

## Background

NOR flash memory was developed by Intel in 1988, revolutionizing non-volatile storage by offering true random-access capabilities. Unlike NAND flash, which is structured for dense block-level data storage, NOR flash was designed to replace traditional read-only memories (ROM and EPROM) while enabling in-system reprogrammability. 

Because of its ability to allow the processor to fetch instructions and read data directly from the memory chip without copying it to RAM first, NOR flash became the cornerstone for storing system bootloaders, firmware, and executing code via Execute-In-Place (XIP).

## Characteristics

NOR flash memory is defined by several distinct architectural and operational properties:

* **True Random Access**: Provides byte-level (or word-level) addressability, allowing the host CPU to read individual memory locations with low, predictable access latency.
* **Execute-In-Place (XIP)**: Enables the central processing unit to run software applications and operating system kernels directly from the flash memory, eliminating the need for shadowing code into system RAM during boot-up.
* **Parallel and Serial Interfaces**: Historically implemented via wide parallel buses (e.g., 8-bit or 16-bit address/data lines) for maximum throughput, modern embedded designs widely adopt Serial NOR Flash through SPI, Dual-SPI, Quad-SPI, and Octal-SPI protocols to reduce pin counts and board footprints.
* **Asymmetric Block Architecture**: Typically combines uniform small sectors (such as 4KB) with larger main erase blocks (such as 64KB or 256KB) to support flexible parameter storage alongside large code images.

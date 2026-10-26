# Physical Characteristics

This section outlines the physical characteristics of NOR flash memory, covering its fundamental storage cell principles, hierarchical array organization, and internal hardware block components.

## Physical Structure

The internal storage unit of NOR flash is constructed using parallel-connected floating-gate transistors (or split-gate cells). Each cell acts as an independent MOSFET where the presence or absence of trapped electrons on the floating gate alters the transistor's threshold voltage.

Unlike NAND flash—where cells are wired in series strings—NOR flash cells are connected individually and directly in parallel to the bit line. This parallel arrangement allows current to flow freely through a selected cell when turned on, providing the low-latency random access required for direct code execution.

* **Program (Writing)**: Typically utilizes hot-electron injection or Fowler-Nordheim tunneling to trap electrons in the floating gate, raising the threshold voltage to represent a logical `0`.
* **Erase**: Uses Fowler-Nordheim tunneling to remove electrons from the floating gate, resetting the cell state to a logical `1` (all-0xFF equivalent when read as bytes).

![Physical Structure](./assets/physical_structure.png)

## Storage Organization

The hierarchical architecture of NOR Flash is organized from storage blocks down to individual addressable units: `NOR Device` → `Sector / Block` → `Page` → `Byte / Word`.

![Array Organization](./assets/array_organization.png)

* **Sector / Block**: The minimum erasable unit in NOR flash. Sectors are often symmetrically or asymmetrically divided (e.g., uniform 4KB sectors for parameter storage combined with 64KB/256KB blocks for application code).
* **Page**: The basic unit for programming data into the array (commonly 256 bytes). Unlike NAND, NOR flash supports random byte/word reads directly without requiring full-page buffer loading.
* **Byte / Word Addressing**: The fundamental access granularity. Every individual byte or 16-bit word inside the memory array possesses a unique physical address, enabling direct processor fetching.

![Address Mapping](./assets/address_mapping.png)

* **Row Address**: Selects the specific word line corresponding to the target sector and page within the memory matrix.
* **Column Address**: Selects the specific byte or word offset along the bit line, allowing precise random access.

## Block Diagram

Based on the hardware block diagram, a serial or parallel NOR flash device integrates several core functional blocks to support random access and high-speed retrieval.

![Block Diagram](./assets/block_diagram.png)

* **NOR Flash Array**: Parallel cell configuration optimized for rapid read operations and direct instruction execution without high latency.
* **Row and Column Decoders**: High-precision decoding logic that translates incoming address inputs into precise word-line and bit-line selections for random access.
* **Sense Amplifiers**: High-speed analog circuitry designed to rapidly detect minuscule current differentials through the parallel cell array, determining logical states.
* **Control Logic and Status Registers**: Manages command decoding, internal high-voltage generation (for programming/erasing), and status tracking (such as WIP and WEL flags).

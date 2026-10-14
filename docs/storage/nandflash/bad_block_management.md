# Bad Block Management

This section covers the reliability challenges, error handling mechanisms, and lifecycle block management strategies inherent to NAND flash technology, detailing how software layers handle physical degradation and data corruption.

## Degradation Nature

Inherent manufacturing and operational degradation distinguish NAND flash from NOR flash. While NOR flash arrays ship from the factory perfectly clean and rarely develop bad blocks during their lifespan, NAND flash chips have strict physical limitations.

* **Factory Defect (Initial Invalid Blocks)**: NAND flash chips ship with factory bad blocks due to cost-driven yield allowances. Initial invalid blocks contain one or more initial invalid bits whose reliability is not guaranteed, though they share the same quality level and electrical characteristics as valid blocks without affecting their performance. The 1st block (placed at 00h block address) is guaranteed to be a valid block at the time of shipment, and any intentional erasure of original bad block information is prohibited.
* **Operational Wear (Worn-Out Bad Blocks)**: Under continuous wear and the accumulation of erase and program cycles, NAND flash devices develop new bad blocks dynamically. To maintain system reliability, active Flash Translation Layer (FTL) software management and structured replacement algorithms are required.

## Bit-Flip Susceptibility

NAND flash is highly susceptible to read/write disturb noise and charge leakage, making bit-flips (where a bit changes from 1 to 0 or 0 to 1) relatively common compared to NOR flash. 

* **Drifting Effects**: Cell voltage values slowly shift and deviate over time from their original programmed levels.
* **Program-Disturb Errors (Over-Program Effect)**: Executing a program operation on a specific page unintentionally causes bit shifts in other non-related pages within the same block.
* **Read-Disturb Errors**: Reading data from a page causes permanent data value changes in associated bits.
* **Impact & Sensitivity**: While single-bit changes may seem minor, they become critical when altering important system files or configurations. Applications storing operating systems or sensitive information must incorporate robust error correction.

## Error Correction Code (ECC)

To mitigate bit-flips and maintain high data integrity, NAND Flash architectures rely heavily on hardware-based error correction codes (such as BCH or LDPC).

* **Internal ECC Logic**: The internal ECC logic can detect 2-bit errors and correct 1-bit errors in each ECC segment. An ECC segment is composed of a main area (128 bytes) and a spare area (4 bytes).
* **Operation & Verification**: During a program operation, an ECC code is calculated and stored in the additional spare area. During a read operation, after the data transfer time (`tRD_ECC`) is completed, a Get Feature command must be issued to check the ECC status bits.
* **Reclamation Efficiency**: To improve memory space efficiency, blocks with correctable bit errors reclaimed by ECC do not need to be replaced. The additional block failure rate does not include these reclaimed blocks.

## Replacement Strategy

When physical failures occur during operation, the system must execute structured block replacement and address translation strategies to isolate damaged memory cells.

| Operation | Detection and recommended procedure |
| :--- | :--- |
| Erase | Status read after erase → Block Replacement |
| Program | Status read after program → Block Replacement |
| Read | Verify ECC → ECC correction|

* **Failure Modes & Action**: In the case of status read failures after an erase or program operation, block replacement must be done. Because program status failure during a page program does not affect data in other pages of the same block, replacement can be executed with a page-sized buffer by finding an erased empty block, copying valid pages to the new block, and reprogramming the current target data.
* **Driver Space Allocation**: For a typical 128MB NAND flash chip, the driver reserves 10 blocks as a swap area for seamless data writing, and 50 blocks dedicated to bad block management.
* **Address Re-mapping Logic**: When an address is accessed, the driver first checks the bad block table. If the bad block count is 0, the original address is returned. If the current access matches the block of the last successful re-mapping, the cached re-mapped address is used directly. Otherwise, the driver performs a binary search within the sorted bad block table to map the healthy alternative block.

## Bad Block Management

Inherent manufacturing and operational degradation. NOR Flash arrays ship from the factory perfectly clean and rarely develop bad blocks during their lifespan. Conversely, NAND Flash chips ship with factory bad blocks due to cost-driven yield allowances and develop new bad blocks dynamically under continuous wear, requiring active Flash Translation Layer (FTL) software management to map logical addresses to healthy physical sectors.

* Bit-Flip Susceptibility: Noise and charge leakage leading to data corruption. NOR Flash features high reliability and low error rates, requiring minimal or no software error handling. NAND Flash is highly susceptible to read/write disturb noise and charge leakage, forcing every page access to be coupled with hardware-based ECC logic (such as BCH or LDPC) to detect and correct bit-flips in real-time.

* Wear Leveling: NAND Flash cells have a finite endurance cycle, typically ranging from 1,000 to 100,000 cycles depending on the cell type. FTL software must implement wear leveling algorithms—distributing write/erase operations evenly across all physical blocks—to prevent premature device failure caused by concentrating updates on specific logical address ranges.

* Factory Defect Mapping: During device initialization, the driver must scan the factory-defined bad block markers, typically located in the spare area of the first or last page of a block. These identified blocks are flagged in a Bad Block Table (BBT) and permanently excluded from the file system's usable memory space to prevent data loss.
* 

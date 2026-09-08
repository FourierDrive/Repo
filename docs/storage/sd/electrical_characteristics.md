# Electrical Characteristics

While SD cards and microSD cards differ in physical appearance, size, and pin definitions, their pin functions remain consistent.

| SD Card and microSD Card Pin Definitions | | | | |
| :--- | :--- | :--- | :--- | :--- |
| **Pin Number** | **SD Card (SD Mode)** | **SD Card (SPI Mode)** | **microSD Card (SD Mode)** | **microSD Card (SPI Mode)** |
| **1** | CD/DAT3 | CS | DAT2 | Reserved |
| **2** | CMD | DI | DAT3 | CS |
| **3** | VSS1 | VSS | CMD | DI |
| **4** | VDD | VDD | VDD | VDD |
| **5** | CLK | SCLK | CLK | SCLK |
| **6** | VSS2 | VSS2 | VSS | VSS |
| **7** | DAT0 | DO | DAT0 | DO |
| **8** | DAT1 | Reserved | DAT1 | Reserved |
| **9** | DAT2 | Reserved | - | - |

* Note: Card detection (CD)

SDIO supports three data transfer modes: 4-bit, 1-bit, and SPI. In 1-bit mode, the DAT1 pin functions as an interrupt line.

| SDIO Different Mode Pin Definitions | | | |
| :--- | :--- | :--- | :--- |
| **Pin Number** | **SD 4-bit Mode** | **SD 1-bit Mode** | **SPI Mode** |
| **1** | CD/DAT3 | Reserved | CS |
| **2** | CMD | CMD | DI |
| **3** | VSS1 | VSS1 | VSS1 |
| **4** | VDD | VDD | VDD |
| **5** | CLK | SCLK | SCLK |
| **6** | VSS2 | VSS2 | VSS2 |
| **7** | DAT0 | DAT | DO |
| **8** | DAT1 | IRQ | IRQ |
| **9** | DAT2 | Reserved | Reserved |

* Note: Card detection (CD)

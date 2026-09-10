# Physical Characteristics

SD memory cards continuously evolve and segment in terms of physical size, storage capacity, and speed classes to meet the demands of various devices and application scenarios.

## Classification by Physical Size

* **Full size**: The traditional SD card with dimensions of 32 mm x 24 mm. This is the original SD card size separated from MMC.
* **microSD**: Also known as T-card / TF card (originally T-Flash, later renamed TransFlash). It is the smallest SD card size, measuring 15 mm x 11 mm, and is currently the most widely used SD card size. It can be expanded to the physical size of a traditional SD card using an adapter.

| SD Card Physical Size | Full size | microSD |
| :--- | :--- | :--- |
| **Dimensions** | 32 mm x 24 mm x 2.1 mm | 15 mm x 11 mm x 1.0 mm |
| **Pin Count** | High Speed and UHS-I: 9 pins<br>UHS-II: 17 pins<br>SD Express 1-lane: 17 - 19 pins<br>SD Express 2-lane: 25 - 27 pins | High Speed and UHS-I: 8 pins<br>UHS-II: 16 pins<br>SD Express 1-lane: 16 - 17 pins |
| **Operating Voltage** | 1st row pins operating voltage: 3.3 V (2.7 V ~ 3.6 V)<br>2nd row pins operating voltage: 1.8 V (1.70 V ~ 1.95 V) | - |
| **Write Protect Switch** | Yes | No |

## Classification by Storage Capacity

* **SD standard capacity memory card (SDSC)**: Maximum capacity of 2 GB, used in some older devices.
* **SD high capacity memory card (SDHC)**: Capacity expanded up to 32 GB. Physical and electrical characteristics are consistent with SDSC. Uses the FAT32 file system, suitable for medium-capacity storage devices.
* **SD extended capacity memory card (SDXC)**: Capacity expanded up to 2 TB. Uses the exFAT file system, supporting larger single file storage and higher transmission rates.
* **SD ultra capacity memory card (SDUC)**: Capacity expanded up to 128 TB, providing high-end application solutions requiring massive storage space.

| SD Card Capacity Standard | SD (SDSC) | SDHC | SDXC | SDUC |
| :--- | :--- | :--- | :--- | :--- |
| **Lower Capacity Limit** | - | > 2 GB | > 32 GB | > 2 TB |
| **Upper Capacity Limit** | 2 GB | 32 GB | 2 TB | 128 TB |
| **File System** | FAT12 / FAT16 | FAT32 | exFAT | exFAT |

## Classification by Speed Class

Early memory card manufacturers denoted speed using multipliers (x), comparing the average data read speed to that of an original CD-ROM drive. This labeling method was later replaced by speed classes, which reflect the card's read and write performance and guarantee minimum read and write speeds. The SDA defines four speed classes: Original Speed Class, Ultra High Speed (UHS) Speed Class, Video Speed Class, and the latest SD Express Speed Class.

* **Original Speed Class**: Subdivided into Class 2, Class 4, Class 6, and Class 10, represented by the letter C enclosing a number indicating the minimum write speed (e.g., Class 10 or C10 means a minimum write speed of 10 MB/s).
* **Ultra High Speed (UHS) Speed Class**: Subdivided into U1 and U3, represented by the letter U enclosing a number indicating the minimum write speed (e.g., U3 means a minimum write speed of 30 MB/s). Used for products with UHS bus interfaces, suitable for high-definition video recording.
* **Video Speed Class**: Subdivided into V6, V10, V30, V60, and V90, represented by the letter V followed by a number indicating the minimum sequential write speed (e.g., V60 means a minimum write speed of 60 MB/s). Matches current MLC flash memory and supports high-quality 4K/8K video recording.
* **SD Express Speed Class**: Subdivided into E150, E300, E450, and E600, represented by the letter E followed by a number indicating the minimum read/write speed.

| Minimum Sequential Write Speed | Maximum Rate | Original Speed Class | Ultra High Speed Class | Video Speed Class | SD Express Speed Class | Video Format Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 2 MB/s | 15 Mbps | C2 | - | - | - | Standard |
| 4 MB/s | 30 Mbps | C4 | - | - | - | HD / Full HD |
| 6 MB/s | 45 Mbps | C6 | - | V6 | - | 4K (3840 x 2160 pix) |
| 10 MB/s | 75 Mbps | C10 | U1 | V10 | - | - |
| 30 MB/s | 220 Mbps | - | U3 | V30 | - | 8K (7680 x 4320 pix) |
| 60 MB/s | 460 Mbps | - | - | V60 | - | - |
| 90 MB/s | 700 Mbps | - | - | V90 | - | - |
| 150 MB/s | - | - | - | - | E150 | 4K/8K Multi-stream |
| 300 MB/s | - | - | - | - | E300 | - |
| 450 MB/s | - | - | - | - | E450 | - |
| 600 MB/s | - | - | - | - | E600 | - |

Traditional SD cards have only a single row of pins with a 3.3 V supply voltage, usable for Default Speed, High Speed, and UHS-I speed modes. To increase transmission speeds, UHS-II and UHS-III add a second row of pins and introduce low-voltage serial differential bus technology for data transfer. UHS-II can operate in full-duplex mode (default) or switch to half-duplex mode (doubling the speed), while UHS-III simplifies physical layer design by using full-duplex mode exclusively.

| Type | Standard | Maximum Bus Rate | Memory Card Type |
| :--- | :--- | :--- | :--- |
| **Default speed** | Ver. 1.01 | 12.5 MB/s | SDSC |
| **High speed** | Ver. 1.10 | 25 MB/s | SDHC / SDXC / SDUC |
| **UHS-I** | Ver. 3.01 | 50 MB/s (SDR50, DDR50)<br>104 MB/s (SDR104) | - |
| **UHS-II** | Ver. 4.00 | 156 MB/s Full-duplex (FD156)<br>312 MB/s Half-duplex (HD312) | - |
| **UHS-III** | Ver. 6.00 | 312 MB/s Full-duplex (FD312)<br>624 MB/s Full-duplex (FD624) | - |
| **SD Express** | Ver. 7.00 | 985 MB/s (PCIe 3.1 x 1) | - |
| | Ver. 8.00 | 1969 MB/s (PCIe 3.1 x 2)<br>1969 MB/s (PCIe 4.0 x 1)<br>3938 MB/s (PCIe 4.0 x 2) | - |

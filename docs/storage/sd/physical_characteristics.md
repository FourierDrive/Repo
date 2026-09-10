# Physical Characteristics

SD memory cards continuously evolve and segment in terms of physical size, storage capacity, and speed classes to meet the demands of various devices and application scenarios.

## Classification by Physical Size

* **Full size**: The traditional SD card with dimensions of 32 mm x 24 mm. This is the original SD card size separated from MMC.
* **microSD**: Also known as T-card / TF card (originally T-Flash, later renamed TransFlash). It is the smallest SD card size, measuring 15 mm x 11 mm, and is currently the most widely used SD card size. It can be expanded to the physical size of a traditional SD card using an adapter.

<table>
  <thead>
    <tr>
      <th>SD Card Physical Size</th>
      <th>Full size</th>
      <th>microSD</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Dimensions</strong></td>
      <td>32 mm x 24 mm x 2.1 mm</td>
      <td>15 mm x 11 mm x 1.0 mm</td>
    </tr>
    <tr>
      <td><strong>Pin Count</strong></td>
      <td>High Speed and UHS-I: 9 pins<br>UHS-II: 17 pins<br>SD Express 1-lane: 17 - 19 pins<br>SD Express 2-lane: 25 - 27 pins</td>
      <td>High Speed and UHS-I: 8 pins<br>UHS-II: 16 pins<br>SD Express 1-lane: 16 - 17 pins</td>
    </tr>
    <tr>
      <td><strong>Operating Voltage</strong></td>
      <td colspan="2">
        1st row pins operating voltage: 3.3 V (2.7 V ~ 3.6 V)<br>
        2nd row pins operating voltage: 1.8 V (1.70 V ~ 1.95 V)
      </td>
    </tr>
    <tr>
      <td><strong>Write Protect Switch</strong></td>
      <td>Yes</td>
      <td>No</td>
    </tr>
  </tbody>
</table>

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

<table>
  <thead>
    <tr>
      <th>Minimum Sequential Write Speed</th>
      <th>Maximum Rate</th>
      <th>Original Speed Class</th>
      <th>Ultra High Speed Class</th>
      <th>Video Speed Class</th>
      <th>Video Format Recommendation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2 MB/s</td>
      <td>15 Mbps</td>
      <td>C2</td>
      <td rowspan="3">-</td>
      <td rowspan="2">-</td>
      <td>Standard</td>
    </tr>
    <tr>
      <td>4 MB/s</td>
      <td>30 Mbps</td>
      <td>C4</td>
      <td>HD / Full HD</td>
    </tr>
    <tr>
      <td>6 MB/s</td>
      <td>45 Mbps</td>
      <td>C6</td>
      <td>V6</td>
      <td rowspan="2">4K (3840 x 2160 pix)</td>
    </tr>
    <tr>
      <td>10 MB/s</td>
      <td>75 Mbps</td>
      <td rowspan="4">C10</td>
      <td>U1</td>
      <td>V10</td>
    </tr>
    <tr>
      <td>30 MB/s</td>
      <td>220 Mbps</td>
      <td rowspan="3">U3</td>
      <td>V30</td>
      <td rowspan="3">8K (7680 x 4320 pix)</td>
    </tr>
    <tr>
      <td>60 MB/s</td>
      <td>460 Mbps</td>
      <td>V60</td>
    </tr>
    <tr>
      <td>90 MB/s</td>
      <td>700 Mbps</td>
      <td>V90</td>
    </tr>
    <tr>
      <td>150 MB/s</td>
      <td rowspan="4">-</td>
      <td rowspan="4">-</td>
      <td rowspan="4">-</td>
      <td>E150</td>
      <td rowspan="4">4K/8K Multi-stream</td>
    </tr>
    <tr>
      <td>300 MB/s</td>
      <td>E300</td>
    </tr>
    <tr>
      <td>450 MB/s</td>
      <td>E450</td>
    </tr>
    <tr>
      <td>600 MB/s</td>
      <td>E600</td>
    </tr>
  </tbody>
</table>

Traditional SD cards have only a single row of pins with a 3.3 V supply voltage, usable for Default Speed, High Speed, and UHS-I speed modes. To increase transmission speeds, UHS-II and UHS-III add a second row of pins and introduce low-voltage serial differential bus technology for data transfer. UHS-II can operate in full-duplex mode (default) or switch to half-duplex mode (doubling the speed), while UHS-III simplifies physical layer design by using full-duplex mode exclusively.

<table>
  <thead>
    <tr>
      <th>Type</th>
      <th>Standard</th>
      <th>Maximum Bus Rate</th>
      <th colspan="2">Memory Card Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Default speed</strong></td>
      <td>Ver. 1.01</td>
      <td>12.5 MB/s</td>
      <td rowspan="2">SDSC</td>
      <td rowspan="7">SDHC / SDXC / SDUC</td>
    </tr>
    <tr>
      <td><strong>High speed</strong></td>
      <td>Ver. 1.10</td>
      <td>25 MB/s</td>
    </tr>
    <tr>
      <td><strong>UHS-I</strong></td>
      <td>Ver. 3.01</td>
      <td>
        50 MB/s (SDR50, DDR50)<br>
        104 MB/s (SDR104)
      </td>
      <td rowspan="5">-</td>
    </tr>
    <tr>
      <td><strong>UHS-II</strong></td>
      <td>Ver. 4.00</td>
      <td>
        156 MB/s Full-duplex (FD156)<br>
        312 MB/s Half-duplex (HD312)
      </td>
    </tr>
    <tr>
      <td><strong>UHS-III</strong></td>
      <td>Ver. 6.00</td>
      <td>
        312 MB/s Full-duplex (FD312)<br>
        624 MB/s Full-duplex (FD624)
      </td>
    </tr>
    <tr>
      <td rowspan="2"><strong>SD Express</strong></td>
      <td>Ver. 7.00</td>
      <td>985 MB/s (PCIe 3.1 x 1)</td>
    </tr>
    <tr>
      <td>Ver. 8.00</td>
      <td>
        1969 MB/s (PCIe 3.1 x 2)<br>
        1969 MB/s (PCIe 4.0 x 1)<br>
        3938 MB/s (PCIe 4.0 x 2)
      </td>
    </tr>
  </tbody>
</table>

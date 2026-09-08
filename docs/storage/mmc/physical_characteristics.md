# Physical Characteristics

The eMMC chip typically adopts a Ball Grid Array (BGA) package, featuring a high pin density. For version 4.5 and later, there are generally 153 pins, while some versions also feature a 169-pin configuration. The dimensions are typically 11.5 mm x 13 mm or 14 mm x 18 mm, though the specific size depends on the storage capacity and the manufacturer's design.

The eMMC standard recommends adding pull-up resistors with a resistance value of typically 100 kOhm to lines such as the command line and data lines to prevent the bus from floating.

The eMMC data transmission width can be single-line (DAT0), four-line (DAT0 ~ DAT3), or eight-line (DAT0 ~ DAT7), with five bus speed modes:

| Speed Mode | Signal Voltage | Bus Width | Clock Frequency | Max Bus Speed |
| :--- | :--- | :--- | :--- | :--- |
| Legacy MMC | 1.2 V, 1.8 V, 3 V | 1, 4, 8 | 0 ~ 26 MHz | 26 MB/s |
| High speed SDR | 1.2 V, 1.8 V, 3 V | 1, 4, 8 | 0 ~ 52 MHz | 52 MB/s |
| High speed DDR | 1.2 V, 1.8 V, 3 V | 4, 8 | 0 ~ 52 MHz | 104 MB/s |
| HS200 | 1.2 V, 1.8 V | 4, 8 | 0 ~ 200 MHz | 200 MB/s |
| HS400 | 1.2 V, 1.8 V | 8 | 0 ~ 200 MHz | 400 MB/s |

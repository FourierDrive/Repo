# Overview

This section provides a comprehensive introduction to NAND flash memory, covering its historical background, core characteristics, and the evolution of the primary industry standards.

## Background

NAND flash memory was developed to provide high-density, cost-effective non-volatile data storage. Around 2006, with the rapid growth of mobile phones, MP3 players, USB flash drives, and the early adoption of solid-state drives (SSDs) in consumer markets, the demand for NAND flash surged. 

During this period, different flash memory manufacturers employed varying proprietary design specifications, creating significant integration challenges for flash controller vendors and downstream product designers. The industry urgently required a unified interface and operational standard.

## Standards

To resolve compatibility and integration issues, the industry established two major standard camps for NAND flash:

* **Open NAND Flash Interface (ONFI)**: Established in 2006 by a consortium including Intel, Micron, Hynix, Phison, SanDisk, Sony, and Lexar (formerly Lexar/Micron/etc.), ONFI aimed to standardize the physical interface, pinouts, package footprints, control commands, register sets, and ECC support for NAND flash devices. ONFI 1.0 was released in December 2006, boosting legacy bandwidth from 40 MB/s to 50 MB/s while establishing a unified specification to ease developer burdens.
* **Toggle Mode**: Initiated by Samsung and Toshiba, Toggle Mode represents the alternative major high-speed interface standard that utilizes a bidirectional data strobe (DQS) and double-data-rate (DDR) signaling protocol to achieve high performance without relying on traditional synchronous clock feedback architectures.

# Electrical Characteristics

This section outlines the pin definitions, interface signal allocations, and operational modes for SD memory cards and SDIO devices.

## Memory Card Interface Definitions

While SD cards and microSD cards differ in physical appearance, size, and pin definitions, their core signal functions remain consistent across formats.

| Pin Number | SD Card (SD Mode) | SD Card (SPI Mode) | microSD Card (SD Mode) | microSD Card (SPI Mode) | Type (SD / SPI) | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | CD/DAT3 | CS | DAT2 | Reserved | SD: I/O/PP<br>SPI: I | Card Detect / Data Line [Bit 3] / Chip Select |
| **2** | CMD | DI | DAT3 | CS | SD: I/O/PP<br>SPI: I | Command / Response / Data In / Chip Select |
| **3** | VSS1 | VSS | CMD | DI | SD: S<br>SPI: S | Supply voltage ground / Command / Data In |
| **4** | VDD | VDD | VDD | VDD | S | Supply voltage |
| **5** | CLK | SCLK | CLK | SCLK | I | Clock |
| **6** | VSS2 | VSS2 | VSS | VSS | S | Supply voltage ground |
| **7** | DAT0 | DO | DAT0 | DO | SD: I/O/PP<br>SPI: O/PP | Data Line [Bit 0] / Data Out |
| **8** | DAT1 | Reserved | DAT1 | Reserved | SD: I/O/PP<br>SPI: - | Data Line [Bit 1] / Reserved |
| **9** | DAT2 | Reserved | - | - | SD: I/O/PP<br>SPI: - | Data Line [Bit 2] |

*NOTE: S: Power supply; I: Input; O: Output using push-pull drivers; PP: I/O using push-pull drivers.*

## I/O Card Interface Definitions

SDIO supports multiple data transfer modes, including 4-bit mode, 1-bit mode, and SPI mode. Unlike standard memory cards, SDIO allows peripheral devices to signal asynchronous interrupts back to the host controller.

| Pin Number | SD 4-bit Mode | SD 1-bit Mode | SPI Mode | Type (SD / SPI) | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | CD/DAT3 | Reserved | CS | SD: I/O/PP<br>SPI: I | Card Detect / Data Line [Bit 3] / Chip Select |
| **2** | CMD | CMD | DI | SD: I/O/PP<br>SPI: I | Command / Response / Data In |
| **3** | VSS1 | VSS1 | VSS1 | S | Supply voltage ground |
| **4** | VDD | VDD | VDD | S | Supply voltage |
| **5** | CLK | SCLK | SCLK | I | Clock |
| **6** | VSS2 | VSS2 | VSS2 | S | Supply voltage ground |
| **7** | DAT0 | DAT | DO | SD: I/O/PP<br>SPI: O/PP | Data Line [Bit 0] / Data Out |
| **8** | DAT1 | IRQ | Reserved | SD: I/O/PP<br>SPI: - | Data Line [Bit 1] / Interrupt Output (from Card) |
| **9** | DAT2 | Read Wait | Reserved | SD: I/O/PP<br>SPI: - | Data Line [Bit 2] / Read Wait signal |

*NOTE: S: Power supply; I: Input; O: Output using push-pull drivers; PP: I/O using push-pull drivers.*

## Signal Behaviors

* **Voltage Supply (VDD)**: Traditional SD cards operate at a standard 3.3V supply level. High-speed and Ultra High Speed (UHS) cards support dual-voltage signaling, shifting down to 1.8V logic levels during high-speed operations to reduce power consumption and signal integrity degradation.
* **Signal Ground (VSS1, VSS2)**: Multiple ground pins are designated to ensure stable reference potentials and high-frequency noise suppression across the bus interface.
* **Card Detection and Special Signals**: Pin 1 incorporates an internal pull-up resistor for card detection and mode selection, which can be disconnected during regular data transfer using the `SET_CLR_CARD_DETECT` (ACMD42) command. Card detection (CD) functionality is typically handled via Pin 1 (CD/DAT3) in SD mode or through dedicated mechanical switch pins in the card socket, while Pin 9 (`DAT2`) can be utilized as a Read Wait signal in SDIO mode.
* **SPI and SD 1-bit Mode Interrupts**: Pin 8 is dedicated to the interrupt function with no timing constraints. The card can signal an interrupt at any time by driving Pin 8 low, and the host detects and clears it using a level-sensitive input.
* **SD 4-bit Mode Interrupts**: Because Pin 8 is multiplexed with `DAT1`, interrupts are restricted to a specific "Interrupt Period". The host samples the line during this designated window, treating it synchronously or asynchronously depending on the operating speed.

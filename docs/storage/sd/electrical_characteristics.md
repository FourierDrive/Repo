# Electrical Characteristics

This section outlines the pin definitions, interface signal allocations, and operational modes for SD memory cards and SDIO devices.

## Memory Card Pin Definitions

While SD cards and microSD cards differ in physical appearance, size, and pin definitions, their core signal functions remain consistent across formats.

<table>
  <thead>
    <tr>
      <th colspan="5">SD Card and microSD Card Pin Definitions</th>
    </tr>
    <tr>
      <th>Pin Number</th>
      <th>SD Card (SD Mode)</th>
      <th>SD Card (SPI Mode)</th>
      <th>microSD Card (SD Mode)</th>
      <th>microSD Card (SPI Mode)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1</strong></td>
      <td>CD/DAT3</td>
      <td>CS</td>
      <td>DAT2</td>
      <td>Reserved</td>
    </tr>
    <tr>
      <td><strong>2</strong></td>
      <td>CMD</td>
      <td>DI</td>
      <td>DAT3</td>
      <td>CS</td>
    </tr>
    <tr>
      <td><strong>3</strong></td>
      <td>VSS1</td>
      <td>VSS</td>
      <td>CMD</td>
      <td>DI</td>
    </tr>
    <tr>
      <td><strong>4</strong></td>
      <td>VDD</td>
      <td>VDD</td>
      <td>VDD</td>
      <td>VDD</td>
    </tr>
    <tr>
      <td><strong>5</strong></td>
      <td>CLK</td>
      <td>SCLK</td>
      <td>CLK</td>
      <td>SCLK</td>
    </tr>
    <tr>
      <td><strong>6</strong></td>
      <td>VSS2</td>
      <td>VSS2</td>
      <td>VSS</td>
      <td>VSS</td>
    </tr>
    <tr>
      <td><strong>7</strong></td>
      <td>DAT0</td>
      <td>DO</td>
      <td>DAT0</td>
      <td>DO</td>
    </tr>
    <tr>
      <td><strong>8</strong></td>
      <td>DAT1</td>
      <td>Reserved</td>
      <td>DAT1</td>
      <td>Reserved</td>
    </tr>
    <tr>
      <td><strong>9</strong></td>
      <td>DAT2</td>
      <td>Reserved</td>
      <td>-</td>
      <td>-</td>
    </tr>
  </tbody>
</table>

* **Note**: Card detection (CD) functionality is typically handled via Pin 1 (CD/DAT3) in SD mode or through dedicated mechanical switch pins in the card socket.

## I/O Card Pin Definitions

SDIO supports multiple data transfer modes, including 4-bit mode, 1-bit mode, and SPI mode. Unlike standard memory cards, SDIO allows peripheral devices to signal asynchronous interrupts back to the host controller.

<table>
  <thead>
    <tr>
      <th colspan="6">SDIO Pin Definitions and Signal Types</th>
    </tr>
    <tr>
      <th>Pin Number</th>
      <th>SD 4-bit Mode</th>
      <th>SD 1-bit Mode</th>
      <th>SPI Mode</th>
      <th>Type (SD / SPI)</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1</strong></td>
      <td>CD/DAT3</td>
      <td>Reserved</td>
      <td>CS</td>
      <td>SD: I/O/PP<br>SPI: I</td>
      <td>Card Detect / Data Line [Bit 3] / Chip Select</td>
    </tr>
    <tr>
      <td><strong>2</strong></td>
      <td>CMD</td>
      <td>CMD</td>
      <td>DI</td>
      <td>SD: I/O/PP<br>SPI: I</td>
      <td>Command / Response / Data In</td>
    </tr>
    <tr>
      <td><strong>3</strong></td>
      <td>VSS1</td>
      <td>VSS1</td>
      <td>VSS1</td>
      <td>S</td>
      <td>Supply voltage ground</td>
    </tr>
    <tr>
      <td><strong>4</strong></td>
      <td>VDD</td>
      <td>VDD</td>
      <td>VDD</td>
      <td>S</td>
      <td>Supply voltage</td>
    </tr>
    <tr>
      <td><strong>5</strong></td>
      <td>CLK</td>
      <td>SCLK</td>
      <td>SCLK</td>
      <td>I</td>
      <td>Clock</td>
    </tr>
    <tr>
      <td><strong>6</strong></td>
      <td>VSS2</td>
      <td>VSS2</td>
      <td>VSS2</td>
      <td>S</td>
      <td>Supply voltage ground</td>
    </tr>
    <tr>
      <td><strong>7</strong></td>
      <td>DAT0</td>
      <td>DAT</td>
      <td>DO</td>
      <td>SD: I/O/PP<br>SPI: O/PP</td>
      <td>Data Line [Bit 0] / Data Out</td>
    </tr>
    <tr>
      <td><strong>8</strong></td>
      <td>DAT1</td>
      <td>IRQ</td>
      <td>Reserved</td>
      <td>SD: I/O/PP<br>SPI: -</td>
      <td>Data Line [Bit 1] / Interrupt Output (from Card)</td>
    </tr>
    <tr>
      <td><strong>9</strong></td>
      <td>DAT2</td>
      <td>Read Wait</td>
      <td>Reserved</td>
      <td>SD: I/O/PP<br>SPI: -</td>
      <td>Data Line [Bit 2] / Read Wait signal</td>
    </tr>
  </tbody>
</table>

* **Signal Types**: 
  * **S**: Power supply
  * **I**: Input
  * **O**: Output using push-pull drivers
  * **PP**: I/O using push-pull drivers
* **Card Detection and Special Signals**: Pin 1 incorporates an internal pull-up resistor for card detection and mode selection, which can be disconnected during regular data transfer using the `SET_CLR_CARD_DETECT` (ACMD42) command. Additionally, Pin 9 (`DAT2`) can be utilized as a Read Wait signal in SDIO mode.
* **SPI and SD 1-bit Mode Interrupts**: Pin 8 is dedicated to the interrupt function with no timing constraints. The card can signal an interrupt at any time by driving Pin 8 low, and the host detects and clears it using a level-sensitive input.
* **SD 4-bit Mode Interrupts**: Because Pin 8 is multiplexed with `DAT1`, interrupts are restricted to a specific "Interrupt Period". The host samples the line during this designated window, treating it synchronously or asynchronously depending on the operating speed.

## Power and Signal Levels

* **Voltage Supply (VDD)**: Traditional SD cards operate at a standard 3.3V supply level. High-speed and UHS (Ultra High Speed) cards support dual-voltage signaling, shifting down to 1.8V logic levels during high-speed operations to reduce power consumption and signal integrity degradation.
* **Signal Ground (VSS1, VSS2)**: Multiple ground pins are designated to ensure stable reference potentials and high-frequency noise suppression across the bus interface.

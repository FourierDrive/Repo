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

SDIO supports three primary data transfer modes: 4-bit mode, 1-bit mode, and SPI mode. Unlike standard memory cards, SDIO allows peripheral devices to signal interrupts back to the host controller. In 1-bit mode, the **DAT1** pin is repurposed to function as the interrupt request (IRQ) line.

<table>
  <thead>
    <tr>
      <th colspan="4">SDIO Different Mode Pin Definitions</th>
    </tr>
    <tr>
      <th>Pin Number</th>
      <th>SD 4-bit Mode</th>
      <th>SD 1-bit Mode</th>
      <th>SPI Mode</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1</strong></td>
      <td>CD/DAT3</td>
      <td>Reserved</td>
      <td>CS</td>
    </tr>
    <tr>
      <td><strong>2</strong></td>
      <td>CMD</td>
      <td>CMD</td>
      <td>DI</td>
    </tr>
    <tr>
      <td><strong>3</strong></td>
      <td>VSS1</td>
      <td>VSS1</td>
      <td>VSS1</td>
    </tr>
    <tr>
      <td><strong>4</strong></td>
      <td>VDD</td>
      <td>VDD</td>
      <td>VDD</td>
    </tr>
    <tr>
      <td><strong>5</strong></td>
      <td>CLK</td>
      <td>SCLK</td>
      <td>SCLK</td>
    </tr>
    <tr>
      <td><strong>6</strong></td>
      <td>VSS2</td>
      <td>VSS2</td>
      <td>VSS2</td>
    </tr>
    <tr>
      <td><strong>7</strong></td>
      <td>DAT0</td>
      <td>DAT</td>
      <td>DO</td>
    </tr>
    <tr>
      <td><strong>8</strong></td>
      <td>DAT1</td>
      <td>IRQ</td>
      <td>IRQ</td>
    </tr>
    <tr>
      <td><strong>9</strong></td>
      <td>DAT2</td>
      <td>Reserved</td>
      <td>Reserved</td>
    </tr>
  </tbody>
</table>

* **Note**: Card detection (CD) is handled identically to standard SD configurations. For SDIO interrupt signaling, the host must configure the corresponding data line to monitor asynchronous interrupt events from the I/O peripheral.

## Power and Signal Levels

* **Voltage Supply (VDD)**: Traditional SD cards operate at a standard 3.3V supply level. High-speed and UHS (Ultra High Speed) cards support dual-voltage signaling, shifting down to 1.8V logic levels during high-speed operations to reduce power consumption and signal integrity degradation.
* **Signal Ground (VSS1, VSS2)**: Multiple ground pins are designated to ensure stable reference potentials and high-frequency noise suppression across the bus interface.

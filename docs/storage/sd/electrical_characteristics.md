# Electrical Characteristics

While SD cards and microSD cards differ in physical appearance, size, and pin definitions, their pin functions remain consistent.

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

* Note: Card detection (CD)

SDIO supports three data transfer modes: 4-bit, 1-bit, and SPI. In 1-bit mode, the DAT1 pin functions as an interrupt line.

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

* Note: Card detection (CD)

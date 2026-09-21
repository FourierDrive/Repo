# Electrical Characteristics

The system voltage range and the constraint relationship between the core voltage ($V_{cc}$) and the communication voltage ($V_{ccq}$) are shown below. Note that the communication voltage is generally lower than the core voltage.

| Core Voltage (V<sub>cc</sub>) \ Communication Voltage (V<sub>ccq</sub>) | 1.1 V ~ 1.3 V | 1.70 V ~ 1.95 V | 2.7 V ~ 3.6 V |
| :--- | :--- | :--- | :--- |
| **1.70 V ~ 1.95 V** | Valid | Valid | - |
| **2.7 V ~ 3.6 V** | Valid | Valid | Valid |

*Note: The 3.3 V communication voltage range is not supported under HS200 and HS400 speed modes.*

The bus includes a clock line, command line, and data lines. eMMC version 4.5 and later versions added pins such as hardware reset and data strobe.

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>CLK</td>
      <td>I</td>
      <td>Clock</td>
    </tr>
    <tr>
      <td>DS</td>
      <td>O/PP</td>
      <td>Data strobe (Used in HS400 mode for data synchronization)</td>
    </tr>
    <tr>
      <td>DAT[7:0]</td>
      <td>I/O/PP</td>
      <td>Data</td>
    </tr>
    <tr>
      <td>CMD</td>
      <td>I/O/PP/OD</td>
      <td>Command/Response</td>
    </tr>
    <tr>
      <td>RST_n</td>
      <td>I</td>
      <td>Hardware reset</td>
    </tr>
    <tr>
      <td>VCC</td>
      <td>S</td>
      <td>Supply voltage for Core</td>
    </tr>
    <tr>
      <td>VCCQ</td>
      <td>S</td>
      <td>Supply voltage for I/O</td>
    </tr>
    <tr>
      <td>VSS</td>
      <td>S</td>
      <td>Supply voltage ground for Core</td>
    </tr>
    <tr>
      <td>VSSQ</td>
      <td>S</td>
      <td>Supply voltage ground for I/O</td>
    </tr>
    <tr>
      <td colspan="3"><strong>NOTE</strong> I: input; O: output; PP: push-pull; OD: open-drain; NC: Not connected (or logical high); S: power supply.</td>
    </tr>
  </tbody>
</table>

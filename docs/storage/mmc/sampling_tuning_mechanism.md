# Sampling Tuning Mechanism

When the eMMC device enters the **HS200 mode**, the host executes a tuning process to find the optimal data sampling point. This compensates for timing variations caused by silicon process differences, PCB loads, voltage fluctuations, and temperature changes.

* **Purpose**: Scan the entire Unit Interval (UI) using a specific tuning scheme to identify the valid sampling window and set the sampling control block to its center.
* **Prerequisites**: The tuning procedure can only begin after the device has entered HS200 mode.
* **Design Flexibility**: The tuning frequency and specific implementation depend on the host and system design considerations.

## Sampling Point Tuning Scheme

* **Reset**: The Sampling Control Block of the host is reset.
* **Issue Command**: The host issues the **'Send Tuning Block'** command (`CMD21`) to read the tuning block.
* **Data Comparison**: The device sends the tuning block as read data. The host receives it and compares it with a known tuning block pattern.
* **Increment**: The Sampling Control Block of the host is incremented by one step.
* **Iterate**: A read command for the next tuning block is issued by the host. Steps 3rd through 5th are repeated to cover the full UI.

Once the entire UI is covered, the host identifies the valid window and sets the sampling point (typically to the center of the window). Read and write operations can then commence.

## Sampling Tuning Sequence

Upon a host request, the device transmits a data block containing a known tuning pattern to help the host optimize its data line sampling.

* **Data Block Size**: 
  * **4-bit mode**: 64-byte block (transmitted over 128 clocks of data bits).
  * **8-bit mode**: 128-byte block.
* **Command Details**: 
  * **`CMD21` ("Send Tuning Block")**: Valid only in HS200 mode and only when the device is unlocked (Password Lock). In any other state, it is treated as an illegal command.
  * **Response Type**: `R1`.
  * **Preceding Command**: Since the data block following `CMD21` is fixed, `CMD16` is not required to precede `CMD21`.
* **Timing & Execution Limits**: 
  * `CMD21` follows the timing of a single block read command.
  * The host may send a sequence of `CMD21` commands until tuning is complete.
  * The device is guaranteed to complete a sequence of 40 `CMD21` executions within **150 ms** (exclusive of host overhead).

## Command & Response Structure

* **CMD21 Packet Format**:
  | Field | Start bit | Index | Reserved | CRC7 | End bit |
  | :--- | :--- | :--- | :--- | :--- | :--- |
  | **Value** | `0` | `010101` (`CMD21`) | `All 0` | `1111011` | `1` |

* **Data Response Format**:
  * Transmitted over 146 clock cycles.
  * DAT[0-7] in 8-bit mode, or DAT[0-3] in 4-bit mode.
  * Begins with a Start bit (`0`), followed by a 128-bit tuning block pattern per data line, CRC16, and an End bit (`1`).

# Sampling Tuning Mechanism

When the eMMC device enters the **HS200 mode** or **HS400 mode**, the host executes a tuning process to find the optimal data sampling point. This compensates for timing variations caused by silicon process differences, PCB loads, voltage fluctuations, and temperature changes.

* The host scans the entire unit interval (UI) (e.g., UI = 5 ns at 200 MHz) using a specific tuning scheme to identify the valid sampling window and set the sampling control block to its center.
* The tuning procedure can only begin after the device has entered HS200 mode.
* The tuning frequency and specific implementation depend on the host and system design considerations.
* It is recommended to perform the tuning procedure whenever the device wakes up from sleep state to avoid temperature change caused phase variation drift

## Sampling Point Tuning Scheme

Upon a host request, the device transmits a data block containing a known tuning pattern to help the host optimize its data line sampling. 

* For 4-bit mode, a 64-byte block is transmitted over 128 clocks of data bits, whereas 8-bit mode utilizes a 128-byte block.
* The **Send Tuning Block** command (`CMD21`) is valid only in HS200 mode and only when the device is unlocked (Password Lock), being treated as an illegal command in any other state. It returns an `R1` response, and since the data block following `CMD21` is fixed, `CMD16` is not required to precede it.
* The execution follows the timing of a single block read command, during which the host may send a sequence of `CMD21` commands until tuning is complete. The device is guaranteed to complete a sequence of 40 `CMD21` executions within 150 ms, exclusive of any host overhead.

## Sampling Tuning Sequence

* The Sampling Control Block of the host is reset.
* The host issues the command `CMD21` to read the tuning block.
* The device sends the tuning block as read data. The host receives it and compares it with a known tuning block pattern.
* The Sampling Control Block of the host is incremented by one step.
* A read command for the next tuning block is issued by the host. Steps 3rd through 5th are repeated to cover the full UI.

Once the entire UI is covered, the host identifies the valid window and sets the sampling point (typically to the center of the window). Read and write operations can then commence.

## Tuning Block

The tuning block structure and its bus behavior play a critical role in evaluating signal integrity and optimizing data sampling during the calibration process.

* **Data Response Format**:
  * Transmitted over 146 clock cycles.
  * DAT[0-7] in 8-bit mode, or DAT[0-3] in 4-bit mode.
  * Begins with a Start bit (`0`), followed by a 128-bit tuning block pattern per data line, CRC16, and an End bit (`1`).

* **Signal Integrity & Bus Width**: The tuning block purpose is to create "special" signal integrity cases on the bus. This causes high SSO noise, deterministic jitter, ISI, and timing errors. Therefore, the host should switch to the desirable operational bus width before it performs the tuning process.

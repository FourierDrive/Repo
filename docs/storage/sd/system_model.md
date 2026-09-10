# System Model

The SD network consists of a host and a device, typically involving a single host communicating with one or more devices.

## Host

The host refers to the active communication party responsible for controlling and managing all interactions with external devices. The SD controller module is the hardware component on the host side used to communicate with the device. Typically integrated on-chip, it is responsible for implementing the protocol stack with the device, data transmission, and command-response processing. Host functions include:

* **Initializing and Configuring Devices**: The host initializes the device at the start of communication, including voltage matching, setting the clock frequency, transmission mode, data width, and other parameters.
* **Initiating Commands**: The host is responsible for sending commands such as read, write, erase, and query to the device and waiting for responses.
* **Controlling Data Transmission**: The host performs data read and write operations with the device via the SD interface, controlling data transfer from the host to the device and from the device to the host.
* **Managing File Systems**: In many applications, the host is also responsible for managing the file system of the storage device (such as FAT32, exFAT, etc.) to facilitate file reading/writing and directory management operations.

## Device

The device refers to the passive communication party—a hardware module that executes operations according to the host's commands. Typically located off-chip, these devices can be storage devices or peripherals implementing various I/O functions. The main functions of a device include:

* **Data Exchange**: The device is responsible for storing data or providing input/output functions, performing data exchange with the host according to its commands.
* **Identification and Matching**: The device and host match through relevant electrical characteristics and parameters like card categories to ensure normal communication and information transmission.
* **Compatibility**: Whether it is a memory card or an SDIO device, both connect via the same physical interface and follow standard protocols. This compatibility reduces development complexity and facilitates the integration of existing hardware and drivers.
* **Portability**: Memory cards or SDIO device modules typically feature a plug-and-play design, facilitating easy swapping. This makes them particularly advantageous in application scenarios that require frequent peripheral replacement or upgrades.

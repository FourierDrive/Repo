export default {
  title: 'Repo',
  description: 'Embedded development guide',
  base: '/Repo/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
    ],
    sidebar: {
      '/': [
        {
          text: 'Architecture',
          collapsed: true,
          items: [
            {
              text: 'ARM',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/architecture/arm/overview' },
              ]
            },
            {
              text: 'RISC-V',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/architecture/riscv/overview' },
              ]
            },
            {
              text: 'XTENSA',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/architecture/xtensa/overview' },
              ]
            },
            {
              text: 'AVR',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/architecture/avr/overview' },
              ]
            },
            {
              text: 'MCS-51',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/architecture/mcs51/overview' },
              ]
            }
          ]
        },
        {
          text: 'Kernel',
          collapsed: true,
          items: [
            {
              text: 'Boot',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/kernel/boot/overview' },
              ]
            },
            {
              text: 'Scheduling',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/kernel/sched/overview' },
              ]
            },
            {
              text: 'Synchronization',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/kernel/sync/overview' },
              ]
            },
            {
              text: 'Interrupt Handling',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/kernel/ih/overview' },
              ]
            },
            {
              text: 'Power Management',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/kernel/pm/overview' },
              ]
            },
            {
              text: 'Memory Management',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/kernel/mm/overview' },
              ]
            },
            {
              text: 'System Call',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/kernel/syscall/overview' },
              ]
            },
            {
              text: 'Multi-Processing',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/kernel/mp/overview' },
              ]
            },
            {
              text: 'File System',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/kernel/fs/overview' },
              ]
            }
          ]
        },
        {
          text: 'Chip',
          collapsed: true,
          items: [
            {
              text: 'Clock Tree',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/chip/ct/overview' },
              ]
            },
            {
              text: 'Power System',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/chip/ps/overview' },
              ]
            },
            {
              text: 'Memory System',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/chip/ms/overview' },
              ]
            }
          ]
        },
        {
          text: 'Processor',
          collapsed: true,
          items: [
            {
              text: 'Core',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/processor/core/overview' },
              ]
            },
            {
              text: 'Matrix',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/processor/matrix/overview' },
              ]
            },
            {
              text: 'Interrupt',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/processor/interrupt/overview' },
              ]
            },
            {
              text: 'Direct Memory Access',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/processor/dma/overview' },
              ]
            }
          ]
        },
        {
          text: 'Analog',
          collapsed: true,
          items: [
            {
              text: 'Analog-to-Digital Converter',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/analog/adc/overview' },
              ]
            },
            {
              text: 'Digital-to-Analog Converter',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/analog/dac/overview' },
              ]
            },
            {
              text: 'Physical Layers',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/analog/phy/overview' },
              ]
            }
          ]
        },
        {
          text: 'Connectivity',
          collapsed: true,
          items: [
            {
              text: 'Universal Asynchronous Receiver-Transmitter',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/connectivity/uart/overview' },
              ]
            },
            {
              text: 'Inter-Integrated Circuit',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/connectivity/i2c/overview' },
              ]
            },
            {
              text: 'Serial Peripheral Interface',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/connectivity/spi/overview' },
              ]
            },
            {
              text: 'Improved Inter-Integrated Circuit',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/connectivity/i3c/overview' },
              ]
            },
            {
              text: 'Universal Serial Bus',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/connectivity/usb/overview' },
              ]
            },
            {
              text: 'Controller Area Network',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/connectivity/can/overview' },
              ]
            }
          ]
        },
        {
          text: 'Imaging',
          collapsed: true,
          items: [
            {
              text: 'Camera Serial Interface',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/imaging/csi/overview' },
              ]
            },
            {
              text: 'Display Serial Interface',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/imaging/dsi/overview' },
              ]
            },
            {
              text: 'Quad Serial Peripheral Interface',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/imaging/qspi/overview' },
              ]
            },
            {
              text: 'Graphics Processing Unit',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/imaging/gpu/overview' },
              ]
            }
          ]
        },
        {
          text: 'Storage',
          collapsed: true,
          items: [
            {
              text: 'NAND Flash',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/storage/nandflash/overview' },
                { text: 'System Model', link: '/storage/nandflash/system_model' },
                { text: 'Physical Characteristics', link: '/storage/nandflash/physical_characteristics' },
                { text: 'Electrical Characteristics', link: '/storage/nandflash/electrical_characteristics' },
                { text: 'Read Operations', link: '/storage/nandflash/read_operations' },
                { text: 'Program Operations', link: '/storage/nandflash/program_operations' },
                { text: 'Erase Operations', link: '/storage/nandflash/erase_operations' },
                { text: 'Suspend and Resume', link: '/storage/nandflash/suspend_and_resume' },
                { text: 'Bad Block Management', link: '/storage/nandflash/bad_block_management' }
              ]
            },
            {
              text: 'NOR Flash',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/storage/norflash/overview' },
                { text: 'System Model', link: '/storage/norflash/system_model' },
                { text: 'Physical Characteristics', link: '/storage/norflash/physical_characteristics' },
                { text: 'Electrical Characteristics', link: '/storage/norflash/electrical_characteristics' }
              ]
            },
            {
              text: 'Multi-Media Card',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/storage/mmc/overview' },
                { text: 'System Model', link: '/storage/mmc/system_model' },
                { text: 'Physical Characteristics', link: '/storage/mmc/physical_characteristics' },
                { text: 'Electrical Characteristics', link: '/storage/mmc/electrical_characteristics' },
                { text: 'Bus Protocol', link: '/storage/mmc/bus_protocol' },
                { text: 'Common Commands', link: '/storage/mmc/common_commands' },
                { text: 'Common Responses', link: '/storage/mmc/common_responses' },              
                { text: 'Operation Workflow', link: '/storage/mmc/operation_workflow' },
                { text: 'Sampling Tuning Mechanism', link: '/storage/mmc/sampling_tuning_mechanism' }
              ]
            },
            {
              text: 'Secure Digital Card',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/storage/sd/overview' },
                { text: 'System Model', link: '/storage/sd/system_model' },
                { text: 'Physical Characteristics', link: '/storage/sd/physical_characteristics' },
                { text: 'Electrical Characteristics', link: '/storage/sd/electrical_characteristics' },
                { text: 'Bus Protocol', link: '/storage/sd/bus_protocol' },
                { text: 'Common Commands', link: '/storage/sd/common_commands' },
                { text: 'Common Responses', link: '/storage/sd/common_responses' },              
                { text: 'Memory Card Operation Workflow', link: '/storage/sd/memory_card_operation_workflow' },
                { text: 'I/O Card Operation Workflow', link: '/storage/sd/io_card_operation_workflow' }
              ]
            }
          ]
        },
        {
          text: 'Timing',
          collapsed: true,
          items: [
            {
              text: 'Pulse Width Modulation',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/timing/pwm/overview' },
              ]
            },
            {
              text: 'Real-Time Clock',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/timing/rtc/overview' },
              ]
            },
            {
              text: 'Watchdog Timer',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/timing/wdt/overview' },
              ]
            }
          ]
        }
      ]
    }
  }
}

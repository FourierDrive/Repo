export default {
  title: 'Repo',
  description: 'Embedded development guide',
  base: '/Repo/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
    ],
    sidebar: {
      '/storage/': [
        {
          text: 'Storage',
          items: [
            {
              text: 'NAND Flash',
              collapsed: false,
              items: [
                { text: 'Terminology', link: '/storage/nandflash/terminology' },
                { text: 'Controller Interface', link: '/storage/nandflash/controller_interface' },
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
                { text: 'Terminology', link: '/storage/norflash/terminology' }
              ]
            },
            {
              text: 'Multi-Media Card',
              collapsed: true,
              items: [
                { text: 'Background', link: '/storage/mmc/background' },
                { text: 'Features', link: '/storage/mmc/features' },
                { text: 'Standard', link: '/storage/mmc/standard' },
                { text: 'Model', link: '/storage/mmc/model' },
                { text: 'Physical Characteristics', link: '/storage/mmc/physical_characteristics' },
                { text: 'Electrical Characteristics', link: '/storage/mmc/electrical_characteristics' },
                { text: 'Bus Protocol', link: '/storage/mmc/bus_protocol' },
                { text: 'Common Commands', link: '/storage/mmc/common_commands' },
                { text: 'Common Responses', link: '/storage/mmc/common_responses' },                
                { text: 'Operation Workflow', link: '/storage/mmc/operation_workflow' }
              ]
            },
            {
              text: 'Secure Digital Card',
              collapsed: true,
              items: [
                { text: 'Background', link: '/storage/sd/background' },
                { text: 'Features', link: '/storage/sd/features' },
                { text: 'Standard', link: '/storage/sd/standard' },
                { text: 'Model', link: '/storage/sd/model' },
                { text: 'Physical Characteristics', link: '/storage/sd/physical_characteristics' },
                { text: 'Electrical Characteristics', link: '/storage/sd/electrical_characteristics' },
                { text: 'Bus Protocol', link: '/storage/sd/bus_protocol' },
                { text: 'Common Commands', link: '/storage/sd/common_commands' },
                { text: 'Common Responses', link: '/storage/sd/common_responses' },                
                { text: 'SDMEM Operation Workflow', link: '/storage/sd/sdmem_operation_workflow' },
                { text: 'I/O Card Operation Flow', link: '/storage/sd/io_card_operation_flow' }
              ]
            }
          ]
        }
      ]
    }
  }
}

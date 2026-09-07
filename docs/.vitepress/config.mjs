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
            }
          ]
        }
      ]
    }
  }
}

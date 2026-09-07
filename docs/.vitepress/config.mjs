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
                { text: 'Operations', link: '/storage/nandflash/operations' },
                { text: 'Management', link: '/storage/nandflash/management' }
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

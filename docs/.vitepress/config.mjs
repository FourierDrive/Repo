export default {
  title: 'Flash Technical Knowledge Base',
  description: 'Embedded storage and low-level Flash development guide',
  base: '/Repo/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Storage Guide', link: '/storage/nandflash/terminology' }
    ],
    sidebar: {
      '/storage/': [
        {
          text: 'Storage Architecture',
          items: [
            {
              text: 'NAND Flash',
              collapsed: false,
              items: [
                { text: 'Terminology', link: '/storage/nandflash/terminology' },
                { text: 'Controller Interface', link: '/storage/nandflash/controller' },
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

import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '博客', link: '/blog/' },
  { text: '标签', link: '/blog/tags/' },
  { text: '归档', link: '/blog/archives/' },
  {
    text: '实用网站',
    link:'/webSite/README.md'
  },
  {
    text: '前端实用教程',
    items:[
      {text:'zpf-elementui-plugin',link:'/notes/practicalTutorialsOnTheFrontEnd/zpf-elementui-plugin/README.md'},
    ]
  }
  // {
  //   text: '笔记',
  //   items: [{ text: '示例', link: '/notes/demo/README.md' }]
  // },
])

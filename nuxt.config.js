const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: "Интернет магазин кабельной арматуры zkabel.ru",
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: pkg.description}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'}
    ]
  },
  manifest: {
    name: 'zkabel',
    short_name: 'zkabel',
    lang: 'ru',
    description: 'Интернет магазин кабельной арматуры',
    theme_color: '#ff5722',
  },
  /*
  ** Customize the progress-bar color
  */
  loading: './components/loading.vue',

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    '@/plugins/ymaps',
    // {src: '@/plugins/localStorage.js', ssr: false}

  ],

  /*
  ** Nuxt.js modules
  */
    modules: [/*"@nuxtjs/pwa", "@nuxtjs/component-cache"*/
        [
            '@nuxtjs/yandex-metrika',
            {
                id: '23160964',
                webvisor: true,
                clickmap: true,
                useCDN: true,
                trackLinks: true,
                // accurateTrackBounce:true,
            }
        ],
    ],
  /*
  ** Axios module configuration
  */


  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },

  },
  /* render:
     {
       http2: {
         push: true
       }
       ,
       static: {
         maxAge: "1y",
         setHeaders(res, path) {
           if (path.includes("sw.js")) {
             res.setHeader("Cache-Control", `public, max-age=${15 * 60}`)
           }
         }
       }
     }*/
}

import Vue from 'vue'
import Vuetify from 'vuetify'
import lodash from 'lodash'
import colors from 'vuetify/es5/util/colors'
import ru from 'vuetify/es5/locale/ru'


Vue.use(lodash);
Vue.use(Vuetify, {
  lang: {
    locales: {ru},
    current: 'ru',
  },
  theme: {
    primary: '#121212', // a color that is not in the material colors palette
    accent: colors.lightGreen,
    secondary: colors.amber.darken3,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3
  }
});

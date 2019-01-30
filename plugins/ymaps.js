import Vue from 'vue';
import YmapPlugin from 'vue-yandex-maps';
let options = {
  apiKey: 'f47d8420-fdd4-463c-81af-b1d001a23e45', // '' by default
  lang: 'ru_RU', // 'ru_RU' by default
  version: '2.1', // '2.1' by default
  mode:  'debug'
};
Vue.use(YmapPlugin, options);

<template>

  <v-layout class="katalog"
            row
            v-touch="{right: () => goUp()}">
    <v-flex xs12>
      <v-list subheader>
        <v-subheader v-if="currentSection.NAME">{{currentSection.NAME}}</v-subheader>
{{currentPageType}},{{currentSectionId}}
        <nuxt-link :to="item.URL"
                   v-for="item in currentSection.SECTIONS"
                   :key="item.ID"
        >
          <v-list-tile>

            <v-list-tile-avatar>
              <!--<img :src="item.IMAGE">-->
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.NAME }}</v-list-tile-title>
            </v-list-tile-content>

          </v-list-tile>
        </nuxt-link>

      </v-list>
    </v-flex>
  </v-layout>


</template>

<script>

  export default {
    name: "Catalog",
    props: ['slug'],
    data: function () {
      return {
        items: {},
      }
    },
    computed: {
      currentPageType() {
        if (this.$store.state.slugMap['/catalog/' + this.slug] !== undefined) {
          return this.$store.state.slugMap['/catalog/' + this.slug].type
        }else{
          return 'productDetail';
        }
      },
      currentSectionId() {
        if (this.$store.state.slugMap['/catalog/' + this.slug] !== undefined) {
          return this.$store.state.slugMap['/catalog/' + this.slug].id
        }
        //return 0;
      },
      currentSection() {
        if (this.$store.state.catalogTree[this.currentSectionId] !== undefined) {
          return this.$store.state.catalogTree[this.currentSectionId];
        } else {
          return {};
        }
      },
      countSections() {
        if (this.currentSection.SECTIONS === undefined) {
          return 0;
        }
        let i = 0;
        for (let section in this.currentSection.SECTIONS) {
          i++;
        }
        return i;
      }

    },
    watch: {
      currentSectionId(id) {
        if (this.countSections == 0) {
          this.$store.dispatch('loadProducts', id);
        }
      }
    },

    methods: {
      goUp() {
        this.$router.back();
      }
    },
    created() {

    }
  }
</script>

<style scoped>


  .sub_cat {
    min-height: 100vh;
    display: none;
    position: fixed;
    top: 0;
    background: white;
    width: 100%;
  }

  .list-item {
    display: inline-block;
    margin-right: 10px;
  }

  .list-enter-active, .list-leave-active {
    transition: all .1s;
  }

  .list-enter-active {
    transition-delay: .1s;
  }

  .list-enter /* .list-leave-active до версии 2.1.8 */
  {
    opacity: 0;
    transform: scaleY(0);
  }

  .list-leave-to /* .list-leave-active до версии 2.1.8 */
  {
    opacity: 0;
    transform: scaleY(0);
  }
</style>

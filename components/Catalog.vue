<template>

    <v-layout class="katalog"
              row
              v-touch="{right: () => goUp()}">
        <v-flex xs12>

            <v-list subheader>
                <v-subheader v-if="currentSection.NAME">{{currentSection.NAME}}</v-subheader>
                <transition-group name="list">
                    <v-list-tile v-for="item in currentSection.SECTIONS"
                                 :key="item.ID"
                                 @click="clickToitem(item.ID)">
                        <v-list-tile-avatar>
                            <img :src="item.IMAGE">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.NAME }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </transition-group>
            </v-list>
        </v-flex>
    </v-layout>


</template>

<script>
    export default {
        name: "Catalog",
        data: function () {
            return {
                items: {},
                currentSectionId: null,
                currentSection: {},
            }
        },
        watch: {
            currentSectionId(n, o) {
                if (n !== undefined) { //выход из меню
                    this.currentSection = this.getSubSections(n);
                } else {
                    this.$emit('close')
                }
            }
        },
        methods: {
            clickToitem(id) {
                if (this.items[id].SECTIONS.length !== 0) {
                    this.currentSectionId = id;
                } else {
                    window.location = this.items[id].URL;
                }
            },
            goUp() {
                if (this.items[this.currentSectionId].PARENT === undefined) {
                    this.$emit('close')
                } else {
                    this.currentSectionId = this.items[this.currentSectionId].PARENT;
                }
            },
            getSubSections(id) {

                if (!id) {
                    id = 0;
                }
                if (this.items[id] !== undefined && this.items[id].SECTIONS !== undefined) {

                    return this.items[id];
                }

            }

        },
        activated() {
            console.log(123);
        },
        created() {
            this.bus.$on('catalogBackClick', () => {
                //this.goUp();
                this.currentSectionId = 0;
            });

            this.$axios.get('/local/templates/zkabel_mobile/catalog.php').then(response => {
                    if (response.data !== undefined) {
                        //  console.log(response.data);
                        this.items = response.data;
                        this.currentSectionId = 0;
                    }
                }
            )
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

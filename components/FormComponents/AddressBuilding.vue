<template>
    <v-autocomplete
            v-if="street"
            :loading="loading"
            :items="items"
            :search-input.sync="search"
            v-model="select"
            item-text="name"
            item-value="id"
            cache-items
            hide-no-data
            require
            hide-details
            :label="property.NAME"
    ></v-autocomplete>


</template>

<script>
    export default {
        name: "AddressBuilding",
        props: ['property'],
        computed: {

        },
        data: function () {
            return {
                loading: false,
                items: [],
                search: null,
                select: null,
                street:null
            }
        },
        watch: {
            search(val) {
                val && val !== this.select && this.querySelections(val)
            },
            select: function (val, old) {
                if (old==undefined){
                    old = ''
                }
                if (val != null &&  val.trim() !== old.trim()) {
                    this.$emit('change', val.trim());
                }
            }
        },
        methods: {
            querySelections(v) {
                const formData = new FormData();
                formData.append('STREET_ID', this.street);
                formData.append('BUILDING', v);
                formData.append('ACTION', 'searchBuilding');
                this.loading = true;

             /**   this.$axios.post('/ajax/global_listener.php', formData, {
                    headers: {
                        'x-requested-with': 'XMLHttpRequest'
                    },
                }).then(response => {
                    if (response.status == '200' && response.data != "") {
                        this.items = response.data.ITEMS;
                        console.log(this.items);
                        this.loading = false;
                    }
                });*/

            }
        },
        mounted: function () {
            //   this.value = this.property.VALUE;
        },
        created(){
            this.bus.$on('changeStreet', data => {
                this.street = data
            })
        }
    }
</script>

<style scoped>

</style>

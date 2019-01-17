<template>
    <v-autocomplete
            v-if="location"
            :loading="loading"
            :items="items"
            :search-input.sync="search"
            v-model="select"
            item-text="name"
            item-value="id"
            cache-items
            hide-no-data
            hide-details
            :label="property.NAME"
    ></v-autocomplete>


</template>

<script>

    export default {
        name: "AddressStreet",
        props: ['property'],
        computed: {},
        data: function () {
            return {
                loading: false,
                items: [],
                search: null,
                select: null,
                location: null
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
                    this.bus.$emit('changeStreet', val.trim());
                }
            }
        },
        methods: {
            querySelections(v) {

                const formData = new FormData();
                formData.append('LOCATION', this.location);
                formData.append('ACTION', 'searchStreet');
                formData.append('STREET', v);
                this.loading = true;
                this.$axios.post('/ajax/global_listener.php', formData, {
                    headers: {
                        'x-requested-with': 'XMLHttpRequest'
                    },
                }).then(response => {
                    if (response.status == '200' && response.data != "") {
                        this.items = response.data.ITEMS;
                        this.loading = false;
                    }
                });
            }


        },
        mounted: function () {
            //   this.value = this.property.VALUE;
        },
        created() {
            this.bus.$on('changeLocation', data => {
                this.location = data
            })
        }
    }
</script>

<style scoped>

</style>
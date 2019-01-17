<template>
    <v-autocomplete
            :loading="loading"
            :items="items"
            :search-input.sync="search"
            v-model="select"
            item-text="DISPLAY"
            item-value="VALUE"
            cache-items
            hide-no-data
            hide-details
            :label="property.NAME"
    ></v-autocomplete>


</template>

<script>
    export default {
        name: "InputLocation",
        props: ['property'],
        computed: {
        },
        data: function () {
            return {
                loading: false,
                items: [],
                search: null,
                select: null,
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
                    this.bus.$emit('changeLocation', val.trim());
                }

            }
        },
        methods: {
            querySelections(v) {
                const formData = new FormData();
                formData.append('select[1]', 'CODE');
                formData.append('select[2]', 'TYPE_ID');
                formData.append('select[VALUE]', 'ID');
                formData.append('select[DISPLAY]', 'NAME.NAME');
                formData.append('additionals[1]', 'PATH');
                formData.append('filter[=PHRASE]]', v);
                formData.append('filter[=NAME.LANGUAGE_ID]]', 'ru');
                formData.append('filter[=SITE_ID]]', 's1');
                formData.append('version', '2');
                formData.append('PAGE_SIZE', '10');
                formData.append('PAGE', '0');
                this.loading = true;
                this.$axios.post('/bitrix/components/bitrix/sale.location.selector.search/get.php', formData, {
                    headers: {
                        'x-requested-with': 'XMLHttpRequest'
                    },
                }).then(response => {
                    if (response.status == '200' && response.data != "") {
                        let data = JSON.parse(response.data.replace(/\'/g, '\"'));
                        if (data.data && data.data.ETC) {
                            let pathItems = data.data.ETC.PATH_ITEMS;
                            for (let key in data.data.ITEMS) {
                                let item = data.data.ITEMS[key];
                                for (let pathKey in item.PATH) {
                                    let id = item.PATH[pathKey];
                                    item.DISPLAY += ', ' + pathItems[id].DISPLAY;
                                }
                                data.data.ITEMS[key] = item;
                            }
                        }
                        this.items = data.data.ITEMS;
                        this.loading = false;
                    }
                });

            }
        },
        mounted: function () {
            const formData = new FormData();
            formData.append('select[1]', 'CODE');
            formData.append('select[2]', 'TYPE_ID');
            formData.append('select[VALUE]', 'ID');
            formData.append('select[DISPLAY]', 'NAME.NAME');
            formData.append('additionals[1]', 'PATH');
            formData.append('filter[=ID]]', this.property.VALUE);
            formData.append('filter[=NAME.LANGUAGE_ID]]', 'ru');
            formData.append('filter[=SITE_ID]]', 's1');
            formData.append('version', '2');
            formData.append('PAGE_SIZE', '1');
            formData.append('PAGE', '0');
            this.loading = true;
            this.$axios.post('/bitrix/components/bitrix/sale.location.selector.search/get.php', formData, {
                headers: {
                    'x-requested-with': 'XMLHttpRequest'
                },
            }).then(response => {
                if (response.status == '200' && response.data != "") {
                    let data = JSON.parse(response.data.replace(/\'/g, '\"'));
                    if (data.data && data.data.ETC) {
                        let pathItems = data.data.ETC.PATH_ITEMS;
                        for (let key in data.data.ITEMS) {
                            let item = data.data.ITEMS[key];
                            for (let pathKey in item.PATH) {
                                let id = item.PATH[pathKey];
                                item.DISPLAY += ', ' + pathItems[id].DISPLAY;
                            }
                            data.data.ITEMS[key] = item;
                        }
                    }
                    this.items = data.data.ITEMS;
                    this.loading = false;
                }
            });

              this.select = this.property.VALUE;
        }
    }
</script>

<style scoped>

</style>
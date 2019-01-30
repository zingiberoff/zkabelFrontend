<template>

    <!--<label :for="'prop_'+property.ID" class="col-sm-2 col-form-label"> {{name}}</label>-->
    <v-flex xs12>

        <component v-if="kladrComponent"
                   :is="kladrComponent"
                   :property="property"
                   :key="property.ID"
                   v-on="$listeners"
                   @change="$emit('change')"
        ></component>

        <component v-else :is="'input-'+type"
                   :property="property"
                   :key="property.ID"
                   v-on="$listeners"
                   @change="$emit('change')"
        ></component>

        <small v-if="description"
               id="'prop_'+property.ID+'_help'"
               class="form-text text-muted"></small>

    </v-flex>
</template>

<script>
    import InputText from '../FormComponents/InputText.vue'
    import InputTextarea from '../FormComponents/InputTextarea.vue'
    import InputSelect from '../FormComponents/InputSelect.vue'
    import InputLocation from '../FormComponents/InputLocation.vue'
    import AddressBuilding from '../FormComponents/AddressBuilding.vue'
    import AddressStreet from '../FormComponents/AddressStreet.vue'

    export default {
        name: "Props",
        props: ['property','location'],
        components: {
            InputText,
            InputTextarea,
            InputSelect,
            InputLocation,
            AddressBuilding,
            AddressStreet
        },
        data: function () {
            return {
                type: '',
                required: '',
                name: '',
                description: '',
                kladrComponents: ['ADDRESS_STREET', 'ADDRESS_BUILDING']
            };
        },
        computed: {
            kladrComponent: function () {
                if (~this.kladrComponents.indexOf(this.property.CODE)) {
                    let arr = this.property.CODE.toLowerCase().split('_');
                    arr = arr.map(function (str) {
                        return str[0].toUpperCase() + str.slice(1);
                    });
                    return arr.join('');
                }
                return false
            }
        },
        methods: {},
        created: function () {
            this.type = this.property.TYPE.toLowerCase();
            this.required = this.property.REQUIED;
            this.name = this.property.NAME;
            this.description = this.property.DESCRIPTION;
        }
    }
</script>

<style scoped>

</style>

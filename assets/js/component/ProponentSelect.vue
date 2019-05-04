<template>
    <div>
        <input type="hidden" :id="id" :name="name" :value="selected ? selected.id : ''" />
        <v-select v-model="selected" :options="items"></v-select>
    </div>
</template>

<script>
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    import axios from 'axios';

    export default {
        components: { vSelect },
        props: {
            name: { type: String, required: true },
            id: { type: String },
            required: { type: Boolean, default: false },
            value: { type: String, default: '' }
        },
        data() {
            return {
                selected: null,
                items: [],
                callUpdateItems: null
            };
        },
        mounted() {
            setTimeout(() => this.getUsers(), 300);
        },
        methods: {
            getUsers() {
                return axios.post('/users')
                    .then((response) => this.displayItems(response.data));
            },

            displayItems(text) {
                var datas = [];

                if (text === undefined || text.length === 0) {
                    datas = [];
                } else {
                    datas = text;
                }

                this.items = datas;

                if (this.value.length > 0) {
                    for (let item in this.items) {
                        if (parseInt(this.items[item].id) === parseInt(this.value)) {
                            this.selected = this.items[item];
                        }
                    }
                }
            }
        }
    };
</script>

<template>
    <div class="input-group" ref="colorpicker">
        <input type="text" class="form-control" :id="id" :name="name" :required="required === '1'"
               v-model="colorValue" @focus="showPicker()" @input="updateFromInput" />

        <div class="input-group-append">
            <button class="btn btn-outline-secondary d-flex align-items-center" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    @click="togglePicker()">
                <span class="current-color" :style="'background-color: ' + colorValue"></span>
            </button>

            <div class="dropdown-menu dropdown-menu-right show" v-if="displayPicker">
                <div class="px-3 py-1">
                    <vue-color :value="pickerValue" @input="updateFromPicker"  />

                    <div class="mt-3 ml-auto mr-0">
                        <button type="button" class="btn btn-sm btn-outline-secondary" @click="togglePicker()">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Chrome } from 'vue-color'

    export default {
        components: {
            'vue-color': Chrome,
        },
        data: () => {
            return {
                colorValue: '',
                displayPicker: false,
                pickerValue: {
                    hex: '#03a9f4',
                }
            };
        },
        mounted() {
            this.setColor(this.value || '#03a9f4');
        },
        props: {
            name: { type: String, required: true },
            id: { type: String },
            required: { type: Boolean, default: false },
            value: { type: String, default: '' }
        },
        methods: {
            setColor(color) {
                this.updateColors(color);
                this.colorValue = color;
            },
            updateColors(color) {
                if (color.slice(0, 1) === '#') {
                    this.pickerValue = {
                        hex: color
                    };
                } else if (color.slice(0, 4) === 'rgba') {
                    let rgba = color.replace(/^rgba?\(|\s+|\)$/g,'').split(','),
                        hex = '#' + ((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1);
                    this.pickerValue = {
                        hex: hex,
                        a: rgba[3],
                    }
                }
            },
            showPicker() {
                document.addEventListener('click', this.documentClick);
                this.displayPicker = true;
            },
            hidePicker() {
                document.removeEventListener('click', this.documentClick);
                this.displayPicker = false;
            },
            togglePicker() {
                this.displayPicker ? this.hidePicker() : this.showPicker();
            },
            updateFromInput() {
                this.updateColors(this.colorValue);
            },
            updateFromPicker(color) {
                this.pickerValue = color;

                if (color.rgba.a === 1) {
                    this.colorValue = color.hex;
                } else {
                    this.colorValue = 'rgba(' + color.rgba.r + ', ' + color.rgba.g + ', ' + color.rgba.b + ', ' + color.rgba.a + ')';
                }
            },
            documentClick(e) {
                let el = this.$refs.colorpicker,
                    target = e.target;
                if (el !== target && !el.contains(target)) {
                    this.hidePicker()
                }
            }
        },
        watch: {
            colorValue(val) {
                if (val) {
                    this.updateColors(val);
                    this.$emit('input', val);
                }
            }
        },
    };
</script>

<style scoped>
    .current-color {
        display: inline-block;
        width: 16px;
        height: 16px;
        background-color: #000;
        cursor: pointer;
    }

    .vc-chrome {
        box-shadow: none;
    }
</style>

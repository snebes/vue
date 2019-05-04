/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)
require('../css/app.css');

import Vue from 'vue'

import ColorPicker from './component/ColorPicker.vue'
import ProponentSelect from './component/ProponentSelect.vue'

new Vue({
    el: '#app',
    components: {
        ColorPicker,
        ProponentSelect,
    },
    delimiters: ['${', '}']
});

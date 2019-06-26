/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)
// require('bootstrap');
require('../css/app.scss');

import Vue from 'vue'
// import BootstrapVue from 'bootstrap-vue'
import CkEditor from './component/CkEditor.vue'
import ColorPicker from './component/ColorPicker.vue'
// import ProponentSelect from './component/ProponentSelect.vue'

// Vue.use(BootstrapVue)

new Vue({
    el: '#app',
    components: {
        CkEditor,
        ColorPicker,
    },
    delimiters: ['${', '}']
});

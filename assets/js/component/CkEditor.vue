<template>
    <div>
        <textarea
            :id="id"
            :name="name"
            :value="value"></textarea>
    </div>
</template>

<script>
    let inc = new Date().getTime();

    export default {
        props: {
            name: { type: String },
            id: { type: String, default: 'editor-${++inc}' },
            config: { type: Object, default: () => {} },
            readOnlyMode: { type: Boolean, default: () => false }
        },
        data: () => {
            return {
                instanceValue: '',
                value: ''
            };
        },
        computed: {
            instance() {
                return CKEDITOR.instances[this.id];
            }
        },
        watch: {
            value(val) {
                try {
                    if (this.instance) {
                        this.update(val);
                    }
                } catch (e) {}
            },
            readOnlyMode(val) {
                this.instance.setReadOnly(val);
            }
        },
        mounted() {
            this.value = this.$slots.default[0].text;
            this.create();

            console.log(this.config);
        },
        methods: {
            create() {
                if (typeof CKEDITOR === 'undefined') {
                    console.log('CKEDITOR is missing');
                } else {
                    CKEDITOR.replace(this.id, this.config);

                    this.instance.setData(this.value);
                    this.instance.on('instanceReady', () => {
                        this.instance.setData(this.value);
                    });

                    this.instance.on('change', this.onChange);
                    this.instance.on('mode', this.onMode);
                    this.instance.on('blur', evt => {
                        this.$emit('blur', evt);
                    });
                    this.instance.on('focus', evt => {
                        this.$emit('focus', evt);
                    });
                    this.instance.on('contentDom', evt => {
                        this.$emit('contentDom', evt);
                    });
                    this.instance.on('dialogDefinition', evt => {
                        this.$emit('dialogDefinition', evt);
                    });

                    this.$once('hook:beforeDestroy', () => {
                        this.destroy();
                    });
                }
            },
            update(val) {
                if (this.instanceValue !== val) {
                    this.instance.setData(val, { internal: false });
                    this.instanceValue = val;
                }
            },
            destroy() {
                try {
                    let editor = window['CKEDITOR'];
                    if (editor.instances && editor.instances[this.id]) {
                        editor.instances[this.id].destroy();
                    }
                } catch (e) {}
            },
            onMode() {
                if (this.instance.mode === 'source') {
                    let editable = this.instance.editable();
                    editable.attachListener(editable, 'input', () => {
                        this.onChange();
                    });
                }
            },
            onChange() {
                let html = this.instance.getData();
                if (html !== this.value) {
                    this.$emit('input', html);
                    this.instanceValue = html;
                }
            }
        }
    };
</script>

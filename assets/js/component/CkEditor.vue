<template>
    <div class="ckeditor"><textarea :id="id" :value="value"></textarea></div>
</template>

<script>
    export default {
        props: {
            value: { type: String },
            id: { type: String, default: 'editor' },
            height: { type: String, default: '90px' },
            toolbar: { type: Array, default: () => [['Undo','Redo']] },
            language: { type: String, default: 'en' },
            extraplugins: { type: String, default: '' }
        },
        beforeUpdate() {
            const ckeditorId = this.id;

            if (this.value !== CKEDITOR.instances[ckeditorId].getData()) {
                CKEDITOR.instances[ckeditorId].setData(this.value);
            }
        },
        mounted() {
            const ckeditorId = this.id;
            const ckeditorConfig = {
                toolbar: this.toolbar,
                language: this.language,
                height: this.height,
                extraPlugins: this.extraplugins,
                removePlugins: 'elementspath',
                resize_enabled: false
            };

            CKEDITOR.replace(ckeditorId, ckeditorConfig);
            CKEDITOR.instances[ckeditorId].setData(this.value);
            CKEDITOR.instances[ckeditorId].on('change', () => {
                let ckeditorData = CKEDITOR.instances[ckeditorId].getData();

                if (ckeditorData !== this.value) {
                    this.$emit('input', ckeditorData);
                }
            });
        },
        destroyed() {
            const ckeditorId = this.id;

            if (CKEDITOR.instances[ckeditorId]) {
                CKEDITOR.instances[ckeditorId].destroy();
            }
        }
    };
</script>

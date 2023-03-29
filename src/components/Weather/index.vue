<template>
    <div class="ydd">
        <div id="he-plugin-standard"></div>
    </div>
</template>
<script lang="ts" setup>
    import { onMounted } from 'vue';

    window.WIDGET = {
        CONFIG: {
            layout: '1',
            width: '400',
            height: '150',
            background: '1',
            dataColor: 'FFFFFF',
            borderRadius: '15',
            key: 'd7deaade54204386ad8c1a3a29066394'
        }
    };

    const weather = () => {
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = 'https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0';
        document.body.appendChild(s);
    };

    onMounted(() => {
        weather();
    });
</script>

<style lang="less" scoped>
    // .ydd {
    //     padding: 40px 40px;
    // }
</style>

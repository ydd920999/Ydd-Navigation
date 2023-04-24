<template>
    <div class="shapeShifterBox">
        <shape-shifter
            :content="data.content"
            :width="data.width"
            :height="data.height"
            :font-size="data.fontSize"
            :time="data.time"
        ></shape-shifter>
        <el-input v-model="inpVal" class="inputBox" :maxlength="5" @keyup.enter="handleEnter" />
    </div>
</template>

<script lang="ts" setup>
    import { ref, reactive } from 'vue';
    import shapeShifter from '../components/ShapeShifter/ShapeShifter.vue';

    const inpVal = ref('');
    const data = reactive({
        content: 'Hello :)|#countdown 3|Welcome|毅帝帝',
        width: 1500,
        height: 800,
        fontSize: 300,
        time: 2000
    }) as any;

    function handleEnter() {
        data.content = inpVal.value;
    }
</script>
<style scoped lang="less">
    .shapeShifterBox {
        width: 100%;
        height: 100%;
        position: relative;
        .inputBox {
            width: 300px;
            position: absolute;
            left: 40%;
            bottom: 40px;
        }
    }
</style>

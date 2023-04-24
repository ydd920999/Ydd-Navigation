<template>
    <div id="shape-shifter">
        <canvas class="canvas"></canvas>
    </div>
</template>

<script lang="ts" setup>
    import { ref, computed, onMounted, watch } from 'vue';
    import ShapeShifter from '../../utils/shape-shifter.js';

    const props = defineProps<{
        content: {
            type: String;
            default: 'hello shape-shifter';
        };
        width: {
            type: Number;
            default: 1500;
        };
        height: {
            type: Number;
            default: 800;
        };
        fontSize: {
            type: Number;
            default: 300;
        };
        time: {
            type: Number;
            default: 2000;
        };
    }>();

    watch(
        () => props.content,
        (newVal: any) => {
            ShapeShifter(props.content, props.width, props.height, props.fontSize, props.time);
        },
        {
            deep: true // 深度监听的参数
        }
    );

    onMounted(() => {
        ShapeShifter(props.content, props.width, props.height, props.fontSize, props.time);
    });
</script>
<style>
    * {
        padding: 0;
        margin: 0;
    }
    #shape-shifter {
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 100%;
        overflow: hidden;
        background-image: linear-gradient(
            to top,
            #3f51b1 0%,
            #5a55ae 13%,
            #7b5fac 25%,
            #8f6aae 38%,
            #a86aa4 50%,
            #cc6b8e 62%,
            #f18271 75%,
            #f3a469 87%,
            #f7c978 100%
        );
    }
</style>

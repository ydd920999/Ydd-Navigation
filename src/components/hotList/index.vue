<template>
    <div class="hotList">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>微博热搜</span>
                    <span class="refresh" @click="refresh">
                        <img src="@/assets/refresh.png" style="width: 20px" alt="" />
                        <span>点击刷新</span>
                    </span>
                </div>
            </template>
            <div v-for="(item, index) in Data" :key="item.note" class="item">
                <span @click="goWeibo(item.note)"> {{ index + 1 + '、' + item.note }}</span>
                <span v-if="item.num" class="hot">
                    {{
                        item.num.toString().length == 7
                            ? Math.round(item.num.toString().slice(0, 3)) + '万'
                            : Math.round(item.num.toString().slice(0, 2)) + '万'
                    }}
                </span>
                <div v-if="item.label_name != ''" class="tab">
                    <span
                        :class="
                            item.label_name === '爆'
                                ? 'bao'
                                : item.label_name === '新'
                                ? 'xin'
                                : 'fei'
                        "
                        >{{ item.label_name }}</span
                    >
                </div>
            </div>
        </el-card>
    </div>
</template>
<script lang="ts" setup>
    import { computed } from 'vue';
    const $emit = defineEmits(['refresh']);
    const props = defineProps<{
        list?: any;
    }>();

    const Data = computed(() => {
        return props?.list;
    });
    function goWeibo(name) {
        const url = `https://s.weibo.com/weibo?q=%23${name}%23`;
        window.open(url, '_blank');
    }
    function refresh() {
        $emit('refresh');
    }
</script>
<style lang="less" scoped>
    .hotList {
        width: 350px;
        height: 500px;
    }
    :deep(.box-card) {
        width: 350px !important;
    }
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .refresh {
            display: flex;
            align-items: center;
            span {
                color: #939393;
                font-size: 12px;
                margin-left: 5px;
            }
        }
    }

    .item {
        font-size: 14px;
        margin-bottom: 10px;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
        padding-bottom: 2px;
        .tab {
            width: 20px;
            display: inline-block;
            height: 20px;
            line-height: 20px;
            text-align: center;
            font-size: 14px;
            color: #fff;
            margin-left: 10px;
        }
        .bao {
            width: 100%;
            background: rgb(189, 0, 0);
            border-radius: 4px;
            padding: 0 2px 0 2px;
        }
        .xin {
            width: 100%;
            background: rgb(255, 56, 82);
            border-radius: 4px;
            padding: 0 2px 0 2px;
        }
        .fei {
            width: 100%;
            background: rgb(248, 100, 0);
            border-radius: 4px;
            padding: 0 2px 0 2px;
        }
        .hot {
            margin-left: 10px;
            color: #939393;
        }
    }

    .box-card {
        width: 480px;
    }
</style>

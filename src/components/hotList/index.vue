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
            <div v-for="(item, index) in Data" :key="item.title" class="item">
                <div class="ellipsislink" @click="goWeibo(item.title)">
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        :content="item.title"
                        placement="bottom"
                    >
                        <a>{{ index + 1 + '、' + item.title }}</a>
                    </el-tooltip>
                </div>
                <span v-if="item.heatnum" class="hot">
                    {{
                        item.heatnum.toString().length == 7
                            ? Math.round(item.heatnum.toString().slice(0, 3)) + '万'
                            : Math.round(item.heatnum.toString().slice(0, 2)) + '万'
                    }}
                </span>
                <div v-if="item.labelname" class="tab">
                    <span
                        :class="
                            item.labelname === '爆'
                                ? 'bao'
                                : item.labelname === '新'
                                ? 'xin'
                                : 'fei'
                        "
                        >{{ item.labelname }}</span
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
    function goWeibo(name: string) {
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
            cursor: pointer;
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
        .ellipsislink {
            width: 230px;
            a {
                width: 100%;
                font-size: 15px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 600;
                color: #333333;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                display: block;
                cursor: pointer;
            }
        }
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

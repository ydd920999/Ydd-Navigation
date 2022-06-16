<template>
    <div class="search">
        <div class="searchBox">
            <el-input v-model="input" placeholder="有问题找度娘" clearable @input="inputChange" />
            <el-button type="primary" @click="searchBtn">百度一下</el-button>
        </div>
        <div v-if="ulData.length" class="ulBox">
            <ul>
                <li v-for="(item, index) in ulData" :key="index">{{ item }}</li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import jsonp from 'jsonp';

    const input = ref('');
    const ulData = ref([]);
    function searchBtn() {
        console.log(input.value);
    }
    function inputChange(val: string) {
        jsonp(
            'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' +
                encodeURI(val.trim()) +
                '&json=1&p=3&sid=1457_21105_17001_22158&req=2&csor=1&pwd=7&cb=fn',
            null
        );
        if (!val) {
            ulData.value = [];
        }
    }
    //jsonp 回调函数
    (window['fn'] as any) = (data: any) => {
        ulData.value = data.s;
    };
</script>
<style lang="less" setup>
    #app {
        width: 100%;
        height: 100%;
    }
    .search {
        width: 500px;
        display: flex;
        flex-direction: column;
        // align-items: center;
        // justify-content: center;
        // padding-top: 100px;
        // padding-left: 100px;
        // padding-right: 100px;
        // padding-bottom: 100px;
        .searchBox {
            width: 100%;
            display: flex;
            // align-items: center;
            // justify-content: center;
            .el-input {
                width: 100%;
                margin-right: 10px;
            }
        }
        .ulBox {
            width: 400px;
            border: 1px solid #ccc;
            ul {
                width: 100%;
                list-style: none;
                padding-inline-start: 5px;
                text-align: left;
                li {
                    width: 100%;
                    float: left;
                    margin-bottom: 10px;
                }
            }
        }
    }
</style>

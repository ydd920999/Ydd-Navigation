<template>
    <div class="search">
        <div class="searchAttempt">
            <div class="searchBox">
                <el-input
                    v-model="input"
                    placeholder=""
                    clearable
                    @input="inputChange"
                    @keyup.enter.native="searchBtn"
                />
                <el-button type="primary" @click="searchBtn">搜索</el-button>
            </div>
            <div v-if="ulData.length" class="ulBox">
                <ul>
                    <li v-for="(item, index) in ulData" :key="index" @click="addList(item)">{{
                        item
                    }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue';
import jsonp from 'jsonp';

const input = ref('');
const ulData = ref([]);
function searchBtn() {
    window.open(`http://www.baidu.com/s?wd= + ${input.value}`, '_blank');
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
function addList(item: string) {
    window.open(`https://www.baidu.com/s?wd= + ${item} `, '_blank');
}
</script>
<style lang="less" setup>
.search {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;
    .searchAttempt {
        position: relative;
        .searchBox {
            width: 500px;
            display: flex;
            .el-input {
                width: 100%;
                margin-right: 10px;
            }
        }
        .ulBox {
            position: absolute;
            left: 0;
            top: 34px;
            width: 430px;
            height: 335px;
            // border: 1px solid #ccc;
            // margin-right: 96px;
            background: #fff;
            z-index: 999;
            border-radius: 8px;
            ul {
                width: 100%;
                height: 100%;
                list-style: none;
                padding-inline-start: 5px;
                text-align: left;

                li {
                    width: 98%;
                    float: left;
                    margin-bottom: 10px;
                    &:hover {
                        background-color: #e6f7ff;
                        color: #1890ff;
                    }
                }
            }
        }
    }
}
</style>

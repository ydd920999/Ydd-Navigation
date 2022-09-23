<template>
    <div class="container">
        <SearchInput />
        <HotList :list="weiboData" @refresh="weibo" />
        <div class="timeDateBox">
            <TimeDate />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, computed, onMounted, watch } from 'vue';
    import UsePinia from '@/components/UsePinia.vue';
    import SearchInput from '@/components/searchInput/index.vue';
    import HotList from '@/components/hotList/index.vue';
    import TimeDate from '@/components/timeDate/index.vue';
    import { UserService } from '/src/api/api.ts';
    import request from '@/utils/axios';
    import { ElNotification } from 'element-plus';
    import { useRoute, useRouter } from 'vue-router';

    const moyuUrl = ref('');
    const moyuTit = ref('');
    const router = useRouter();
    const hotList = ref<any>([]);
    const weiboData = ref<any>([]);
    const ipipinfo = ref<any>(null);
    onMounted(() => {
        weibo(); //微博热搜
        getipipinfo(); //访客信息
        moyu();
        // yiyan();
        // lishiDay();
        // everySix();
    });
    async function moyu() {
        const res = await UserService.getmoyuSrc({ type: 'json' });
        if (res.data.code == '200') {
            moyuUrl.value = res.data.imgurl;
            moyuTit.value = res.data.title;
        }
    }
    // async function weiboHot() {
    //     const res = await UserService.gitweiboHot();
    //     if (res.data.ok == '1') {
    //         const hot = ['荐', '商'];
    //         const data = res.data.data.realtime;
    //         hotList.value = data
    //             .filter((item: any) => {
    //                 return !hot.includes(item.small_icon_desc);
    //             })
    //             .slice(0, 10);
    //     }
    // }
    async function weibo() {
        const res = await UserService.getweiboHot();
        if (res.status == '200') {
            const data = res.data.data;
            weiboData.value = data.slice(0, 10);
        }
    }
    watch(
        () => ipipinfo.value,
        (newVal: any) => {
            ElNotification({
                title: `欢迎来自${newVal.city}的朋友`,
                dangerouslyUseHTMLString: true,
                offset: 50,
                message: `<div>
                     <p>ip: ${newVal.ip}</p>
                     <p>设备: ${newVal.os}</p>
                     <p>浏览器: ${newVal.browser}</p>
                     </div>`
            });
        },
        {
            deep: true // 深度监听的参数
        }
    );
    //获取IP
    async function getipipinfo() {
        const res = await UserService.getipipinfo();
        if (res.status == '200') {
            ipipinfo.value = res.data;
        }
    }
    async function yiyan() {
        const res = await UserService.geteveryYan({ type: 'djt' });
        console.log(res, 'yiyan');
    }
    async function lishiDay() {
        const res = await UserService.lishiDay();
        console.log(res, 'lishiD');
    }
    async function everySix() {
        const res = await UserService.ge60miao({ type: 'json' });
        console.log(res, '60');
    }
    function moyuImg() {
        const url = moyuUrl.value;
        console.log(url, 'urlurl');
        window.open(url);
        // window.location.href(url)
        // https://pic.rmb.bdstatic.com/bjh/6ebafcd214a487a7bb78b19f4c877a99.png
        // https://pic.imgdb.cn/item/62d04111f54cd3f9373fc390.png
    }
</script>
<style lang="less" scoped>
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 8px;
        box-sizing: border-box;
        // background: url(@/assets/wallhaven-nk6l8m_2560x1440.png);//老虎
        background: url(@/assets/wallhaven-g8rd8d_2560x1440.png); //云
        background-repeat: no-repeat;
        background-size: 100% 100%;
        & > :first-child {
            height: 80px;
            display: flex;
            align-items: center;
        }
        .HotBox {
            flex: 1;
        }
        position: relative;
        .timeDateBox {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            :nth-child(2) {
                margin-left: 10px;
                color: #fff;
            }
        }
        .moyu {
            width: 200px;
            height: 200px;
            color: #fff;
            background: red;
        }
    }
</style>

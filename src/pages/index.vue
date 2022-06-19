<template>
    <div class="container">
        <SearchInput />
        <HotList :list="weiboData" @refresh="weibo" />
    </div>
</template>

<script lang="ts" setup>
    import { ref, computed, onMounted } from 'vue';
    import UsePinia from '@/components/UsePinia.vue';
    import SearchInput from '@/components/searchInput/index.vue';
    import HotList from '@/components/hotList/index.vue';
    import { UserService } from '/src/api/api.ts';
    import request from '@/utils/axios';

    const moyuUrl = ref('');
    const hotList = ref<any>([]);
    const weiboData = ref<any>([]);
    onMounted(() => {
        // weiboHot();
        weibo();
        // moyu();
        // yiyan();
        // lishiDay();
        // everySix();
    });
    async function moyu() {
        const res = await UserService.getmoyuSrc({ type: 'json' });
        moyuUrl.value = res.imgurl;
    }
    async function weiboHot() {
        const res = await UserService.gitweiboHot();
        if (res.data.ok == '1') {
            const hot = ['荐', '商'];
            const data = res.data.data.realtime;
            hotList.value = data
                .filter((item: any) => {
                    return !hot.includes(item.small_icon_desc);
                })
                .slice(0, 10);
        }
    }
    async function weibo() {
        const res = await UserService.geiweiboHot();
        if (res.status == '200') {
            const data = res.data;
            weiboData.value = data.slice(0, 10);
        }
        console.log(res, 'sdsadas');
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
    }
</style>

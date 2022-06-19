<template>
    <div class="container">
        <div>
            <SearchInput />
        </div>
        <div class="HotBox"><HotList :list="hotList" @refresh="weiboHot" /> </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, computed, onMounted } from 'vue';
    import UsePinia from '@/components/UsePinia.vue';
    import SearchInput from '@/components/searchInput/index.vue';
    import HotList from '@/components/hotList/index.vue';
    import { UserService } from '/src/api/api.ts';
    import request from '@/utils/axios';
    // import API from '@/api';
    import jsonp from 'jsonp';

    const moyuUrl = ref('');
    const hotList = ref<any>([]);
    const data = ref<any>([]);
    onMounted(() => {
        fetchPageData();
        // requestRes();
        moyu();
        yiyan();
        lishiDay();
        everySix();
        weiboHot();
    });
    async function fetchPageData() {
        const params: any = {};
        params.limit = 12;
        const res = await UserService.geiweiboHots(params);
        console.log(res);
    }
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
        background: url(@/assets/backimg.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .HotBox {
            flex: 1;
        }
    }
</style>

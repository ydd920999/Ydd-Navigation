<template>
    <SearchInput />
</template>

<script lang="ts" setup>
    import { ref, computed, onMounted } from 'vue';
    import UsePinia from '@/components/UsePinia.vue';
    import SearchInput from '@/components/searchInput/index.vue';
    import { UserService } from '/src/api/api.ts';
    import request from '@/utils/axios';
    // import API from '@/api';

    onMounted(() => {
        fetchPageData();
        requestRes();
    });
    async function fetchPageData() {
        const loginParams = {
            limit: 12
        };
        const res = await UserService.geiInterviewList(loginParams);
        console.log(res);
    }
    const requestRes = async () => {
        const loginParams = {
            limit: 12
        };
        let result = await request({
            url: '/the.top/api/v1/item/weibo',
            method: 'get',
            params: loginParams
        });

        console.log(result);
    };
</script>

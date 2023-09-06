<template>
    <div class="container">
        <SearchInput />
        <div class="con">
            <div class="hotListBox">
                <HotList :list="weiboData" @refresh="weibo" />
            </div>
            <div class="WeatherBox">
                <Weather />
            </div>
        </div>
        <div class="timeDateBox">
            <TimeDate />
        </div>
        <div class="btn" @click="goShapeShifter"
            >ShapeShifter

            <div class="btn2"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, computed, onMounted, watch } from 'vue';
    import UsePinia from '@/components/UsePinia.vue';
    import SearchInput from '@/components/searchInput/index.vue';
    import HotList from '@/components/hotList/index.vue';
    import TimeDate from '@/components/timeDate/index.vue';
    import Weather from '@/components/Weather/index.vue';
    import { UserService } from '/src/api/api.ts';
    import request from '@/utils/axios';
    import { ElNotification } from 'element-plus';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute();
    const router = useRouter();

    const moyuUrl = ref('');
    const moyuTit = ref('');
    const hotList = ref<any>([]);
    const weiboData = ref<any>([]);
    const ipipinfo = ref<any>(null);
    onMounted(() => {
        weibo(); //微博热搜
        // getipipinfo(); //访客信息
        // moyu();
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

    async function weibo() {
        const res = await UserService.getweibo();
        if (res.status == '200') {
            //过滤掉广告
            const filteredArr = res.data.data.filter((item: any) => item.hasOwnProperty('hot'));
            weiboData.value = filteredArr.slice(0, 10);
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
    // //获取IP
    // async function getipipinfo() {
    //     const res = await UserService.getipipinfo();
    //     if (res.status == '200') {
    //         ipipinfo.value = res.data;
    //     }
    // }
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
    function goShapeShifter() {
        router.push({
            name: 'ShapeShifter'
        });
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
            flex-direction: column;
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
        .con {
            display: flex;
            justify-content: space-between;
            .WeatherBox {
                margin-top: 20px;
            }
        }

        .btn,
        .btn2 {
            color: rgba(255, 255, 255, 0.9);
            border-radius: 50px;
            width: 200px;
            height: 40px;
            font-size: 24px;
            text-align: center;
            line-height: 40px;
            background: linear-gradient(-45deg, #ffa63d, #ff3d77, #338aff, #3cf0c5);
            background-size: 600%;
            -webkit-animation: anime 6s linear infinite;
            animation: anime 6s linear infinite;
        }
        .btn2 {
            position: absolute;
            margin-top: -40px;
            z-index: -1;
            filter: blur(30px);
            opacity: 0.8;
        }
        .btn {
            position: absolute;
            top: 5px;
            right: 250px;
            cursor: pointer;
        }
        @keyframes anime {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            00% {
                background-position: 0% 50%;
            }
        }
        @-webkit-keyframes anime {
            0% {
                background-position: 0% 50%;
            }

            50% {
                background-position: 100% 50%;
            }

            100% {
                background-position: 0% 50%;
            }
        }
    }
</style>

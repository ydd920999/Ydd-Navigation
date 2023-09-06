<template>
    <div class="container">
        <div class="serchBox">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="百科全书">
                    <el-input
                        v-model="formInline.problem"
                        style="width: 200px"
                        placeholder="请输入问题,支持模糊搜索"
                        clearable
                    />
                </el-form-item>
            </el-form>
            <div class="btn" @click="aboutOpen">
                关于本站
                <div class="btn2"></div>
            </div>
        </div>

        <el-table :data="filteredData" stripe style="width: 100%">
            <!-- <el-table-column prop="letter" label="首字母" width="80" /> -->
            <el-table-column prop="problem" label="问题" />
            <el-table-column prop="answer" label="答案" />
        </el-table>
        <el-drawer v-model="drawer" title="关于本站" style="width: 60%">
            <h3>联系我们</h3>
            <div>若您在使用本站时遇到了包括但不限于以下问题：</div>
            <ul>
                <li>文字错误</li>
                <li>答案有误</li>
                <li>添加问题</li>
                <li>进游戏交流群</li>
            </ul>
            <h3>请加我微信与我联系</h3>
            <el-descriptions direction="vertical" :column="4" border>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <user />
                            </el-icon>
                            作者
                        </div>
                    </template>
                    毅帝帝
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon><ChatDotRound /></el-icon>
                            微信
                        </div>
                    </template>
                    tang920ty
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <location />
                            </el-icon>
                            区组
                        </div>
                    </template>
                    二O一七
                </el-descriptions-item>
            </el-descriptions>
            <h3>更多项目</h3>
            <ul>
                <li
                    ><a href="https://start.yddwd.com" target="_blank" class="custom-link"
                        >导航</a
                    ></li
                >
                <li
                    ><a href="https://hot.yddwd.com" target="_blank" class="custom-link"
                        >今日热点</a
                    ></li
                >
            </ul>
        </el-drawer>

        <el-backtop :right="100" :bottom="100" />
    </div>
</template>

<script lang="ts" setup>
    import { ref, onMounted, watch, reactive, computed } from 'vue';
    import { UserService } from '/src/api/api.ts';
    import { ElNotification } from 'element-plus';
    import { useRoute, useRouter } from 'vue-router';
    import {
        Iphone,
        Location,
        OfficeBuilding,
        Tickets,
        User,
        ChatDotRound
    } from '@element-plus/icons-vue';
    const formInline = reactive({
        problem: ''
    });
    const route = useRoute();
    const router = useRouter();
    const drawer = ref(false);
    const ipipinfo = ref<any>(null);
    const tableData = ref<any>([
        {
            problem: '安徒生是什么国家的?',
            answer: '丹麦',
            letter: 'A'
        },
        {
            problem: '八仙之中原名李凝阳的是?',
            answer: '铁拐李',
            letter: 'B'
        },
        {
            problem: '被称为“王右军”的著名书法家的原名是?',
            answer: '王羲之',
            letter: 'B'
        },
        {
            problem: '被李世民评价为“疾风知劲草板荡识诚臣”的人是?',
            answer: '萧瑀',
            letter: 'B'
        },
        {
            problem: '冰糖是用什么做的?',
            answer: '白砂糖',
            letter: 'B'
        },
        {
            problem: '茶在我国最早是作为什么?',
            answer: '药',
            letter: 'C'
        },
        {
            problem: '丞相祠堂何处寻，锦官城外柏森森”中的锦官城是指哪里?',
            answer: '成都',
            letter: 'C'
        },
        {
            problem: '成都的市花是什么?',
            answer: '芙蓉',
            letter: 'C'
        },
        {
            problem: '传说东海中有三座仙山，分别是方丈，瀛洲和?',
            answer: '蓬莱',
            letter: 'C'
        },
        {
            problem: '春秋战国时期，卿、大夫的封地称为什么?',
            answer: '家',
            letter: 'C'
        },
        {
            problem: '刺桐城是哪个城市的别称?',
            answer: '泉州',
            letter: 'C'
        },
        {
            problem: '道教炼丹术中“木龙”是指什么?',
            answer: '汞',
            letter: 'D'
        },
        {
            problem: '东汉时期，率军大破北匈奴的将领是?',
            answer: '窦宪',
            letter: 'D'
        },
        {
            problem: '东汉时期，太尉、司徒、司空并称为?',
            answer: '三公',
            letter: 'D'
        },
        {
            problem: '东周的前半期，诸侯争相称霸，称为什么时代?',
            answer: '春秋',
            letter: 'D'
        },
        {
            problem: '发明地动仪的我国古代天文学家是?',
            answer: '张衡',
            letter: 'F'
        },
        {
            problem: '佛跳墙是哪个菜系的代表菜?',
            answer: '闽菜',
            letter: 'F'
        },
        {
            problem: '福建武夷山地区所产的著名乌龙茶是?',
            answer: '大红袍',
            letter: 'F'
        },
        {
            problem: '国际象棋的棋子共有多少枚?',
            answer: '32',
            letter: 'G'
        },
        {
            problem: '国际象棋的棋盘共有多少个方格?',
            answer: '64',
            letter: 'G'
        },
        {
            problem: '古人死后依生前行迹而为之所立的称号叫做?',
            answer: '谥号',
            letter: 'G'
        },
        {
            problem: '古代中国地理名著《水经注》的作者是?',
            answer: '郦道元',
            letter: 'G'
        },
        {
            problem: '和平鸽”的形象由谁所创?',
            answer: '毕加索',
            letter: 'H'
        },
        {
            problem: '河北省的简称是什么?',
            answer: '冀',
            letter: 'H'
        },
        {
            problem: '荷兰的国花是?',
            answer: '郁金香',
            letter: 'H'
        },
        {
            problem: '晃一晃地动山摇，颠一颠山呼海啸，是指哪个法定?',
            answer: '番天印',
            letter: 'H'
        },
        {
            problem: '梁山好汉中，绰号“八臂哪吒”的是?',
            answer: '项充',
            letter: 'L'
        },
        {
            problem: '龙吉公主是谁的女儿?',
            answer: '西王母',
            letter: 'L'
        },
        {
            problem: '雷峰塔在哪个城市?',
            answer: '杭州',
            letter: 'L'
        },
        {
            problem: '吉林省的省会是哪里?',
            answer: '长春',
            letter: 'J'
        },
        {
            problem: '嘉靖皇帝是哪个朝代的皇帝?',
            answer: '明',
            letter: 'J'
        },
        {
            problem: '门神一个是尉迟恭，另一个是?',
            answer: '秦琼',
            letter: 'M'
        },
        {
            problem: '名画《马拉之死》是谁的作品?',
            answer: '大卫',
            letter: 'M'
        },
        {
            problem: '明朝的开国皇帝是谁?',
            answer: '朱元璋',
            letter: 'M'
        },
        {
            problem: '梦回殷商剧情中，张奎的夫人是谁?',
            answer: '高兰英',
            letter: 'M'
        },
        {
            problem: '哪个城市有“石头城”之称?',
            answer: '南京',
            letter: 'N'
        },
        {
            problem: '哪个俱乐部被FIFA评为20世纪最伟大的俱乐部?',
            answer: '皇马',
            letter: 'N'
        },
        {
            problem: '哪位皇帝平定了七国之乱?',
            answer: '汉景帝',
            letter: 'N'
        },
        {
            problem: '哪些仙人常说：“红尘休闲的正道，蓬莱仙境乐逍遥?八仙',
            answer: '八仙',
            letter: 'N'
        },
        {
            problem: '念慈中的慈是指?',
            answer: '母亲',
            letter: 'N'
        },
        {
            problem: '诺贝尔基金会管理诺贝尔奖金基金会设在哪里?',
            answer: '瑞典',
            letter: 'N'
        },
        {
            problem: '蓬莱文章建安骨，中间小谢又清发”中的小谢是谁?',
            answer: '谢朓',
            letter: 'P'
        },
        {
            problem: '凭崖望八极，目尽长空间”，描绘的是哪座名山的景色?',
            answer: '泰山',
            letter: 'P'
        },
        {
            problem: '钦差大臣是哪个国家的作品?',
            answer: '俄国',
            letter: 'Q'
        },
        {
            problem: '乾元山金光洞的弟子精通哪一系法术?',
            answer: '火',
            letter: 'Q'
        },
        {
            problem: '秦王破阵乐》中的“秦王”是指谁?',
            answer: '李世民',
            letter: 'Q'
        },
        {
            problem: '乾隆皇帝的“乾隆”二字是他的?',
            answer: '年号',
            letter: 'Q'
        },
        {
            problem: '群山万壑赴荆门，生长明妃尚有村”中的“明妃”是指谁?',
            answer: '王昭君',
            letter: 'Q'
        },
        {
            problem: '人生自古谁无死，留取丹心照汗心的作者是?',
            answer: '文天祥',
            letter: 'R'
        },
        {
            problem: '人体最大的解毒器官是什么?',
            answer: '肝脏',
            letter: 'R'
        },
        {
            problem: '任用商鞅进行变法的秦国国君是?',
            answer: '秦孝公',
            letter: 'R'
        },
        {
            problem: '《三国演义》中《临江仙·滚滚长江东逝水》的作者是谁?',
            answer: '杨慎',
            letter: 'S'
        },
        {
            problem: '《三国演义》中有“白马将军”之称的是?',
            answer: '公孙瓒',
            letter: 'S'
        },
        {
            problem: '商鞅变法发生在东周的哪个时期?',
            answer: '战国',
            letter: 'S'
        },
        {
            problem: '诗佛”王维，字摩诘，他的表字来源于谁?',
            answer: '维摩诘',
            letter: 'S'
        },
        {
            problem: '十二星座中哪一个星座的图腾是羊头鱼身?',
            answer: '摩羯座',
            letter: 'S'
        },
        {
            problem: '世界第一枚邮票出现在?',
            answer: '英国',
            letter: 'S'
        },
        {
            problem: '世界上最早发明和试用麻醉剂的人是我国的?',
            answer: '华佗',
            letter: 'S'
        },
        {
            problem: '瘦西湖”在哪个地方?',
            answer: '扬州',
            letter: 'S'
        },
        {
            problem: '《水浒传》中外号为“霹雳火”的英雄好汉是谁?',
            answer: '秦明',
            letter: 'S'
        },
        {
            problem: '水煮牛肉是哪个菜系?',
            answer: '川菜',
            letter: 'S'
        },
        {
            problem: '《四世同堂》的作者是?',
            answer: '老舍',
            letter: 'S'
        },
        {
            problem: '四书五经”中的“四书”包括：《大学》、《中庸》、《论语》和什么两个字?',
            answer: '孟子',
            letter: 'S'
        },
        {
            problem: '宋朝时期的最高军事机构是?',
            answer: '枢密院',
            letter: 'S'
        },
        {
            problem: '《孙子兵法》是谁的著作?',
            answer: '孙武',
            letter: 'S'
        },
        {
            problem: '塔是宗教建筑之一最早的古塔是从哪个国家传入中国的?',
            answer: '印度',
            letter: 'T'
        },
        {
            problem: '太上老君所在的宫殿是哪里?',
            answer: '大罗宫',
            letter: 'T'
        },
        {
            problem: '太玄经是西汉字者谁的一部著作?',
            answer: '扬雄',
            letter: 'T'
        },
        {
            problem: '唐朝皇帝的帝陵位于现今哪个省?',
            answer: '陕西',
            letter: 'T'
        },
        {
            problem: '唐朝时期，六次东渡日本传扬佛法的僧人是?',
            answer: '鉴真',
            letter: 'T'
        },
        {
            problem: '唐朝为表彰功臣而建造的绘有功臣图像的高阁是?',
            answer: '凌烟阁',
            letter: 'T'
        },
        {
            problem: '唐明皇的名字是?',
            answer: '李隆基',
            letter: 'T'
        },
        {
            problem: '台一万八千丈”中的“天台”是指什么?',
            answer: '天台山',
            letter: 'T'
        },
        {
            problem: '图腾羊头鱼身的是什么星座?',
            answer: '摩羯座',
            letter: 'T'
        },
        {
            problem: '围棋的棋盘共有几个交叉点?',
            answer: '361',
            letter: 'W'
        },
        {
            problem: '《问道》中，阐教教主是谁?',
            answer: '元始天尊',
            letter: 'W'
        },
        {
            problem: '问道游戏中的斗阙言在哪座山?',
            answer: '凤凰山',
            letter: 'W'
        },
        {
            problem: '问道游戏中的逍遥殿在哪个宫?',
            answer: '碧游宫',
            letter: 'W'
        },
        {
            problem: '我国第一部诗歌总集是?',
            answer: '诗经',
            letter: 'W'
        },
        {
            problem: '我国古代哪个城市被称为“神都”?',
            answer: '洛阳',
            letter: 'W'
        },
        {
            problem: '我国历史上有据可查的第一位女性军事将领是?',
            answer: '妇好',
            letter: 'W'
        },
        {
            problem: '我国现存年代最早的跨海梁式大石桥—一洛阳桥在哪个城市?',
            answer: '泉州',
            letter: 'W'
        },
        {
            problem: '吴带当风”中的吴是指哪位画家?',
            answer: '吴道子',
            letter: 'W'
        },
        {
            problem: '先天下之忧而忧，后天下之乐而乐”出自谁的文章?',
            answer: '范仲淹',
            letter: 'X'
        },
        {
            problem: '现代奥运会的创始人是?顾拜旦',
            answer: '范仲淹',
            letter: 'X'
        },
        {
            problem: '玄武”改称为“真武”是因为什么?避讳',
            answer: '范仲淹',
            letter: 'X'
        },
        {
            problem: '暹罗是哪个国家的旧称?泰国',
            answer: '范仲淹',
            letter: 'X'
        },
        {
            problem: '一个是阆苑仙葩，一个是美玉无暇。一个枉自嗟呀，一个空劳牵挂”出自哪本书?',
            answer: '红楼梦',
            letter: 'Y'
        },
        {
            problem: '有“禅宗祖庭”之称的寺庙是?',
            answer: '少林寺',
            letter: 'Y'
        },
        {
            problem: '有“颜筋柳骨”之称的书法家是颜真卿和谁?',
            answer: '柳公权',
            letter: 'Y'
        },
        {
            problem: '与其父并称为“二王”的书法家是?',
            answer: '王献之',
            letter: 'Y'
        },
        {
            problem: '元谋猿人在哪里被发现?',
            answer: '云南',
            letter: 'Y'
        },
        {
            problem: '原为天外神石，幻化为人形的仙人是?',
            answer: '石玑娘娘',
            letter: 'Y'
        },
        {
            problem: '圆周率小数点后第五位数字是?',
            answer: '9',
            letter: 'Y'
        },
        {
            problem: '远古生灵中，最早成圣，并一手创立了玄门道统的是?',
            answer: '鸿钧',
            letter: 'Y'
        },
        {
            problem: '跃突泉在中国山东的?',
            answer: '济南',
            letter: 'Y'
        },
        {
            problem: '云想衣裳花想容，春风拂槛露华浓”是谁的诗句?',
            answer: '李白',
            letter: 'Y'
        },
        {
            problem: '藏传佛教格鲁派以其穿着特点又被称为什么?',
            answer: '黄教',
            letter: 'Z'
        },
        {
            problem: '在宋代西河南府指的是?',
            answer: '洛阳',
            letter: 'Z'
        },
        {
            problem: '战国时期，韩昭侯任用谁在韩国实行变法?',
            answer: '申不害',
            letter: 'Z'
        },
        {
            problem: '战国时期被称为梁国的诸侯国是?',
            answer: '魏国',
            letter: 'Z'
        },
        {
            problem: '正常人换恒牙前有几颗乳牙?',
            answer: '20',
            letter: 'Z'
        },
        {
            problem: '一古刹白马寺，位于哪个城市?',
            answer: '洛阳',
            letter: 'Z'
        },
        {
            problem: '中国工艺品景泰蓝以哪个地方最为盛名?',
            answer: '北京',
            letter: 'Z'
        },
        {
            problem: '著名乐曲《十面埋伏》是什么乐器演奏的?',
            answer: '琵琶',
            letter: 'Z'
        },
        {
            problem: '准提道人和西方浇筑属于哪个教派?',
            answer: '西方教',
            letter: 'Z'
        },
        {
            problem: '《资治通鉴》的作者是?',
            answer: '司马光',
            letter: 'Z'
        },
        {
            problem: '自称“奉旨填词柳三变”的宋朝词人是谁了?',
            answer: '柳永',
            letter: 'Z'
        },
        {
            problem: '自古有“奇险天下第一山”之称，是著名的道教胜地的哪座山?',
            answer: '华山',
            letter: 'Z'
        }
    ]);

    const filteredData = computed(() => {
        if (!formInline.problem) {
            return tableData.value;
        }
        const searchTerm = formInline.problem.toLowerCase();
        return tableData.value.filter((item: any) => {
            return item.problem.toLowerCase().includes(searchTerm);
        });
    });

    function aboutOpen() {
        drawer.value = true;
    }
    watch(
        () => ipipinfo.value,
        (newVal: any) => {
            ElNotification({
                title: `欢迎来自${newVal?.data?.location}的朋友`,
                dangerouslyUseHTMLString: true,
                offset: 50,
                message: `<div>
                     <p>ip: ${newVal?.data?.ip}</p>
                     <p>设备: ${newVal?.data?.os}</p>
                     <p>浏览器: ${newVal?.data?.browser}</p>
                     </div>`
            });
        },
        {
            deep: true // 深度监听的参数
        }
    );

    // //获取IP
    async function getipipinfo() {
        const res = await UserService.getipUserInfo();
        if (res.status == '200') {
            ipipinfo.value = res.data;
        }
    }

    onMounted(() => {
        getipipinfo();
    });
</script>
<style lang="less" scoped>
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 30px;
        box-sizing: border-box;
        background: #fff;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .serchBox {
            display: flex;
        }

        .btn,
        .btn2 {
            color: rgba(255, 255, 255, 0.9);
            border-radius: 50px;
            width: 200px;
            height: 40px;
            font-size: 18px;
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
            top: 23px;
            left: 330px;
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
        .custom-link {
            color: #42b983;
            text-decoration: none;
        }
    }
</style>

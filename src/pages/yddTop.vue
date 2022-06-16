<template>
    <div id="app">
        <div class="crayon-clock">
            <div class="crayon-clock-time">{{ time }}</div>
            <div class="crayon-clock-date">
                <span class="date">{{ date }}</span>
                <span class="week">{{ week }}</span>
            </div>
        </div>
    </div>
</template>

<script step>
    export default {
        name: 'CrayonClock',
        components: {},
        data() {
            return {
                time: '',
                date: '',
                week: '',
                timerHelper: false
            };
        },
        mounted() {
            this.timerHelper = setInterval(this.updateTime, 1000);
        },
        beforeUnmount() {
            if (this.timerHelper) {
                clearInterval(this.timerHelper);
                this.timerHelper = false;
            }
        },
        methods: {
            zeroPadding(num, digit) {
                let zero = '';
                for (let i = 0; i < digit; i++) {
                    zero += '0';
                }
                return (zero + num).slice(-digit);
            },
            updateTime() {
                const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
                const cd = new Date();
                this.time =
                    this.zeroPadding(cd.getHours(), 2) +
                    ':' +
                    this.zeroPadding(cd.getMinutes(), 2) +
                    ':' +
                    this.zeroPadding(cd.getSeconds(), 2);
                this.date =
                    this.zeroPadding(cd.getFullYear(), 4) +
                    '-' +
                    this.zeroPadding(cd.getMonth() + 1, 2) +
                    '-' +
                    this.zeroPadding(cd.getDate(), 2);

                this.week = week[cd.getDay()];
            }
        }
    };
</script>

<style>
    html,
    body {
        height: 100%;
        margin: 0;
    }
    body {
        background: #0f3854;
        background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 70%);
        background-size: 100%;
    }
    #app {
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .crayon-clock {
        font-family: -apple-system, BlinkMacSystemFont, Roboto, Open Sans, Helvetica Neue,
            sans-serif;
        color: #fff;
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        color: #daf6ff;
        text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
    }
    .crayon-clock-time {
        letter-spacing: 0.05em;
        font-size: 24px;
        padding: 20px 0 0;
    }
    .crayon-clock-date {
        letter-spacing: 0.1em;
        font-size: 24px;
    }
</style>

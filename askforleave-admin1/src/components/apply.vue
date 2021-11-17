<template>
    <div class="huaxia">
        <heads></heads>
        <router-link to="login" tag="button" class="hongkong" @click.native="tuichu">退出登录</router-link>
        <div class="xibei">
            <div :style="{backgroundColor: bgcc, color: colorc}" @click="changeOne">处理申请</div>
            <div :style="{backgroundColor: bgc, color: color}" @click="changeTwo" class="taiwan">已审批申请</div>
        </div>
        <div class="jiangnan">{{title}}</div>
        <!--<handle @fhide="hide"></handle>-->
        <component :is="this.$store.state.componentId" @fhide="hide" @fyincang="yincang"></component>
        <div class="xinan" :style="{display: yarn}"></div>
        <div class="sichuan" :style="{display: yarn}">
            <div class="chengdu">
                <span>姓名：<i>{{this.$store.state.name}}</i></span>
                <span>专业：<i>{{this.$store.state.class}}</i></span>
            </div>
            <button class="guangan" @click="hide">X</button>
            <div class="yibin">
                <div>请假类型：</div>
                <div>事假：<input type="radio" name="jia" disabled="disabled" :checked='this.$store.state.type1'>√</div>
                <div>病假：<input type="radio" name="jia" disabled="disabled" :checked='this.$store.state.type2'>√</div>
                <div>其他（请说明）：<input type="text" disabled="disabled" v-model="this.$store.state.reason"></div>
                <div>请假时间：<input type="text" disabled="disabled" v-model="this.$store.state.apply_time"></div>
                <div><i style="vertical-align: top; margin-right: 30px;">具体说明:</i><textarea rows="10" cols="70" disabled="disabled" textarea v-text="this.$store.state.veto_reason"></textarea></div>
                <div>
                    <button class="yibin_01" @click="yuanyin">否决</button>
                    <button class="yibin_02" @click="hide(), agree()">同意</button>
                </div>
            </div>
        </div>
        <div class="xinan" :style="{display: sha}"></div>
        <div class="sichuan" :style="{display: sha}">
            <div class="chengdu">
                <span>姓名：<i>{{this.$store.state.name2}}</i></span>
                <span>专业：<i>{{this.$store.state.class2}}</i></span>
            </div>
            <button class="guangan" @click="yincang">X</button>
            <div class="yibin">
                <div>请假类型：</div>
                <div>事假：<input type="radio" name="jia" disabled="disabled" :checked='this.$store.state.type3'>√</div>
                <div>病假：<input type="radio" name="jia" disabled="disabled" :checked='this.$store.state.type4'>√</div>
                <div>其他（请说明）：<input type="text" disabled="disabled" v-model="this.$store.state.reason2"></div>
                <div>请假时间：<input type="text" disabled="disabled" v-model="this.$store.state.apply_time2"></div>
                <div><i style="vertical-align: top; margin-right: 30px;">具体说明:</i><textarea rows="10" cols="70" disabled="disabled" v-text="this.$store.state.veto_reason2"></textarea></div>
                <div>
                    <button class="yibin_01" @click="chacha03()">否决</button>
                    <button class="yibin_02" @click="yincang(), agree2()">同意</button>
                </div>
            </div>
        </div>
        <cause :style="{display: xianshi}" @fchacha="chacha"></cause>
        <cause02 v-show="xianshi02" @fchacha02="chacha02"></cause02>
    </div>
</template>

<script>
import heads from './heads.vue'
import handle from './handle.vue'
import approved from './approved.vue'
import cause from './cause.vue'
import cause02 from './cause02.vue'
export default {
    data: function() {
        return {
            bgcc: '#C0C0C0',
            colorc: '#1E90FF',
            bgc: '#F5F5F5',
            color: '#000',
            title: "处理申请",
            yarn: "none",
            sha: "none",
            componentId: "handle",
            xianshi: 'none',
            xianshi02: false
        }
    },
    methods: {
        changeOne() {
            this.bgcc = '#C0C0C0';
            this.colorc = '#1E90FF';
            this.bgc = '#F5F5F5';
            this.color = '#000';
            this.title = "处理申请";
            this.xianshi02 = false;
            sessionStorage.setItem('componentId', 'handle');
            this.$store.state.componentId = sessionStorage.getItem('componentId');
            //this.$store.state.componentId = "handle";
        },
        changeTwo() {
            this.bgcc = '#F5F5F5';
            this.colorc = '#000';
            this.bgc = '#C0C0C0';
            this.color = '#1E90FF';
            this.title = "已审核申请";
            this.xianshi = 'none';
            sessionStorage.setItem('componentId', 'approved');
            this.$store.state.componentId = sessionStorage.getItem('componentId');
            //this.$store.state.componentId = "approved";
            //document.querySelector('.sihai').click();
        },
        hide() {
            this.yarn = this.yarn === 'none' ? 'block' : 'none';
        },
        //审批请假——同意
        agree() {
            if(this.$store.state.id > -1)
            {
                this.$axios.post("/api/leave/leave_approve", {
                    id: this.$store.state.id
                }, {}).then(value => {
                    if(value.data.code==200 && this.$store.state.index>-1)
                    {
                        this.$store.state.tableData.splice(this.$store.state.index, 1);
                        location.reload();
                    }
                }, reason => {
                    console.log(reason);
                })
            }
        },
        yincang() {
            this.sha = this.sha === 'none' ? 'block' : 'none';
        },
        yuanyin() {
            this.xianshi = this.xianshi === 'none' ? 'block' : 'none';
            this.hide();
            this.componentId = '';
        },
        chacha() {
            this.xianshi = this.xianshi === 'none' ? 'block' : 'none';
            this.componentId = 'handle';
        },
        chacha02() {
            this.xianshi02 = !this.xianshi02;
        },
        chacha03() {
            this.sha = this.sha === 'none' ? 'block' : 'none';
            this.xianshi02 = this.xianshi02 === true ? false : true;
        },
        //修改请假状态为——通过
        agree2() {
            if(this.$store.state.id2>-1 && this.$store.state.status1!=-1 && this.$store.state.status2!=-1)
            {
                this.$axios.post("/api/admin/examine_staus", {
                    id:this.$store.state.id2,
                    status1:1,
                    status2:this.$store.state.status2
                }, {}).then(value => {
                    if(value.data.code==200)
                    {
                        //console.log("修改成功，同意。");
                    }
                    else
                    {
                        if(value.data.msg == "操作失败,只能修改一次")
                        {
                            alert("只能修改一次哦。");
                        }
                        //console.log(value.data);
                    }
                }, reason => {
                    console.log(reason);
                })
            }
        },
        tuichu() {
            //console.log("退出");
            sessionStorage.clear();
        }
    },
    created: function () {
        if(sessionStorage.getItem('componentId') == "approved")
        {
            this.bgcc = '#F5F5F5';
            this.colorc = '#000';
            this.bgc = '#C0C0C0';
            this.color = '#1E90FF';
            this.title = "已审核申请";
            this.xianshi = 'none';
        }
        this.$store.state.componentId = sessionStorage.getItem('componentId');
    },
    components: {
        heads,
        handle,
        approved,
        cause,
        cause02
    }
}
</script>

<style scoped>
    .huaxia {
        height: 100%;
    }
    .hongkong {
        float: right;
        width: 80px;
        height: 35px;
        margin-top: 10px;
        margin-right: 20px;
        background-color: 	#C0C0C0;
        border-radius: 5px;
    }
    .xibei {
        display: inline-block;
        width: 300px;
        height: 88%;
        background-color: 	#F5F5F5;
        border-right: 1px solid #000;
    }
    .xibei div {
        width: 100%;
        height: 80px;
        border-bottom: 1px solid #000;
        font-size: 30px;
        font-weight: 500;
        text-align: center;
        line-height: 80px;
    }
    .xibei div:first-child {
        border-top: 1px solid #000;
    }
    .jiangnan {
        float: right;
        width: 200px;
        margin: 80px 630px 0 0;
        font-size: 30px;
        font-weight: 600;
        text-align: center;
        background-color: 	#00FFFF;
    }
    .xinan {
        position: relative;
        top: -937px;
        left: 0;
        width: 100%;
        height: 100%;
        background: 	rgba(245,245,245,0.8);
        z-index: 100;
        opacity: .8;
    }
    .sichuan {
        position: absolute;
        margin: auto;
        top: 140px;
        left: 240px;
        right: 0;
        bottom: 0;
        width: 1000px;
        height: 600px;
        background-color: #fff!important;
        border: 1px solid #000;
        z-index: 101;
    }
    .chengdu {
        position: relative;
        top: 0;
        left: 0;
        height: 20%;
        padding: 0px 50px;
        border-bottom: 1px solid #000;
        font-size: 24px;
        font-weight: 500;
        line-height: 120px;
        overflow: hidden;
    }
    .chengdu span:first-child {
        float: left;
    }
    .chengdu span:last-child {
        float: right;
    }
    .sichuan .guangan {
        display: inline-block;
        position: absolute;
        margin: auto;
        top: 15px;
        left: 0;
        right: 0;
        width: 30px;
        height: 30px;
        color: #000;
        font-size: 24px;
        font-weight: 600;
        text-align: center;
        line-height: 30px;
        border-radius: 50%;
        border: 1px solid #000;
    }
    .sichuan .guangan:hover {
        background-color: 	#F5F5F5;
    }
    .sichuan .yibin {
        height: 80%;
        padding: 0 100px;
    }
    .sichuan .yibin input {
        border: 1px solid #000;
        border-radius: 3px;
    }
    .sichuan .yibin div {
        height: 10%;
        font-size: 20px;
        border-bottom: 1px solid #000;
    }
    .sichuan .yibin div:first-child {
        height: 15%;
    }
    .sichuan .yibin div:nth-child(1) {
        font-size: 26px;

    }
    .sichuan .yibin div:nth-child(2) input {
        margin: 0 10px;
    }
    .sichuan .yibin div:nth-child(3) input {
        margin: 0 10px;
    }
    .sichuan .yibin div:nth-child(5) input {
        width: 400px;
        text-align: center;
    }
    .sichuan .yibin div:nth-child(6) {
        height: 35%;
        padding-top: 5px;
    }
    .sichuan .yibin div:last-child {
        border: 0;
    }
    .sichuan .yibin .yibin_01 {
        position: absolute;
        bottom: 4px;
        left: 350px;
        width: 70px;
        height: 40px;
        border-radius: 5px;
        background-color: 	#FFDEAD;
    }
    .sichuan .yibin .yibin_02 {
        position: absolute;
        bottom: 4px;
        right: 350px;
        width: 70px;
        height: 40px;
        border-radius: 5px;
        background-color: 		#228B22;
        opacity: .7;
    }
</style>
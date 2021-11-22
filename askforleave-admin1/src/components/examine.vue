<template>
    <div class="dongnan">
        <div class="nan" :class="{macao: ismacao}">
            <button class="taiwan iconfont" @click="outexamine">&#xe7f5;</button>
            <div class="lingnan">
                <div>姓名：</div><div>{{this.$store.state.name}}</div>
                <div>专业：</div><div>{{this.$store.state.class}}</div>
            </div>
            <div class="jiangnan">
                <div>
                    <h1>请假类型<i class="iconfont">&#xe63c;</i></h1>
                    <span :class="{type: isActive}">事假</span><span :class="{type: hasError}">病假</span>
                </div>
                <div>请假时间：<input type="text" disabled="disabled" v-model="this.$store.state.apply_time"></div>
                <div><i>具体说明：</i><textarea rows="8" cols="59" disabled="disabled" v-text="this.$store.state.reason"></textarea></div>
                <div>
                    <button @click="chngemacao">否决</button>
                    <i></i>
                    <button @click="agree">同意</button>
                </div>
            </div>
        </div>
        <div class="zhong" :class="{macao: ismacao}">
            <button class="taiwan2 iconfont" @click="outexamine">&#xe7f5;</button>
            <div class="lingnan lingnan2">
                <div>姓名：</div><div>{{this.$store.state.name}}</div><br>
                <div>专业：</div><div>{{this.$store.state.class}}</div>
            </div>
            <div class="jiangnan2">
                <div>
                    <span :class="{type: isActive}">事假</span><span :class="{type: hasError}">病假</span>
                </div>
                <div>请假时间：<input type="text" disabled="disabled" v-model="this.$store.state.apply_time"></div>
                <div><i>具体说明：</i><textarea rows="8" cols="46" disabled="disabled" v-text="this.$store.state.reason"></textarea></div>
                <div>
                    <button @click="chngemacao">否决</button>
                    <i></i>
                    <button @click="agree">同意</button>
                </div>
            </div>
        </div>
        <div class="bei" :class="{macao: !ismacao}">
            <button class="hongkong iconfont" @click="chngemacao">&#xe7f5;</button>
            <div>原因填写</div>
            <textarea rows="10" cols="40" v-model="veto_reason"></textarea>
            <button @click="sendreject">确定</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isActive: this.$store.state.type1,
            hasError: this.$store.state.type2,
            ismacao: false,
            veto_reason: ''
        }
    },
    methods: {
        outexamine() {
            this.$store.state.examine = ''
        },
        chngemacao() {
            this.ismacao = !this.ismacao;
        },
        agree() {
            if(this.$store.state.id > -1)
            {
                this.$axios.post("/api/leave/leave_approve", {
                    id: this.$store.state.id
                }, {}).then(value => {
                    if(value.data.code==200)
                    {
                        alert("审核通过！")
                        location.reload();
                    }
                }, reason => {
                    console.log(reason);
                })
            }
        },
        sendreject() {
            this.$store.state.veto_reason = this.veto_reason;
            this.$axios.post("/api/leave/leave_veto", {
                veto_reason: this.$store.state.veto_reason,
                id: this.$store.state.id
            }, {}).then(value => {
                if(value.data.code==200)
                {
                    console.log(value);
                    //this.$store.state.tableData.splice(this.$store.state.index, 1);
                    this.veto_reason = '';
                    location.reload();
                }
                else if(value.data.code==422)
                {
                    alert("请填写否决原因。");
                }
            }, reason => {
                console.log(reason);
            })
        }
    }
}
</script>

<style scoped>
    .dongnan {
        position: absolute;
        width: 100%;
        height: 100%;
        text-align: center;
        background-color: rgba(0,0,0,.85);
        z-index: 3000;
    }
    .taiwan {
        position: relative;
        top: 1.5rem;
        right: 7rem;
        width: .9rem;
        height: .9rem;
        color: #fff;
        font-size: 90px;
        background-color: rgba(0,0,0,.5);
        border-radius: 50%;
    }
    .taiwan:hover {
        color: #86868b;
    }
    .dongnan .lingnan {
        width: 10.66rem;
        height: .9rem;
        margin: 2.5rem auto 0!important;
        color: #86868b;
        font-size: 28px;
        font-weight: 700;
        line-height: .9rem;
        background: #1d1d1f;
        border-radius: 50px;
    }
    .dongnan .lingnan div {
        display: inline-block;
    }
    .dongnan .lingnan div:nth-child(odd) {
        width: 25%;
        height: 100%;
        background-color: #fff;
        border-radius: 50px;
    }
    .dongnan .lingnan div:nth-child(even) {
        width: 25%;
        height: 100%;
    }
    .dongnan .jiangnan {
        width: 15rem;
        height: 8.5rem;
        margin: .5rem auto 0;
        background-color: #fff;
        border-radius: 35px;
        overflow: hidden;
    }
    .dongnan .jiangnan div:first-child {
        margin-top: .5rem;
        padding-left: 2.1rem;
        text-align: left;
    }
    .dongnan .jiangnan div:first-child h1 {
        margin-right: 1.3rem;
        display: inline-block;
        font-size: 30px;
    }
    .dongnan .jiangnan div:first-child h1 i {
        font-size: .4rem;
    }
    .dongnan .jiangnan div:first-child span {
        display: inline-block;
        width: 2.8rem;
        height: .66rem;
        margin-right: .1rem;
        font-size: 28px;
        font-weight: 700;
        text-align: center;
        line-height: .66rem;
        border-radius: 30px;
        /*background: #F5F5F7;*/
    }
    .type {
        background: #F5F5F7;
    }
    .dongnan .jiangnan div:nth-child(2) {
        margin-top: .7rem;
        font-size: 26px;
        color: #1d1d1f;
        font-weight: 800;
        line-height: .7rem;
        font-family: SF Pro Text,SF Pro Icons,AOS Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
    }
    .dongnan .jiangnan div:nth-child(2) input {
        width: 8rem;
        height: .75rem;
        border: 1px solid #d6d6d6;
        border-radius: 25px;
        text-align: center;
    }
    .dongnan .jiangnan div:nth-child(3) {
        margin-top: .8rem;
    }
    .dongnan .jiangnan div:nth-child(3) i {
        display: inline-block;
        width: 1.5rem;
        height: .75rem;
        font-size: 26px;
        color: #1d1d1f;
        font-weight: 800;
        text-align: center;
        line-height: .7rem;
        font-family: SF Pro Text,SF Pro Icons,AOS Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
        vertical-align: top;
        border: 1px solid #d6d6d6;
        border-top-left-radius: 35px;
        border-bottom-left-radius: 35px;
        background-color: #F5F5F7;
    }
    .dongnan .jiangnan div:nth-child(3) textarea {
        margin-left: 5px;
        border-radius: 55px;
        border-top-left-radius: 0;
    }
    .dongnan .jiangnan div:nth-child(4) {
        margin-top: .8rem;
    }
    .dongnan .jiangnan div:nth-child(4) button {
        width: 1.14rem;
        height: 0.66rem;
        color: #fff;
        background-color: #0071e3;
        border-radius: 35px;
    }
    .dongnan .jiangnan div:nth-child(4) i {
        display: inline-block;
        width: 2rem;
    }
    .hongkong {
        position: relative;
        top: 1.5rem;
        left: 0rem;
        width: .9rem;
        height: .9rem;
        color: #fff;
        font-size: 90px;
        background-color: rgba(0,0,0,.5);
        border-radius: 50%;
    }
    .hongkong:hover {
        color: #86868b;
    }
    .bei div {
        width: 2.6rem;
        height: .8rem;
        margin: 2rem auto 0;
        background-color: #fff;
        border-radius: 50px;
        color: #86868b;
        font-size: 28px;
        font-weight: 700;
        line-height: .8rem;
    }
    .bei textarea {
        display: block;
        margin: .2rem auto;
        border-radius: 35px;
    }
    .bei button:last-child {
        width: 1.15rem;
        height: 0.66rem;
        color: #fff;
        background-color: #244c74;
        border-radius: 35px;
    }
    .macao {
        display: none!important;
    }

    .zhong {
        display: none;
    }
    .taiwan2 {
        width: .9rem;
        height: .9rem;
        margin: 2rem auto 0;
        color: #fff;
        font-size: 90px;
        background-color: rgba(0,0,0,.5);
        border-radius: 50%;
    }
    .taiwan2:hover {
        color: #86868b;
    }
    .dongnan .lingnan {
        margin: .3rem auto 0;
    }
    .dongnan .jiangnan2 {
        width: 10rem;
        height: 8.5rem;
        margin: 1.2rem auto 0;
        background-color: #fff;
        border-radius: 35px;
        overflow: hidden;
    }
    .dongnan .jiangnan2 div:first-child {
        margin-top: .5rem;
        padding-left: 2.1rem;
        text-align: left;
    }
    .dongnan .jiangnan2 div:first-child span {
        display: inline-block;
        width: 2.8rem;
        height: .66rem;
        margin-right: .1rem;
        font-size: 28px;
        font-weight: 700;
        text-align: center;
        line-height: .66rem;
        border-radius: 30px;
        /*background: #F5F5F7;*/
    }
    .dongnan .jiangnan2 div:nth-child(2) {
        margin-top: .7rem;
        font-size: 26px;
        color: #1d1d1f;
        font-weight: 800;
        line-height: .7rem;
        font-family: SF Pro Text,SF Pro Icons,AOS Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
    }
    .dongnan .jiangnan2 div:nth-child(2) input {
        width: 8rem;
        height: .75rem;
        border: 1px solid #d6d6d6;
        border-radius: 25px;
        text-align: center;
    }
    .dongnan .jiangnan2 div:nth-child(3) {
        margin-top: .3rem;
    }
    .dongnan .jiangnan2 div:nth-child(3) i {
        display: block;
        width: 2.2rem;
        height: .75rem;
        margin: 0 auto .1rem;
        font-size: 26px;
        color: #1d1d1f;
        font-weight: 800;
        text-align: center;
        line-height: .7rem;
        font-family: SF Pro Text,SF Pro Icons,AOS Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
        vertical-align: top;
        border: 1px solid #d6d6d6;
        border-radius: 35px;
        background-color: #F5F5F7;
    }
    .dongnan .jiangnan2 div:nth-child(3) textarea {
        margin-left: 5px;
        padding: 10px;
        border-radius: 55px;
    }
    .dongnan .jiangnan2 div:nth-child(4) {
        margin-top: .8rem;
    }
    .dongnan .jiangnan2 div:nth-child(4) button {
        width: 1.14rem;
        height: 0.66rem;
        color: #fff;
        background-color: #0071e3;
        border-radius: 35px;
    }
    .dongnan .jiangnan2 div:nth-child(4) i {
        display: inline-block;
        width: 2rem;
    }
    .dongnan .jiangnan2 div:nth-child(4) {
        margin-top: .1rem;
    }
    @media all and (max-width: 610px) {
        .nan {
            display: none;
        }
        .zhong {
            display: block;
        }
    }
</style>
<template>
    <div class="huaxia">
        <heads></heads>
        <div class="dongnan demo-input-size">
            <h1>管理员 登录</h1>
            <input type="text" placeholder="请输入账号" v-model="username">
            <div><input type="password" placeholder="请输入密码" v-model="password"><i class="iconfont" @click="denglu">&#xe7b1;</i></div>
        </div>
    </div>
</template>

<script>
import heads from './heads.vue'
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        //登录
        denglu() {
            //console.log(this.user, this.password);
            this.$axios.post("api/login", {
                password: parseInt(this.password),
                account: parseInt(this.username)
            }, {}).then(value => {
                //console.log("登录：",value.data.code);
                if(value.data.code === 200)
                {
                    //console.log("成功");
                    //this.to = 'apply';
                    //document.querySelector('.dongguan').click();
                    this.$router.push('/apply');
                    sessionStorage.setItem('componentId', 'handle');
                    this.$store.state.componentId = sessionStorage.getItem('componentId');
                }
                else
                {
                    alert("账号或密码错误，请重新确认。")
                }
            }, reason => {
                console.log(reason);
            })
        }
    },
    components: {
        heads
    }
}
</script>

<style scoped>
    .dongnan {
        width: 7rem;
        height: 8rem;
        margin: 0 auto;
        margin-top: 1.5rem;
        text-align: center;
    }
    .dongnan h1 {
        text-align: center;
        font-size: 0.4rem;
        font-weight: 600;
        margin-bottom: .2rem;
        color: rgba(0,0,0,0.8);
        font-family: SF Pro Display,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
    }
    .dongnan input {
        width: 75%;
        height: .75rem;
        padding-left: .05rem;
        border: 1px solid #d6d6d6;
        border-radius: 25px;
    }
    .dongnan div {
        width: 75%;
        height: .75rem;
        margin: .5rem auto 0;
        border: 1px solid #d6d6d6;
        border-radius: 25px;
        line-height: .75rem;
        overflow: hidden;
    }
    .dongnan div input {
        width: 85%;
        padding-left: 0;
        border: 0;
    }
    .dongnan div i {
        display: inline-block;
        width: 11%;
        height: 80%;
        color: #d6d6d6;
        font-size: 16px;
        font-weight: 800;
        line-height: .56rem;
        border: 1px solid #d6d6d6;
        border-radius: 50%;
        cursor: pointer;
    }
</style>
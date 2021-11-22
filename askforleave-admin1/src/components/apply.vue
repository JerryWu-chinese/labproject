<template>
        <el-container>
          <el-header style="padding: 0"><heads></heads></el-header>
          <el-container>
              <component :is="this.$store.state.examine"></component>
            <el-aside width="15%" style="background-color: #f5f5f7;">
                <div class="guangdong" :class="{type: isActive}" @click="changeone">待处理</div>
                <div class="guangxi" :class="{type: !isActive}" @click="changetwo">已处理</div>
                <button class="xianggang" @click="quit">退出</button>
            </el-aside>
            <el-main style="background-color: #fff;">
                <component :is="this.$store.state.componentId"></component>
            </el-main>
          </el-container>
        </el-container>
</template>
<script>
import heads from './heads.vue'
import handle from './handle.vue'
import approved from './approved.vue'
import examine from './examine.vue'
import revise from './revise.vue'
//import func from 'vue-editor-bridge'
export default {
    data() {
        return {
            isActive: true
        }
    },
    methods: {
        changeone() {
            //this.$store.state.istable = 'handle';
            sessionStorage.setItem('componentId', 'handle');
            this.$store.state.componentId = sessionStorage.getItem('componentId');
            this.isActive = true
        },
        changetwo() {
            //this.$store.state.istable = 'approved';
            sessionStorage.setItem('componentId', 'approved');
            this.$store.state.componentId = sessionStorage.getItem('componentId');
            this.isActive = false
        },
        quit() {
            this.$router.push('/login')
            sessionStorage.clear();
        }
    },
    created: function () {
        if(sessionStorage.getItem('componentId') == null)
        {
            this.$router.push('/login');
        }
        else
        {
            if(sessionStorage.getItem('componentId') == "approved")
            {
                this.isActive = false;
            }
            this.$store.state.componentId = sessionStorage.getItem('componentId');
        }
    },
    components: {
        heads,
        handle,
        approved,
        examine,
        revise
    }
}
</script>

<style scoped>
    html,body,#app,.el-container{
        /*设置内部填充为0，几个布局元素之间没有间距*/
        padding: 0px;
         /*外部间距也是如此设置*/
        margin: 0px;
        /*统一设置高度为100%*/
        height: 100%;
    }
    .guangdong {
        height: 1.3rem;
        margin: .1rem 0;
        background-color: gainsboro;
        font-size: .4rem;
        text-align: center;
        line-height: 1.3rem;
        border-radius: 1.3rem;
    }
    .guangxi {
        height: 1.3rem;
        background-color: gainsboro;
        font-size: .4rem;
        text-align: center;
        line-height: 1.3rem;
        border-radius: 1.3rem;
    }
    .xianggang {
        position: relative;
        top: 3em;
        width: 100%;
        height: 1.3rem;
        background-color: rgba(0,0,0,0.8);
        font-size: .4rem;
        color: #fff;
        text-align: center;
        line-height: 1.3rem;
        border-radius: 1.3rem;
    }
    .type {
        background-color: #06c;
    }
</style>
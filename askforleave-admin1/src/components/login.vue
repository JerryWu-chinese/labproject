<template>
  <div class="huanan">
    <heads></heads>
    <div class="guangdong">
		<div class="guangzhou">管理登录</div>
		<div class="foshan"><span>账号：</span><input type="text" v-model="user"></div>
		<div class="zhuhai">
			<span>密码：</span>
			<input type="password" v-model="password">
			<!-- <router-link to="forget" class="forget">忘记密码</router-link> -->
		</div>
		<!-- <router-link :to="{path:to}" tag="button" class="dongguan" @click.native="denglu">登录</router-link> -->
        <button class="dongguan" @click="denglu">登录</button>
    </div>
  </div>
</template>

<script>
import heads from './heads.vue'
export default {
    data: function() {
        return {
            user: '',
            password: '',
            to: ''
        }
    },
    methods: {
        //登录
        denglu() {
            //console.log(this.user, this.password);
            this.$axios.post("api/login", {
                password: parseInt(this.password),
                account: parseInt(this.user)
            }, {}).then(value => {
                //console.log("登录：",value.data.code);
                if(value.data.code === 200)
                {
                    //console.log("成功");
                    //this.to = 'apply';
                    //document.querySelector('.dongguan').click();
                    this.$router.push('/apply')
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
  .huanan {
    position: relative;
    height: 100%;
  }
  .guangdong {
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 750px;
    height: 400px;
    border: 1px solid #000;
  }
  .guangzhou {
	  height: 35%;
	  font-size: 40px;
	  font-weight: 600;
	  text-align: center;
	  line-height: 140px;
	  background-color: 	#FFC0CB;
  }
  .foshan {
	  height: 20%;
	  text-align: center;
	  background-color: 	#FFF0F5;
  }
  .foshan span {
	  font-size: 20px;
	  font-weight: 600;
  }
	.foshan input {
		width: 35%;
		height: 38%;
		margin-left: 20px;
		border: 1px solid #000;
	}
  .zhuhai {
	  height: 25%;
	  text-align: center;
	  background-color: 	#E6E6FA;
  }
  .zhuhai span {
	  font-size: 20px;
	  font-weight: 600;
  }
	.zhuhai input {
		width: 35%;
		height: 31%;
		margin-left: 20px;
		border: 1px solid #000;
	}
	.zhuhai .forget {
		position: absolute;
		bottom: 78px;
		right: 140px;
		font-size: 14px;
		font-weight: normal;
	}
	.zhuhai .forget:hover {
		color: #1E90FF;
	}
  .dongguan {
	  width: 125px;
	  height: 30px;
	  position: absolute;
      margin: auto;
      top: 315px;
      left: 0;
      right: 0;
      bottom: 0;
	  background-color: 	#1E90FF;
	  border-radius: 5px;
  }
</style>
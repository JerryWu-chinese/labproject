<template>
  <div class="huanan">
	  <heads></heads>
	  <div class="guangdong">
		<div class="guangzhou">忘记密码</div>
		<div class="foshan"><span>邮箱：</span><input type="text"></div>
		<div class="zhuhai">
			<span>验证码：</span>
			<input type="text">
			<button class="yanzheng">发送验证码</button>
		</div>
		<router-link to="modify" tag="button" class="dongguan">修改密码</router-link>
    </div>
  </div>
</template>

<script>
import heads from './heads.vue'

export default {
	data: function() {
		return {}
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
	  padding-left: 110px;
	  background-color: 	#FFF0F5;
  }
  .foshan span {
	  font-size: 20px;
	  font-weight: 600;
  }
	.foshan input {
		width: 50%;
		height: 38%;
		margin-left: 20px;
		border: 1px solid #000;
	}
  .zhuhai {
	  height: 25%;
	  padding-left: 91px;
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
	.zhuhai .yanzheng {
		position: absolute;
		width: 100px;
		height: 25px;
		top: 142px;
		right: 90px;
		background-color: #1E90FF;;
		font-size: 14px;
		font-weight: normal;
        color: #fff;
		border-radius: 5px;
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
      color: #fff;
	  border-radius: 5px;
  }
</style>
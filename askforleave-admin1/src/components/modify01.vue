<template>
    <div class="guangdong">
		<div class="guangzhou">重置密码</div>
		<div class="foshan"><span>新密码：</span><input type="text"></div>
		<div class="zhuhai">
			<span>确认密码：</span>
			<input type="password">
		</div>
		<button class="dongguan" @click="toggle">修改密码</button>
    </div>
</template>

<script>
export default {
    data: function() {
        return {}
    },
    methods: {
        toggle() {
            this.$emit("toggle")
        }
    },
}
</script>

<style scoped>
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
      padding-left: 175px;
	  background-color: 	#E6E6FA;
  }
  .zhuhai span {
	  font-size: 20px;
	  font-weight: 600;
  }
	.zhuhai input {
		width: 46%;
		height: 31%;
		margin-left: 19px;
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
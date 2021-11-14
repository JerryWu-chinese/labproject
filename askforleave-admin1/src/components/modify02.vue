<template>
    <div class="guangdong">
		<div class="guangzhou">修改密码成功</div>
		<router-link to="login" tag="button" class="dongguan">返回登录页面</router-link>
    </div>
</template>

<script>
export default {
    
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
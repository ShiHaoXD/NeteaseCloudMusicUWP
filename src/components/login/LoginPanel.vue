<template>
	<div class="loginPanel">
		<div class="login btn" @click="whichComponent = 'LoginByPhone'">
			手机号登录
		</div>
		<div class="register btn" @click="whichComponent = 'Register'">注册</div>
		<div class="back btn" @click="goBack()">返回</div>
	</div>
</template>

<script setup lang="ts">
import { inject, Ref } from "vue";
const whichComponent = inject("whichComponent") as Ref<string>;
const goBack = inject("goBack") as Function;
</script>

<style scoped lang="scss">
.loginPanel {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	.btn {
		color: #d33a31;
		width: 200px;
		height: 50px;
		border-radius: 50px;
		border: 1px solid #d33a31;
		text-align: center;
		line-height: 50px;
		margin: 10px;
		transition: all 0.1s linear;
	}
	.btn:hover {
		background-color: #d69c99;
		opacity: 0.7;
	}
	.btn:active {
		transform: scale(0.95);
	}
	.back {
		margin-top: 50px;
		border-radius: 0;
		width: 100px;
		background-color: #d33a31;
		color: white;
	}
}
</style>

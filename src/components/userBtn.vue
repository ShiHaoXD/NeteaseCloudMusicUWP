<template>
	<Login v-if="isLoginShow && !isLogin"></Login>
	<div class="userItem">
		<div class="userBtn" @click="clickToLogin">
			<img :src="imgSrc" class="userIcon" />
			<div id="userID">{{ userName }}</div>
		</div>
		<div class="message icon">
			<div class="isNewMessage" v-if="isNewMessage">{{ isNewMessage }}</div>
			<img src="@/assets/message.png" />
		</div>
		<div class="setting icon">
			<img src="@/assets/setting.png" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeMount, provide, Ref, ref, watch } from "vue";
import useStore from "@/store";
import { storeToRefs } from "pinia";
import Login from "./login/Login.vue";
const imgSrc = computed(() => {
	if (isLogin.value) return userInfo.userInfo.value.userIcon;
	return require("@/assets/1.jpeg");
});
const isNewMessage = ref();
const userName = computed(() => {
	if (isLogin.value) return userInfo.userInfo.value.userName;
	return "未登录";
});
const userInfo = storeToRefs(useStore().userInfo);
const isLogin = inject("isLogin") as Ref;
const isLoginShow = ref(false);
provide("goBack", goBack);
function clickToLogin() {
	isLoginShow.value = true;
}
function goBack() {
	isLoginShow.value = false;
}
</script>

<style scoped lang="scss">
.userItem {
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 100%;
	.userBtn {
		display: flex;
		align-items: center;
		cursor: default;
		img {
			width: 25px;
			height: 25px;
			border-radius: 25px;
		}
	}
	.userBtn:active {
		transition: all 0.1s linear;
		transform: scale(0.95);
	}
	#userID {
		width: 50px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-left: 10px;
	}
	.message {
		position: relative;
		.isNewMessage {
			position: absolute;
			right: 2px;
			top: 2px;
			width: 16px;
			height: 16px;
			border-radius: 10px;
			background-color: #c72e2e;
			color: white;
			font-size: 10px;
			font-weight: bold;
			text-align: center;
			line-height: 16px;
		}
	}
	.icon {
		padding: 10px;
		img {
			width: 20px;
			height: 20px;
		}
	}
}
</style>

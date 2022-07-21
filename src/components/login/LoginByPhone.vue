<template>
	<div class="panel">
		<div class="btn">
			<div class="back" @click="whichComponent = 'loginPanel'">&lt;</div>
			<div class="close" @click="goBack()">×</div>
		</div>
		<div class="input">
			<div class="name">
				<input type="text" placeholder="请输入电话号码" v-model="name" />
			</div>
			<div class="password">
				<input type="password" placeholder="请输入密码" v-model="password" />
			</div>
		</div>
		<div class="tips">{{ tips }}</div>
		<div class="loginBtn" :class="canLogin ? 'canLogin' : ''" @click="login">
			登录
		</div>
	</div>
</template>

<script setup lang="ts">
import { getRecentPlayList, loginByPhone } from "@/http/getUserInfo";
import { computed, ref, inject, Ref } from "vue";
import { loginResult } from "@/types";
import useStore from "@/store";
import { storeToRefs } from "pinia";
const name = ref("");
const password = ref("");
const tips = ref("");
const userInfoStore = useStore().userInfo;
const { userInfo, recentMusicList } = storeToRefs(userInfoStore);
const canLogin = computed(() => {
	return name.value != "" && password.value != "";
});
const isLogin = inject("isLogin") as Ref<boolean>;
const goBack = inject("goBack") as Function;
const whichComponent = inject("whichComponent");
async function login() {
	if (name.value.length != 11) {
		tips.value = "请输入正确的11位电话";
		return;
	}
	tips.value = "登陆中";
	const res = (await loginByPhone(name.value, password.value)) as loginResult;
	if (res.code !== 200) tips.value = "密码或账号错误";
	else {
		tips.value = "登录成功";
		isLogin.value = true;
		userInfo.value = {
			userID: res.account!.id,
			userName: res.profile.nickname,
			userIcon: res.profile.avatarUrl,
		};
		recentMusicList.value = await getRecentPlayList(userInfo.value.userID!);
	}
}
</script>
0

<style scoped lang="scss">
.panel {
	background-color: #fafafc;
	height: 100%;
}
.btn {
	display: flex;
	justify-content: space-between;
	height: 50px;
	align-items: center;
	margin: 0 10px;
	cursor: default;
	font-weight: bold;
	transition: all 0.5s linear;
	div {
		height: 20px;
		width: 20px;
		font-size: 20px;
	}
	div:hover {
		color: gray;
	}
}
.input {
	background-color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 100px;
	.name,
	.password {
		height: 50px;
		width: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	input {
		height: 20px;
		width: 200px;
		border: none;
		outline: none;
	}
	div {
		border-bottom: 3px solid #999999;
	}
}
.loginBtn {
	background-color: #d83f3f;
	color: white;
	height: 50px;
	width: 200px;
	margin: 40px auto;
	text-align: center;
	line-height: 50px;
	transition: all 0.1s ease-in;
	opacity: 0.5;
}
.loginBtn:active {
	transform: scale(0.95);
}
.tips {
	margin: 0 auto;
	width: 200px;
	color: #d83f3f;
}
.canLogin {
	opacity: 1;
}
</style>

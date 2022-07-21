<template>
	<div class="loginView">
		<div class="cover"></div>
		<div class="panel">
			<component :is="componentArray[whichComponent]"></component>
		</div>
	</div>
</template>

<script setup lang="ts">
import { provide, ref } from "vue";
import loginPanel from "./LoginPanel.vue";
import Register from "./Register.vue";
import LoginByPhone from "./LoginByPhone.vue";
const componentArray: { [key: string]: any } = {
	loginPanel,
	Register,
	LoginByPhone,
};
const whichComponent = ref("loginPanel");
provide("whichComponent", whichComponent);
</script>

<style scoped lang="scss">
.loginView {
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 100%;
	z-index: 9;
}
.cover {
	background-color: white;
	opacity: 0.5;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 100%;
	z-index: 9;
}
.panel {
	height: 500px;
	width: 300px;
	position: absolute;
	background-color: white;
	opacity: 1;
	z-index: 999;
	box-shadow: 5px 10px 10px;
}
</style>

<template>
	<div class="tarBar">
		<div class="btn" v-for="(val, index) in arr" :class="isActive(val.path)">
			{{ val.name }}
			<div class="bar"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
	arr: {
		default: [
			{
				name: "单曲",
				path: "single",
			},
			{
				name: "歌手",
				path: "singer",
			},
			{
				name: "专辑",
				path: "album",
			},
			{
				name: "MV",
				path: "MV",
			},
		],
	},
});
const pathName = ref(props.arr[0].path);
function isActive(name: string) {
	return name == pathName.value ? "active" : "";
}
</script>

<style scoped lang="scss">
.tarBar {
	display: flex;
	justify-content: flex-start;
	height: 30px;
	border-bottom: 1px solid #e4e4e7;
	.btn {
		margin-right: 30px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.bar {
			height: 2px;
			width: 100%;
			background-color: #c62e2e;
			display: none;
		}
	}
	.active {
		color: #c62e2e;
		.bar {
			display: block;
		}
	}
}
</style>

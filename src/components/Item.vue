<template>
	<slot></slot>
	<div
		class="item"
		v-for="(item, index) in itemData"
		:class="isActive(item.id)"
		@click="whichItem.change(item.id), changeItem(item.id)"
	>
		<img class="imgIcon" src="../assets/search.png" />
		<span>{{ item.name }}</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType } from "vue";
import { itemDataTypeInt } from "../types";
import useStore from "../store";
import { useRouter } from "vue-router";
export default defineComponent({
	name: "item",
	props: {
		text: {
			type: String,
			default: "嘀嘀",
		},
		itemData: {
			type: Array as PropType<itemDataTypeInt[]>,
			default: [],
		},
	},
	methods: {},
	setup() {
		const { whichItem } = useStore();
		const reload = inject("reload") as Function;
		const $route = useRouter();
		function changeItem(id: string) {
			$route.push("/home/" + id).then(() => {
				reload();
			});
		}
		function isActive(id: string) {
			return id == whichItem.whichItem ? "is-active" : "";
		}
		return { whichItem, isActive, changeItem };
	},
});
</script>

<style scoped lang="scss">
.itemBtn {
	margin: 10px 0;
	span {
		margin-left: 10px;
		font-size: 12px;
		color: #999999;
	}
}
.imgIcon {
	width: 20px;
	height: 20px;
	margin: 0 10px;
}
.item {
	width: 100%;
	display: flex;
	height: 50px;
	align-items: center;
	span {
		font-size: 16px;
		font-weight: 500;
		display: block;
		width: 100%;
	}
}
.item:hover {
	background-color: #e8e8eb;
}
.item:active {
	transition: all 0.2s linear;
	transform: scale(0.99);
}
.is-active {
	background-color: #dddde1;
	position: relative;
}
.is-active::before {
	content: " ";
	width: 5px;
	background-color: #bc2f2e;
	height: 100%;
}
</style>

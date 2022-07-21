<template>
	<div class="container">
		<slot></slot>
		<div
			class="musicList"
			v-for="(val, index) in dataArray"
			:class="isActive(dataArray[index].songId!),clickIndex==index?'onClickDown':''"
			@mousedown="clickDown(index)"
			@mouseup="clickUp()"
			@click="clickToPlay(val)"
		>
			<div class="musicName">{{ val.name }}</div>
			<div class="singer">
				<span v-for="(value, i) in val.singer">{{ value }}</span>
			</div>
			<div class="album" v-if="album">{{ val.album }}</div>
			<div class="endTime">
				{{ secFormat(val.endTime!) }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject, PropType, reactive, ref } from "vue";
import { musicItemTypeInt } from "@/types";
import { secFormat } from "@/util";
import useStore from "@/store";
import { storeToRefs } from "pinia";
const props = defineProps({
	dataArray: {
		type: Array as PropType<Array<musicItemTypeInt>>,
		default: [
			{
				name: "说好不哭",
				singer: ["周杰伦"],
				endTime: 168,
				album: "说好不哭",
			},
			{
				name: "说好不哭",
				singer: ["周杰伦"],
				endTime: 170,
				album: "说好不哭",
			},
		],
	},
	album: {
		default: false,
	},
});
const userInfo = useStore().userInfo;
const { currentPlayIndex, recentMusicList } = storeToRefs(userInfo);
const clickIndex = ref(-1);
function isActive(id: number) {
	if (recentMusicList.value.length == 0) return "";
	return recentMusicList.value[currentPlayIndex.value].songId == id
		? "isActive"
		: "";
}
function clickDown(i: number) {
	clickIndex.value = i;
}
function clickUp() {
	clickIndex.value = -1;
}
function clickToPlay(arr: musicItemTypeInt) {
	const index = recentMusicList.value.findIndex((val) => {
		return arr.songId == val.songId;
	});
	if (index == -1) {
		recentMusicList.value.push(arr);
		currentPlayIndex.value = recentMusicList.value.length - 1;
	} else currentPlayIndex.value = index;
}
</script>

<style scoped lang="scss">
.container {
	overflow: auto;
	scrollbar-width: none; /* firefox */
	-ms-overflow-style: none; /* IE 10+ */
	&::-webkit-scrollbar {
		// chrome safari
		display: none;
	}
	height: 100%;
}
.musicList {
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 40px;
	position: relative;
	transition: all 0.1s linear;
	.musicName {
		width: 50%;
	}
	.singer,
	.endTime,
	.album {
		font-size: 14px;
		color: #999999;
	}
	.singer,
	.album {
		width: 150px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		span {
			margin: 0;
		}
		span + span::before {
			content: "/";
		}
	}
}
.musicList:nth-child(odd) {
	background-color: #f4f4f6;
}
.isActive {
	div {
		color: #c62e2e !important;
	}
}
.musicList:hover {
	background-color: #e8e8ea;
}
.isActive::before {
	content: " ";
	position: absolute;
	border-left: 15px solid #c62e2e;
	border-right: 8px solid transparent;
	border-top: 8px solid transparent;
	border-bottom: 8px solid transparent;
	left: 15px;
}
.onClickDown {
	transform: scale(0.99);
}
</style>

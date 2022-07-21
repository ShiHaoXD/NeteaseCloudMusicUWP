<template>
	<audio
		:src="userInfoStore.currentMusic"
		ref="music"
		@canplay="getEndTime"
		@timeupdate="getUpdate"
		@ended="playNext"
	></audio>
	<div class="bottomPlayer">
		<div class="imgContainer">
			<img :src="currentIcon" class="musicIcon" />
		</div>
		<div class="preBtn playerBtn" @click="playPre">
			<span class="icon iconfont icon-shangyishou"></span>
		</div>
		<div class="playBtn playerBtn" @click="play">
			<span class="icon iconfont" :class="isPlayIcon"></span>
		</div>
		<div class="nextBtn playerBtn" @click="playNext">
			<span class="icon iconfont icon-xiayishou"></span>
		</div>
		<div class="progressBarContainer">
			<div class="musicName">
				<div class="nameAndSinger">
					<div class="name" v-if="recentMusicList.length">
						{{ recentMusicList[currentPlayIndex].name }}
					</div>
					<div class="singer" v-if="recentMusicList.length">
						<span
							v-for="(value, i) in recentMusicList[currentPlayIndex].singer"
							>{{ value }}</span
						>
					</div>
				</div>
				<div class="songProgress">
					<div class="currentTime">{{ secFormat(currentTime) }}</div>
					<div class="endTime">{{ secFormat(endTime) }}</div>
				</div>
			</div>
			<div class="progressBar" @click="changeBar($event)">
				<div class="bar" :style="{ width: barProcess + 'px' }"></div>
				<div class="barIcon">
					<div class="point"></div>
				</div>
			</div>
		</div>
		<div class="isLike btn">
			<span class="icon iconfont icon-aixin"></span>
		</div>
		<div class="playMode btn">
			<span class="icon iconfont icon-24gl-repeat2"></span>
		</div>
		<div class="voice btn">
			<span class="icon iconfont icon-laba"></span>
		</div>
		<div class="playList btn">
			<div class="listPanel" v-if="listShow">
				<MusicItem :data-array="recentMusicList">
					<div class="topGuider">
						<div class="name">播放列表</div>
						<div class="btnPanel">
							<div class="btn">
								<span class="icon iconfont icon-laba"></span>
								<div>收藏全部</div>
							</div>
							<div class="btn">
								<span class="icon iconfont icon-laba"></span>
								<div>清空</div>
							</div>
						</div>
					</div></MusicItem
				>
			</div>
			<span class="icon iconfont icon-liebiao_o" @click="showList"></span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch, provide } from "vue";
import useStore from "@/store";
import MusicItem from "./MusicItem.vue";
import _ from "lodash";
import { secFormat } from "@/util";
import { storeToRefs } from "pinia";
import { getPicSrc } from "@/http/searchInfo";
const music = ref();
const currentTime = ref(0);
const endTime = ref(0);
const isPlay = ref(false);
const isPlayIcon = ref("icon-bofang");
const listShow = ref(false);
const barProcess = computed(() => {
	return (currentTime.value * 500) / endTime.value;
});
const userInfoStore = useStore().userInfo;
const { currentPlayIndex, recentMusicList, currentIcon } =
	storeToRefs(userInfoStore);
function playNext() {
	currentPlayIndex.value =
		currentPlayIndex.value >= recentMusicList.value.length - 1
			? 0
			: currentPlayIndex.value + 1;
	autoPlay();
}
function playPre() {
	currentPlayIndex.value =
		currentPlayIndex.value <= 0
			? recentMusicList.value.length - 1
			: currentPlayIndex.value - 1;
	autoPlay();
}
function getEndTime() {
	endTime.value = Math.floor(music.value.duration);
}
function getUpdate() {
	currentTime.value = Math.floor(music.value.currentTime);
}
function play() {
	isPlay.value ? music.value.pause() : music.value.play();
	isPlay.value = !isPlay.value;
}

function autoPlay() {
	music.value
		? (music.value.oncanplay = () => {
				music.value.play();
				isPlay.value = true;
				music.value.oncanplay = null;
		  })
		: null;
}

function changeBar(e: MouseEvent) {
	music.value.currentTime = ((e.offsetX * endTime.value) / 500).toFixed(2);
}

function showList() {
	listShow.value = !listShow.value;
}

watch(isPlay, () => {
	isPlayIcon.value = isPlay.value ? "icon-24gf-pause2" : "icon-bofang";
});
watch(currentPlayIndex, () => {
	autoPlay();
});
watch(recentMusicList, () => {
	autoPlay();
});
// watch(currentIcon, async () => {
// 	if (!currentIcon.value) {
// 		recentMusicList.value[currentPlayIndex.value].songIcon = await getPicSrc(
// 			recentMusicList.value[currentPlayIndex.value].songId!
// 		);
// 	}
// });
// console.log(await getMusicSrcById(['33894312']))
//进度条拖动暂时鸽了
// function move(e: MouseEvent):any {
// 	console.log(e.movementX);
// }
// function mouseDown(e: MouseEvent) {
// 	e.target!.addEventListener("mousemove",move(e));
// }
// function mouseUp(e: MouseEvent) {
// 	e.target!.removeEventListener("mousemove", move(e));
// }
</script>

<style scoped lang="scss">
.topGuider {
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #dddde1;
	justify-content: space-between;
	position: sticky;
	top: 0;
	z-index: 1;
	background-color: white;
	.name {
		font-size: 16px;
		margin-left: 40px;
	}
	.btnPanel {
		display: flex;
		margin-right: 40px;
		.btn {
			display: flex;
			font-size: 12px;
			width: auto;
			align-items: center;
			margin: 0;
		}
		.btn + .btn::before {
			content: "|";
			margin: 0 10px;
			color: #dddde1;
		}
		span {
			margin-right: 5px;
		}
	}
}
.progressBarContainer {
	display: flex;
	flex-direction: column;
	width: 500px;
	margin-left: 40px;
	.musicName {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.nameAndSinger {
			display: flex;
			align-items: center;
			font-size: 12px;
			.singer {
				color: #999999;
				text-align: center;
				span {
					margin: 0;
				}
				span + span::before {
					content: "/";
				}
			}
			.singer::before {
				content: "-";
				color: #999999;
				margin: 0 5px;
			}
		}
		.songProgress {
			display: flex;
			align-items: center;
			font-size: 12px;
			.endTime {
				color: #999999;
				text-align: center;
			}
			.endTime::before {
				content: "/";
				color: #999999;
				margin: 0 5px;
			}
		}
		.songProgress {
			display: flex;
		}
	}
	.progressBar {
		width: 100%;
		height: 3px;
		margin: 10px 0;
		background-color: #999999;
		display: flex;
		align-items: center;
		.bar {
			background-color: red;
			height: 100%;
			transition: all 0.1s linear;
		}
		.barIcon {
			width: 15px;
			height: 15px;
			border-radius: 100%;
			border: 1px solid #999999;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: white;
			z-index: 1;
			transition: all 0.1s linear;
			.point {
				height: 3px;
				width: 3px;
				border-radius: 100%;
				background-color: #df3b3b;
			}
		}
	}
}
.bottomPlayer {
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
	.imgContainer {
		height: 100%;
		margin-right: 50px;
		.musicIcon {
			height: 100%;
		}
	}
	.playerBtn {
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		background-color: #df3b3b;
		margin-left: 20px;
		width: 40px;
		height: 40px;
		border-radius: 100%;
	}
	.nextBtn,
	.preBtn {
		width: 30px;
		height: 30px;
	}
	.btn {
		width: 20px;
		height: 20px;
		margin-left: 40px;
		position: relative;
		span {
			font-size: 20px;
		}
		.listPanel {
			width: 500px;
			height: 500px;
			position: absolute;
			right: 0;
			bottom: 40px;
			background-color: white;
			border: 1px solid #dddde1;
		}
	}
}
</style>

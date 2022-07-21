<template>
	<div class="songSheetContainer">
		<div class="songSheetHeader">
			<img :src="sheetImg" alt="" class="backgroundImg" />
			<div class="containerName">歌单</div>
			<div class="songSheetShow">
				<img class="sheetImg" :src="sheetImg" />
				<div class="detail">
					<h4 class="sheetName">{{ sheetName }}</h4>
					<div class="user">
						<img :src="creatorImg" alt="" class="userIcon" />
						<div class="userName">{{ creator }}</div>
					</div>
					<div class="tags">
						标签:

						<div class="tag" v-for="(val, index) in tags">{{ val }}</div>
					</div>
					<div class="describe">
						介绍:
						<div class="describeDetail">{{ describe }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="musicSheet">
			<MusicItemVue :data-array="music" :album="true">
				<div class="featureBar">
					<div style="margin-left: 40px">歌单列表</div>
					<div class="boxBorder">
						<input placeholder="搜索歌单歌曲" v-model="filterVal" />
						<div class="clearBtn" v-if="filterVal != ''" :onclick="clearVal">
							×
						</div>
					</div>
				</div>
			</MusicItemVue>
		</div>
	</div>
</template>

<script setup lang="ts">
import MusicItemVue from "@/components/MusicItem.vue";
import { getMusicListDetailById, getAllMusicListById } from "@/http/musicList";
import { musicItemTypeInt } from "@/types";
import { Ref, ref } from "@vue/reactivity";
import { computed } from "vue";
import { useRoute } from "vue-router";
const $route = useRoute();
const listId = ref($route.params.listId as String);
const sheetName = ref("");
const sheetImg = ref("");
const describe = ref("");
const tags = ref("");
const creator = ref("");
const creatorImg = ref("");
const music = ref([]) as Ref<musicItemTypeInt[]>;
const filterVal = ref("");
const clearVal = () => {
	filterVal.value = "";
};
const filterData = computed(() => {
	return music.value.filter((val) => {});
});
const getData = async () => {
	const res = await getMusicListDetailById(
		Number.parseInt(listId.value as string)
	);
	const song = await getAllMusicListById(
		Number.parseInt(listId.value as string)
	);
	sheetName.value = res.data.playlist.name;
	sheetImg.value = res.data.playlist.coverImgUrl;
	describe.value = res.data.playlist.description;
	tags.value = res.data.playlist.tags;
	creator.value = res.data.playlist.creator.name;
	creatorImg.value = res.data.playlist.creator.avatarUrl;
	for (const val of song.data.songs) {
		music.value.push({
			name: val.name,
			songId: val.id,
			endTime: Math.floor(val.dt / 1000),
			singer: val.ar.map((x: any) => x.name),
			album: val.al.name,
			songIcon: val.al.picUrl,
		});
	}
};
0;
getData();
</script>

<style scoped lang="scss">
.songSheetContainer {
	padding: 0 20px;
	display: flex;
	flex-direction: column;
	position: relative;
	.musicSheet {
		width: 100%;
		overflow: auto;
		height: 550px;
		margin-top: 20px;
	}
	.songSheetHeader {
		overflow: hidden;
	}
	.backgroundImg {
		position: absolute;
		opacity: 0.05;
		width: 100%;
		filter: blur(8px);
		top: -600px;
		left: 0px;
	}
	.containerName {
		margin-top: 10px;
		font-size: 14px;
	}
	.sheetImg {
		width: 200px;
	}
	.songSheetShow {
		display: flex;
		margin-top: 10px;
		.user {
			display: flex;
			align-items: center;
			margin: 10px 0;
			.userIcon {
				width: 30px;
				border-radius: 30px;
				margin-right: 10px;
			}
		}
		.detail {
			margin-left: 20px;
			margin-top: 20px;
			.sheetName {
				font-size: large;
				margin: 0;
			}
		}
		.tags {
			display: flex;
			.tag + .tag::before {
				content: "/";
			}
		}
		.describe {
			display: flex;
		}
	}
}
.featureBar {
	display: flex;
	height: 50px;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	position: sticky;
	top: 0;
	background-color: white;
	z-index: 1;
	border-bottom: 2px solid #e4e4e7;
	.boxBorder {
		width: 200px;
		height: 30px;
		border-radius: 50px;
		border: 1px solid #e4e4e7;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px;
		input {
			outline: none;
			border: none;
			width: 80%;
			height: 16px;
			margin: 0 6px;
			font-size: 12px;
		}
		.clearBtn {
			cursor: default;
		}
	}
}
</style>

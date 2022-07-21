<template>
	<div id="search">
		<div class="input box">
			<input
				placeholder=""
				v-model="inputVal"
				@focus="onFocus = true"
				@blur="onFocus = false"
				@keydown="enterDown($event, inputVal)"
			/>
			<div class="btn">
				<div class="clear" v-if="inputVal !== ''" @click="inputVal = ''">×</div>
				<img src="@/assets/search.png" @click="search(inputVal)" />
			</div>
		</div>
		<template v-if="inputVal !== '' && onFocus">
			<div
				class="box searchList"
				v-for="(val, index) in suggest"
				:style="{ top: index * 51 + 71.6 + 'px' }"
				@click="search(val.keyword)"
			>
				<img src="@/assets/search.png" />
				{{ val.keyword }}
			</div>
		</template>
		<div class="resultContainer">
			<div class="tarBar" v-if="$route.path !== '/home/search/default'">
				<div
					class="btn"
					v-for="(val, index) in arr"
					:class="isActive(val.path)"
				>
					{{ val.name }}
					<div class="bar"></div>
				</div>
			</div>
			<div class="container">
				<router-view v-if="isRefresh"></router-view>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { searchSuggest } from "@/http/getUserInfo";
import { suggestType, suggestRequestType } from "@/types";
import * as _ from "lodash";
import { nextTick, reactive, ref, watch, provide } from "vue";
import { useRouter } from "vue-router";
import { getHotWord } from "@/http/searchInfo";
const inputVal = ref("");
const suggest = reactive([] as suggestType[]);
const onFocus = ref(false);
const pathName = ref("single");
const $router = useRouter();
const isRefresh = ref(true);
const hotWords = ref();
const searchHistory = reactive(
	new Set(JSON.parse(localStorage.getItem("searchHistory") || "[]"))
);
const arr = [
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
];
watch(
	inputVal,
	_.debounce(async () => {
		suggest.length = 0;
		const res: suggestRequestType = await (
			await searchSuggest(inputVal.value)
		).data;
		suggest.push(...res.result.allMatch);
	}, 1000)
);
watch(searchHistory, () => {
	localStorage.setItem(
		"searchHistory",
		JSON.stringify(Array.from(searchHistory))
	);
});
function isActive(name: string) {
	return name == pathName.value ? "active" : "";
}
function changeRouter(name: string, keywords: string) {
	$router.push("/home/search/" + name + "/" + keywords).then(() => {
		reload();
	});
}
function reload() {
	isRefresh.value = false;
	nextTick(() => {
		isRefresh.value = true;
	});
}
function search(keywords: string) {
	inputVal.value = keywords;
	addHistory(keywords);
	changeRouter("single", keywords);
}
function enterDown(e: KeyboardEvent, keywords: string) {
	if (e.key === "Enter") search(keywords);
}
function addHistory(keywords: string) {
	if (searchHistory.has(keywords)) searchHistory.delete(keywords);
	searchHistory.add(keywords);
}
const getData = async () => {
	hotWords.value = await (await getHotWord()).data;
};
getData();
provide("reload", reload);
provide("search", search);
provide("hotWords", hotWords);
provide("searchHistory", searchHistory);
</script>

<style scoped lang="scss">
#search {
	background-color: #fafafc;
	width: 100%;
	height: 100%;
	padding: 20px 40px;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-sizing: border-box;
	position: relative;
	.searchList:hover {
		background-color: #dddde1;
	}
	.searchList {
		width: calc(100% - 80px);
		position: absolute;
		cursor: default;
		z-index: 10;
	}
	.box {
		height: 50px;
		background-color: white;
		display: flex;
		align-items: center;
		padding: 0 10px;
		color: #333333;
		border: 1px solid #e4e4e7;
		img {
			height: 20px;
			margin-right: 10px;
		}
	}
	.box + .box {
		border-top: none;
	}
	.input {
		width: 100%;
		justify-content: space-between;
		input {
			outline: none;
			border: none;
			height: 30px;
			font-size: 18px;
			flex-grow: 2;
		}
		.btn {
			height: 100%;
			display: flex;
			align-items: center;
			margin-left: 50px;
			img {
				height: 30px;
				margin-left: 20px;
			}
			.clear {
				cursor: default;
			}
		}
	}
}
.resultContainer {
	width: calc(100% + 20px);
	margin-top: 20px;
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
}
.container {
	width: 100%;
	padding: 20px 0;
	height: 600px;
}
</style>

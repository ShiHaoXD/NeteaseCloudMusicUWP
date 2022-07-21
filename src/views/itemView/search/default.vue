<template>
	<div class="default">
		<div class="hot">
			<div class="title">热门搜索</div>
			<div class="hotWords">
				<template v-if="hotWords">
					<div
						class="words"
						v-for="(val, index) in hotWords.result.hots"
						@click="search(val.first)"
					>
						{{ val.first }}
					</div>
				</template>
			</div>
		</div>
		<div class="slice"></div>
		<div class="history">
			<div class="title">搜索历史</div>
			<div class="list" v-for="(val, index) in searchHistory">
				<div @click="search(val)" class="words">{{ val }}</div>
				<div class="cancel" @click="searchHistory.splice(index, 1)">×</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { hotWordsType } from "@/types";
import { inject, Ref, ref } from "vue";
const search = inject("search") as Function;
const hotWords = inject("hotWords") as Ref<hotWordsType>;
const searchHistory = inject("searchHistory") as Array<string>;
</script>

<style scoped lang="scss">
.default {
	display: flex;
	.hot,
	.history {
		flex: auto;
		flex-grow: 0;
		width: 370px;
		flex-shrink: 0;
		.hotWords {
			display: flex;
			flex-wrap: wrap;
			.words {
				border: 1px solid #d2d2d3;
				padding: 0 20px;
				border-radius: 20px;
				margin: 10px;
				color: #333333;
				font-size: 14px;
				cursor: default;
			}
		}
	}
	.slice {
		width: 20px;
		height: 100%;
	}
	.title {
		font-size: 18px;
		color: #666666;
		border-bottom: 1px solid #e4e4e7;
		height: 30px;
	}
	.list {
		margin: 20px 0;
		display: flex;
		justify-content: space-between;
		cursor: default;
		.words{
			flex-grow: 2;
		}
	}
}
</style>

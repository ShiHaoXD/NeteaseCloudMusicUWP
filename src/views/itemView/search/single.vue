<template>
	<div class="container">
		<MusicItem :album="true" :data-array="dataArray"></MusicItem>
	</div>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import { useRoute } from "vue-router";
import { search } from "@/http/getUserInfo";
import { searchType } from "@/config/searchConfig";
import MusicItem from "@/components/MusicItem.vue";
import { musicItemTypeInt } from "@/types";
const $route = useRoute();
const keywords = ref($route.params.keyword);
const dataArray = ref([]) as Ref<musicItemTypeInt[]>;

const getData = async () => {
	const data = await search(keywords.value as string, searchType["单曲"]);
	for (const val of data.data.result.songs) {
		dataArray.value.push({
			name: val.name,
			songId: val.id,
			endTime: Math.floor(val.duration / 1000),
			singer: val.artists.map((x: any) => x.name),
			album: val.album.name,
		});
	}
};
getData();
</script>

<style scoped>
.container {
	height: 100%;
}
</style>

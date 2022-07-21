import { $http } from ".";
import { AxiosPromise } from "axios";
import { hotWordsType } from "@/types";
export async function getHotWord() {
	return await $http({
		url: "/search/hot",
	});
}
export async function getPicSrc(id: number):Promise<string> {
	const data = await $http({ url: `/song/detail?ids=${id}` });
	return data.data.songs[0].al.picUrl;
}

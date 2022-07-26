import { AxiosResponse } from "axios";
import { $http } from ".";
export async function getBanner() {
	return await $http({
		url: "/banner?type=1",
	});
}
export async function getRecommend() {
	return await $http({
		url: "/recommend/resource",
	});
}

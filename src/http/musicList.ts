import { $http } from ".";
export const getMusicListDetailById = async (id: number) => {
	return await $http({
		url: `/playlist/detail?id=${id}`,
	});
};
export const getMusicListById = async (id: number) => {
	return await $http({
		url: `/user/playlist?uid=${id}`,
	});
};
export const getAllMusicListById = async (id: number) => {
	return await $http({
		url: `/playlist/track/all?id=${id}`,
	});
};

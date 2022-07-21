import { AxiosResponse } from "axios";
import { $http } from ".";
import { infoDataInt, suggestRequestType, userInfo } from "../types";
export async function getUserInfoById(data: {
	id: string;
}): Promise<infoDataInt> {
	return <infoDataInt>((
		await $http({
			url: "/getUserInfoById",
			params: data,
		})
	).data as unknown);
}

export async function getMusicSrcById(
	id: Array<string> | number
): Promise<Array<string>> {
	let ids;
	if (!(id instanceof Array)) {
		ids = id;
	} else {
		ids = (id as Array<string>).reduce((pre, cur) => {
			return pre + "," + cur;
		});
	}
	const res = await $http({
		url: `/song/url?id=${ids}`,
	});
	return res.data.data.map((x: any) => x.url);
}
export async function getRecentPlayList(id: number, type = 0) {
	const data: any = await (
		await $http({
			url: `/user/record?uid=${id}&type=${type}`,
		})
	).data;
	const list = [];
	for (const val of data.allData) {
		list.push({
			name: val.song.name,
			songId: val.song.id,
			singer: val.song.ar.map((x: any) => x.name),
			songIcon: val.song.al.picUrl,
			endTime: Math.floor(val.song.dt / 1000),
		});
	}
	return list;
}
export async function getLoginStatus() {
	// try {
	const data: any = await (
		await $http({
			url: "/login/status",
		})
	).data.data;
	if (!data.account) throw Error;
	return {
		userID: data.account.id,
		userName: data.profile.nickname,
		userIcon: data.profile.avatarUrl,
	} as userInfo;
}
export async function checkLogin() {
	const data: any = await (
		await $http({
			url: "/login/status",
		})
	).data;
	if (data.data.account == null)
		return {
			state: false,
			data: null,
		};
	return {
		state: true,
		data: data,
	};
}
export async function loginByPhone(
	phoneNumber: string,
	password: string
): Promise<unknown> {
	return await (
		await $http({
			url: `/login/cellphone?phone=${phoneNumber}&password=${password}`,
			method: "post",
		})
	).data;
}
export async function searchSuggest(
	keywords: string,
	type = "mobile"
): Promise<AxiosResponse<suggestRequestType>> {
	return (await $http({
		url: `/search/suggest?keywords=${keywords}&type=${type}`,
	})) as AxiosResponse<suggestRequestType>;
}

export async function search(keywords: string, type: number) {
	return $http({
		url: `/search?keywords=${keywords}&type=${type}`,
	});
}

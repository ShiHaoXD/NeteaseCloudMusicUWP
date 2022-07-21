import { defineStore } from "pinia";
import { getRecentPlayList, getLoginStatus } from "@/http/getUserInfo";
import { musicItemTypeInt, userInfo } from "@/types";
import { getPicSrc } from "@/http/searchInfo";
export const useUserInfoStore = defineStore("userInfo", {
	state: () => {
		const userInfo: userInfo = {};
		const recentMusicList: Array<musicItemTypeInt> = [];
		const currentPlayIndex = 0;
		return { userInfo, recentMusicList, currentPlayIndex };
	},
	getters: {
		currentMusic: (state) => {
			return state.recentMusicList.length == 0
				? ""
				: ` https://music.163.com/song/media/outer/url?id=${
						state.recentMusicList[state.currentPlayIndex].songId
				  }.mp3`;
		},
		currentIcon: (state) => {
			async function setSongIcon() {
				state.recentMusicList[state.currentPlayIndex].songIcon =
					await getPicSrc(
						state.recentMusicList[state.currentPlayIndex].songId!
					);
			}
			if (
				state.recentMusicList.length !== 0&&!state.recentMusicList[state.currentPlayIndex].songIcon
			)
				setSongIcon();
			return state.recentMusicList.length == 0 ||
				!state.recentMusicList[state.currentPlayIndex].songIcon
				? "https://p2.music.126.net/cpoUinrExafBHL5Nv5iDHQ==/109951166361218466.jpg"
				: state.recentMusicList[state.currentPlayIndex].songIcon;
		},
	},
	actions: {
		async request() {
			this.userInfo = await getLoginStatus();
			this.recentMusicList = await getRecentPlayList(this.userInfo.userID!);
		},
	},
});

<template>
	<div id="musicPlayer">
		<div class="topShow">
			<span>网易云音乐</span>
		</div>
		<div class="container">
			<div class="leftItem">
				<div class="itemBtn">
					<img src="@/assets/item.png" class="imgIcon" />
				</div>
				<div
					class="leftItemContainer"
					@mouseenter="mouseIn"
					@mouseleave="mouseOut"
					ref="leftItemContainer"
					@scroll="mousewheel()"
				>
					<transition name="scrollBar">
						<div
							class="scrollBar"
							v-if="isSelect && scrollHeight != scrollBarHeight"
							:style="{
								height: scrollBarHeight + 'px',
								top: scrollBarTop + 'px',
							}"
						></div>
					</transition>
					<item :item-data="item.data" v-for="(item, index) in items">
						<div class="itemButton" v-if="item.title">
							<span>{{ item.title }}</span>
						</div></item
					>
				</div>
				<div class="userBtn">
					<userBtn userId="234"></userBtn>
				</div>
			</div>
			<div class="rightContainer">
				<router-view v-if="isRefresh"></router-view>
			</div>
		</div>
		<div class="musicPlayer">
			<myPlayer></myPlayer>
		</div>
	</div>
</template>

<script lang="ts">
import {
	computed,
	defineComponent,
	getCurrentInstance,
	nextTick,
	onBeforeMount,
	onMounted,
	provide,
	reactive,
	ref,
	watch,
} from "vue";
import Swiper from "@/components/Swiper.vue";
import Item from "@/components/Item.vue";
import { itemArray } from "@/config/itemConfig";
import search from "./itemView/search.vue";
import findMusic from "./itemView/findMusic.vue";
import { useWhichItemStore } from "@/store/myStore";
import userBtn from "@/components/userBtn.vue";
import myPlayer from "@/components/myPlayer.vue";
import { storeToRefs } from "pinia";
import useStore from "@/store";
import { checkLogin, getRecentPlayList } from "@/http/getUserInfo";
import { getMusicListById } from "@/http/musicList";
export default defineComponent({
	name: "Home",
	components: {
		Swiper,
		Item,
		search,
		findMusic,
		userBtn,
		myPlayer,
	},
	methods: {
		mouseIn() {
			this.isSelect = true;
		},
		mouseOut() {
			this.isSelect = false;
		},
		mousewheel() {
			this.scrollItemTop = this.leftItemContainer.scrollTop;
		},
	},
	setup() {
		const useWhichItem = useWhichItemStore();
		const { whichItem } = storeToRefs(useWhichItem);
		const isSelect = ref(true);
		const leftItemContainer = ref();
		const containerHeight = ref(0);
		const scrollHeight = ref(0);
		const scrollBarHeight = computed(() => {
			return Math.floor(containerHeight.value ** 2 / scrollHeight.value);
		});
		const scrollItemTop = ref(0);
		const userInfoStore = useStore().userInfo;
		const { userInfo, recentMusicList } = storeToRefs(userInfoStore);
		const isRefresh = ref(true);
		const scrollBarTop = computed(() => {
			return (
				scrollItemTop.value +
				Math.floor(
					(scrollItemTop.value *
						(containerHeight.value - scrollBarHeight.value)) /
						(scrollHeight.value - containerHeight.value)
				)
			);
		});
		const isLogin = ref(false);
		const items = reactive(itemArray);
		function reload() {
			isRefresh.value = false;
			nextTick(() => {
				isRefresh.value = true;
			});
		}
		watch(isLogin, async () => {
			const res = await getMusicListById(userInfo.value.userID!);
			for (const val of res.data.playlist) {
				items[2].data.push({
					name: val.name,
					id: `songSheet/${val.id}`,
				});
			}
		});
		onBeforeMount(async () => {
			const state = await checkLogin();
			isLogin.value = state.state;
			if (isLogin.value) {
				const res = state.data.data;
				userInfo.value = {
					userID: res.account!.id,
					userName: res.profile.nickname,
					userIcon: res.profile.avatarUrl,
				};
				recentMusicList.value = await getRecentPlayList(userInfo.value.userID!);
			}
		});
		provide("isLogin", isLogin);
		provide("reload", reload);
		onMounted(() => {
			leftItemContainer.value = getCurrentInstance()?.refs.leftItemContainer;
			containerHeight.value = leftItemContainer.value.offsetHeight;
			scrollHeight.value = leftItemContainer.value.scrollHeight;
		});
		return {
			itemArray,
			whichItem,
			isSelect,
			containerHeight,
			scrollHeight,
			scrollBarHeight,
			leftItemContainer,
			scrollItemTop,
			scrollBarTop,
			items,
			isRefresh,
		};
	},
});
</script>
<style scoped lang="scss">
@font-face {
	font-family: "NotoSansSC-Light";
	src: url("../assets/font/NotoSansSC-Light.otf");
}
* {
	font-family: "NotoSansSC-Light";
}
#musicPlayer {
	margin: 0 auto;
	width: 1100px;
	box-shadow: 0 6px 18px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	.musicPlayer {
		width: 100%;
		height: 80px;
		border-top: 1px solid #dddde1;
	}
	.topShow {
		background-color: #bc2f2e;
		width: 100%;
		font-size: 12px;
		height: 30px;
		line-height: 30px;
		color: white;
		span {
			margin-left: 10px;
		}
	}
	.container {
		position: relative;
		width: 100%;
		display: flex;
		.rightContainer {
			flex-grow: 2;
			width: 850px;
		}
		.leftItem {
			width: 250px;
			background-color: #f3f3f5;
			border-right: 1px solid #dddde1;
			.userBtn {
				width: 100%;
				border-top: 1px solid #dddde1;
				height: 70px;
			}
			.leftItemContainer {
				height: 700px;
				overflow: auto;
				position: relative;
				scrollbar-width: none; /* firefox */
				-ms-overflow-style: none; /* IE 10+ */
				&::-webkit-scrollbar {
					// chrome safari
					display: none;
				}
				.scrollBar {
					position: absolute;
					top: 0;
					right: 0;
					width: 10px;
					height: 100px;
					background-color: #c8c9cc;
					border-radius: 20px;
					z-index: 1;
				}
				.scrollBar:hover {
					background-color: #999999;
				}
			}
			.itemButton {
				margin: 10px 10px;
				span {
					font-size: 12px;
					color: #999999;
				}
			}
			.itemBtn {
				padding: 10px 0;
				position: sticky;
				top: 0;
				z-index: 1;
				background-color: #f3f3f5;
				width: 100%;
			}
			.imgIcon {
				width: 20px;
				height: 20px;
				margin: 0 10px;
			}
		}
	}
}
.scrollBar-enter-active,
.scrollBar-leave-active {
	transition: opacity 0.2s ease;
}

.scrollBar-enter-from,
.scrollBar-leave-to {
	opacity: 0;
}

// ::-webkit-scrollbar {
// 	width: 10px;
// 	background-color: #f3f3f5;
// }
// /*定义滚动条轨道：内阴影+圆角*/
// ::-webkit-scrollbar-track {
// 	background-color: #f3f3f5;
// }
// /*定义滑块：内阴影+圆角*/
// ::-webkit-scrollbar-thumb {
// 	border-radius: 10px;
// 	background-color: #c8c9cc;
// }
</style>

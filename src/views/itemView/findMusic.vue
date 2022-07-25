<template>
	<div class="findMusicContainer">
		<div class="containerName">发现音乐</div>
		<div style="margin: 10px 0">
			<TarBar></TarBar>
		</div>
		<div style="margin: 10px 0">
			<SwiperVue></SwiperVue>
		</div>
		<div class="threeNav">
			<div class="privateFM nav">
				<div class="imgContainer">
					<svg
						t="1658737992322"
						class="icon"
						viewBox="0 0 1024 1024"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						p-id="9376"
						width="200"
						height="200"
					>
						<path
							d="M239.616 282.624c-7.68 0-15.36-4.096-18.944-11.776-5.12-10.24-0.512-23.04 9.728-28.16l326.656-158.72c10.24-5.12 23.04-0.512 28.16 9.728s0.512 23.04-9.728 28.16l-326.656 158.72c-3.072 1.536-6.144 2.048-9.216 2.048z"
							fill="#d81e06"
							p-id="9377"
						></path>
						<path
							d="M805.888 908.288H207.872c-57.856 0-104.96-47.104-104.96-104.96V360.96c0-57.856 47.104-104.96 104.96-104.96h598.016c57.856 0 104.96 47.104 104.96 104.96v442.368c0 57.856-47.104 104.96-104.96 104.96zM207.872 297.984c-34.816 0-62.976 28.16-62.976 62.976v442.368c0 34.816 28.16 62.976 62.976 62.976h598.016c34.816 0 62.976-28.16 62.976-62.976V360.96c0-34.816-28.16-62.976-62.976-62.976H207.872z"
							fill="#d81e06"
							p-id="9378"
						></path>
						<path
							d="M350.72 711.168c-71.168 0-128.512-57.856-128.512-128.512s57.856-128.512 128.512-128.512 128.512 57.856 128.512 128.512-57.856 128.512-128.512 128.512z m0-215.552c-47.616 0-86.528 38.912-86.528 86.528 0 47.616 38.912 86.528 86.528 86.528s86.528-38.912 86.528-86.528c0-47.616-38.912-86.528-86.528-86.528z"
							fill="#d81e06"
							p-id="9379"
						></path>
						<path
							d="M547.84 478.72m-20.992 0a20.992 20.992 0 1 0 41.984 0 20.992 20.992 0 1 0-41.984 0Z"
							fill="#d81e06"
							p-id="9380"
						></path>
						<path
							d="M770.048 499.712h-167.424c-11.776 0-20.992-9.216-20.992-20.992s9.216-20.992 20.992-20.992h167.424c11.776 0 20.992 9.216 20.992 20.992s-9.216 20.992-20.992 20.992z"
							fill="#d81e06"
							p-id="9381"
						></path>
						<path
							d="M547.84 686.08m-20.992 0a20.992 20.992 0 1 0 41.984 0 20.992 20.992 0 1 0-41.984 0Z"
							fill="#d81e06"
							p-id="9382"
						></path>
						<path
							d="M770.048 707.072h-167.424c-11.776 0-20.992-9.216-20.992-20.992s9.216-20.992 20.992-20.992h167.424c11.776 0 20.992 9.216 20.992 20.992s-9.216 20.992-20.992 20.992z"
							fill="#d81e06"
							p-id="9383"
						></path>
					</svg>
				</div>
				<div class="describe">
					<div class="title">私人FM</div>
					<div class="detail">享受你的音乐专属推荐</div>
				</div>
			</div>
			<div class="line"></div>
			<div class="everyDayMusic nav">
				<div class="imgContainer">
					<div class="date">25</div>
				</div>
				<div class="describe">
					<div class="title">每日歌曲推荐</div>
					<div class="detail">根据你的口味生成</div>
				</div>
			</div>
			<div class="line"></div>
			<div class="rankingList nav">
				<div class="imgContainer">
					<svg
						t="1658739368446"
						class="icon"
						viewBox="0 0 1024 1024"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						p-id="12604"
						width="200"
						height="200"
					>
						<path
							d="M617.173333 615.082667a42.666667 42.666667 0 0 1 16.085334-47.530667l67.413333-47.701333a42.666667 42.666667 0 0 1 49.322667 69.632l-42.112 29.824 82.176 264.021333c12.373333 39.722667-33.706667 71.850667-66.730667 46.506667L512 767.658667l-211.328 162.176c-33.066667 25.344-79.104-6.784-66.730667-46.506667l82.517334-265.088-214.272-162.944c-32.597333-24.746667-15.018667-76.714667 25.898666-76.629333l262.229334 0.64 80.896-263.808c12.330667-40.234667 69.248-40.234667 81.578666 0l80.896 263.808 262.229334-0.64a42.666667 42.666667 0 0 1 0.170666 85.333333l-293.802666 0.682667a42.666667 42.666667 0 0 1-40.874667-30.165334L512 273.493333l-49.408 161.024a42.666667 42.666667 0 0 1-40.874667 30.165334l-166.741333-0.384 136.96 104.106666a42.666667 42.666667 0 0 1 14.890667 46.677334l-51.456 165.205333 130.645333-100.266667a42.666667 42.666667 0 0 1 51.968 0l130.645333 100.266667-51.456-165.205333z"
							p-id="12605"
							fill="#d81e06"
						></path>
					</svg>
				</div>
				<div class="describe">
					<div class="title">私人FM</div>
					<div class="detail">最热音乐榜</div>
				</div>
			</div>
		</div>
		<div class="functionBar">
			<div class="functionBarSvg">
				<svg
					t="1658760588554"
					class="icon"
					viewBox="0 0 1024 1024"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					p-id="13602"
					width="200"
					height="200"
				>
					<path
						d="M725.333333 170.666667h74.709334C864.853333 170.666667 917.333333 223.189333 917.333333 288.096V799.893333C917.333333 864.757333 864.832 917.333333 800.042667 917.333333H223.957333C159.146667 917.333333 106.666667 864.810667 106.666667 799.904V288.106667C106.666667 223.242667 159.168 170.666667 223.957333 170.666667H298.666667v-32a32 32 0 0 1 64 0v32h298.666666v-32a32 32 0 0 1 64 0v32z m0 64v32a32 32 0 0 1-64 0v-32H362.666667v32a32 32 0 0 1-64 0v-32h-74.709334A53.354667 53.354667 0 0 0 170.666667 288.096V799.893333A53.301333 53.301333 0 0 0 223.957333 853.333333h576.085334A53.354667 53.354667 0 0 0 853.333333 799.904V288.106667A53.301333 53.301333 0 0 0 800.042667 234.666667H725.333333z m-10.666666 224a32 32 0 0 1 0 64H309.333333a32 32 0 0 1 0-64h405.333334zM586.666667 618.666667a32 32 0 0 1 0 64H309.333333a32 32 0 0 1 0-64h277.333334z"
						p-id="13603"
						fill="#d81e06"
					></path>
				</svg>
			</div>
			<div class="functionName">推荐歌单</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import SwiperVue from "@/components/Swiper.vue";
import TarBar from "@/components/tarBar.vue";
</script>

<style scoped lang="scss">
.functionBar {
	height: 30px;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	border-bottom: 1px solid rgb(228, 228, 231);
	.functionName {
		height: 100%;
		font-size: 16px;
		line-height: 20px;
	}
	.functionBarSvg {
		height: 20px;
		width: 20px;
		margin-right: 10px;
		svg {
			height: 100%;
			width: 100%;
		}
	}
}
.findMusicContainer {
	padding: 0 20px;
	display: flex;
	flex-direction: column;
	position: relative;
}
.containerName {
	margin-top: 10px;
	font-size: 14px;
}
.threeNav {
	display: flex;
	align-items: center;
	justify-content: space-around;
	height: 70px;
	margin-bottom: 30px;
}
.imgContainer {
	width: 60px;
	height: 60px;
	border: 2px solid #d81e06;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50px;
	.date {
		font-size: 40px;
		color: #d81e06;
	}
	svg {
		width: 70%;
		height: 70%;
	}
}
.describe {
	display: flex;
	flex-direction: column;
	margin-left: 10px;

	.detail {
		font-size: 12px;
		color: darkgray;
	}
}
.nav {
	display: flex;
	align-items: center;
}

.line {
	width: 1px;
	background-color: rgb(228, 228, 231);
	height: 100%;
	transform: scale(0.85);
}
</style>

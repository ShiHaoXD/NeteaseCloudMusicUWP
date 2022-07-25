<template>
	<div
		class="swiperVue"
		@mouseenter="stopPlay" @mouseout="autoPlay"
	>
		<div class="btn preBtn" @click="nowIndex--">
			<svg
				t="1658567810017"
				class="icon"
				viewBox="0 0 1024 1024"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				p-id="2452"
				width="200"
				height="200"
			>
				<path
					d="M729.6 931.2l-416-425.6 416-416c9.6-9.6 9.6-25.6 0-35.2-9.6-9.6-25.6-9.6-35.2 0l-432 435.2c-9.6 9.6-9.6 25.6 0 35.2l432 441.6c9.6 9.6 25.6 9.6 35.2 0C739.2 956.8 739.2 940.8 729.6 931.2z"
					p-id="2453"
					fill="#ffffff"
				></path>
			</svg>
		</div>
		<div class="btn nextBtn" @click="nowIndex++">
			<svg
				t="1658567768267"
				class="icon"
				viewBox="0 0 1024 1024"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				p-id="2297"
				width="200"
				height="200"
			>
				<path
					d="M761.6 489.6l-432-435.2c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l416 416-416 425.6c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l432-441.6C771.2 515.2 771.2 499.2 761.6 489.6z"
					p-id="2298"
					fill="#ffffff"
				></path>
			</svg>
		</div>
		<div class="swiper">
			<div class="swiperContainer">
				<div
					class="imgContainer"
					:class="getImgClass(index)"
					v-for="(val, index) in imgSrc"
					:key="'pic' + index"
				>
					<img :src="val" />
				</div>
			</div>
		</div>
		<div class="controller">
			<div
				class="controllerBtn"
				:class="isActive(index)"
				v-for="(val, index) in imgSrc"
				:key="'btn' + index"
				@click="btnChange(index)"
			></div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed } from "@vue/reactivity";
import { defineComponent, onMounted, ref, watch, toRefs } from "vue";
export default defineComponent({
	name: "swiper",
	methods: {
		change() {
			this.stopPlay();
			this.nowIndex++;
			this.autoPlay();
		},
		getImgClass(index: number) {
			switch (index) {
				case this.nowIndex:
					return "current";
				case this.pre:
					return "pre";
				case this.next:
					return "next";
				case this.prepre:
					return "prepre";
				case this.nextnext:
					return "nextnext";
			}
			return "";
		},
		isShow(index: number) {
			return index == this.pre || index == this.next;
		},
		isActive(index: number) {
			return this.nowIndex == index ? "active" : "";
		},
		btnChange(index: number) {
			this.nowIndex = index;
		},
	},
	props: {
		imgSrc: {
			default: [
				require("@/assets/1.jpeg"),
				require("@/assets/2.jpeg"),
				require("@/assets/3.jpeg"),
				require("@/assets/4.jpeg"),
				require("@/assets/1.jpeg"),
				require("@/assets/2.jpeg"),
				require("@/assets/3.jpeg"),
			],
		},
	},
	setup(props) {
		const { imgSrc } = toRefs(props);
		const nowIndex = ref(0);
		const pre = computed(() =>
			nowIndex.value - 1 >= 0 ? nowIndex.value - 1 : imgSrc.value.length - 1
		);
		const next = computed(() =>
			nowIndex.value + 1 < imgSrc.value.length ? nowIndex.value + 1 : 0
		);
		const prepre = computed(() =>
			pre.value - 1 >= 0 ? pre.value - 1 : imgSrc.value.length - 1
		);
		const nextnext = computed(() =>
			next.value + 1 < imgSrc.value.length ? next.value + 1 : 0
		);
		let timer = ref(0);
		function autoPlay(): void {
			timer.value = window.setInterval(() => nowIndex.value++, 3000);
		}
		function stopPlay(): void {
			clearInterval(timer.value);
		}
		watch(nowIndex, () => {
			nowIndex.value =
				nowIndex.value > imgSrc.value.length - 1 ? 0 : nowIndex.value;
			nowIndex.value =
				nowIndex.value < 0 ? imgSrc.value.length - 1 : nowIndex.value;
		});
		watch(timer, (val, oldVal) => {
			clearInterval(oldVal);
		});
		onMounted(() => {
			autoPlay();
		});
		return {
			imgSrc,
			nowIndex,
			pre,
			next,
			prepre,
			nextnext,
			autoPlay,
			stopPlay,
		};
	},
});
</script>

<style scoped lang="scss">
.btn {
	transform-origin: 100% 100%;
	position: absolute;
	height: 200px;
	width: 40px;
	z-index: 10;
	color: white;
	display: none;
	justify-content: center;
	align-items: center;
}
.btn:hover {
	background-color: black;
	opacity: 0.5;
}
.btn:active {
	background-color: black;
	opacity: 0.8;
}
.preBtn {
	transform: scale(0.85);
	left: 15px;
}
.nextBtn {
	transform: scale(0.85);
	right: 20px;
}
.swiperVue:hover .btn {
	display: flex;
}
.swiper {
	display: flex;
	justify-content: center;
	width: 100%;
	overflow: hidden;
	.swiperContainer {
		position: relative;
		width: 60%;
		height: 200px;
		display: flex;
		align-items: flex-end;
		.imgContainer {
			position: absolute;
			width: 100%;
			height: 100%;
			transition: all 1s ease-in;
			transform: translate(0, 0) scale(0.5);
			z-index: -1;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.pre {
			transform: translate(-75%, 0) scale(0.85);
			transform-origin: 100% 100%;
			filter: brightness(0.5);
			z-index: 1;
		}
		.next {
			transform: translate(75%, 0) scale(0.85);
			transform-origin: 100% 100%;
			filter: brightness(0.5);
			z-index: 1;
		}
		.prepre {
			transform: translate(-150%, 0) scale(0.85);
			transform-origin: 100% 100%;
			filter: brightness(0.5);
			z-index: 1;
		}
		.nextnext {
			transform: translate(150%, 0) scale(0.85);
			transform-origin: 100% 100%;
			filter: brightness(0.5);
			z-index: 1;
		}
		.current {
			z-index: 2;
			transform: translate(0, 0) scale(1);
		}
	}
}
.controller {
	display: flex;
	justify-content: center;
	width: 100%;
	margin-top: 20px;
	.controllerBtn {
		width: 10px;
		height: 10px;
		background-color: gray;
		margin-right: 20px;
		border-radius: 30px;
		cursor: pointer;
		transition: all 0.3 linear;
	}
	.active {
		background-color: red;
	}
}
</style>

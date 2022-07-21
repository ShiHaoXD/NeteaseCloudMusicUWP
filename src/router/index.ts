import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/home",
		name: "Home",
		component: Home,
		children: [
			{
				path: "/home/search",
				name: "search",
				alias: "/search",
				redirect: "/home/search/default",
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import("@/views/itemView/search.vue"),
				children: [
					{
						path: "/home/search/default",
						name: "searchDefault",
						component: () => import("@/views/itemView/search/default.vue"),
					},
					{
						path: "/home/search/single/:keyword",
						name: "searchSingle",
						// route level code-splitting
						// this generates a separate chunk (about.[hash].js) for this route
						// which is lazy-loaded when the route is visited.
						component: () => import("@/views/itemView/search/single.vue"),
					},
					{
						path: "/home/search/singer/:keyword",
						name: "searchSinger",
						// route level code-splitting
						// this generates a separate chunk (about.[hash].js) for this route
						// which is lazy-loaded when the route is visited.
						component: () => import("@/views/itemView/search/singer.vue"),
					},
				],
			},
			{
				path: "/home/findMusic",
				name: "findMusic",
				alias: ["/findMusic", "/"],
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import("../views/itemView/findMusic.vue"),
			},
			{
				path: "/home/DL",
				name: "DL",
				alias: ["/DL"],
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import("../views/itemView/default.vue"),
			},
			{
				path: "/home/recentPlay",
				name: "recentPlay",
				alias: ["/recentPlay"],
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import("../views/itemView/default.vue"),
			},
			{
				path: "/home/myMusicCloud",
				name: "myMusicCloud",
				alias: ["/myMusicCloud"],
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import("../views/itemView/default.vue"),
			},
			{
				path: "/home/myDianTai",
				name: "myDianTai",
				alias: ["/myDianTai"],
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import("../views/itemView/default.vue"),
			},
			{
				path: "/home/myCollect",
				name: "myCollect",
				alias: ["/myCollect"],
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import("../views/itemView/default.vue"),
			},
			{
				path: "/home/MV",
				name: "MV",
				alias: ["/MV"],
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import("../views/itemView/default.vue"),
			},
			{
				path: "/home/friends",
				name: "friends",
				alias: ["/friends"],
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import("../views/itemView/default.vue"),
			},
			{
				path: "/home/songSheet/:listId",
				name: "songSheet",
				alias: ["/localMusic/:listId", "/"],
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import("../views/itemView/musicList/index.vue"),
			},
			{
				path: "/home/localMusic",
				name: "localMusic",
				alias: ["/localMusic"],
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import("../views/itemView/default.vue"),
			},
		],
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});
export default router;

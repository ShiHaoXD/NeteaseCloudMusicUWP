import { defineStore } from "pinia";
export const useWhichItemStore = defineStore("whichItem", {
	state: () => {
		return { whichItem: "findMusic" };
	},
	actions: {
		change(id: string) {
			this.whichItem = id;
		},
	},
});

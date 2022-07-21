import { useWhichItemStore } from "./myStore";
import { useUserInfoStore } from "./userInfo";
// 统一导出方法
export default function useStore() {
	return {
		whichItem: useWhichItemStore(),
		userInfo: useUserInfoStore(),
	};
}

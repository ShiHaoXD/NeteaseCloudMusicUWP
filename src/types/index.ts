export interface itemDataTypeInt {
	name: string;
	id: string;
}
export interface itemDataInt {
	title?: string;
	data: Array<itemDataTypeInt>;
}
export interface infoDataInt {
	imgSrc: string;
	isNewMessage: string;
}
export interface music {
	src: string;
	imgSrc: string;
	isLike: boolean;
	name: string;
	singer: string;
}
export interface musicItemTypeInt {
	isLike?: boolean;
	name?: string;
	singer?: Array<string>;
	endTime?: number;
	size?: string;
	songId?: number;
	songIcon?: string;
	album?: string;
}
export interface userInfo {
	userID?: number;
	userName?: string;
	userIcon?: string;
}
export interface loginResult {
	code: number;
	msg?: string;
	loginType?: number;
	token?: string;
	profile: {
		nickname: string;
		avatarUrl: string;
	};
	bindings?: object;
	cookies?: string;
	account?: { id: number };
}
export interface suggestType {
	keyword: string;
	alg: string;
	type: number;
	lastKeyword: string;
	feature: string;
}

export interface suggestRequestType {
	code: number;
	result: {
		allMatch: suggestType[];
	};
}
export interface hotWordsType {
	code: number;
	result: {
		hots: Array<{
			first: string;
		}>;
	};
}

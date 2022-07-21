import Mock from "mockjs";

Mock.mock("/mock/Job", "get", {
	"data|5": [
		{
			jobName: "C#/ .NET全栈工程师",
			payMin: "10",
			payMax: " 15",
			payMonth: "15薪",
			welfare: "五险一金,员工旅游，年终奖金，定期体检",
			education: "本科",
			workingYears: "5年",
			publishTime: " 2022-0125T00:00:00",
			workPosition: " 苏州-工业园区",
			companyName: "元讯趣编程",
			id: 1,
		},
	],
	code: 200,
});

Mock.mock("/mock/getUserInfoById?id=234", "get", {
	data: {
		imgSrc:'https://i1.hdslb.com/bfs/face/13e613ddf6614bf02416ecb3d5c4d66ad6de42a1.jpg@120w_120h_1c_1s.webp',
		isNewMessage:'34',
	},
});

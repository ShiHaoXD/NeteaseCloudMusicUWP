import axios from "axios";
axios.defaults.withCredentials = true;
enum Code {
	"请求成功" = 200,
	"密码错误",
	"账号错误",
	"请求异常" = 999,
}
export const $http = axios.create({
	baseURL: "https://netease-cloud-music-api-shihaoxd.vercel.app",
	timeout: 5000,
	headers: {
		"Content-Type": "application/json;charset:utf-8",
	},
});
$http.interceptors.request.use((config) => {
	config.headers = config.headers || {};
	return config;
});
$http.interceptors.response.use(
	(res) => {
		return res;
	},
	(err) => {
		console.log(err);
	}
);

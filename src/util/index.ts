export function secFormat(s: number) {
	const min = Math.floor(s / 60);
	const sec = s % 60;
	return (min > 9 ? "" : "0") + min + ":" + (sec > 9 ? "" : "0") + sec;
}
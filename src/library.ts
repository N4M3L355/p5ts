/*-------------General Statistics, utility and Geometry Functions----------------*/
let sum = (...a: number[]): number => a.reduce((a, b) => a + b);
let mean = (...a: number[]): number => sum(...a) / a.length;
let product = (...a: [number]): number => a.reduce((a, b) => a * b);
let geoMean = (...a: [number]): number =>
	Math.abs(product(...a)) ** (1 / a.length);
let polarToCartesian = (middleX: number, middleY: number) => (
	radius: number,
	angle: number
) => ({
	x: Math.sin(angle) * radius + middleX,
	y: Math.cos(angle) * radius + middleY
});
let polarToCartesianMidScreen = polarToCartesian(
	window.innerWidth / 2,
	window.innerHeight / 2
);
let modulo = (m: number, n: number): number => ((m % n) + n) % n;
let normalize2 = (x: number): number =>
	x <= 0.5 ? 2 * x ** 2 : -2 * x ** 2 + 4 * x - 1;
let absCycle = (x: number, offset = 0): number =>
	Math.abs(modulo(x - offset, 1) - 1 / 2);
let sinCycle = (x: number, offset = 0): number =>
	(Math.sin((x + offset) * 2 * Math.PI) + 1) / 2;

let noiseNormalizer = (x:number) => {
	x = x*2;
	let t = 1 / 482 * ((241 * Math.sqrt(2323240000 * x ** 2 - 4391492000 * x + 2110825413) + 11616200 * x - 10978730) ** (1 / 3)
		- 12737 / (241 * Math.sqrt(2323240000 * x ** 2 - 4391492000 * x + 2110825413) + 11616200 * x - 10978730) ** (1 / 3) + 235);
	return 3 * (1 - t) * t ** 2+t ** 3;
};

module.exports = {
	sum,
	mean,
	product,
	geoMean,
	polarToCartesian,
	polarToCartesianMidScreen,
	modulo,
	normalize2,
	sinCycle,
	absCycle,
	noiseNormalizer
};

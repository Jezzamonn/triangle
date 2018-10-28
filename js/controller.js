import { loop, easeInOut, slurp, experp, divideInterval } from "./util";

const SIZE = 500;

export default class Controller {

	constructor() {
		this.period = 5;
		this.animAmt = 0;
	}

	update(dt) {
		this.animAmt += dt / this.period;
		this.animAmt %= 1;
	}

	/**
	 * @param {CanvasRenderingContext2D} context 
	 */
	render(context) {
		const size = 500;
		const thickness = 30;
		const numLines = 3;
		const offsetChange = 60;

		const skewAngle = 2 * Math.PI / numLines;
		const skewAmt = 1 / Math.tan(skewAngle);
		const skew = thickness * skewAmt;

		context.beginPath();
		context.fillStyle = 'black';

		for (let i = 0; i < numLines; i ++) {
			const localAnimAmt = loop(this.animAmt);

			const slideSlowAmt = 0.4;
			let slideAmt = localAnimAmt - 0.1 * i;
			slideAmt = divideInterval(slideAmt, 0 - slideSlowAmt, 0.5 + slideSlowAmt);
			slideAmt = easeInOut(slideAmt, 3);
			const slide = slurp(2 * size, 0, slideAmt)
	
			let offsetAmt = divideInterval(localAnimAmt, 0.6, 1);
			const timingCheatAmt = 0.2;
			offsetAmt = slurp(timingCheatAmt, 1, offsetAmt);
			offsetAmt = easeInOut(offsetAmt, 4);
			const offset = slurp(0, offsetChange, offsetAmt);

			const top = offset - thickness / 2;
			const bottom = offset + thickness / 2;

			context.rotate(2 * Math.PI / numLines);

			context.moveTo(-size + slide - skew/2, top);
			context.lineTo( size + slide - skew/2, top);
			context.lineTo( size + slide + skew/2, bottom);
			context.lineTo(-size + slide + skew/2, bottom);
			context.closePath();
		}

		context.fill('evenodd')

	}

}

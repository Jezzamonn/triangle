import { loop, easeInOut, slurp, experp, divideInterval } from "./util";

const SIZE = 500;

export default class Controller {

	constructor() {
		this.period = 3;
		this.animAmt = 0;
	}

	update(dt) {
		this.animAmt += 1 - (dt / this.period);
		this.animAmt %= 1;
	}

	/**
	 * @param {CanvasRenderingContext2D} context 
	 */
	render(context) {
		const scaleAmt = experp(1, 3, this.animAmt);
		context.scale(scaleAmt, scaleAmt);
		
		const size = 500;
		const thickness = 20;
		const numLines = 6;

		const skewAngle = 2 * Math.PI / numLines;
		const skewAmt = 1 / Math.tan(skewAngle);
		const skew = thickness * skewAmt;

		context.beginPath();
		context.fillStyle = 'black';

		for (let i = 0; i < numLines; i ++) {
			const localAnimAmt = this.animAmt;

			let offsetAmt = divideInterval(localAnimAmt, 0, 0.5);
			const timingCheatAmt = 0.2;
			offsetAmt = slurp(timingCheatAmt, 1, offsetAmt);
			offsetAmt = easeInOut(offsetAmt, 4);
			const offset = slurp(thickness, 2 * thickness, offsetAmt);

			const top = offset - thickness / 2;
			const bottom = offset + thickness / 2;

			const slideSlowAmt = 1;
			let slideAmt = divideInterval(localAnimAmt, 0.5 - slideSlowAmt, 1 + slideSlowAmt);
			slideAmt = easeInOut(slideAmt, 3);
			const slide = slurp(0, 2 * size, slideAmt)
	
			context.rotate(2 * Math.PI / numLines);

			context.moveTo(-size + slide - skew/2, top);
			context.lineTo( size + slide - skew/2, top);
			context.lineTo( size + slide + skew/2, bottom);
			context.lineTo(-size + slide + skew/2, bottom);
			context.closePath();
		}

		const numCenterLines = numLines / 2;
		for (let i = 0; i < numCenterLines; i ++) {
			const top = -thickness / 2;
			const bottom = thickness / 2;

			context.rotate(2 * Math.PI / numCenterLines);

			context.moveTo(-size - skew/2, top);
			context.lineTo( size - skew/2, top);
			context.lineTo( size + skew/2, bottom);
			context.lineTo(-size + skew/2, bottom);
			context.closePath();
		}


		context.fill('evenodd')

	}

}

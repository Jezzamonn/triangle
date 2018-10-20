import { loop, easeInOut, slurp, experp } from "./util";

const SIZE = 500;

export default class Controller {

	constructor() {
		this.period = 5;
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
		const thickness = 50;
		const numLines = 4;

		context.beginPath();
		context.fillStyle = 'black';

		for (let i = 0; i < numLines; i ++) {
			const localAnimAmt = (this.animAmt + 0 * i) % 1;
			const offsetAmt = easeInOut(loop(localAnimAmt), 3);
			const offset = slurp(thickness, 2 * thickness, offsetAmt);

			const top = offset - thickness / 2;
			const bottom = offset + thickness / 2;

			let slideAmt = 2 * this.animAmt - 1;
			if (slideAmt < 0) {
				slideAmt = 0;
			}
			slideAmt = easeInOut(slideAmt, 3);
			const slide = slurp(0, 2 * size, slideAmt)
	
			context.rotate(2 * Math.PI / numLines);

			context.moveTo(-size + slide, top);
			context.lineTo( size + slide, top);
			context.lineTo( size + slide, bottom);
			context.lineTo(-size + slide, bottom);
			context.closePath();
		}

		const numCenterLines = numLines / 2;
		for (let i = 0; i < numCenterLines; i ++) {
			const top = -thickness / 2;
			const bottom = thickness / 2;

			context.rotate(2 * Math.PI / numCenterLines);

			context.moveTo(-size, top);
			context.lineTo(size, top);
			context.lineTo(size, bottom);
			context.lineTo(-size, bottom);
			context.closePath();
		}


		context.fill('evenodd')

	}

}

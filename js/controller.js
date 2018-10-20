import { loop, easeInOut, slurp } from "./util";

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
		const thickness = 70;
		const numLines = 6;

		context.beginPath();
		context.fillStyle = 'black';

		for (let i = 0; i < numLines; i ++) {
			const localAnimAmt = (this.animAmt + 0.1 * i) % 1;
			const offsetAmt = easeInOut(loop(localAnimAmt), 3);
			const offset = slurp(0, 100, offsetAmt);
			const top = offset - thickness / 2;
			const bottom = offset + thickness / 2;
	
			context.rotate(2 * Math.PI / numLines);

			context.moveTo(-size, top);
			context.lineTo(size, top);
			context.lineTo(size, bottom);
			context.lineTo(-size, bottom);
			context.closePath();
		}


		context.fill('evenodd')

	}

}

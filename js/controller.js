import { loop, easeInOut } from "./util";

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
		const offset = 100 * easeInOut(loop(this.animAmt), 3);
		const thickness = 70;
		const numLines = 3;

		const top = offset - thickness / 2;
		const bottom = offset + thickness / 2;

		context.beginPath();
		context.fillStyle = 'black';

		for (let i = 0; i < numLines; i ++) {
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

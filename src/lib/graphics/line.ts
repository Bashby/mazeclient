import * as Pixi from 'pixi.js';

const DEFAULT_LINE_WIDTH: number = 5;
const DEFAULT_LINE_COLOR: number = 0x000000;

export class Line extends Pixi.Graphics {
	public lineWidth: number;
	public lineColor: number;
	private points: number[];

	constructor(points: number[], lineSize?: number, lineColor?: number) {
		super();

		this.lineWidth = lineSize || DEFAULT_LINE_WIDTH;
		this.lineColor = lineColor || DEFAULT_LINE_COLOR;
		this.points = points;

		this.lineStyle(this.lineWidth, this.lineColor);
		this.draw();
	}

	public updatePoints(newPoints: number[]) {
		this.points = newPoints.map((val, index) => val || this.points[index]);

		this.clear();
		this.lineStyle(this.lineWidth, this.lineColor);
		this.draw();
	}

	private draw(): void {
		this.moveTo(this.points[0], this.points[1]);
		this.lineTo(this.points[2], this.points[3]);
	}
}

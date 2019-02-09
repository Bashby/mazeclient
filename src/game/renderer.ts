import _ from 'lodash';
import * as Pixi from 'pixi.js';

import { CANVAS_ID, TARGET_HEIGHT, TARGET_WIDTH } from '../lib/constants';

export default class Renderer {
	public stage: PIXI.Container = new Pixi.Container();
	private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
	private view: HTMLCanvasElement | undefined;

	constructor() {
		Pixi.utils.skipHello();

		// Find or create view
		this.view = document.getElementById(CANVAS_ID) as
			| HTMLCanvasElement
			| undefined;
		if (!this.view) {
			this.view = this.createView();
		}

		// Construct renderer
		this.renderer = Pixi.autoDetectRenderer({
			view: this.view,
			width: TARGET_WIDTH,
			height: TARGET_HEIGHT,
			backgroundColor: 0x0fafaf,
		});

		// Bind resize events for renderer
		window.addEventListener('resize', _.debounce(this.onWindowResize, 150));
		window.addEventListener('deviceOrientation', this.onWindowResize);

		// Initial resize
		window.dispatchEvent(new Event('resize'));
	}

	public render(): void {
		this.renderer.render(this.stage);
	}

	private readonly onWindowResize = (event: Event) => {
		const target = event.currentTarget as Window;

		// Get current state of window
		const curWidth: number = target.innerWidth;
		const curHeight: number = target.innerHeight;
		const curPixelRatio: number = target.devicePixelRatio;

		// Compute actual screen dimensions
		const screenWidth: number = curWidth * curPixelRatio;
		const screenHeight: number = curHeight * curPixelRatio;

		// Resize the renderer
		this.renderer.resize(screenWidth, screenHeight);

		// // Compute scaling for "NoBorders" scale mode
		// const renderRatio: number = Math.max(
		// 	screenWidth / TARGET_WIDTH,
		// 	screenHeight / TARGET_HEIGHT,
		// );

		// // Scale the root stage to fill the screen
		// this.stage.scale.x = this.stage.scale.y = renderRatio;

		// // Center the root stage on the screen
		// this.stage.position.x = (screenWidth - this.stage.width) * 0.5;
		// this.stage.position.y = (screenHeight - this.stage.height) * 0.5;
	}

	private createView(): HTMLCanvasElement {
		const canvas = document.createElement('canvas');
		canvas.id = 'maze';
		document.body.appendChild(canvas);

		return canvas;
	}
}

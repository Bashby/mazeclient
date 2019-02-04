import _ from 'lodash';

import logger from '../lib/logger';
import Input from './input';
import Loop from './loop';
import { IGameObject } from './object';
import { create as createFollower } from './object/follower';
import Renderer from './renderer';

export default class Game {
	private loop: Loop;
	private input: Input;
	private renderer: Renderer;
	private objects: IGameObject[] = [];
	private activeObjects: IGameObject[] = [];
	private inactiveObjects: IGameObject[] = [];

	constructor() {
		this.renderer = new Renderer();
		this.input = new Input();
		this.loop = new Loop({
			begin: this.begin,
			draw: this.draw,
			end: this.end,
			update: this.update,
		});

		if (process.env.DEBUG) {
			this.debug();
		}
	}

	public start() {
		logger.info('Starting...');
		this.loop.start();
	}

	public stop() {
		logger.info('Stopping...');
		this.loop.stop();
	}

	public getStage(): PIXI.Container {
		return this.renderer.stage;
	}

	private debug() {
		this.objects.push(createFollower(this));
	}

	private handleInput() {
		this.input.computeState();
	}

	private tidyObjects() {
		// Remove dead objects
		this.objects = _.filter(this.objects, ['dead', false]);

		// TODO: Where do we re-activate inactive objects?

		// Organize active objects
		[this.activeObjects, this.inactiveObjects] = _.partition(
			this.objects,
			'active',
		);

		// Swap double-buffered object state
		_.each(this.objects, (object: IGameObject) => object.swapState());
	}

	private readonly begin = () => {
		this.handleInput();
	}

	private readonly end = () => {
		this.tidyObjects();
	}

	private readonly draw = (interpolationPercentage: number) => {
		_.each(this.activeObjects, (object) => object.draw(interpolationPercentage));
		this.renderer.render();
	}

	private readonly update = (delta: number) => {
		_.each(this.activeObjects, (object) =>
			object.update(delta, this.input.curState),
		);
	}
}

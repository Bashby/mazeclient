import _ from 'lodash';

import { APP_NAME, APP_VERSION, COMPUTE_FACTOR } from '../lib/constants';
import { Debug } from '../lib/debug';
import logger from '../lib/logger';
import Input from './input';
import Loop from './loop';
import { createFollower, IGameObject } from './object';
import Renderer from './renderer';

export default class Game {
	private debug: Debug;
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
		this.debug = new Debug();

		// Create a follower
		const follower = createFollower(this);
		this.objects.push(follower);
	}

	public start() {
		logger.debug(`Starting '${APP_NAME}' v${APP_VERSION}...`);
		this.loop.start();
	}

	public stop() {
		logger.debug('Stopping...');
		this.loop.stop();
	}

	public getStage(): PIXI.Container {
		return this.renderer.stage;
	}

	public getDebug(): Debug {
		return this.debug;
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
			object.update(delta * COMPUTE_FACTOR, this.input.curState),
		);
	}
}

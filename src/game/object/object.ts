import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { Vector } from '../../lib/vector';
import {
	IComponent,
	IDebugComponent,
	IGraphicsComponent,
	IInputComponent,
} from '../component';
import Game from '../game';
import { IInput } from '../input';

const GAME_OBJECT_COMPONENTS = ['input', 'graphics', 'debug'];

export interface IGameObject {
	id: string;
	game: Game;

	active: boolean;
	dead: boolean;

	pos: Vector;
	lastPos: Vector;
	rotation: number;
	lastRotation: number;
	velocity: Vector;

	update: (delta: number, input: IInput) => void;
	draw: (interpolationPercentage: number) => void;
	swapState: () => void;
	destroy: () => void;
}

export interface IGameObjectArgs {
	game: Game;
	components: {
		input?: IInputComponent;
		graphics?: IGraphicsComponent;
		debug?: IDebugComponent;
	};
}

export class GameObject implements IGameObject {
	public id: string = uuidv4();
	public game: Game;

	public active: boolean = true;
	public dead: boolean = false;

	// Buffered state
	public pos: Vector = new Vector();
	public lastPos: Vector = this.pos;
	public rotation: number = 0;
	public lastRotation: number = this.rotation;
	public velocity: Vector = new Vector();

	// Components
	private input?: IInputComponent;
	private graphics?: IGraphicsComponent;
	private debug?: IDebugComponent;

	constructor(args: IGameObjectArgs) {
		this.game = args.game;

		// Apply / init components
		_.each(GAME_OBJECT_COMPONENTS, (componentIdentifier) => {
			if (_.has(args.components, componentIdentifier)) {
				const component: IComponent = _.get(
					args.components,
					componentIdentifier,
				);
				_.set(this, componentIdentifier, component);
				component.initialize(this);
			}
		});
	}

	public destroy(): void {
		// De-init components
		_.each(GAME_OBJECT_COMPONENTS, (componentIdentifier) => {
			if (_.has(this, componentIdentifier)) {
				const component: IComponent = _.get(this, componentIdentifier);
				component.deinitialize(this);
			}
		});
	}

	public update(delta: number, input: IInput): void {
		if (this.input) {
			this.input.update(this, input, delta);
		}
	}

	public draw(interp: number): void {
		if (this.graphics) {
			this.graphics.draw(this, interp);
		}
	}

	public swapState(): void {
		// TODO: Implement buffered state
	}
}

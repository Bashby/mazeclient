import { v4 as uuidv4 } from 'uuid';

import { IVector } from '../lib/vector';
import { IGraphicsComponent, IInputComponent } from './component';
import Game from './game';
import { IInput } from './input';

export interface IGameObject {
	id: string;
	game: Game;

	active: boolean;
	dead: boolean;

	pos: IVector;
	lastPos: IVector;
	rotation: number;
	lastRotation: number;
	velocity: IVector;

	update: (delta: number, input: IInput) => void;
	draw: (interpolationPercentage: number) => void;
	swapState: () => void;
}

export interface IGameObjectArgs {
	game: Game;
	input?: IInputComponent;
	graphics?: IGraphicsComponent;
}

export class GameObject implements IGameObject {
	public id: string = uuidv4();
	public game: Game;

	public active: boolean = true;
	public dead: boolean = false;

	// Buffered state
	public pos: IVector = { x: 0, y: 0 };
	public lastPos: IVector = this.pos;
	public rotation: number = 0;
	public lastRotation: number = this.rotation;
	public velocity: IVector = { x: 0, y: 0 };

	// Components
	private input?: IInputComponent;
	private graphics?: IGraphicsComponent;

	constructor(args: IGameObjectArgs) {
		this.game = args.game;

		if (args.input) {
			this.input = args.input;
		}
		if (args.graphics) {
			this.graphics = args.graphics;
			this.graphics.initialize(this, this.game.getStage());
		}
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

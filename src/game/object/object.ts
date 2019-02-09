import { vec2 } from 'gl-matrix';
import { v4 as uuidv4 } from 'uuid';

import { IGraphicsComponent, IInputComponent } from '../component';
import Game from '../game';
import { IInput } from '../input';

export interface IGameObject {
	id: string;
	game: Game;

	active: boolean;
	dead: boolean;

	pos: vec2;
	lastPos: vec2;
	rotation: number;
	lastRotation: number;
	velocity: vec2;

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
	public pos: vec2 = vec2.create();
	public lastPos: vec2 = this.pos;
	public rotation: number = 0;
	public lastRotation: number = this.rotation;
	public velocity: vec2 = vec2.create();

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

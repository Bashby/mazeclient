import Mousetrap from 'mousetrap';

import { CANVAS_ID } from '../lib/constants';
import { Vector } from '../lib/vector';

const LEFT_MOUSE_BUTTON = 0;
const RIGHT_MOUSE_BUTTON = 2;

export interface IMouseState {
	pos: Vector;
	left: boolean;
	right: boolean;
}

export interface IInput {
	left: boolean;
	right: boolean;
	up: boolean;
	down: boolean;
	shift: boolean;
	space: boolean;
	one: boolean;
	two: boolean;
	three: boolean;
	four: boolean;
	five: boolean;
	direction: Vector;
	mouse: IMouseState;
}

export default class Input {
	public curState: IInput;

	private canvas = document.getElementById(CANVAS_ID);
	private left: boolean = false;
	private right: boolean = false;
	private up: boolean = false;
	private down: boolean = false;
	private shift: boolean = false;
	private space: boolean = false;
	private one: boolean = false;
	private two: boolean = false;
	private three: boolean = false;
	private four: boolean = false;
	private five: boolean = false;
	private mousePos: Vector = new Vector();
	private mouseLeft: boolean = false;
	private mouseRight: boolean = false;

	constructor() {
		// Bind keys
		Mousetrap.bind(['w', 'up'], this.onUpPress, 'keydown');
		Mousetrap.bind(['w', 'up'], this.onUpRelease, 'keyup');
		Mousetrap.bind(['a', 'left'], this.onLeftPress, 'keydown');
		Mousetrap.bind(['a', 'left'], this.onLeftRelease, 'keyup');
		Mousetrap.bind(['s', 'down'], this.onDownPress, 'keydown');
		Mousetrap.bind(['s', 'down'], this.onDownRelease, 'keyup');
		Mousetrap.bind(['d', 'right'], this.onRightPress, 'keydown');
		Mousetrap.bind(['d', 'right'], this.onRightRelease, 'keyup');
		Mousetrap.bind('shift', this.onShiftPress, 'keydown');
		Mousetrap.bind('shift', this.onShiftRelease, 'keyup');
		Mousetrap.bind('space', this.onSpacePress, 'keydown');
		Mousetrap.bind('space', this.onSpaceRelease, 'keyup');
		Mousetrap.bind('1', this.onOnePress, 'keydown');
		Mousetrap.bind('1', this.onOneRelease, 'keyup');
		Mousetrap.bind('2', this.onTwoPress, 'keydown');
		Mousetrap.bind('2', this.onTwoRelease, 'keyup');
		Mousetrap.bind('3', this.onThreePress, 'keydown');
		Mousetrap.bind('3', this.onThreeRelease, 'keyup');
		Mousetrap.bind('4', this.onFourPress, 'keydown');
		Mousetrap.bind('4', this.onFourRelease, 'keyup');
		Mousetrap.bind('5', this.onFivePress, 'keydown');
		Mousetrap.bind('5', this.onFiveRelease, 'keyup');

		// Bind mouse
		if (this.canvas) {
			this.canvas.addEventListener('mousedown', this.onMousePress);
			this.canvas.addEventListener('mouseup', this.onMouseRelease);
			this.canvas.addEventListener('mousemove', this.onMouseMove);
		}

		// Init state
		this.curState = this.computeState();
	}

	public computeState(): IInput {
		this.curState = {
			left: this.left,
			right: this.right,
			up: this.up,
			down: this.down,
			shift: this.shift,
			space: this.space,
			one: this.one,
			two: this.two,
			three: this.three,
			four: this.four,
			five: this.five,
			direction: this.getDirection(),
			mouse: this.getMouse(),
		};

		return this.curState;
	}

	private readonly onMousePress = (event: MouseEvent) => {
		if (event.button === LEFT_MOUSE_BUTTON) {
			this.mouseLeft = true;
		} else if (event.button === RIGHT_MOUSE_BUTTON) {
			this.mouseRight = true;
		}
	}

	private readonly onMouseRelease = (event: MouseEvent) => {
		if (event.button === LEFT_MOUSE_BUTTON) {
			this.mouseLeft = false;
		} else if (event.button === RIGHT_MOUSE_BUTTON) {
			this.mouseRight = false;
		}
	}

	private readonly onMouseMove = (event: MouseEvent) => {
		this.mousePos = new Vector(event.clientX, event.clientY);
	}

	private readonly onLeftPress = (): void => {
		this.left = true;
	}

	private readonly onLeftRelease = (): void => {
		this.left = false;
	}

	private readonly onRightPress = (): void => {
		this.right = true;
	}

	private readonly onRightRelease = (): void => {
		this.right = false;
	}

	private readonly onUpPress = (): void => {
		this.up = true;
	}

	private readonly onUpRelease = (): void => {
		this.up = false;
	}

	private readonly onDownPress = (): void => {
		this.down = true;
	}

	private readonly onDownRelease = (): void => {
		this.down = false;
	}

	private readonly onShiftPress = (): void => {
		this.shift = true;
	}

	private readonly onShiftRelease = (): void => {
		this.shift = false;
	}

	private readonly onSpacePress = (): void => {
		this.space = true;
	}

	private readonly onSpaceRelease = (): void => {
		this.space = false;
	}

	private readonly onOnePress = (): void => {
		this.one = true;
	}

	private readonly onOneRelease = (): void => {
		this.one = false;
	}

	private readonly onTwoPress = (): void => {
		this.two = true;
	}

	private readonly onTwoRelease = (): void => {
		this.two = false;
	}

	private readonly onThreePress = (): void => {
		this.three = true;
	}

	private readonly onThreeRelease = (): void => {
		this.three = false;
	}

	private readonly onFourPress = (): void => {
		this.four = true;
	}

	private readonly onFourRelease = (): void => {
		this.four = false;
	}

	private readonly onFivePress = (): void => {
		this.five = true;
	}

	private readonly onFiveRelease = (): void => {
		this.five = false;
	}

	private getMouse(): IMouseState {
		return {
			left: this.mouseLeft,
			right: this.mouseRight,
			pos: this.mousePos,
		};
	}

	private getDirection(): Vector {
		const direction = new Vector();

		if (this.left) {
			direction.vector[0] -= 1;
		}
		if (this.right) {
			direction.vector[0] += 1;
		}
		if (this.up) {
			direction.vector[1] -= 1;
		}
		if (this.down) {
			direction.vector[1] += 1;
		}

		return direction;
	}
}

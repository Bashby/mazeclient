import { IInput } from './input';
import { IGameObject } from './object/object';
import { ISprite } from './sprite';

export interface IInputComponent {
	update(object: IGameObject, input: IInput, delta: number): void;
}

export interface IGraphicsComponent {
	sprite: ISprite;
	initialize(object: IGameObject, renderTarget: PIXI.Container): void;
	draw(object: IGameObject, interpolation: number): void;
}

export interface IPhysicsComponent {
	// TODO: Try collison next!
}

export interface IDebugComponent {
	// TODO: A system for registering with the debugger, each item knowing what it can and should register
	register(): void;
	deregister(): void;
}

import { IInput } from './input';
import { IGameObject } from './object/object';
import { ISprite } from './sprite';

export interface IComponent {
	initialize(object: IGameObject): void;
	deinitialize(object: IGameObject): void;
}

export interface IInputComponent extends IComponent {
	update(object: IGameObject, input: IInput, delta: number): void;
}

export interface IGraphicsComponent extends IComponent {
	sprite: ISprite;
	draw(object: IGameObject, interpolation: number): void;
}

export interface IPhysicsComponent extends IComponent {
	// TODO: Try collison next!
}

export interface IDebugComponent extends IComponent {
	// TODO: A system for registering with the debugger, each item knowing what it can and should register
}

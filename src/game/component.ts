import { IInput } from './input';
import { IGameObject } from './object';
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

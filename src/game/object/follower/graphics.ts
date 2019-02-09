import { vec2 } from 'gl-matrix';
import bunny from '../../../../static/image/sprite/bunny.png';
import { shortestRadian } from '../../../lib/utility';
import { IGraphicsComponent } from '../../component';
import { IGameObject } from '../object';

export default class FollowerGraphics implements IGraphicsComponent {
	public sprite: PIXI.Sprite;

	constructor() {
		this.sprite = PIXI.Sprite.fromImage(bunny);
	}

	public initialize(object: IGameObject, renderTarget: PIXI.Container): void {
		renderTarget.addChild(this.sprite);
		this.sprite.anchor.set(0.5, 0.5);
	}

	public destroy(renderTarget: PIXI.Container): void {
		renderTarget.removeChild(this.sprite);
	}

	public draw(object: IGameObject, interpolation: number): void {
		// Interpolate position
		const deltaPosition = vec2.subtract(
			vec2.create(),
			object.pos,
			object.lastPos,
		);
		const newPosition = vec2.scaleAndAdd(
			vec2.create(),
			object.lastPos,
			deltaPosition,
			interpolation,
		);

		// Interpolate rotation
		const deltaRotation = shortestRadian(object.lastRotation, object.rotation);
		const newRotation = object.lastRotation + deltaRotation * interpolation;

		// Apply transforms
		this.sprite.position = new PIXI.Point(...newPosition);
		this.sprite.rotation = newRotation;
	}
}

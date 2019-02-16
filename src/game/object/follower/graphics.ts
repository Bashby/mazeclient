import bunny from '../../../../static/image/sprite/bunny.png';
import { shortestRadian } from '../../../lib/utility';
import { Component, IGraphicsComponent } from '../../component';
import { IGameObject } from '../object';

export default class FollowerGraphics extends Component
	implements IGraphicsComponent {
	public sprite: PIXI.Sprite;

	constructor() {
		super();

		this.sprite = PIXI.Sprite.fromImage(bunny);
	}

	public initialize(object: IGameObject): void {
		object.game.getStage().addChild(this.sprite);
		this.sprite.anchor.set(0.5, 0.5);
	}

	public deinitialize(object: IGameObject): void {
		object.game.getStage().removeChild(this.sprite);
	}

	public draw(object: IGameObject, interpolation: number): void {
		// Interpolate position
		// console.log(object.pos.x, object.lastPos.x, object.pos.y, object.lastPos.y);
		const deltaPosition = object.pos.subtract(object.lastPos);
		// console.log(deltaPosition.x, deltaPosition.y);
		const newPosition = object.lastPos.add(deltaPosition.scale(interpolation));

		// Interpolate rotation
		const deltaRotation = shortestRadian(object.lastRotation, object.rotation);
		const newRotation = object.lastRotation + deltaRotation * interpolation;

		// Apply transforms
		this.sprite.position = new PIXI.Point(newPosition.x, newPosition.y);
		this.sprite.rotation = newRotation;
	}
}

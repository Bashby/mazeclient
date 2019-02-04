import bunny from '../../../../static/image/sprite/bunny.png';
import { IGraphicsComponent } from '../../component';
import { IGameObject } from '../../object';

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
		// Position
		this.sprite.x =
			object.lastPos.x + (object.pos.x - object.lastPos.x) * interpolation;
		this.sprite.y =
			object.lastPos.y + (object.pos.y - object.lastPos.y) * interpolation;

		// Rotation
		const negRot: boolean = object.rotation < 0;
		const absRotation =
			(Math.abs(object.rotation) - Math.abs(object.lastRotation)) *
			interpolation;
		this.sprite.rotation =
			object.lastRotation + (negRot ? absRotation * -1 : absRotation);
	}
}

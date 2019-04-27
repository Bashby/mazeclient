import bunny from '../../../../static/image/sprite/bunny.png';
import { Line } from '../../../lib/graphics/line';
import { Vector } from '../../../lib/vector';
import { Component, IGraphicsComponent } from '../../component';
import { IGameObject } from '../object';

export default class FollowerGraphics extends Component
	implements IGraphicsComponent {
	public drawable: PIXI.Container = new PIXI.Container();
	private sprite: PIXI.Sprite;
	private debugDirection: Line = new Line([0, 0, 0, 0]);

	private lastPosition: Vector = new Vector(0, 0);

	constructor() {
		super();

		this.sprite = PIXI.Sprite.fromImage(bunny);
		this.sprite.anchor.set(0.5, 0.5);
		this.drawable.addChild(this.sprite);

		if (process.env.DEBUG) {
			this.drawable.addChild(this.debugDirection);
		}
	}

	public initialize(object: IGameObject): void {
		const stage = object.game.getStage();
		stage.addChild(this.drawable);
	}

	public deinitialize(object: IGameObject): void {
		object.game.getStage().removeChild(this.drawable);
	}

	public draw(object: IGameObject, interpolation: number): void {
		// TODO: Rotational interpolation? Rotational velocity?
		const interpVelocity = object.velocity.scale(interpolation);
		const interpPosition = object.position.add(interpVelocity);

		const deltaPosition = interpPosition.subtract(this.lastPosition);
		console.log(
			Math.abs(deltaPosition.x) > 5 ? '!!!' : '',
			deltaPosition.x,
			interpolation,
			object.velocity.scale(interpolation).x,
		);
		this.lastPosition = interpPosition;

		// Apply transforms
		this.sprite.position.set(interpPosition.x, interpPosition.y);
		this.sprite.rotation = object.rotation;

		if (process.env.DEBUG) {
			const lineEnd = interpPosition.add(interpVelocity);
			this.debugDirection.updatePoints([
				this.sprite.position.x,
				this.sprite.position.y,
				lineEnd.x,
				lineEnd.y,
			]);
		}

		// First know where the thing is fromt the last UPDATE
		// Then, given interpolation %, determine where I should put it
		// (BUT DON"T ACTUALLY UPDATE THE OBJECT JUST SIMULATE BASED ON LAST STATE)
		// Draw at this new interpolationed position. DON"T INTERPOLATE BETWEEN THE TWO POSITIONS
		// const interpolatedPosition, interpolatedRotation = object.update()
		// // Interpolate position
		// // console.log(object.pos.x, object.lastPos.x, object.pos.y, object.lastPos.y);
		// const deltaPosition = object.pos.subtract(object.lastPos);
		// // console.log(deltaPosition.x, deltaPosition.y);
		// const newPosition = object.lastPos.add(deltaPosition.scale(interpolation));
		// // Interpolate rotation
		// const deltaRotation = shortestRadian(object.lastRotation, object.rotation);
		// const newRotation = object.lastRotation + deltaRotation * interpolation;
		// // Apply transforms
		// this.sprite.position = new PIXI.Point(newPosition.x, newPosition.y);
		// console.log(
		// 	deltaPosition.x,
		// 	deltaPosition.scale(interpolation).x,
		// 	deltaPosition.x - deltaPosition.scale(interpolation).x,
		// 	interpolation,
		// );
		// // this.sprite.rotation = newRotation;
	}
}

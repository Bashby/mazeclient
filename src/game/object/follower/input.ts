import _ from 'lodash';

import { Vector } from '../../../lib/vector';
import { Component, IInputComponent } from '../../component';
import { IInput } from '../../input';
import { IGameObject } from '../object';

export default class FollowerInput extends Component
	implements IInputComponent {
	private acceleration: number = 0.15;
	private deceleration: number = 0.3;
	private MAX_SPEED = 2;
	private sprintMultiplier = 2;
	private bouncePoints: Vector[] = [new Vector(100, 500), new Vector(500, 500)];
	private targetIndex = 0;
	private target: Vector = this.bouncePoints[0];

	public update(object: IGameObject, input: IInput, delta: number): void {
		// Compute position
		const currentDirection = object.velocity.normalize();
		const desiredDirection = this.target.subtract(object.position).normalize();
		const speed = object.velocity.magnitude();
		const newDirection = currentDirection.lerp(desiredDirection, 0.8);

		const distanceToTarget = object.position.distance(this.target);
		if (distanceToTarget < 5) {
			this.target = this.bouncePoints[1 - this.targetIndex];
			this.targetIndex = 1 - this.targetIndex;
		}

		// Determine acceleration or deceleration
		const decelerateDistance =
			(speed * speed) / (2.0 * this.deceleration * delta);
		let newSpeed;
		if (distanceToTarget > decelerateDistance) {
			// Speed up
			newSpeed = Math.min(speed + this.acceleration * delta, this.MAX_SPEED);
		} else {
			// Slow down
			newSpeed = Math.max(speed - this.deceleration * delta, 0);
		}
		const newVelocity = newDirection.scale(newSpeed);
		const newPosition = object.position.add(newVelocity);

		// Apply Transforms
		object.velocity.set(newVelocity);
		object.position.set(newPosition);
		// object.rotation = newRotation;

		// // Snapshot state for interpolation
		// object.lastPos = object.pos.copy();
		// object.lastRotation = object.rotation;
		// const distance = object.pos.distance(input.mouse.pos);
		// if (distance < 0.5) {
		// 	return;
		// }
		// const currentDirection = new Vector(
		// 	-Math.cos(object.rotation),
		// 	-Math.sin(object.rotation),
		// ).normalize();
		// const desiredDirection = input.mouse.pos.subtract(object.pos).normalize();
		// const newDirection = currentDirection.lerp(desiredDirection, 0.8);
		// // Compute velocity
		// const timeToSlowDown = object.velocity.divide(
		// 	this.deceleration.scale(delta),
		// );
		// let newVelocity;
		// if (
		// 	object.velocity
		// 		.multiply(timeToSlowDown)
		// 		.scale(0.5)
		// 		.magnitude() >= distance
		// ) {
		// 	newVelocity = object.velocity.subtract(this.deceleration.scale(delta));
		// } else {
		// 	newVelocity = object.velocity.add(this.acceleration.scale(delta));
		// }
		// newVelocity = newVelocity.clamp(-this.maxVelocity, this.maxVelocity);
		// // Comnpute position
		// const newPosition = object.pos.add(
		// 	newDirection.scale(object.velocity.magnitude()),
		// );
		// // Compute rotation
		// const newRotation = currentDirection.radiansTo(newDirection);
		// // Update
		// object.velocity.set(newVelocity);
		// object.pos.set(newPosition);
		// object.rotation = newRotation;
	}
}

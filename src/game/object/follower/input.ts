import _ from 'lodash';

import { Vector } from '../../../lib/vector';
import { Component, IInputComponent } from '../../component';
import { IInput } from '../../input';
import { IGameObject } from '../object';

export default class FollowerInput extends Component
	implements IInputComponent {
	private velocity: Vector = new Vector();
	private acceleration: Vector = new Vector(0.3, 0.3);
	private deceleration: Vector = new Vector(0.3, 0.3);
	private maxVelocity = 2;
	private sprintMultiplier = 2;

	public update(object: IGameObject, input: IInput, delta: number): void {
		// Snapshot state
		object.lastPos = object.pos;
		object.lastRotation = object.rotation;

		const distance = object.pos.distance(input.mouse.pos);
		if (distance < 0.5) {
			return;
		}

		const currentDirection = new Vector(
			-Math.cos(object.rotation),
			-Math.sin(object.rotation),
		).normalize();
		const desiredDirection = input.mouse.pos.subtract(object.pos).normalize();
		const newDirection = currentDirection.lerp(desiredDirection, 0.8);

		const timeToSlowDown = this.velocity.divide(this.deceleration.scale(delta));
		if (
			this.velocity
				.multiply(timeToSlowDown)
				.scale(0.5)
				.magnitude() >= distance
		) {
			this.velocity = this.velocity.subtract(this.deceleration.scale(delta));
		} else {
			this.velocity = this.velocity.add(this.acceleration.scale(delta));
		}

		// Update position
		this.velocity = this.velocity.clamp(-this.maxVelocity, this.maxVelocity);
		object.pos = object.pos.add(newDirection.scale(this.velocity.magnitude()));

		// Update rotation
		object.rotation = currentDirection.radiansTo(newDirection);
	}
}

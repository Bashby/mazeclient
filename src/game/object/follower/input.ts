import { vec2 } from 'gl-matrix';
import _ from 'lodash';

import { EPSILON } from '../../../lib/constants';
import { angleOf, clampVec2 } from '../../../lib/utility';
import { Component, IInputComponent } from '../../component';
import { IInput } from '../../input';
import { IGameObject } from '../object';

export default class FollowerInput extends Component
	implements IInputComponent {
	private velocity: vec2 = vec2.create();
	private acceleration: vec2 = vec2.fromValues(0.1, 0.1);
	private deceleration: vec2 = vec2.fromValues(0.3, 0.3);
	private maxVelocity = 3;
	private sprintMultiplier = 2;

	public update(object: IGameObject, input: IInput, delta: number): void {
		// Snapshot state
		object.lastPos = object.pos;
		object.lastRotation = object.rotation;

		// Direction
		const distanceMagnitude = vec2.distance(object.pos, input.mouse.pos);
		const distanceVector = vec2.subtract(
			vec2.create(),
			input.mouse.pos,
			object.pos,
		);

		const timeToSlowDown = vec2.scale(
			vec2.create(),
			this.velocity,
			1 / this.acceleration[0],
		);
		console.log(timeToSlowDown);

		const desiredDirectionNormalized = vec2.normalize(
			vec2.create(),
			distanceVector,
		);
		const currentDirection = vec2.fromValues(
			-Math.cos(object.rotation),
			-Math.sin(object.rotation),
		);

		const newDirection = vec2.lerp(
			vec2.create(),
			currentDirection,
			desiredDirectionNormalized,
			0.1,
		);

		// let newSpeed;
		// if (vec2.length(direction) < 5) {
		// 	newSpeed = 1;
		// } else {
		// 	const speed =
		// 		this.speed +
		// 		this.minSpeed *
		// 			this.acceleration *
		// 			(input.shift ? this.sprintModifier : 1) *
		// 			delta;
		// 	newSpeed = _.clamp(speed, 0, this.maxSpeed);
		// }

		// Update velocity
		// this.velocity = vec2.lerp(
		// 	vec2.create(),
		// 	this.velocity,
		// 	directionNormalized,
		// 	0.1,
		// );
		this.velocity = vec2.scaleAndAdd(
			vec2.create(),
			this.velocity,
			this.acceleration,
			delta,
		);
		this.velocity = clampVec2(
			this.velocity,
			-this.maxVelocity,
			this.maxVelocity,
		);
		// console.log(currentDirection, newDirection, this.velocity);

		// Update position
		object.pos = vec2.scaleAndAdd(
			vec2.create(),
			object.pos,
			newDirection,
			vec2.length(this.velocity),
		);

		// Update rotation
		object.rotation = angleOf(object.pos, input.mouse.pos);
	}
}

import { vec2 } from 'gl-matrix';
import _ from 'lodash';

import { angleOf } from '../../../lib/utility';
import { IInputComponent } from '../../component';
import { IInput } from '../../input';
import { IGameObject } from '../object';

export default class FollowerInput implements IInputComponent {
	private baseSpeed = 5;
	private maxSpeed = 15;
	private sprintModifier = 2.0;

	public update(object: IGameObject, input: IInput, delta: number): void {
		// Snapshot state
		object.lastPos = object.pos;
		object.lastRotation = object.rotation;

		// Compute state
		const direction = vec2.subtract(vec2.create(), input.mouse.pos, object.pos);
		const directionNormalized = vec2.normalize(vec2.create(), direction);
		const rawSpeed = this.baseSpeed * (input.shift ? this.sprintModifier : 1);
		const speed = _.clamp(rawSpeed, 0, this.maxSpeed);

		// Update position
		object.pos = vec2.scaleAndAdd(
			vec2.create(),
			object.pos,
			directionNormalized,
			speed * delta,
		);

		// Update rotation
		object.rotation = angleOf(object.pos, input.mouse.pos);
	}
}

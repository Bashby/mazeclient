import _ from 'lodash';

import {
	add,
	multiplyByScalar,
	normalize,
	subtract,
} from '../../../lib/vector';
import { IInputComponent } from '../../component';
import { IInput } from '../../input';
import { IGameObject } from '../../object';

export default class FollowerInput implements IInputComponent {
	private baseSpeed = 0.1;
	private maxSpeed = 5;
	private sprintModifier = 1.5;

	public update(object: IGameObject, input: IInput, delta: number): void {
		// Snapshot state
		object.lastPos = object.pos;
		object.lastRotation = object.rotation;

		const direction = subtract(input.mouse.pos, object.pos);
		const directionNormalized = normalize(direction);
		const rawSpeed = this.baseSpeed * (input.shift ? this.sprintModifier : 1);
		const speed = _.clamp(rawSpeed, 0, this.maxSpeed);

		// Position
		object.pos = add(
			object.pos,
			multiplyByScalar(directionNormalized, speed * delta),
		);

		// Rotation
		object.rotation = Math.atan2(direction.y, direction.x);
	}
}

import { HALF_ANGLE, ONE_AND_HALF_ANGLE, WHOLE_ANGLE } from './constants';
import { Vector } from './vector';

// Return angle from point A to point B, in radians
export function angleOf(a: Vector, b: Vector): number {
	const delta = a.subtract(b);
	const radians = Math.atan2(delta.vector[1], delta.vector[0]);
	return radians < 0 ? WHOLE_ANGLE + radians : radians;
}

// Calculate the shortest path from one angle to another, in radians
// See: https://stackoverflow.com/a/14498790
export function shortestRadian(from: number, to: number): number {
	return (
		((((to - from) % WHOLE_ANGLE) + ONE_AND_HALF_ANGLE) % WHOLE_ANGLE) -
		HALF_ANGLE
	);
}

export function clampVector(vec: Vector, min: number, max: number): Vector {
	const minVec2 = new Vector(min, min);
	const maxVec2 = new Vector(max, max);
	return vec2.min(
		vec2.create(),
		vec2.max(vec2.create(), vec, minVec2),
		maxVec2,
	);
}

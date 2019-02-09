import { vec2 } from 'gl-matrix';

const HALF_ANGLE = Math.PI;
const WHOLE_ANGLE = Math.PI * 2;
const ONE_AND_HALF_ANGLE = WHOLE_ANGLE + HALF_ANGLE;

// Return angle from point A to point B, in radians
export function angleOf(a: vec2, b: vec2): number {
	const delta = vec2.subtract(vec2.create(), a, b);
	const radians = Math.atan2(delta[1], delta[0]);
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

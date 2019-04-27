import { HALF_ANGLE, ONE_AND_HALF_ANGLE, WHOLE_ANGLE } from './constants';

// Calculate the shortest path from one angle to another, in radians
// See: https://stackoverflow.com/a/14498790
export function shortestRadian(from: number, to: number): number {
	return (
		((((to - from) % WHOLE_ANGLE) + ONE_AND_HALF_ANGLE) % WHOLE_ANGLE) -
		HALF_ANGLE
	);
}

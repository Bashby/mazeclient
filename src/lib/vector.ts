import { vec2 } from 'gl-matrix';

import { WHOLE_ANGLE } from './constants';

export class Vector {
	public vector: vec2;

	constructor(x: number = 0, y: number = 0) {
		this.vector = vec2.fromValues(x, y);
	}

	public toString(): string {
		return `<Vector ${this.x} ${this.y}>`;
	}

	get x(): number {
		return this.vector[0];
	}

	set x(value: number) {
		this.vector[0] = value;
	}

	get y(): number {
		return this.vector[1];
	}

	set y(value: number) {
		this.vector[1] = value;
	}

	public copy(): Vector {
		return new Vector(this.x, this.y);
	}

	public add(other: Vector): Vector {
		const result = vec2.add(vec2.create(), this.vector, other.vector);

		return new Vector(result[0], result[1]);
	}

	public subtract(other: Vector): Vector {
		const result = vec2.subtract(vec2.create(), this.vector, other.vector);

		return new Vector(result[0], result[1]);
	}

	public multiply(other: Vector): Vector {
		const result = vec2.multiply(vec2.create(), this.vector, other.vector);

		return new Vector(result[0], result[1]);
	}

	public divide(other: Vector): Vector {
		const result = vec2.divide(vec2.create(), this.vector, other.vector);

		return new Vector(result[0], result[1]);
	}

	public scale(scale: number): Vector {
		const result = vec2.scale(vec2.create(), this.vector, scale);

		return new Vector(result[0], result[1]);
	}

	public normalize(): Vector {
		const result = vec2.normalize(vec2.create(), this.vector);

		return new Vector(result[0], result[1]);
	}

	public lerp(other: Vector, interpolate: number): Vector {
		const result = vec2.lerp(
			vec2.create(),
			this.vector,
			other.vector,
			interpolate,
		);

		return new Vector(result[0], result[1]);
	}

	public clamp(min: number, max: number): Vector {
		const minVector = new Vector(min, min);
		const maxVector = new Vector(max, max);
		const result = vec2.min(
			vec2.create(),
			maxVector.vector,
			vec2.max(vec2.create(), minVector.vector, this.vector),
		);

		return new Vector(result[0], result[1]);
	}

	public magnitude(): number {
		return vec2.length(this.vector);
	}

	public distance(other: Vector): number {
		return vec2.distance(this.vector, other.vector);
	}

	public angle(other: Vector): number {
		return vec2.angle(this.vector, other.vector);
	}

	/**
	 * Return angle (in radians) to vector
	 *
	 * @param {Vector} other
	 * @returns {number} radians to vector
	 * @memberof Vector
	 */
	public radiansTo(other: Vector): number {
		const delta = this.subtract(other);
		const radians = Math.atan2(delta.y, delta.x);
		return radians < 0 ? WHOLE_ANGLE + radians : radians;
	}
}

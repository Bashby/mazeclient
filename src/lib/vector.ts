import { vec2 } from 'gl-matrix';

export class Vector {
	public vector: vec2;

	constructor(x: number = 0, y: number = 0) {
		this.vector = vec2.fromValues(x, y);
	}

	public add(vector: Vector): Vector {
		this.vector = vec2.add(vec2.create(), this.vector, vector.vector);

		return this;
	}

	public subtract(vector: Vector): Vector {
		this.vector = vec2.subtract(vec2.create(), this.vector, vector.vector);

		return this;
	}

	public multiply(vector: Vector): Vector {
		this.vector = vec2.multiply(vec2.create(), this.vector, vector.vector);

		return this;
	}

	public divide(vector: Vector): Vector {
		this.vector = vec2.divide(vec2.create(), this.vector, vector.vector);

		return this;
	}

	public scale(scale: number): Vector {
		this.vector = vec2.scale(vec2.create(), this.vector, scale);

		return this;
	}
}

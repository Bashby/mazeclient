export interface IVector {
	x: number;
	y: number;
}

export function normalize(vec: IVector): IVector {
	const length = magnitude(vec);

	// The zero vector has zero length
	if (length === 0) {
		return { x: 0, y: 0 };
	}

	return { x: vec.x / length, y: vec.y / length };
}

export function add(a: IVector, b: IVector): IVector {
	return { x: a.x + b.x, y: a.y + b.y };
}

export function subtract(a: IVector, b: IVector): IVector {
	return { x: a.x - b.x, y: a.y - b.y };
}

export function multiply(a: IVector, b: IVector): IVector {
	return { x: a.x * b.x, y: a.y * b.y };
}

export function divide(a: IVector, b: IVector): IVector {
	return { x: a.x / b.x, y: a.y / b.y };
}

export function multiplyByScalar(vec: IVector, scalar: number): IVector {
	return { x: vec.x * scalar, y: vec.y * scalar };
}

export function magnitude(vec: IVector): number {
	return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
}

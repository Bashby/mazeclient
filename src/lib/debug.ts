import dat from 'dat.gui';

import { IGameObject } from '../game/object';
import { APP_NAME, DEBUG_ID, EPSILON, WHOLE_ANGLE } from './constants';

export class Debug {
	private domTarget = document.getElementById(DEBUG_ID);
	private tracked: { [id: string]: dat.GUI } = {};
	private gui: dat.GUI = new dat.GUI({ name: APP_NAME, autoPlace: false });

	constructor() {
		if (this.domTarget) {
			this.domTarget.innerHTML = ''; // Note: required due to hot reloading creating multiple GUIs
			this.domTarget.appendChild(this.gui.domElement);
		}
	}

	public track(object: IGameObject): void {
		if (this.tracked[object.id]) {
			return;
		}

		// Track
		const objectFolder = this.gui.addFolder(object.id);
		objectFolder.open();
		this.tracked[object.id] = objectFolder;
		objectFolder.add(object, 'rotation', 0, WHOLE_ANGLE, EPSILON).listen();
	}

	public untrack(object: IGameObject): void {
		if (!this.tracked[object.id]) {
			return;
		}

		// Untrack
		this.gui.removeFolder(this.tracked[object.id]);
		delete this.tracked[object.id];
	}
}

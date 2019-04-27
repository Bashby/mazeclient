import dat from 'dat.gui';

import { IGameObject } from '../game/object';
import { APP_NAME, DEBUG_ID } from './constants';

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

	public track(object: IGameObject, initOpen?: boolean): dat.GUI {
		if (this.tracked[object.id]) {
			return this.tracked[object.id];
		}

		// Track
		const objectFolder = this.gui.addFolder(object.id);
		this.tracked[object.id] = objectFolder;
		if (initOpen) {
			objectFolder.open();
		}

		return objectFolder;
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

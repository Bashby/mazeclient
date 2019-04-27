import { EPSILON, WHOLE_ANGLE } from '../../../lib/constants';
import { Component, IDebugComponent } from '../../component';
import { IGameObject } from '../object';

export default class FollowerDebug extends Component
	implements IDebugComponent {
	constructor() {
		super();
	}

	public initialize(object: IGameObject): void {
		if (!process.env.DEBUG) {
			return;
		}

		const debug = object.game.getDebug();
		const gui = debug.track(object, true);

		// Track follower properties
		gui.add(object, 'rotation', 0, WHOLE_ANGLE, EPSILON).listen();
		const positionFolder = gui.addFolder('position');
		positionFolder.open();
		positionFolder.add(object.position, 'x').listen();
		positionFolder.add(object.position, 'y').listen();

		const velocityFolder = gui.addFolder('velocity');
		velocityFolder.open();
		velocityFolder.add(object.velocity, 'x', 0, 3, EPSILON).listen();
		velocityFolder.add(object.velocity, 'y', 0, 3, EPSILON).listen();
	}

	public deinitialize(object: IGameObject): void {
		if (!process.env.DEBUG) {
			return;
		}

		// Untrack
		object.game.getDebug().untrack(object);
	}
}

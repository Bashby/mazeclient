import Game from '../../game';
import { GameObject, IGameObject } from '../object';
import FollowerDebug from './debug';
import FollowerGraphics from './graphics';
import FollowerInput from './input';

export function create(game: Game): IGameObject {
	const follower = new GameObject({
		game,
		components: {
			input: new FollowerInput(),
			graphics: new FollowerGraphics(),
			debug: new FollowerDebug(),
		},
	});

	return follower;
}

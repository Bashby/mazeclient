import Game from '../../game';
import { GameObject, IGameObject } from '../object';
import FollowerGraphics from './graphics';
import FollowerInput from './input';

export function create(game: Game): IGameObject {
	const follower = new GameObject({
		game,
		input: new FollowerInput(),
		graphics: new FollowerGraphics(),
	});

	return follower;
}

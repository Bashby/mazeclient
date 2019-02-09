import MainLoop from 'mainloop.js';

import { FPS_ID, TARGET_FPS } from '../lib/constants';
import logger from '../lib/logger';

interface ILoopArgs {
	begin: (timestamp: number, delta: number) => void;
	end: (fps: number, panic: boolean) => void;
	update: (delta: number) => void;
	draw: (interpolationPercentage: number) => void;
}

export default class Loop {
	private timeStep: number = 1000 / TARGET_FPS;
	private loop = MainLoop;
	private fps = document.getElementById(FPS_ID);

	constructor(args: ILoopArgs) {
		this.loop.setSimulationTimestep(this.timeStep);
		this.loop.setBegin(args.begin);

		const newEnd: ILoopArgs['end'] = (fps, panic) => {
			this.baseEnd(fps, panic);
			args.end(fps, panic);
		};
		this.loop.setEnd(newEnd);

		this.loop.setUpdate(args.update);
		this.loop.setDraw(args.draw);
	}

	public start() {
		this.loop.start();
	}

	public stop() {
		this.loop.stop();
	}

	public setBegin(begin: ILoopArgs['begin']) {
		this.loop.setBegin(begin);
	}

	public setUpdate(update: ILoopArgs['update']) {
		this.loop.setUpdate(update);
	}

	public setDraw(draw: ILoopArgs['draw']) {
		this.loop.setDraw(draw);
	}

	public setEnd(end: ILoopArgs['end']) {
		const newEnd: ILoopArgs['end'] = (fps, panic) => {
			this.baseEnd(fps, panic);
			end(fps, panic);
		};

		this.loop.setEnd(newEnd);
	}

	private baseEnd(fps: number, panic: boolean) {
		if (this.fps) {
			this.fps.innerHTML = Math.round(fps) + ' FPS';
		}

		if (panic) {
			const discardedTime = Math.round(this.loop.resetFrameDelta());
			logger.warn('Main loop panicked, discarding ' + discardedTime + 'ms');
		}
	}
}

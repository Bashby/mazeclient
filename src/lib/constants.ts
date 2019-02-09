// Application
export const APP_NAME = 'maze';
export const APP_VERSION = process.env.npm_package_version || 'unknown';

// Rendering
export const CANVAS_ID = 'maze';
export const FPS_ID = 'fps';
export const DEBUG_ID = 'debug';
export const TARGET_FPS = 75;
export const TARGET_WIDTH = 1280;
export const TARGET_HEIGHT = 720;

// Simulation
export const COMPUTE_FACTOR = 0.01;

// Calculus
export const EPSILON = 0.000001;
export const HALF_ANGLE = Math.PI;
export const WHOLE_ANGLE = Math.PI * 2;
export const ONE_AND_HALF_ANGLE = WHOLE_ANGLE + HALF_ANGLE;

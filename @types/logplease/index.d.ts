declare module 'logplease' {
  export function create(category: string, options?: {}): ILogger;

  interface ILogger {
    debug: (msg: string) => void;
    info: (msg: string) => void;
    warn: (msg: string) => void;
    error: (msg: string) => void;
  }
}

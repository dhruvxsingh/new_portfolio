// src/types/locomotive-scroll.d.ts
declare module 'locomotive-scroll' {
  interface InstanceOptions {
    el: HTMLElement;
    smooth?: boolean;
    multiplier?: number;
    smartphone?: { smooth: boolean };
    tablet?: { smooth: boolean };
    getDirection?: boolean;
    getSpeed?: boolean;
  }

  export default class LocomotiveScroll {
    constructor(options: InstanceOptions);
    destroy(): void;
    update(): void;
    start(): void;
    stop(): void;
    on(event: string, fn: (args?: any) => void): void;
    off(event: string, fn: (args?: any) => void): void;
    scrollTo(target: string | HTMLElement | number, options?: any): void;
  }
}
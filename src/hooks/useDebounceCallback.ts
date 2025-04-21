import { useEffect, useMemo, useRef } from 'react';

export interface CallOptions {
  leading?: boolean;
  trailing?: boolean;
}

export interface Options extends CallOptions {
  maxWait?: number;
  debounceOnServer?: boolean;
}

export interface ControlFunctions<ReturnT> {
  cancel: () => void;
  flush: () => ReturnT | undefined;
  isPending: () => boolean;
}

export interface DebouncedState<T extends (...args: any) => ReturnType<T>>
  extends ControlFunctions<ReturnType<T>> {
  (...args: Parameters<T>): ReturnType<T> | undefined;
}

export default function useDebouncedCallback<
  T extends (...args: any) => ReturnType<T>,
>(func: T, wait?: number, options?: Options): DebouncedState<T> {
  const lastCallTime = useRef(null);
  const lastInvokeTime = useRef(0);
  const timerId = useRef(null);
  const lastArgs = useRef<unknown[]>([]);
  const lastThis = useRef<unknown>();
  const result = useRef<ReturnType<T>>();
  const funcRef = useRef(func);
  const mounted = useRef(true);
  funcRef.current = func;

  const isClientSide = typeof window !== 'undefined';
  const useRAF = !wait && wait !== 0 && isClientSide;

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }

  wait = +wait! || 0;
  options = options || {};

  const leading = !!options.leading;
  const trailing = 'trailing' in options ? !!options.trailing : true; // `true` by default
  const maxing = 'maxWait' in options;
  const debounceOnServer =
    'debounceOnServer' in options ? !!options.debounceOnServer : false; // `false` by default
  const maxWait = maxing ? Math.max(+options.maxWait! || 0, wait) : null;

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const debounced = useMemo(() => {
    const invokeFunc = (time: number) => {
      const args = lastArgs.current;
      const thisArg = lastThis.current;

      lastArgs.current = lastThis.current = null as any;
      lastInvokeTime.current = time;
      return (result.current = funcRef.current.apply(thisArg, args));
    };

    const startTimer = (pendingFunc: () => void, wait: number) => {
      if (useRAF) cancelAnimationFrame(timerId.current!);
      timerId.current = useRAF
        ? requestAnimationFrame(pendingFunc)
        : setTimeout(pendingFunc, wait) as any;
    };

    const shouldInvoke = (time: number) => {
      if (!mounted.current) return false;

      const timeSinceLastCall = time - lastCallTime.current!;
      const timeSinceLastInvoke = time - lastInvokeTime.current;

      return (
        !lastCallTime.current ||
        timeSinceLastCall >= wait ||
        timeSinceLastCall < 0 ||
        (maxing && timeSinceLastInvoke >= maxWait!)
      );
    };

    const trailingEdge = (time: number) => {
      timerId.current = null;
      if (trailing && lastArgs.current) {
        return invokeFunc(time);
      }
      lastArgs.current = lastThis.current = null as any;
      return result.current;
    };

    const timerExpired = () => {
      const time = Date.now();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      if (!mounted.current) {
        return;
      }
      const timeSinceLastCall = time - lastCallTime.current!;
      const timeSinceLastInvoke = time - lastInvokeTime.current;
      const timeWaiting = wait - timeSinceLastCall;
      const remainingWait = maxing
        ? Math.min(timeWaiting, maxWait! - timeSinceLastInvoke)
        : timeWaiting;

      // Restart the timer
      startTimer(timerExpired, remainingWait);
    };

    const func: DebouncedState<T> = (...args: Parameters<T>): ReturnType<T> => {
      if (!isClientSide && !debounceOnServer) {
        return void (0) as any;
      }
      const time = Date.now();
      const isInvoking = shouldInvoke(time);

      lastArgs.current = args;
      lastThis.current = this;
      lastCallTime.current = time as any;

      if (isInvoking) {
        if (!timerId.current && mounted.current) {
          lastInvokeTime.current = lastCallTime.current as any;
          startTimer(timerExpired, wait);
          return leading ? invokeFunc(lastCallTime.current!) : result.current;
        }
        if (maxing) {
          startTimer(timerExpired, wait);
          return invokeFunc(lastCallTime.current!);
        }
      }
      if (!timerId.current) {
        startTimer(timerExpired, wait);
      }
      return result.current!;
    };

    func.cancel = () => {
      if (timerId.current) {
        useRAF
          ? cancelAnimationFrame(timerId.current)
          : clearTimeout(timerId.current);
      }
      lastInvokeTime.current = 0;
      lastArgs.current =
        lastCallTime.current =
        lastThis.current =
        timerId.current =
        null as any;
    };

    func.isPending = () => {
      return !!timerId.current;
    };

    func.flush = () => {
      return !timerId.current ? result.current : trailingEdge(Date.now());
    };

    return func;
  }, [
    leading,
    maxing,
    wait,
    maxWait,
    trailing,
    useRAF,
    isClientSide,
    debounceOnServer,
  ]);

  return debounced;
}

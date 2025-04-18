import { useCallback, useEffect, useRef, useState } from "react";

type SendOptions<T> = {
  requestFn: () => Promise<T>;
  success?: (data: T) => void;
  fail?: (error: any) => void;
  complete?: () => void;
  ignore_while_loading?: boolean;
}

export const useLoadRequest = () => {
  const [load, setIsLoad] = useState(false);
  const is_mounted = useRef(true);

  useEffect(() => {
    return () => {
      is_mounted.current = false;
    };
  }, [])

  const send = useCallback(async <T>(options: SendOptions<T>) => {
    const { requestFn, success, fail, complete, ignore_while_loading } = options;
    if (load && ignore_while_loading) return;
    setIsLoad(true);
    try {
      const data = await requestFn();
      if (is_mounted.current) {
        success && success(data);
        setIsLoad(false);
      }
    } catch (error) {
      if (is_mounted.current) {
        fail && fail(error);
        setIsLoad(false);
      }
    } finally {
      if (is_mounted.current) {
        complete && complete();
        setIsLoad(false);

      }
    }
  }, [load])

  return {
    load,
    send,
  }
}

import { useEffect, useRef, MutableRefObject } from 'react';

export function useInterval(callback: () => void, delay: number | null) {
	const savedCallback: MutableRefObject<(() => void) | undefined> = useRef();

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		function tick() {
			if (savedCallback.current) {
				savedCallback.current();
			}
		}
		if (delay !== null) {
			const id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}

export const usePrevious = <T>(value: T): T | undefined => {
	const ref: MutableRefObject<T | undefined> = useRef();

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
};

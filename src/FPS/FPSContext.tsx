import { createContext, FC, ReactNode, useCallback, useMemo, useRef, useState } from "react";

export const FPSContext = createContext<{
    fps: number;
    avg: number;
    tick: () => void;
    reset: () => void;
}>({
    fps: 0,
    avg: 0,
    tick: () => {},
    reset: () => {},
});

export const FpsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [fps, setFps] = useState<number>(0);
    const [stat, setStat] = useState<number[]>([]);
    const prefTick = useRef<number>(0);

    const tick = useCallback(() => {
        const fps = 1000 / (performance.now() - prefTick.current)
        setFps(fps);
        setStat(prev => {
            prev.push(fps);
            return prev;
        });
        prefTick.current = performance.now();
    }, []);

    const avg = useMemo(() => {
        let sum = 0;
        const skipEndSize = Math.floor(stat.length / 5);
        for (let i = skipEndSize; i < stat.length - skipEndSize; i++) {
            sum += stat[i];
        }
        return sum / (stat.length * 0.6);
    }, [stat.length])

    const reset = useCallback(() => {
        setStat([]);
    }, []);

    const contextValue = { fps, tick, avg, reset };

    return (
        <FPSContext.Provider value={contextValue}>
            {children}
        </FPSContext.Provider>
    );
};

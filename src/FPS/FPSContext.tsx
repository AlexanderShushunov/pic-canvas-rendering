import { createContext, FC, ReactNode, useCallback, useRef, useState } from "react";

export const FPSContext = createContext<{
    fps: number;
    tick: () => void;
}>({
    fps: 0,
    tick: () => {},
});

export const FpsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [fps, setFps] = useState<number>(0);
    const prefTick = useRef<number>(0);

    const tick = useCallback(() => {
        setFps(1000 / (performance.now() - prefTick.current));
        prefTick.current = performance.now();
    }, []);

    const contextValue = { fps, tick };

    return (
        <FPSContext.Provider value={contextValue}>
            {children}
        </FPSContext.Provider>
    );
};

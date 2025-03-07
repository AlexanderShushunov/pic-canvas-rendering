import { FormEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import { FpsProvider, FPS } from "./FPS";
import { SvgAnimator } from "./SvgAnimator.tsx";

const canvasSize = 500;

function App() {
    const canvas = useRef<HTMLCanvasElement>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
    const [count, setCount] = useState(50000);

    const handleCountChange = (event: FormEvent<HTMLInputElement>) => {
        const value = parseInt((event.target as HTMLInputElement).value, 10);
        setCount(value);
    }

    useEffect(() => {
        if (!canvas.current) return;

        canvas.current.width = canvasSize;
        canvas.current.height = canvasSize;

        setCtx(canvas.current.getContext("2d"));
    }, []);

    return (
        <FpsProvider>
            <label>Star count: <input value={count} onInput={handleCountChange} type="number" /></label>
            <FPS />
            <canvas ref={canvas} />
            {ctx &&
              <SvgAnimator ctx={ctx} size={canvasSize} count={count} />
            }
        </FpsProvider>
    );
}

export default App;

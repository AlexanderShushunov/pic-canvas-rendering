import { FormEvent, useEffect, useRef, useState } from "react";
import { FpsProvider, FPS } from "./FPS";
import { SvgAnimator } from "./SvgAnimator";
import { WebpAnimator } from "./WebpAnimator";

const canvasSize = 500;

function App() {
    const canvas = useRef<HTMLCanvasElement>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [count, setCount] = useState(50000);
    const [animator, setAnimator] = useState<"svg" | "webp">("svg");

    const handleCountChange = (event: FormEvent<HTMLInputElement>) => {
        const value = parseInt((event.target as HTMLInputElement).value, 10);
        setCount(value);
    };

    const handleAnimatorChange = (event: FormEvent<HTMLSelectElement>) => {
        const value = (event.target as HTMLSelectElement).value;
        setAnimator(value as "svg" | "webp");
    };

    useEffect(() => {
        if (!canvas.current) return;

        canvas.current.width = canvasSize;
        canvas.current.height = canvasSize;

        setCtx(canvas.current.getContext("2d"));
    }, []);

    const renderAnimator = () => {
        if (!ctx) {
            return null;
        }
        if (animator === "svg") {
            return <SvgAnimator ctx={ctx} size={canvasSize} count={count} />;
        }
        if (animator === "webp") {
            return <WebpAnimator ctx={ctx} size={canvasSize} count={count} />;
        }
    };

    return (
        <FpsProvider>
            <label>
                Star count:
                <input value={count} onInput={handleCountChange} type="number" />
            </label>
            <br />
            <label>
                Animator:
                <select value={animator} onChange={handleAnimatorChange}>
                    <option value="webp">Webp</option>
                    <option value="svg">SVG</option>
                </select>
            </label>
            <FPS />
            <canvas ref={canvas} />
            {renderAnimator()}
        </FpsProvider>
    );
}

export default App;

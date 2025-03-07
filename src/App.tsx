import { useEffect, useRef } from "react";
import "./App.css";
import { Star } from "./Star";
import { StatLoader } from "./StatLoader";
import { Animation } from "./Animation";
import { generatePositionsAroundPoint } from "./generatePositionsAroundPoint.ts";

const canvasSize = 500;

function App() {
    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvas.current) return;

        canvas.current.width = canvasSize;
        canvas.current.height = canvasSize;

        const ctx = canvas.current.getContext("2d");
        if (!ctx) return;

        StatLoader.loaded.then(() => {
            const animation = new Animation({
                positions: generatePositionsAroundPoint({
                    center: { x: canvasSize / 2, y: canvasSize / 2 },
                    radius: canvasSize / 2,
                    count: 200,
                }),
                starCreator: (position) => new Star(
                    position,
                    canvasSize / 10,
                    StatLoader.svgImage,
                ),
            });

            const nextFrame = () => {
                ctx.fillStyle = "#000";
                ctx.fillRect(0, 0, canvasSize, canvasSize);
                const isFinished = animation.tick(ctx, performance.now());
                if (isFinished) {
                    return;
                }
                requestAnimationFrame(nextFrame);
            };
            nextFrame();
        });
    });

    return (
        <>
            <canvas ref={canvas} />
        </>
    );
}

export default App;

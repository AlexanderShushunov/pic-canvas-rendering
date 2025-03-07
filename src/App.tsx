import { useEffect, useRef } from "react";
import "./App.css";
import { Star } from "./Star";
import { StatLoader } from "./StatLoader";

const canvasSize = 500;

function App() {
    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvas.current) return;

        canvas.current.width = canvasSize;
        canvas.current.height = canvasSize;

        const ctx = canvas.current.getContext("2d");
        if (!ctx) return;

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvasSize, canvasSize);

        StatLoader.loaded.then(() => {
            const star = new Star(100, 100, 50, StatLoader.svgImage);
            star.draw(ctx, 1);
        });
    });

    return (
        <>
            <canvas ref={canvas} />
        </>
    );
}

export default App;

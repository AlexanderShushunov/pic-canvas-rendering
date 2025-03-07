import { useEffect, useRef } from "react";
import "./App.css";
import { Star } from "./Star";

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

        const star = new Star(100, 100, 50);

        // wait for the image to load
        setTimeout(() => {
            star.draw(ctx, 1);
        }, 1000);
    });

    return (
        <>
            <canvas ref={canvas} />
        </>
    );
}

export default App;

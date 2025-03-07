import { FC, useContext, useEffect } from "react";
import { Animation } from "../Animation";
import { generatePositionsAroundPoint } from "../utils/generatePositionsAroundPoint";
import { FPSContext } from "../FPS";
import { SvgStar } from "../SvgAnimator";

export const DoubleBufferingSvgAnimator: FC<{
    ctx: CanvasRenderingContext2D;
    size: number;
    count: number;
}> = ({
    ctx,
    size,
    count,
}) => {
    const { tick, reset } = useContext(FPSContext);

    useEffect(() => {
        const buffer = document.createElement("canvas");
        buffer.width = size;
        buffer.height = size;
        const bufferCtx = buffer.getContext("2d");
        if (!bufferCtx) {
            return;
        }
        const animation = new Animation({
            positions: generatePositionsAroundPoint({
                center: { x: size / 2, y: size / 2 },
                radius: size / 2,
                count,
            }),
            starCreator: (position) => new SvgStar(
                position,
                size / 10,
                bufferCtx,
            ),
        });

        let rafId = 0;
        const nextFrame = () => {
            bufferCtx.fillStyle = "#000";
            bufferCtx.fillRect(0, 0, size, size);
            const isFinished = animation.tick(performance.now());
            ctx.drawImage(buffer, 0, 0);
            tick();
            if (isFinished) {
                return;
            }
            rafId = requestAnimationFrame(nextFrame);
        };
        nextFrame();
        reset();
        return () => cancelAnimationFrame(rafId);
    }, [count, size, ctx, tick]);

    return null;
};

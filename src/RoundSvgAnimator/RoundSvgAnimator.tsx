import { FC, useContext, useEffect } from "react";
import { Animation } from "../Animation";
import { generatePositionsAroundPoint } from "../utils/generatePositionsAroundPoint";
import { FPSContext } from "../FPS";
import { RoundSvgStar } from "./RoundSvgStar.ts";

export const RoundSvgAnimator: FC<{
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
        const animation = new Animation({
            positions: generatePositionsAroundPoint({
                center: { x: size / 2, y: size / 2 },
                radius: size / 2,
                count,
            }),
            starCreator: (position) => new RoundSvgStar(
                position,
                size / 10,
                ctx,
            ),
        });

        let rafId = 0;
        const nextFrame = () => {
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, size, size);
            const isFinished = animation.tick(performance.now());
            tick();
            if (isFinished) {
                return;
            }
            rafId = requestAnimationFrame(nextFrame);
        };
        reset();
        nextFrame();
        return () => cancelAnimationFrame(rafId);
    }, [count, size, ctx, tick]);

    return null;
};

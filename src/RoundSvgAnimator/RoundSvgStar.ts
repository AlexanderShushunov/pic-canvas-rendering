import { Position } from "../utils/Position";
import { loadImage } from "../utils/loadImage.ts";
import svgSrc from "./star.svg";

export class RoundSvgStar {
    private static startImg: HTMLImageElement | undefined = undefined;

    static {
        loadImage(svgSrc).then((image) => {
            RoundSvgStar.startImg = image;
        })
    }

    public constructor(
        private readonly position: Position,
        private readonly radius: number,
        private readonly ctx: CanvasRenderingContext2D
    ) {}

    public draw(scale: number): void {
        if (RoundSvgStar.startImg === undefined) {
            return;
        }
        const realRadius =  Math.floor(this.radius * scale);
        this.ctx.drawImage(
            RoundSvgStar.startImg,
            Math.floor(this.position.x - realRadius / 2),
            Math.floor(this.position.y - realRadius / 2),
            realRadius,
            realRadius,
        );
    }
}

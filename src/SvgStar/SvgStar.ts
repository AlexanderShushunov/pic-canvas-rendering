import { Position } from "../Position";
import { loadImage } from "../loadImage.ts";
import svgSrc from "./star.svg";

export class SvgStar {
    private static startImg: HTMLImageElement | undefined = undefined;

    static {
        loadImage(svgSrc).then((image) => {
            SvgStar.startImg = image;
        })
    }

    public constructor(
        private readonly position: Position,
        private readonly radius: number,
        private readonly ctx: CanvasRenderingContext2D
    ) {}

    public draw(scale: number): void {
        if (SvgStar.startImg === undefined) {
            return;
        }
        const realRadius = this.radius * scale;
        this.ctx.drawImage(
            SvgStar.startImg,
            this.position.x - realRadius / 2,
            this.position.y - realRadius / 2,
            realRadius,
            realRadius,
        );
    }
}

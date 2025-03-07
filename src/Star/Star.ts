import { loadImage } from "./loadImage.ts";
import svgSrc from "./star.svg"

export class Star {
    private startImg: HTMLImageElement | undefined = undefined;

    public constructor(
        private readonly x: number,
        private readonly y: number,
        private readonly radius: number,
    ) {
        loadImage(svgSrc).then(
            image => { this.startImg = image; }
        );
    }

    public draw(ctx: CanvasRenderingContext2D, scale: number): void {

        if (this.startImg === undefined) {
            return;
        }
        const realRadius = this.radius * scale;
        ctx.drawImage(
            this.startImg,
            this.x - realRadius / 2,
            this.y - realRadius / 2,
            realRadius,
            realRadius,
        );
    }
}

import { Position } from "../utils/Position";
import { loadImage } from "../utils/loadImage.ts";
import webpSrc from "./star.webp";

export class WebpStar {
    private static startImg: HTMLImageElement | undefined = undefined;

    static {
        loadImage(webpSrc).then((image) => {
            WebpStar.startImg = image;
        })
    }

    public constructor(
        private readonly position: Position,
        private readonly radius: number,
        private readonly ctx: CanvasRenderingContext2D
    ) {}

    public draw(scale: number): void {
        if (WebpStar.startImg === undefined) {
            return;
        }
        const realRadius = this.radius * scale;
        this.ctx.drawImage(
            WebpStar.startImg,
            this.position.x - realRadius / 2,
            this.position.y - realRadius / 2,
            realRadius,
            realRadius,
        );
    }
}

import { Position } from "../utils/Position";
import { loadImage } from "../utils/loadImage.ts";
import svgSrc from "./star.svg";

export class CacheSvgStar {
    private static startImg: HTMLImageElement | undefined = undefined;
    private static cache: Record<number, HTMLCanvasElement> = {};

    static {
        loadImage(svgSrc).then((image) => {
            CacheSvgStar.startImg = image;
        });
    }

    public constructor(
        private readonly position: Position,
        private readonly radius: number,
        private readonly ctx: CanvasRenderingContext2D,
    ) {}

    public draw(scale: number): void {
        const realRadius = Math.floor(this.radius * scale);
        const img = this.getImg(realRadius);
        if (img === undefined) {
            return;
        }
        this.ctx.drawImage(
            img,
            this.position.x - realRadius / 2,
            this.position.y - realRadius / 2,
        );
    }

    public getImg(radius: number): HTMLCanvasElement | undefined {
        if (CacheSvgStar.cache[radius] !== undefined) {
            return CacheSvgStar.cache[radius];
        }

        if (CacheSvgStar.startImg === undefined) {
            return undefined;
        }
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (ctx === null) {
            return undefined;
        }
        canvas.width = Math.max(radius, 1);
        canvas.height = Math.max(radius, 1);
        ctx.drawImage(
            CacheSvgStar.startImg,
            0,
            0,
            radius,
            radius,
        );
        CacheSvgStar.cache[radius] = canvas;
        return canvas;
    }
}

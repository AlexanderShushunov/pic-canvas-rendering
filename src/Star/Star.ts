import { Position } from "../Position";

export class Star {

    public constructor(
        private readonly position: Position,
        private readonly radius: number,
        private readonly startImg: HTMLImageElement,
    ) {}

    public draw(ctx: CanvasRenderingContext2D, scale: number): void {

        if (this.startImg === undefined) {
            return;
        }
        const realRadius = this.radius * scale;
        ctx.drawImage(
            this.startImg,
            this.position.x - realRadius / 2,
            this.position.y - realRadius / 2,
            realRadius,
            realRadius,
        );
    }
}

export class Star {

    public constructor(
        private readonly x: number,
        private readonly y: number,
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
            this.x - realRadius / 2,
            this.y - realRadius / 2,
            realRadius,
            realRadius,
        );
    }
}

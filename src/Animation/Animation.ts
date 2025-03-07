import { Position } from "../utils/Position";

type Star = {
    draw(scale: number): void;
};

const doNotStart = -1;

export class Animation {
    private readonly stars: Star[];
    private startTime: number = doNotStart;
    private readonly fullAnimationDuration: number;
    private readonly oneStarAnimationDuration: number;
    private readonly startTimes: number[] = [];

    public constructor({
        positions,
        starCreator,
        fullAnimationDuration = 10000,
        oneStarAnimationDuration = 700,
    }: {
        positions: Position[];
        starCreator: (position: Position) => Star;
        fullAnimationDuration?: number;
        oneStarAnimationDuration?: number;
    }) {
        this.fullAnimationDuration = fullAnimationDuration;
        this.oneStarAnimationDuration = oneStarAnimationDuration;
        this.stars = positions.map(starCreator);
        this.startTimes = positions.map(() => Math.random() * (fullAnimationDuration - oneStarAnimationDuration));
    }

    public tick(time: number): boolean {
        if (this.startTime === doNotStart) {
            this.startTime = time;
        }
        const currentAnimationTime = time - this.startTime;

        this.stars.forEach((star, idx) => {
            const theStarStartTime = this.startTimes[idx];
            if (
                theStarStartTime < currentAnimationTime
                && theStarStartTime + this.oneStarAnimationDuration > currentAnimationTime
            ) {
                const progress = (currentAnimationTime - theStarStartTime) / this.oneStarAnimationDuration;
                // The first half of animation time an image should increase its size and the second part - decrease.
                const scale = 2 * (progress > 0.5 ? 1 - progress : progress);
                star.draw(scale);
            }
        });

        return currentAnimationTime > this.fullAnimationDuration;
    }
}

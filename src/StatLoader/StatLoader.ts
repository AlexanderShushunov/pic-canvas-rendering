import { loadImage } from "./loadImage.ts";
import svgSrc from "./star.svg"

export class StatLoader {
    private static _svgImg: HTMLImageElement
    private static loaders: Promise<HTMLImageElement[]>;

    static {
        const svgLoader = loadImage(svgSrc);
        svgLoader.then((img) => {
            StatLoader._svgImg = img;
        });
        StatLoader.loaders = Promise.all([svgLoader]);
    }

    static get loaded(): Promise<void> {
        return new Promise(
            resolve => StatLoader.loaders.then(() => resolve())
        );
    }

    static get svgImage(): HTMLImageElement {
        return StatLoader._svgImg;
    }
}

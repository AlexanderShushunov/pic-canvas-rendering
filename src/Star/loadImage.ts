export function loadImage(src: string): Promise<HTMLImageElement> {
    const image = new Image();
    image.src = src;
    return new Promise((resolve, reject) => {
        image.onerror = () =>  reject("ups");
        image.onload = () => resolve(image);
    });
}

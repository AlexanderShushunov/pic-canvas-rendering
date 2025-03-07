import type { Position } from "./Position";

export function generatePositionsAroundPoint({
    center,
    radius,
    count,
}: {
    center: { x: number; y: number; };
    radius: number;
    count: number;
}): Position[] {
    const result: Position[] = [];
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * radius;
        result.push({
            x: center.x + Math.cos(angle) * distance,
            y: center.y + Math.sin(angle) * distance,
        });
    }
    return result;
}

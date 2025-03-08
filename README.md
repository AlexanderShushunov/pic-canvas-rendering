# Canvas Drawing Performance Comparison

This project tests the performance of drawing numerous scaled "stars"
on a canvas. We evaluated different approaches:
- **SVG source** – Worst performance.
- **Integer values in draw functions** – No performance improvement over SVG.
- **Double buffering** ("offscreen" canvas) – No performance improvement over SVG.
- **Pre-rendered stars** – Significantly better than SVG.
- **WEBP source** – Best performance.

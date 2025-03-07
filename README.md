# Check Drawing Performance in Canvas

The code draws a lot of "stars" on the canvas. 
We checked how different approaches affect performance:
- Use SVG or PNG stars
- Use pre-rendered stars
- Use "double buffering" (draw on an offscreen canvas and then copy to the main canvas)

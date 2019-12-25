import { brforeDraw, drew } from "./common";

/**
 * @description 马赛克工具类
 * @author tanglv
 * @date 2019-12-24
 * @param {*} canvas
 */
function Mosaic(canvas) {
    if (!canvas) {
        throw "canvas is required";
    }
    this.canvas = canvas;
    this.width = 12;
    this.color = "red";
    this.canvas.freeDrawingBrush.color = "red";
}
Mosaic.prototype.onWork = function() {
    brforeDraw(this.canvas);
    this.canvas.isDrawingMode = true;
    const squarePatternBrush = new fabric.PatternBrush(this.canvas);
    squarePatternBrush.getPatternSrc = function() {
        /* let squareWidth = 10,
            squareDistance = 1;

        let patternCanvas = fabric.document.createElement("canvas");
        patternCanvas.width = patternCanvas.height =
            squareWidth + squareDistance;
        let ctx = patternCanvas.getContext("2d");

        // ctx.fillStyle = "yellow";
        var gradient = ctx.createLinearGradient(0, 0, 10, 10);
        // Add three color stops
        gradient.addColorStop(0, "green");
        gradient.addColorStop(0.5, "cyan");
        gradient.addColorStop(1, "green");

        function getRndColor() {
            var r = (255 * Math.random()) | 0,
                g = (255 * Math.random()) | 0,
                b = (255 * Math.random()) | 0;
            return "rgb(" + r + "," + g + "," + b + ")";
        }

        ctx.globalAlpha = 0.9;
        // ctx.fillStyle = getRndColor();
        ctx.fillRect(0, 0, squareWidth, squareWidth); */

        let squareWidth = 10,
            squareDistance = 1;
        let patternCanvas = fabric.document.createElement("canvas");
        patternCanvas.width = patternCanvas.height =
            squareWidth + squareDistance;
        let ctx = patternCanvas.getContext("2d");

        // Creating a mosaic
        var imageData = ctx.createImageData(10, 10);
        var pixels = imageData.data;

        // Number of mosaic tiles
        var numTileRows = 2;
        var numTileCols = 2;

        // Dimensions of each tile
        var tileWidth = imageData.width / numTileCols;
        var tileHeight = imageData.height / numTileRows;

        // Loop through each tile
        for (var r = 0; r < numTileRows; r++) {
            for (var c = 0; c < numTileCols; c++) {
                // Set the pixel values for each tile
                var red = Math.random() * 255;
                var green = Math.random() * 255;
                var blue = Math.random() * 255;

                // Loop through each tile pixel
                for (var tr = 0; tr < tileHeight; tr++) {
                    for (var tc = 0; tc < tileWidth; tc++) {
                        // Calculate the true position of the tile pixel
                        var trueRow = r * tileHeight + tr;
                        var trueCol = c * tileWidth + tc;

                        // Calculate the position of the current pixel in the array
                        var pos = trueRow * (imageData.width * 4) + trueCol * 4;

                        // Assign the colour to each pixel
                        pixels[pos + 0] = red;
                        pixels[pos + 1] = green;
                        pixels[pos + 2] = blue;
                        pixels[pos + 3] = 255;
                    }
                }
            }
        }

        // Draw image data to the canvas
        ctx.putImageData(imageData, 0, 0);

        return patternCanvas;
    };
    this.canvas.freeDrawingBrush = squarePatternBrush;
    this.canvas.freeDrawingBrush.color = "green";
    this.canvas.freeDrawingBrush.width = 12;
};
Mosaic.prototype.offWork = function() {
    this.canvas.isDrawingMode = false;
    drew(this.canvas);
    this.canvas.hoverCursor = "move";
    this.canvas.item(0).selectable = true;
};
Mosaic.prototype.setWidth = function(width) {
    if (!width) {
        throw "Mosaic setWidth must pass width param.";
    }
    this.canvas.freeDrawingBrush.width = this.width = width;
};
Mosaic.prototype.setColor = function(color) {
    if (!color) {
        throw "Mosaic setColor must pass color param.";
    }
    this.canvas.freeDrawingBrush.color = this.color = color;
};

export { Mosaic };

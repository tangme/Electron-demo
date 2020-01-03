import { brforeDraw, drew, HISTORY } from "../common";

/**
 * @description 马赛克工具类
 * @author tanglv
 * @date 2019-12-24
 * @param {*} canvas
 */
function MosaicTool(canvas) {
    if (!canvas) {
        throw "canvas is required";
    }
    this.canvas = canvas;
    this.width = 12;
    this.color = "red";
    this.canvas.freeDrawingBrush.color = "red";
    this.pathCreated = null;
}
MosaicTool.prototype.onWork = function() {
    const _this = this;
    this.canvas.on("path:created", function tmpPathCreated(o) {
        _this.onPathCreated(o);
        _this.pathCreated = tmpPathCreated;
    });
    brforeDraw(this.canvas);
    this.canvas.isDrawingMode = true;

    this.canvas.freeDrawingBrush = generateBrush(this.canvas);
    this.canvas.freeDrawingBrush.color = "green";
    this.canvas.freeDrawingBrush.width = 12;
};
MosaicTool.prototype.offWork = function() {
    this.canvas.isDrawingMode = false;
    this.canvas.off("path:created", this.pathCreated);
    drew(this.canvas);
    this.canvas.hoverCursor = "move";
    this.canvas.item(0).selectable = true;
};
MosaicTool.prototype.onPathCreated = function(o) {
    o.path.customId = Date.now();
    HISTORY.push(o.path.customId);
};
MosaicTool.prototype.setWidth = function(width) {
    if (!width) {
        throw "MosaicTool setWidth must pass width param.";
    }
    this.canvas.freeDrawingBrush.width = this.width = width;
};
MosaicTool.prototype.setColor = function(color) {
    if (!color) {
        throw "MosaicTool setColor must pass color param.";
    }
    this.canvas.freeDrawingBrush.color = this.color = color;
};

function generateBrush(canvas) {
    const squarePatternBrush = new fabric.PatternBrush(canvas);
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
                var red = Math.random() * 150; //255
                var green = Math.random() * 150; //255
                var blue = Math.random() * 150; //255

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
    return squarePatternBrush;
}

function gaussBlur(imgData) {
    var pixes = imgData.data;
    var width = imgData.width;
    var height = imgData.height;
    var gaussMatrix = [],
        gaussSum = 0,
        x,
        y,
        r,
        g,
        b,
        a,
        i,
        j,
        k,
        len;

    var radius = 10;
    var sigma = 5;

    a = 1 / (Math.sqrt(2 * Math.PI) * sigma);
    b = -1 / (2 * sigma * sigma);
    //生成高斯矩阵
    for (i = 0, x = -radius; x <= radius; x++, i++) {
        g = a * Math.exp(b * x * x);
        gaussMatrix[i] = g;
        gaussSum += g;
    }

    //归一化, 保证高斯矩阵的值在[0,1]之间
    for (i = 0, len = gaussMatrix.length; i < len; i++) {
        gaussMatrix[i] /= gaussSum;
    }
    //x 方向一维高斯运算
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            r = g = b = a = 0;
            gaussSum = 0;
            for (j = -radius; j <= radius; j++) {
                k = x + j;
                if (k >= 0 && k < width) {
                    //确保 k 没超出 x 的范围
                    //r,g,b,a 四个一组
                    i = (y * width + k) * 4;
                    r += pixes[i] * gaussMatrix[j + radius];
                    g += pixes[i + 1] * gaussMatrix[j + radius];
                    b += pixes[i + 2] * gaussMatrix[j + radius];
                    // a += pixes[i + 3] * gaussMatrix[j];
                    gaussSum += gaussMatrix[j + radius];
                }
            }
            i = (y * width + x) * 4;
            // 除以 gaussSum 是为了消除处于边缘的像素, 高斯运算不足的问题
            // console.log(gaussSum)
            pixes[i] = r / gaussSum;
            pixes[i + 1] = g / gaussSum;
            pixes[i + 2] = b / gaussSum;
            // pixes[i + 3] = a ;
        }
    }
    //y 方向一维高斯运算
    for (x = 0; x < width; x++) {
        for (y = 0; y < height; y++) {
            r = g = b = a = 0;
            gaussSum = 0;
            for (j = -radius; j <= radius; j++) {
                k = y + j;
                if (k >= 0 && k < height) {
                    //确保 k 没超出 y 的范围
                    i = (k * width + x) * 4;
                    r += pixes[i] * gaussMatrix[j + radius];
                    g += pixes[i + 1] * gaussMatrix[j + radius];
                    b += pixes[i + 2] * gaussMatrix[j + radius];
                    // a += pixes[i + 3] * gaussMatrix[j];
                    gaussSum += gaussMatrix[j + radius];
                }
            }
            i = (y * width + x) * 4;
            pixes[i] = r / gaussSum;
            pixes[i + 1] = g / gaussSum;
            pixes[i + 2] = b / gaussSum;
        }
    }
    return imgData;
}

export { MosaicTool };

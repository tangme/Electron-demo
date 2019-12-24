import { brforeDraw, drew } from "./common";

/**
 * @description 画笔工具类
 * @author tanglv
 * @date 2019-12-10
 */
function Pencil(canvas) {
    if (!canvas) {
        throw "canvas is required";
    }
    this.canvas = canvas;
    this.width = 1;
    this.color = "red";
    this.canvas.freeDrawingBrush.color = "red";
}
Pencil.prototype.onWork = function() {
    brforeDraw(this.canvas);
    this.canvas.isDrawingMode = true;
};
Pencil.prototype.offWork = function() {
    this.canvas.isDrawingMode = false;
    drew(this.canvas);
    this.canvas.hoverCursor = "move";
    this.canvas.item(0).selectable = true;
};
Pencil.prototype.setWidth = function(width) {
    if (!width) {
        throw "Pencil setWidth must pass width param.";
    }
    this.canvas.freeDrawingBrush.width = this.width = width;
};
Pencil.prototype.setColor = function(color) {
    if (!color) {
        throw "Pencil setColor must pass color param.";
    }
    this.canvas.freeDrawingBrush.color = this.color = color;
};

export { Pencil };

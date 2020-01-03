import { brforeDraw, drew, HISTORY } from "../common";

/**
 * @description 画笔工具类
 * @author tanglv
 * @date 2019-12-10
 */
function PencilTool(canvas) {
    if (!canvas) {
        throw "canvas is required";
    }
    this.canvas = canvas;
    this.size = 1; //画笔大小
    this.color = "red"; //画笔颜色
    this.pathCreated = null;
}

PencilTool.prototype.onWork = function() {
    brforeDraw(this.canvas);
    this.canvas.freeDrawingBrush = new fabric["PencilBrush"](this.canvas);
    this.canvas.isDrawingMode = true;
    this.canvas.freeDrawingBrush.color = this.color;
    this.canvas.freeDrawingBrush.width = this.size;
    let _this = this;
    this.canvas.on("path:created", function tmpPathCreated(o) {
        _this.onPathCreated(o);
        _this.pathCreated = tmpPathCreated;
    });
};

PencilTool.prototype.onPathCreated = function(o) {
    o.path.customId = Date.now();
    HISTORY.push(o.path.customId);
};

PencilTool.prototype.offWork = function() {
    this.canvas.isDrawingMode = false;
    this.canvas.off("path:created", this.pathCreated);
    drew(this.canvas);
    this.canvas.hoverCursor = "move";
    this.canvas.item(0).selectable = true;
};

PencilTool.prototype.setSize = function(size) {
    if (!size) {
        throw "PencilTool setSize must pass size param.";
    }
    this.canvas.freeDrawingBrush.width = this.size = size;
};

PencilTool.prototype.setColor = function(color) {
    if (!color) {
        throw "PencilTool setColor must pass color param.";
    }
    this.canvas.freeDrawingBrush.color = this.color = color;
};

export { PencilTool };

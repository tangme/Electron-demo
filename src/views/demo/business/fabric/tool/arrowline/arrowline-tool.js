import { brforeDraw, drew, HISTORY } from "../common";

/**
 * @description 箭头工具 类
 * @author tanglv
 * @date 2019-12-13
 */
function ArrowLineTool(canvas) {
    if (!canvas) {
        throw "canvas is required";
    }
    this.canvas = canvas;
    this.isDrawing = false;
    this.origX = null;
    this.origY = null;
    this.deltaX = null;
    this.deltaY = null;
    this.line = null;
    this.arrow = null;
    this.mouseDownEvent = null;
    this.mouseMoveEvent = null;
    this.mouseUpEvent = null;
    this.size = 1; //箭头大小
    this.color = "red"; //箭头颜色
}
ArrowLineTool.prototype.onWork = function() {
    brforeDraw(this.canvas);
    let _this = this;
    this.canvas.on("mouse:down", function tmpMouseDown(o) {
        _this.onMouseDown(o);
        _this.mouseDownEvent = tmpMouseDown;
    });
    this.canvas.on("mouse:move", function tmpMouseMove(o) {
        _this.onMouseMove(o);
        _this.mouseMoveEvent = tmpMouseMove;
    });
    this.canvas.on("mouse:up", function tmpMouseUp(o) {
        _this.onMouseUp(o);
        _this.mouseUpEvent = tmpMouseUp;
    });
};
ArrowLineTool.prototype.offWork = function() {
    this.canvas.hoverCursor = "move";
    this.canvas.item(0).selectable = true;
    this.canvas.off("mouse:down", this.mouseDownEvent);
    this.canvas.off("mouse:move", this.mouseMoveEvent);
    this.canvas.off("mouse:up", this.mouseUpEvent);
};

ArrowLineTool.prototype.onMouseDown = function(o) {
    this.isDrawing = true;
    let pointer = this.canvas.getPointer(o.e);
    let points = [pointer.x, pointer.y, pointer.x, pointer.y];
    let customId = Date.now();
    this.line = new fabric.Line(points, {
        strokeWidth: this.size,
        fill: this.color,
        stroke: this.color,
        originX: "center",
        originY: "center",
        customId: customId
        // id: "arrow_line",
        // uuid: generateUUID(),
        // type: "arrow"
    });
    let centerX = (this.line.x1 + this.line.x2) / 2;
    let centerY = (this.line.y1 + this.line.y2) / 2;
    this.deltaX = this.line.left - centerX;
    this.deltaY = this.line.top - centerY;

    this.triangle = new fabric.Triangle({
        left: this.line.get("x1") + this.deltaX,
        top: this.line.get("y1") + this.deltaY,
        originX: "center",
        originY: "center",
        selectable: false,
        angle: -45,
        width: this.size == 1 ? 8 : this.size * 4, //20
        height: this.size == 1 ? 8 : this.size * 4, //20
        fill: this.color,
        customId: customId
        // pointType: "arrow_start",
        // id: "arrow_triangle",
        // uuid: line.uuid
    });
    HISTORY.push(customId);
    this.canvas.add(this.line, this.triangle);

    // this.canvas.add(ellipse).setActiveObject(ellipse);
};
ArrowLineTool.prototype.onMouseMove = function(o) {
    if (!this.isDrawing) return;
    let pointer = this.canvas.getPointer(o.e);
    // let activeObj = this.canvas.getActiveObject();
    this.line.set({
        x2: pointer.x,
        y2: pointer.y
    });
    this.triangle.set({
        left: pointer.x + this.deltaX,
        top: pointer.y + this.deltaY,
        angle: _FabricCalcArrowAngle(
            this.line.x1,
            this.line.y1,
            this.line.x2,
            this.line.y2
        )
    });

    // this.ellipse.setCoords();
    this.canvas.renderAll();
};
ArrowLineTool.prototype.onMouseUp = function(o) {
    this.isDrawing = false;
    drew(this.canvas);
};
ArrowLineTool.prototype.setSize = function(size) {
    if (!size) {
        throw "Rect setSize must pass size param.";
    }
    this.size = size;
};
ArrowLineTool.prototype.setColor = function(color) {
    if (!color) {
        throw "Rect setColor must pass color param.";
    }
    this.color = color;
};

var _FabricCalcArrowAngle = function(x1, y1, x2, y2) {
    var angle = 0,
        x,
        y;
    x = x2 - x1;
    y = y2 - y1;
    if (x === 0) {
        angle = y === 0 ? 0 : y > 0 ? Math.PI / 2 : (Math.PI * 3) / 2;
    } else if (y === 0) {
        angle = x > 0 ? 0 : Math.PI;
    } else {
        angle =
            x < 0
                ? Math.atan(y / x) + Math.PI
                : y < 0
                ? Math.atan(y / x) + 2 * Math.PI
                : Math.atan(y / x);
    }
    return (angle * 180) / Math.PI + 90;
};

export { ArrowLineTool };

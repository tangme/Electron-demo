/**
 * @description 箭头工具 类
 * @author tanglv
 * @date 2019-12-13
 */
function Arrowline(canvas) {
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
    this.strokeWidth = 1;
    this.stroke = "red";
}
Arrowline.prototype.onWork = function() {
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
Arrowline.prototype.offWork = function() {
    this.canvas.off("mouse:down", this.mouseDownEvent);
    this.canvas.off("mouse:move", this.mouseMoveEvent);
    this.canvas.off("mouse:up", this.mouseUpEvent);
};

Arrowline.prototype.onMouseDown = function(o) {
    this.isDrawing = true;
    let pointer = this.canvas.getPointer(o.e);
    let points = [pointer.x, pointer.y, pointer.x, pointer.y];
    this.line = new fabric.Line(points, {
        strokeWidth: this.strokeWidth,
        fill: this.stroke,
        stroke: this.stroke,
        originX: "center",
        originY: "center"
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
        width: this.strokeWidth == 1 ? 8 : this.strokeWidth * 4, //20
        height: this.strokeWidth == 1 ? 8 : this.strokeWidth * 4, //20
        fill: this.stroke
        // pointType: "arrow_start",
        // id: "arrow_triangle",
        // uuid: line.uuid
    });
    this.canvas.add(this.line, this.triangle);

    // this.canvas.add(ellipse).setActiveObject(ellipse);
};
Arrowline.prototype.onMouseMove = function(o) {
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
Arrowline.prototype.onMouseUp = function(o) {
    this.isDrawing = false;
};
Arrowline.prototype.setStrokeWidth = function(width) {
    if (!width) {
        throw "Rect setStrokeWidth must pass width param.";
    }
    this.strokeWidth = width;
};
Arrowline.prototype.setStroke = function(stroke) {
    if (!stroke) {
        throw "Rect setStroke must pass stroke param.";
    }
    this.stroke = stroke;
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

export { Arrowline };

/**
 * @description 椭圆工具类
 * @author tanglv
 * @date 2019-12-10
 */

function ToolEllipse(canvas) {
    if (!canvas) {
        throw "canvas is required";
    }
    this.canvas = canvas;
    this.isDrawing = false;
    this.origX = null;
    this.origY = null;
    this.mouseDownEvent = null;
    this.mouseMoveEvent = null;
    this.mouseUpEvent = null;
    this.ellipse = null;
    this.strokeWidth = 1;
    this.stroke = "red";
}
ToolEllipse.prototype.onWork = function() {
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
ToolEllipse.prototype.offWork = function() {
    this.canvas.off("mouse:down", this.mouseDownEvent);
    this.canvas.off("mouse:move", this.mouseMoveEvent);
    this.canvas.off("mouse:up", this.mouseUpEvent);
};

ToolEllipse.prototype.onMouseDown = function(o) {
    this.isDrawing = true;
    let pointer = this.canvas.getPointer(o.e);
    this.origX = pointer.x;
    this.origY = pointer.y;

    this.ellipse = new fabric.Ellipse({
        top: this.origY,
        left: this.origX,
        rx: 0,
        ry: 0,
        transparentCorners: false,
        fill: "rgba(255,0,0,0)",
        stroke: this.stroke,
        strokeWidth: this.strokeWidth,
        hasControls: false,
        hasBorders: false
    });

    this.canvas.add(this.ellipse);
};
ToolEllipse.prototype.onMouseMove = function(o) {
    if (!this.isDrawing) return;
    let pointer = this.canvas.getPointer(o.e);

    if (this.origX > pointer.x) {
        this.ellipse.set({
            left: Math.abs(pointer.x)
        });
    }

    if (this.origY > pointer.y) {
        this.ellipse.set({
            top: Math.abs(pointer.y)
        });
    }

    this.ellipse.set({
        rx: Math.abs(this.origX - pointer.x) / 2
    });
    this.ellipse.set({
        ry: Math.abs(this.origY - pointer.y) / 2
    });
    // this.ellipse.setCoords();
    this.canvas.renderAll();
};
ToolEllipse.prototype.onMouseUp = function(o) {
    this.isDrawing = false;
};
ToolEllipse.prototype.setStrokeWidth = function(width) {
    if (!width) {
        throw "Rect setStrokeWidth must pass width param.";
    }
    this.strokeWidth = width;
};
ToolEllipse.prototype.setStroke = function(stroke) {
    if (!stroke) {
        throw "Rect setStroke must pass stroke param.";
    }
    this.stroke = stroke;
};

export { ToolEllipse };

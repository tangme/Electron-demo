/**
 * @description 矩形工具类
 * @author tanglv
 * @date 2019-12-10
 */
function ToolRect(canvas) {
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
    this.rect = null;
    this.strokeWidth = 1;
    this.stroke = "red";
}
ToolRect.prototype.onWork = function() {
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
ToolRect.prototype.offWork = function() {
    this.canvas.off("mouse:down", this.mouseDownEvent);
    this.canvas.off("mouse:move", this.mouseMoveEvent);
    this.canvas.off("mouse:up", this.mouseUpEvent);
};

ToolRect.prototype.onMouseDown = function(o) {
    this.isDrawing = true;
    var pointer = this.canvas.getPointer(o.e);
    this.origX = pointer.x;
    this.origY = pointer.y;
    this.rect = new fabric.Rect({
        left: this.origX,
        top: this.origY,
        originX: "left",
        originY: "top",
        width: pointer.x - this.origX,
        height: pointer.y - this.origY,
        angle: 0,
        fill: "rgba(255,0,0,0)",
        stroke: this.stroke,
        strokeWidth: this.strokeWidth,
        transparentCorners: false,
        hasControls: false,
        hasBorders: false
    });
    this.canvas.add(this.rect);
};
ToolRect.prototype.onMouseMove = function(o) {
    if (!this.isDrawing) return;
    let pointer = this.canvas.getPointer(o.e);

    if (this.origX > pointer.x) {
        this.rect.set({ left: Math.abs(pointer.x) });
    }
    if (this.origY > pointer.y) {
        this.rect.set({ top: Math.abs(pointer.y) });
    }

    this.rect.set({ width: Math.abs(this.origX - pointer.x) });
    this.rect.set({ height: Math.abs(this.origY - pointer.y) });

    this.canvas.renderAll();
};
ToolRect.prototype.onMouseUp = function(o) {
    this.isDrawing = false;
};
ToolRect.prototype.setStrokeWidth = function(width) {
    if (!width) {
        throw "Rect setStrokeWidth must pass width param.";
    }
    this.strokeWidth = width;
};
ToolRect.prototype.setStroke = function(stroke) {
    if (!stroke) {
        throw "Rect setStroke must pass stroke param.";
    }
    this.stroke = stroke;
};

export { ToolRect };

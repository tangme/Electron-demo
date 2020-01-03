import { brforeDraw, drew, HISTORY } from "../common";

/**
 * @description 椭圆工具类
 * @author tanglv
 * @date 2019-12-10
 */

function EllipseTool(canvas) {
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
    this.size = 1; //椭圆描边大小
    this.color = "red"; //椭圆描边颜色
}
EllipseTool.prototype.onWork = function() {
    let _this = this;
    brforeDraw(this.canvas);
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
EllipseTool.prototype.offWork = function() {
    this.canvas.hoverCursor = "move";
    this.canvas.item(0).selectable = true;
    this.canvas.off("mouse:down", this.mouseDownEvent);
    this.canvas.off("mouse:move", this.mouseMoveEvent);
    this.canvas.off("mouse:up", this.mouseUpEvent);
};

EllipseTool.prototype.onMouseDown = function(o) {
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
        stroke: this.color,
        strokeWidth: this.size,
        hasControls: false,
        hasBorders: false,
        customId: Date.now()
    });
    HISTORY.push(this.ellipse.customId);
    this.canvas.add(this.ellipse);
};
EllipseTool.prototype.onMouseMove = function(o) {
    if (!this.isDrawing) return;
    let pointer = this.canvas.getPointer(o.e);

    if (this.origX > pointer.x) {
        if (pointer.x < 0) {
            this.ellipse.set({
                left: pointer.x
            });
        } else {
            this.ellipse.set({
                left: Math.abs(pointer.x)
            });
        }
    }

    if (this.origY > pointer.y) {
        if (pointer.y < 0) {
            this.ellipse.set({
                top: pointer.y
            });
        } else {
            this.ellipse.set({
                top: Math.abs(pointer.y)
            });
        }
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
EllipseTool.prototype.onMouseUp = function(o) {
    this.isDrawing = false;
    drew(this.canvas);
};
EllipseTool.prototype.setSize = function(size) {
    if (!size) {
        throw "Rect setSize must pass size param.";
    }
    this.size = size;
};
EllipseTool.prototype.setColor = function(color) {
    if (!color) {
        throw "Rect setColor must pass color param.";
    }
    this.color = color;
};

export { EllipseTool };

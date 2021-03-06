import { brforeDraw, drew, HISTORY } from "../common";

/**
 * @description 矩形工具类
 * @author tanglv
 * @date 2019-12-10
 */
function RectTool(canvas) {
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
    this.size = 1; //矩形描边大小
    this.color = "red"; //矩形描边颜色
}
RectTool.prototype.onWork = function() {
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
RectTool.prototype.offWork = function() {
    this.canvas.hoverCursor = "move";
    this.canvas.item(0).selectable = true;
    this.canvas.off("mouse:down", this.mouseDownEvent);
    this.canvas.off("mouse:move", this.mouseMoveEvent);
    this.canvas.off("mouse:up", this.mouseUpEvent);
};

RectTool.prototype.onMouseDown = function(o) {
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
        stroke: this.color,
        strokeWidth: this.size,
        selectable: false,
        customId: Date.now()
    });
    this.canvas.add(this.rect);
    HISTORY.push(this.rect.customId);
    this.rect.bringToFront(); //将对象移动至顶层，防止被遮盖
};
RectTool.prototype.onMouseMove = function(o) {
    if (!this.isDrawing) return;
    let pointer = this.canvas.getPointer(o.e);

    if (this.origX > pointer.x) {
        if (pointer.x < 0) {
            this.rect.set({ left: pointer.x });
        } else {
            this.rect.set({ left: Math.abs(pointer.x) });
        }
    }
    if (this.origY > pointer.y) {
        if (pointer.y < 0) {
            this.rect.set({ top: pointer.y });
        } else {
            this.rect.set({ top: Math.abs(pointer.y) });
        }
    }

    this.rect.set({ width: Math.abs(this.origX - pointer.x) });
    this.rect.set({ height: Math.abs(this.origY - pointer.y) });

    this.canvas.renderAll();
};
RectTool.prototype.onMouseUp = function(o) {
    this.isDrawing = false;
    drew(this.canvas);
};
RectTool.prototype.setSize = function(size) {
    if (!size) {
        throw "Rect setSize must pass size param.";
    }
    this.size = size;
};
RectTool.prototype.setColor = function(color) {
    if (!color) {
        throw "Rect setColor must pass color param.";
    }
    this.color = color;
};

export { RectTool };

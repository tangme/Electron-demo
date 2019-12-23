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
    this.canvas.hoverCursor = "crosshair"; //鼠标改为 画笔样式
    this.canvas.discardActiveObject(); //取消当前激活的对象
    this.canvas.item(0).selectable = false; //图片不可移动，防止图片跟随鼠标移动
    this.canvas.renderAll();
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
    this.canvas.hoverCursor = "move";
    this.canvas.item(0).selectable = true;
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
        selectable: false,
        customId: Date.now()
    });
    this.canvas.add(this.rect);
    this.rect.bringToFront(); //将对象移动至顶层，防止被遮盖
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
    //将画布上所有的对象重新组合为新组
    this.canvas.getObjects().forEach(item => {
        if (item.get("type") == "group") {
            this.canvas.setActiveObject(item);
            this.canvas.renderAll();
            this.canvas.getActiveObject().toActiveSelection();
            this.canvas.discardActiveObject();
            this.canvas.renderAll();
        }
    });

    function sortBy(attr, ascORdesc = "asc") {
        let ascORdescFlag = ascORdesc == "asc" ? 1 : -1;
        return function sort(before, next) {
            before = before[attr];
            next = next[attr];
            if (before < next) {
                return -1 * ascORdescFlag;
            }
            if (before > next) {
                return 1 * ascORdescFlag;
            }
            return 0;
        };
    }
    var sel = new fabric.ActiveSelection(
        this.canvas.getObjects().sort(sortBy("customId", "asc")),
        {
            canvas: this.canvas
        }
    );
    this.canvas.setActiveObject(sel);
    this.canvas.getActiveObject().toGroup();
    this.canvas.discardActiveObject();
    this.canvas.item(0).hasControls = false;
    this.canvas.item(0).hasBorders = false;
    this.canvas.item(0).selectable = false;
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

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
  var pointer = this.canvas.getPointer(o.e);
  let rect = new fabric.Rect({
    left: this.origX,
    top: this.origY,
    originX: "left",
    originY: "top",
    width: pointer.x - this.origX,
    height: pointer.y - this.origY,
    angle: 0,
    fill: "rgba(255,0,0,0)",
    stroke: "red",
    strokeWidth: 1,
    transparentCorners: false,
    hasControls: false,
    hasBorders: false
  });
  this.canvas.add(rect).setActiveObject(rect);
};
ToolRect.prototype.onMouseMove = function(o) {
  if (!this.isDrawing) return;
  let pointer = this.canvas.getPointer(o.e);
  let activeObj = this.canvas.getActiveObject();

  if (this.origX > pointer.x) {
    activeObj.set({ left: Math.abs(pointer.x) });
  }
  if (this.origY > pointer.y) {
    activeObj.set({ top: Math.abs(pointer.y) });
  }

  activeObj.set({ width: Math.abs(this.origX - pointer.x) });
  activeObj.set({ height: Math.abs(this.origY - pointer.y) });

  this.canvas.renderAll();
};
ToolRect.prototype.onMouseUp = function(o) {
  this.isDrawing = false;
};

export { ToolRect };

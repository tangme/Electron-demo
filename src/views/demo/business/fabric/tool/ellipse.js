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

  let ellipse = new fabric.Ellipse({
    top: this.origY,
    left: this.origX,
    rx: 0,
    ry: 0,
    transparentCorners: false,
    fill: "rgba(255,0,0,0)",
    stroke: "#000000",
    strokeWidth: 1,
    hasControls: false,
    hasBorders: false
  });

  this.canvas.add(ellipse).setActiveObject(ellipse);
};
ToolEllipse.prototype.onMouseMove = function(o) {
  if (!this.isDrawing) return;
  let pointer = this.canvas.getPointer(o.e);
  let activeObj = this.canvas.getActiveObject();

  if (this.origX > pointer.x) {
    activeObj.set({
      left: Math.abs(pointer.x)
    });
  }

  if (this.origY > pointer.y) {
    activeObj.set({
      top: Math.abs(pointer.y)
    });
  }

  activeObj.set({
    rx: Math.abs(this.origX - pointer.x) / 2
  });
  activeObj.set({
    ry: Math.abs(this.origY - pointer.y) / 2
  });
  // this.ellipse.setCoords();
  this.canvas.renderAll();
};
ToolEllipse.prototype.onMouseUp = function(o) {
  this.isDrawing = false;
};

export { ToolEllipse };

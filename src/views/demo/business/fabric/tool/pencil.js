/**
 * @description 画笔工具类
 * @author tanglv
 * @date 2019-12-10
 */
function Pencil(canvas) {
  if (!canvas) {
    throw "canvas is required";
  }
  this.canvas = canvas;
}
Pencil.prototype.onWork = function() {
  this.canvas.isDrawingMode = true;
};
Pencil.prototype.offWork = function() {
  this.canvas.isDrawingMode = false;
};

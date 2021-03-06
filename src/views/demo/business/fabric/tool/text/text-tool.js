import { brforeDraw, drew, HISTORY } from "../common";

function TextTool(canvas) {
    if (!canvas) {
        throw "canvas is required";
    }
    this.canvas = canvas;
    this.color = "red"; //字体颜色
    this.size = 12; //字体大小
    this.mouseDownEvent = null;
}
TextTool.prototype.onWork = function() {
    brforeDraw(this.canvas);
    let _this = this;
    this.canvas.on("mouse:down", function tmpMouseDown(o) {
        _this.onMouseDown(o);
        _this.mouseDownEvent = tmpMouseDown;
    });
};
TextTool.prototype.offWork = function() {
    this.canvas.off("mouse:down", this.mouseDownEvent);
    drew(this.canvas);
    this.canvas.hoverCursor = "move";
    this.canvas.item(0).selectable = true;
};
TextTool.prototype.onMouseDown = function(o) {
    if (!o.target || o.target.get("type") != "i-text") {
        var pointer = this.canvas.getPointer(o.e);
        this.origX = pointer.x;
        this.origY = pointer.y;
        var text = new fabric.IText("", {
            fontFamily: "arial black",
            left: pointer.x,
            top: pointer.y,
            fontSize: this.size,
            fill: this.color,
            customId: Date.now()
            // objecttype: "text"
        });
        HISTORY.push(text.customId);
        this.canvas.add(text).setActiveObject(text);
        text.enterEditing();
        // text.set({ fill: "blue" });
        // text.hiddenTextarea.focus();
    }
};
TextTool.prototype.setColor = function(color) {
    if (!color) {
        throw "Rect setColor must pass color param.";
    }
    this.color = color;
    let obj = this.canvas.getActiveObject();
    if (obj) {
        obj.exitEditing();
        obj.setColor(color);
        this.canvas.renderAll();
    }
};
TextTool.prototype.setSize = function(size) {
    if (!size) {
        throw "Rect setSize must pass size param.";
    }
    this.size = size;
    let obj = this.canvas.getActiveObject();
    if (obj) {
        obj.exitEditing();
        obj.size = size;
        this.canvas.renderAll();
    }
};
export { TextTool };

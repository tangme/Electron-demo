import { brforeDraw, drew } from "./common";

function ToolText(canvas) {
    if (!canvas) {
        throw "canvas is required";
    }
    this.canvas = canvas;
    this.color = "red"; //字体颜色
    this.size = 12; //字体大小
    this.mouseDownEvent = null;
}
ToolText.prototype.onWork = function() {
    brforeDraw(this.canvas);
    let _this = this;
    this.canvas.on("mouse:down", function tmpMouseDown(o) {
        _this.onMouseDown(o);
        _this.mouseDownEvent = tmpMouseDown;
    });
};
ToolText.prototype.offWork = function() {
    this.canvas.off("mouse:down", this.mouseDownEvent);
    drew(this.canvas);
    this.canvas.hoverCursor = "move";
    this.canvas.item(0).selectable = true;
};
ToolText.prototype.onMouseDown = function(o) {
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
        this.canvas.add(text).setActiveObject(text);
        text.enterEditing();
        // text.set({ fill: "blue" });
        // text.hiddenTextarea.focus();
    }
};
ToolText.prototype.setColor = function(color) {
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
ToolText.prototype.setSize = function(size) {
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
export { ToolText };

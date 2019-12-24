import { brforeDraw, drew } from "./common";

function ToolText(canvas) {
    if (!canvas) {
        throw "canvas is required";
    }
    this.canvas = canvas;
    this.color = "red";
    this.fontSize = 12;
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
            fontSize: this.fontSize,
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
ToolText.prototype.setStroke = function(stroke) {
    if (!stroke) {
        throw "Rect setStroke must pass stroke param.";
    }
    this.color = stroke;
    let obj = this.canvas.getActiveObject();
    if (obj) {
        obj.exitEditing();
        obj.setColor(stroke);
        this.canvas.renderAll();
    }
};
ToolText.prototype.setStrokeWidth = function(width) {
    if (!width) {
        throw "Rect setStrokeWidth must pass width param.";
    }
    this.fontSize = width;
    let obj = this.canvas.getActiveObject();
    if (obj) {
        obj.exitEditing();
        obj.fontSize = width;
        this.canvas.renderAll();
    }
};
export { ToolText };

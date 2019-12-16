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
    let _this = this;
    this.canvas.on("mouse:down", function tmpMouseDown(o) {
        _this.onMouseDown(o);
        _this.mouseDownEvent = tmpMouseDown;
    });
};
ToolText.prototype.offWork = function() {
    this.canvas.off("mouse:down", this.mouseDownEvent);
};
ToolText.prototype.onMouseDown = function(o) {
    console.log(o);
    if (!o.target) {
        var pointer = this.canvas.getPointer(o.e);
        this.origX = pointer.x;
        this.origY = pointer.y;
        var text = new fabric.IText("", {
            fontFamily: "arial black",
            left: pointer.x,
            top: pointer.y,
            fontSize: this.fontSize,
            fill: this.color
            // objecttype: "text"
        });
        // text.set({ fill: "blue" });
        this.canvas.add(text).setActiveObject(text);
        text.enterEditing();
        // text.hiddenTextarea.focus();
    }
};
ToolText.prototype.setStroke = function(stroke) {
    if (!stroke) {
        throw "Rect setStroke must pass stroke param.";
    }
    let obj = this.canvas.getActiveObject();
    obj.exitEditing();
    obj.setColor(stroke);
    this.color = stroke;
    this.canvas.renderAll();
};
ToolText.prototype.setStrokeWidth = function(width) {
    if (!width) {
        throw "Rect setStrokeWidth must pass width param.";
    }
    let obj = this.canvas.getActiveObject();
    obj.exitEditing();
    obj.fontSize = width;
    this.fontSize = width;
    this.canvas.renderAll();
};
export { ToolText };

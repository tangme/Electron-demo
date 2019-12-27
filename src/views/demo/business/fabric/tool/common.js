/**
 * @description 画图工具 工作前通用方法
 * @author tanglv
 * @date 2019-12-23
 * @param {*} canvas 画布对象
 */
function brforeDraw(canvas) {
    if (!canvas) {
        throw "canvas is required";
    }
    canvas.hoverCursor = "crosshair"; //鼠标改为 画笔样式
    canvas.discardActiveObject(); //取消当前激活的对象
    canvas.item(0).selectable = false; //图片不可移动，防止图片跟随鼠标移动
    canvas.renderAll();
}

/**
 * @description 画图工具 工作后通用方法
 * @author tanglv
 * @date 2019-12-23
 * @param {*} canvas 画布对象
 */
function drew(canvas) {
    if (!canvas) {
        throw "canvas is required";
    }
    //将画布上所有的对象重新组合为新组
    canvas.getObjects().forEach(item => {
        if (item.get("type") == "group") {
            canvas.setActiveObject(item);
            canvas.renderAll();
            canvas.getActiveObject().toActiveSelection();
            canvas.discardActiveObject();
            canvas.renderAll();
        }
    });

    var sel = new fabric.ActiveSelection(
        canvas.getObjects().sort(sortBy("customId", "asc")),
        {
            canvas: canvas
        }
    );
    canvas.setActiveObject(sel);
    canvas.getActiveObject().toGroup();
    canvas.discardActiveObject();
    canvas.item(0).hasControls = false;
    canvas.item(0).hasBorders = false;
    canvas.item(0).selectable = false;
}

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

//操作的历史记录
const HISTORY = [];

export { brforeDraw, drew, HISTORY };

<style>
.canvas-wrap {
    border: 1px dashed;
}
.canvas-container {
    margin: auto;
    border: 1px dashed red;
}

.mini-circle > .fa.fa-circle {
    transform: scale(0.7);
}
.max-circle > .fa.fa-circle {
    transform: scale(1.3);
}
.n-e-arrow > .fa.fa-long-arrow-right {
    transform: rotate(-45deg);
}
</style>
<template>
    <div>
        <div class="canvas-wrap">
            <canvas id="canvas" width="800" height="600"></canvas>
        </div>
        <br />
        <el-button-group>
            <el-popover placement="bottom" trigger="manual" v-model="toolBtns.rect.active">
                <div>
                    <el-button-group>
                        <el-button
                            size="mini"
                            icon="fa fa-circle"
                            class="mini-circle"
                            @click="toolBtns.rect.obj.setStrokeWidth(1)"
                        ></el-button>
                        <el-button
                            size="mini"
                            icon="fa fa-circle"
                            @click="toolBtns.rect.obj.setStrokeWidth(3)"
                        ></el-button>
                        <el-button
                            size="mini"
                            icon="fa fa-circle"
                            class="max-circle"
                            @click="toolBtns.rect.obj.setStrokeWidth(5)"
                        ></el-button>
                    </el-button-group>
                    <el-color-picker
                        value="transparent"
                        class="btn-text can-hover"
                        style="vertical-align: middle;"
                        :predefine="predefine"
                        size="mini"
                        @change="setColor('rect',$event)"
                    />
                </div>
                <el-button
                    :type="toolBtns.rect.active?'primary':''"
                    icon="fa fa-square-o"
                    title="矩形工具"
                    @click="toggleTool('rect')"
                    slot="reference"
                ></el-button>
            </el-popover>
            <el-popover placement="bottom" trigger="manual" v-model="toolBtns.ellipse.active">
                <div>
                    <el-button-group>
                        <el-button
                            size="mini"
                            icon="fa fa-circle"
                            class="mini-circle"
                            @click="toolBtns.ellipse.obj.setStrokeWidth(1)"
                        ></el-button>
                        <el-button
                            size="mini"
                            icon="fa fa-circle"
                            @click="toolBtns.ellipse.obj.setStrokeWidth(3)"
                        ></el-button>
                        <el-button
                            size="mini"
                            icon="fa fa-circle"
                            class="max-circle"
                            @click="toolBtns.ellipse.obj.setStrokeWidth(5)"
                        ></el-button>
                    </el-button-group>&nbsp;
                    <el-color-picker
                        value="transparent"
                        class="btn-text can-hover"
                        style="vertical-align: middle;"
                        :predefine="predefine"
                        size="mini"
                        @change="setColor('ellipse',$event)"
                    />
                </div>
                <el-button
                    :type="toolBtns.ellipse.active?'primary':''"
                    icon="fa fa-circle-o"
                    title="椭圆工具"
                    slot="reference"
                    @click="toggleTool('ellipse')"
                ></el-button>
            </el-popover>
            <el-popover placement="bottom" trigger="manual" v-model="toolBtns.arrowline.active">
                <div>
                    <el-button-group>
                        <el-button
                            size="mini"
                            icon="fa fa-circle"
                            class="mini-circle"
                            @click="toolBtns.arrowline.obj.setStrokeWidth(1)"
                        ></el-button>
                        <el-button
                            size="mini"
                            icon="fa fa-circle"
                            @click="toolBtns.arrowline.obj.setStrokeWidth(3)"
                        ></el-button>
                        <el-button
                            size="mini"
                            icon="fa fa-circle"
                            class="max-circle"
                            @click="toolBtns.arrowline.obj.setStrokeWidth(5)"
                        ></el-button>
                    </el-button-group>&nbsp;
                    <el-color-picker
                        value="transparent"
                        class="btn-text can-hover"
                        style="vertical-align: middle;"
                        :predefine="predefine"
                        size="mini"
                        @change="setColor('arrowline',$event)"
                    />
                </div>
                <el-button
                    :type="toolBtns.arrowline.active?'primary':''"
                    class="n-e-arrow"
                    icon="fa fa-long-arrow-right"
                    title="箭头工具"
                    slot="reference"
                    @click="toggleTool('arrowline')"
                ></el-button>
            </el-popover>
            <el-popover placement="bottom" trigger="manual" v-model="toolBtns.pencil.active">
                <div>
                    <el-button-group>
                        <el-button
                            :type="toggleSize('pencil',1)"
                            size="mini"
                            icon="fa fa-circle"
                            class="mini-circle"
                            @click="toolBtns.pencil.obj.setWidth(1)"
                        ></el-button>
                        <el-button
                            :type="toggleSize('pencil',3)"
                            size="mini"
                            icon="fa fa-circle"
                            @click="toolBtns.pencil.obj.setWidth(3)"
                        ></el-button>
                        <el-button
                            :type="toggleSize('pencil',5)"
                            size="mini"
                            icon="fa fa-circle"
                            class="max-circle"
                            @click="toolBtns.pencil.obj.setWidth(5)"
                        ></el-button>
                    </el-button-group>&nbsp;
                    <el-color-picker
                        value="transparent"
                        class="btn-text can-hover"
                        style="vertical-align: middle;"
                        :predefine="predefine"
                        size="mini"
                        @change="setColor('pencil',$event)"
                    />
                </div>
                <el-button
                    :type="toolBtns.pencil.active?'primary':''"
                    icon="fa fa-pencil"
                    title="画笔工具"
                    slot="reference"
                    @click="toggleTool('pencil')"
                ></el-button>
            </el-popover>
            <el-popover placement="bottom" trigger="manual" v-model="toolBtns.mosaic.active">
                <div>
                    <el-button-group>
                        <el-button
                            size="mini"
                            icon="fa fa-circle"
                            class="mini-circle"
                            @click="toolBtns.mosaic.obj.setWidth(12)"
                        ></el-button>
                        <el-button
                            size="mini"
                            icon="fa fa-circle"
                            @click="toolBtns.mosaic.obj.setWidth(22)"
                        ></el-button>
                        <el-button
                            size="mini"
                            icon="fa fa-circle"
                            class="max-circle"
                            @click="toolBtns.mosaic.obj.setWidth(32)"
                        ></el-button>
                    </el-button-group>&nbsp;
                    <el-color-picker
                        value="transparent"
                        class="btn-text can-hover"
                        style="vertical-align: middle;"
                        :predefine="predefine"
                        size="mini"
                        @change="setColor('mosaic',$event)"
                    />
                </div>
                <el-button
                    :type="toolBtns.mosaic.active?'primary':''"
                    icon="fa fa-th"
                    title="马赛克工具"
                    slot="reference"
                    @click="toggleTool('mosaic')"
                ></el-button>
            </el-popover>
            <el-popover placement="bottom" trigger="manual" v-model="toolBtns.text.active">
                <div>
                    <el-button-group>
                        <el-button
                            size="mini"
                            icon="fa fa-circle"
                            class="mini-circle"
                            @click="toolBtns.text.obj.setStrokeWidth(12)"
                        ></el-button>
                        <el-button
                            size="mini"
                            icon="fa fa-circle"
                            @click="toolBtns.text.obj.setStrokeWidth(16)"
                        ></el-button>
                        <el-button
                            size="mini"
                            icon="fa fa-circle"
                            class="max-circle"
                            @click="toolBtns.text.obj.setStrokeWidth(20)"
                        ></el-button>
                    </el-button-group>&nbsp;
                    <el-color-picker
                        value="transparent"
                        class="btn-text can-hover"
                        style="vertical-align: middle;"
                        :predefine="predefine"
                        size="mini"
                        @change="setColor('text',$event)"
                    />
                </div>
                <el-button
                    :type="toolBtns.text.active?'primary':''"
                    icon="fa fa-font"
                    title="文字工具"
                    slot="reference"
                    @click="toggleTool('text')"
                ></el-button>
            </el-popover>
        </el-button-group>
        <el-button-group>
            <el-button icon="fa fa-undo" title="撤销" @click="undo"></el-button>
            <el-button icon="fa fa-repeat" title="重做" @click="redo"></el-button>
            <el-button icon="fa fa-save" title="保存" @click="saveImg"></el-button>
        </el-button-group>

        <br />
        <img src="/image/theme/d2/logo/all.png" id="my-image" />
        <img
            src="https://aier-picture-1259589318.cos.ap-chengdu.myqcloud.com/100630100630/1155667283780395010/MZ201912040002/topography_A88J0U2Q.png"
            id="tanglv"
        />
        <a href target="_blank" id="test" download="filename.jpg">test-hello</a>
    </div>
</template>
<script>
import { fabric } from "fabric";
import {
    ToolEllipse,
    ToolRect,
    Arrowline,
    Pencil,
    Mosaic,
    ToolText
} from "./tool/index";

export default {
    data() {
        return {
            canvas: null,
            isRedoing: false,
            h: [],
            toolBtns: {
                rect: {
                    obj: null,
                    active: false,
                    getInst: canvas => {
                        return new ToolRect(canvas);
                    }
                },
                ellipse: {
                    obj: null,
                    active: false,
                    getInst: canvas => {
                        return new ToolEllipse(canvas);
                    }
                },
                arrowline: {
                    obj: null,
                    active: false,
                    getInst: canvas => {
                        return new Arrowline(canvas);
                    }
                },
                pencil: {
                    obj: null,
                    active: false,
                    getInst: canvas => {
                        return new Pencil(canvas);
                    }
                },
                mosaic: {
                    obj: null,
                    active: false,
                    getInst: canvas => {
                        return new Mosaic(canvas);
                    }
                },
                text: {
                    obj: null,
                    active: false,
                    getInst: canvas => {
                        return new ToolText(canvas);
                    }
                }
            },
            predefine: [
                "#ff4500",
                "#ff8c00",
                "#ffd700",
                "#90ee90",
                "#00ced1",
                "#1e90ff",
                "#c71585"
            ]
        };
    },
    created() {},
    mounted() {
        this.canvas = new fabric.Canvas("canvas", { selection: false });

        //添加图片
        fabric.Image.fromURL("/image/testedit.jpg", img => {
            img.set({
                customId: Date.now(),
                hasControls: false,
                hasBorders: false,
                selectable: true //When set to `false`, an object can not be selected for modification (using either point-click-based or group-based selection). But events still fire on it.
                // lockMovementX: true,
                // lockMovementY: true,
                // hoverCursor: "crosshair"
            });
            img.scaleToWidth(800);
            this.canvas.add(img).centerObject(img);
        });

        // 通过url 设置背景图片
        /* this.canvas.setBackgroundImage(
            "/image/theme/d2/logo/all.png",
            this.canvas.renderAll.bind(this.canvas),
            {
                opacity: 0.8
            }
        ); */

        this.canvas.on("mouse:wheel", opt => {
            var delta = opt.e.deltaY;
            var pointer = this.canvas.getPointer(opt.e);
            var zoom = this.canvas.getZoom();
            zoom = zoom + delta / 200;
            if (zoom > 20) zoom = 20;
            if (zoom < 0.01) zoom = 0.01;
            this.canvas.zoomToPoint(
                { x: opt.e.offsetX, y: opt.e.offsetY },
                zoom
            );
            opt.e.preventDefault();
            opt.e.stopPropagation();
        });
        this.canvas.on("object:added", () => {
            if (!this.isRedoing) {
                this.h = [];
            }
            this.isRedoing = false;
        });
    },
    methods: {
        undo() {
            if (this.canvas._objects.length > 0) {
                if (this.canvas._objects[0].get("type") == "image") {
                    return;
                }
                console.log(this.canvas._objects[0].get("type"));
                this.canvas._objects[0].toActiveSelection();
                // this.h.push(this.canvas._objects.pop());
                // this.canvas.renderAll();
            }
        },
        redo() {
            if (this.h.length > 0) {
                this.isRedoing = true;
                this.canvas.add(this.h.pop());
            }
        },
        setColor(type, color) {
            if (type == "pencil") {
                this.toolBtns[type].obj.setColor(color);
            } else {
                this.toolBtns[type].obj.setStroke(color);
            }
        },
        toggleSize(type, val) {
            if (!this.toolBtns[type].obj) {
                return "";
            } else if (this.toolBtns[type].obj.width == val) {
                return "primary";
            } else {
                return "";
            }
        },
        toggleTool(type) {
            if (!type) {
                throw "toggletool type must be pass.";
            }
            if (this.toolBtns[type]) {
                //关闭其它工具
                for (let btn in this.toolBtns) {
                    if (btn !== type) {
                        this.toolBtns[btn].obj &&
                            this.toolBtns[btn].obj.offWork();
                        this.toolBtns[btn].active = false;
                    }
                }
                this.$set(
                    this.toolBtns[type],
                    "active",
                    !this.toolBtns[type].active
                );
                if (this.toolBtns[type].active) {
                    if (!this.toolBtns[type].obj) {
                        this.toolBtns[type].obj = this.toolBtns[type].getInst(
                            this.canvas
                        );
                    }
                    this.toolBtns[type].obj.onWork();
                } else {
                    this.toolBtns[type].obj.offWork();
                }
            }
        },
        saveImg() {
            var cc = this.canvas.item(0).toDataURL({
                format: "jpeg"
            });
            var imgElement = document.getElementById("my-image");
            imgElement.setAttribute("src", cc);
            // $('<a>').attr({href:url,download:name})[0].click();

            var test = document.getElementById("test");
            test.setAttribute("href", cc);
            //创建Event对象
            let event = document.createEvent("MouseEvents");
            //初始化
            event.initMouseEvent("click");
            //触发Event
            test.dispatchEvent(event);
        }
    }
};
</script>

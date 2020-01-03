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

.el-button-group > span {
    background-color: blue;
}
.el-button-group > span:not(:first-child):not(:last-child) > .el-button {
    /* background-color: red; */
    border-radius: 0;
}

.el-button-group > span:not(:last-child) > .el-button {
    margin-right: -1px;
}
.el-button-group > span:first-child > .el-button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}
.el-button-group > span:last-child > .el-button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.mar-l-5 {
    margin-left: 5px;
}
</style>
<template>
    <div>
        <div class="canvas-wrap">
            <tool-bar></tool-bar>
            <canvas id="canvas" width="800" height="600"></canvas>
            <div style="text-align:center;">
                <el-button-group>
                    <el-popover v-model="toolBtns.rect.active" trigger="manual" placement="bottom">
                        <div>
                            <size-picker
                                v-model="toolBtns.rect.obj"
                                :size="[2,6,10]"
                                @click="toolBtns.rect.obj.setSize($event)"
                            ></size-picker>
                            <!-- <el-button-group>
                                <el-button
                                    :type="toggleSize('rect', 1)"
                                    size="mini"
                                    icon="fa fa-circle"
                                    class="mini-circle"
                                    @click="toolBtns.rect.obj.setSize(1)"
                                ></el-button>
                                <el-button
                                    :type="toggleSize('rect', 3)"
                                    size="mini"
                                    icon="fa fa-circle"
                                    @click="toolBtns.rect.obj.setSize(3)"
                                ></el-button>
                                <el-button
                                    :type="toggleSize('rect', 5)"
                                    size="mini"
                                    icon="fa fa-circle"
                                    class="max-circle"
                                    @click="toolBtns.rect.obj.setSize(5)"
                                ></el-button>
                            </el-button-group>-->
                            <el-color-picker
                                value="transparent"
                                class="btn-text can-hover mar-l-5"
                                style="vertical-align: middle;"
                                :predefine="predefine"
                                size="mini"
                                @change="setColor('rect', $event)"
                            />
                        </div>
                        <el-button
                            slot="reference"
                            :type="toolBtns.rect.active ? 'primary' : ''"
                            icon="fa fa-square-o"
                            title="矩形工具"
                            @click="toggleTool('rect')"
                        ></el-button>
                    </el-popover>
                    <el-popover
                        v-model="toolBtns.ellipse.active"
                        trigger="manual"
                        placement="bottom"
                    >
                        <div>
                            <el-button-group>
                                <el-button
                                    :type="toggleSize('ellipse', 1)"
                                    size="mini"
                                    icon="fa fa-circle"
                                    class="mini-circle"
                                    @click="toolBtns.ellipse.obj.setSize(1)"
                                ></el-button>
                                <el-button
                                    :type="toggleSize('ellipse', 3)"
                                    size="mini"
                                    icon="fa fa-circle"
                                    @click="toolBtns.ellipse.obj.setSize(3)"
                                ></el-button>
                                <el-button
                                    :type="toggleSize('ellipse', 5)"
                                    size="mini"
                                    icon="fa fa-circle"
                                    class="max-circle"
                                    @click="toolBtns.ellipse.obj.setSize(5)"
                                ></el-button>
                            </el-button-group>
                            <el-color-picker
                                value="transparent"
                                class="btn-text can-hover mar-l-5"
                                style="vertical-align: middle;"
                                :predefine="predefine"
                                size="mini"
                                @change="setColor('ellipse', $event)"
                            />
                        </div>
                        <el-button
                            slot="reference"
                            :type="toolBtns.ellipse.active ? 'primary' : ''"
                            icon="fa fa-circle-o"
                            title="椭圆工具"
                            @click="toggleTool('ellipse')"
                        ></el-button>
                    </el-popover>
                    <el-popover
                        v-model="toolBtns.arrowline.active"
                        trigger="manual"
                        placement="bottom"
                    >
                        <div>
                            <el-button-group>
                                <el-button
                                    :type="toggleSize('arrowline', 1)"
                                    size="mini"
                                    icon="fa fa-circle"
                                    class="mini-circle"
                                    @click="toolBtns.arrowline.obj.setSize(1)"
                                ></el-button>
                                <el-button
                                    :type="toggleSize('arrowline', 3)"
                                    size="mini"
                                    icon="fa fa-circle"
                                    @click="toolBtns.arrowline.obj.setSize(3)"
                                ></el-button>
                                <el-button
                                    :type="toggleSize('arrowline', 5)"
                                    size="mini"
                                    icon="fa fa-circle"
                                    class="max-circle"
                                    @click="toolBtns.arrowline.obj.setSize(5)"
                                ></el-button>
                            </el-button-group>
                            <el-color-picker
                                value="transparent"
                                class="btn-text can-hover mar-l-5"
                                style="vertical-align: middle;"
                                :predefine="predefine"
                                size="mini"
                                @change="setColor('arrowline', $event)"
                            />
                        </div>
                        <el-button
                            slot="reference"
                            :type="toolBtns.arrowline.active ? 'primary' : ''"
                            class="n-e-arrow"
                            icon="fa fa-long-arrow-right"
                            title="箭头工具"
                            @click="toggleTool('arrowline')"
                        ></el-button>
                    </el-popover>
                    <el-popover
                        v-model="toolBtns.pencil.active"
                        trigger="manual"
                        placement="bottom"
                    >
                        <div>
                            <el-button-group>
                                <el-button
                                    :type="toggleSize('pencil', 1)"
                                    size="mini"
                                    icon="fa fa-circle"
                                    class="mini-circle"
                                    @click="toolBtns.pencil.obj.setSize(1)"
                                ></el-button>
                                <el-button
                                    :type="toggleSize('pencil', 3)"
                                    size="mini"
                                    icon="fa fa-circle"
                                    @click="toolBtns.pencil.obj.setSize(3)"
                                ></el-button>
                                <el-button
                                    :type="toggleSize('pencil', 5)"
                                    size="mini"
                                    icon="fa fa-circle"
                                    class="max-circle"
                                    @click="toolBtns.pencil.obj.setSize(5)"
                                ></el-button>
                            </el-button-group>
                            <el-color-picker
                                value="transparent"
                                class="btn-text can-hover mar-l-5"
                                style="vertical-align: middle;"
                                :predefine="predefine"
                                size="mini"
                                @change="setColor('pencil', $event)"
                            />
                        </div>
                        <el-button
                            slot="reference"
                            :type="toolBtns.pencil.active ? 'primary' : ''"
                            icon="fa fa-pencil"
                            title="画笔工具"
                            @click="toggleTool('pencil')"
                        ></el-button>
                    </el-popover>
                    <el-popover
                        v-model="toolBtns.mosaic.active"
                        trigger="manual"
                        placement="bottom"
                    >
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
                            </el-button-group>
                            <el-color-picker
                                value="transparent"
                                class="btn-text can-hover mar-l-5"
                                style="vertical-align: middle;"
                                :predefine="predefine"
                                size="mini"
                                @change="setColor('mosaic', $event)"
                            />
                        </div>
                        <el-button
                            slot="reference"
                            :type="toolBtns.mosaic.active ? 'primary' : ''"
                            icon="fa fa-th"
                            title="马赛克工具"
                            @click="toggleTool('mosaic')"
                        ></el-button>
                    </el-popover>
                    <el-popover v-model="toolBtns.text.active" trigger="manual" placement="bottom">
                        <div>
                            <el-button-group>
                                <el-button
                                    :type="toggleSize('text', 12)"
                                    size="mini"
                                    icon="fa fa-circle"
                                    class="mini-circle"
                                    @click="toolBtns.text.obj.setSize(12)"
                                ></el-button>
                                <el-button
                                    :type="toggleSize('text', 16)"
                                    size="mini"
                                    icon="fa fa-circle"
                                    @click="toolBtns.text.obj.setSize(16)"
                                ></el-button>
                                <el-button
                                    :type="toggleSize('text', 20)"
                                    size="mini"
                                    icon="fa fa-circle"
                                    class="max-circle"
                                    @click="toolBtns.text.obj.setSize(20)"
                                ></el-button>
                            </el-button-group>
                            <el-color-picker
                                value="transparent"
                                class="btn-text can-hover mar-l-5"
                                style="vertical-align: middle;"
                                :predefine="predefine"
                                size="mini"
                                @change="setColor('text', $event)"
                            />
                        </div>
                        <el-button
                            slot="reference"
                            :type="toolBtns.text.active ? 'primary' : ''"
                            icon="fa fa-font"
                            title="文字工具"
                            @click="toggleTool('text')"
                        ></el-button>
                    </el-popover>
                    <span>
                        <el-button icon="fa fa-undo" title="撤销" @click="undo"></el-button>
                    </span>
                    <span>
                        <el-dropdown @command="handleFile">
                            <el-button
                                icon="el-icon-files"
                                style="border-top-left-radius: 0;border-bottom-left-radius: 0;"
                            >
                                文件
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="new">打开新文件</el-dropdown-item>
                                <el-dropdown-item command="url">在线新文件</el-dropdown-item>
                                <el-dropdown-item command="save">保存</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                </el-button-group>
            </div>
        </div>
        <!-- <el-button-group>
            <el-button icon="fa fa-undo" title="撤销" @click="undo"></el-button>
            <el-button icon="fa fa-repeat" title="重做" @click="redo"></el-button>
            <el-button icon="fa fa-save" title="保存" @click="saveImg"></el-button>
            <el-dropdown @command="handleFile">
                <el-button icon="el-icon-files">
                    文件
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="new">打开新文件</el-dropdown-item>
                    <el-dropdown-item command="url">在线新文件</el-dropdown-item>
                    <el-dropdown-item command="save">保存</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-button-group>-->

        <br />
        <input id="file" type="file" accept="image/*" />
        <img id="my-image" src="/image/theme/d2/logo/all.png" />
        <img
            id="tanglv"
            src="https://aier-picture-1259589318.cos.ap-chengdu.myqcloud.com/100630100630/1155667283780395010/MZ201912040002/topography_A88J0U2Q.png"
        />
        <a id="test" href target="_blank" download="filename.jpg">test-hello</a>
    </div>
</template>
<script>
import { fabric } from "fabric";
import {
    EllipseTool,
    RectTool,
    ArrowLineTool,
    PencilTool,
    MosaicTool,
    TextTool
} from "./tool/index";
import { HISTORY } from "./tool/common";
import SizePicker from "./sizePicker";
import ToolBar from "./ToolBar";

export default {
    components: {
        SizePicker,
        ToolBar
    },
    provide() {
        return {
            canvas: this
        };
    },
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
                        return new RectTool(canvas);
                    }
                },
                ellipse: {
                    obj: null,
                    active: false,
                    getInst: canvas => {
                        return new EllipseTool(canvas);
                    }
                },
                arrowline: {
                    obj: null,
                    active: false,
                    getInst: canvas => {
                        return new ArrowLineTool(canvas);
                    }
                },
                pencil: {
                    obj: null,
                    active: false,
                    getInst: canvas => {
                        return new PencilTool(canvas);
                    }
                },
                mosaic: {
                    obj: null,
                    active: false,
                    getInst: canvas => {
                        return new MosaicTool(canvas);
                    }
                },
                text: {
                    obj: null,
                    active: false,
                    getInst: canvas => {
                        return new TextTool(canvas);
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
    created() {
        HISTORY.splice(0);
    },
    mounted() {
        this.$nextTick(() => {
            this.initNewFileBtn();
        });
        this.canvas = new fabric.Canvas("canvas", { selection: false });

        //添加默认背景图片
        this.loadFromUrl("/image/testedit.jpg");

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
        /**
         * 撤销功能
         */
        undo() {
            if (HISTORY.length > 0) {
                let delId = HISTORY.pop();
                let objs = this.canvas
                    .item(0)
                    .getObjects()
                    .filter(item => item.customId === delId);
                objs.forEach(o => {
                    this.canvas.item(0).remove(o);
                });
                this.canvas.renderAll();
            }
        },
        redo() {
            if (this.h.length > 0) {
                this.isRedoing = true;
                this.canvas.add(this.h.pop());
            }
        },
        /**
         * 设置工具颜色
         */
        setColor(type, color) {
            this.toolBtns[type].obj.setColor(color);
        },
        /**
         * 设置工具大小按钮选中激活状态
         */
        toggleSize(type, val) {
            if (!this.toolBtns[type].obj) {
                return "";
            } else if (this.toolBtns[type].obj.size == val) {
                return "primary";
            } else {
                return "";
            }
        },
        /**
         * 设置工具选中激活状态
         */
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
        /**
         * 初始化本地图片按钮
         */
        initNewFileBtn() {
            let _this = this;
            document
                .getElementById("file")
                .addEventListener("change", function(e) {
                    _this.canvas.clear();
                    var file = e.target.files[0];
                    var reader = new FileReader();
                    reader.onload = function(f) {
                        var data = f.target.result;
                        fabric.Image.fromURL(data, function(img) {
                            var oImg = img
                                .set({
                                    customId: Date.now(),
                                    hasControls: false,
                                    hasBorders: false,
                                    selectable: true
                                })
                                .scale(0.9);
                            oImg.scaleToWidth(800);
                            _this.canvas.add(oImg).centerObject(oImg);
                            // _this.canvas.add(oImg).renderAll();
                            // var a = canvas.setActiveObject(oImg);
                            // var dataURL = canvas.toDataURL({
                            //     format: "png",
                            //     quality: 0.8
                            // });
                        });
                    };
                    reader.readAsDataURL(file);
                });
        },
        /**
         * 打开新文件
         */
        newFile() {
            let event = document.createEvent("MouseEvents");
            event.initMouseEvent("click"); //初始化
            document.getElementById("file").dispatchEvent(event); //触发Event
        },
        /**
         * 保存图片
         */
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
        },
        handleFile(command) {
            switch (command) {
                case "new":
                    this.newFile();
                    break;
                case "save":
                    this.saveImg();
                    break;
                case "url":
                    this.openUrl();
                    break;
                default:
                    break;
            }
        },
        loadFromUrl(url) {
            this.canvas.clear();
            fabric.Image.fromURL(url, img => {
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
            this.canvas.backgroundColor = "#1e1f1c";
        },
        openUrl() {
            this.$prompt("请输入图片地址", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
                // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                // inputErrorMessage: "邮箱格式不正确"
            })
                .then(({ value }) => {
                    this.$message({
                        type: "success",
                        message: "你的邮箱是: " + value
                    });
                    this.loadFromUrl(value);
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "取消输入"
                    });
                });
        }
    }
};
</script>

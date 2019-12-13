<style>
.canvas-wrap {
    display: inline-block;
    border: 1px dashed;
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
            <canvas id="canvas" width="300" height="300"></canvas>
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
            <el-popover placement="bottom" trigger="click">
                <div>
                    <el-button-group>
                        <el-button size="mini" icon="fa fa-circle" class="mini-circle"></el-button>
                        <el-button size="mini" icon="fa fa-circle"></el-button>
                        <el-button size="mini" icon="fa fa-circle" class="max-circle"></el-button>
                    </el-button-group>&nbsp;
                    <el-color-picker
                        class="btn-text can-hover"
                        style="vertical-align: middle;"
                        :predefine="predefine"
                        size="mini"
                        @change="set"
                    />
                </div>
                <el-button
                    :type="btnPencil.type"
                    icon="fa fa-pencil"
                    title="画笔工具"
                    slot="reference"
                    @click="togglePencil"
                ></el-button>
            </el-popover>
        </el-button-group>
        <el-button icon="fa fa-save" title="保存" @click="saveImg"></el-button>

        <br />
        <img src="/image/theme/d2/logo/all.png" id="my-image" />
        <a href target="_blank" id="test" download="filename.jpg">test-hello</a>
    </div>
</template>
<script>
import { fabric } from "fabric";
import { ToolEllipse } from "./tool/ellipse";
import { ToolRect } from "./tool/rect";
import { Arrowline } from "./tool/arrowline";
export default {
    data() {
        return {
            canvas: null,
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
                }
                // pencil: { active: false ,getInst:()=>{return new ToolRect()}}
            },
            btnPencil: {
                //画笔工具 按钮
                type: "",
                onwork: false
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
        var imgElement = document.getElementById("my-image");

        //添加图片
        fabric.Image.fromURL("/image/theme/d2/logo/all.png", oImg => {
            this.canvas.add(oImg);
        });
        //通过url 设置背景图片
        this.canvas.setBackgroundImage(
            "/image/theme/d2/logo/all.png",
            this.canvas.renderAll.bind(this.canvas),
            { backgroundImageOpacity: 0.1, backgroundImageStretch: false }
        );
        // fabric.Image.fromURL(
        //     "http://a3.att.hudong.com/35/34/19300001295750130986345801104.jpg",
        //     function(oImg) {
        //         canvas.add(oImg);
        //     }
        // );
    },
    methods: {
        setColor(type, color) {
            this.toolBtns[type].obj.setStroke(color);
        },
        set(val) {
            console.log(val);
            this.toolBtns.rect.obj.setStroke(val);
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
        /**
         * 启用关闭画笔工具 状态
         */
        togglePencil() {
            if (this.btnPencil.onwork) {
                //当前为开启，切换至关闭
                this.canvas.isDrawingMode = false;
                this.btnPencil.type = "";
            } else {
                //当前为关闭，切换至开启
                this.canvas.isDrawingMode = true;
                this.btnPencil.type = "primary";
            }
            this.btnPencil.onwork = !this.btnPencil.onwork;
        },
        saveImg() {
            var cc = this.canvas.toDataURL({
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

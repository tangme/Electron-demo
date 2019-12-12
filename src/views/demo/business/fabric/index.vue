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
            <el-button
                :type="btnPencil.type"
                icon="fa fa-pencil"
                title="画笔工具"
                @click="togglePencil"
            ></el-button>
            <el-popover placement="bottom" width="300" trigger="click">
                <div>
                    <el-button-group>
                        <el-button size="mini" icon="fa fa-circle" class="mini-circle"></el-button>
                        <el-button size="mini" icon="fa fa-circle"></el-button>
                        <el-button size="mini" icon="fa fa-circle" class="max-circle"></el-button>
                    </el-button-group>
                    <el-color-picker
                        class="btn-text can-hover"
                        style="vertical-align: middle;"
                        :predefine="predefine"
                        size="mini"
                        @change="set"
                    />
                </div>
                <el-button
                    :type="btnRect.type"
                    icon="fa fa-window-maximize"
                    title="矩形工具"
                    @click="toggleRect"
                    slot="reference"
                ></el-button>
            </el-popover>
            <el-popover placement="bottom" width="300" trigger="click">
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
                    class="n-e-arrow"
                    icon="fa fa-long-arrow-right"
                    title="箭头工具"
                    slot="reference"
                ></el-button>
            </el-popover>
            <el-button
                :type="btnCircle.type"
                icon="fa fa-circle-o"
                title="椭圆工具"
                @click="toggleCircle"
            ></el-button>

            <el-button icon="fa fa-save" title="保存" @click="saveImg"></el-button>
        </el-button-group>

        <br />
        <img src="/image/theme/d2/logo/all.png" id="my-image" />
        <a href target="_blank" id="test" download="filename.jpg">test-hello</a>
    </div>
</template>
<script>
import { fabric } from "fabric";
import { ToolEllipse } from "./tool/ellipse";
import { ToolRect } from "./tool/rect";
export default {
    data() {
        return {
            canvas: null,
            btnPencil: {
                //画笔工具 按钮
                type: "",
                onwork: false
            },
            btnRect: {
                //矩形工具 按钮
                type: "",
                onwork: false
            },
            btnCircle: {
                //矩形工具 按钮
                type: "",
                onwork: false
            },
            rect: null,
            ellipse: null,
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

        fabric.Image.fromURL("/image/theme/d2/logo/all.png", oImg => {
            this.canvas.add(oImg);
        });
        // fabric.Image.fromURL(
        //     "http://a3.att.hudong.com/35/34/19300001295750130986345801104.jpg",
        //     function(oImg) {
        //         canvas.add(oImg);
        //     }
        // );

        var rect = new fabric.Rect({
            top: 100,
            left: 100,
            width: 60,
            height: 70,
            fill: "red"
        });
        var rect2 = new fabric.Rect({
            top: 100,
            left: 100,
            width: 60,
            height: 70,
            fill: "green"
        });

        this.canvas.add(rect);
        this.canvas.add(rect2);
    },
    methods: {
        set(val) {
            console.log(val);
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
        /**
         * 启用关闭矩形工具 状态
         */
        toggleRect() {
            if (this.btnRect.onwork) {
                //当前为开启，切换至关闭
                this.btnRect.type = "";
                this.rect.offWork();
            } else {
                //当前为关闭，切换至开启
                this.btnRect.type = "primary";
                if (!this.rect) {
                    this.rect = new ToolRect(this.canvas);
                }
                this.rect.onWork();
            }
            this.btnRect.onwork = !this.btnRect.onwork;
        },
        /**
         * 启用关闭椭圆工具 状态
         */
        toggleCircle() {
            if (this.btnCircle.onwork) {
                //当前为开启，切换至关闭
                this.btnCircle.type = "";
                this.ellipse.offWork();
            } else {
                //当前为关闭，切换至开启
                this.btnCircle.type = "primary";
                if (!this.ellipse) {
                    this.ellipse = new ToolEllipse(this.canvas);
                }
                this.ellipse.onWork();
            }
            this.btnCircle.onwork = !this.btnCircle.onwork;
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

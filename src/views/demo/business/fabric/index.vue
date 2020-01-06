<style>
.canvas-wrap {
}
.canvas-container {
    /* fabric 自带容器类名 */
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
</style>
<template>
    <div>
        <div ref="canvaswrap" class="canvas-wrap" :style="{width:width,height:height}">
            <canvas id="canvas"></canvas>
            <tool-bar ref="toolbar"></tool-bar>
        </div>
    </div>
</template>
<script>
import { fabric } from "fabric";
import ToolBar from "./ToolBar";

export default {
    name: "MasterPhone",
    components: {
        ToolBar
    },
    provide() {
        return {
            canvas: this
        };
    },
    props: {
        src: {
            type: String
        },
        width: {
            type: String,
            default: "100%"
        },
        height: {
            type: String,
            default: "100%"
        }
    },
    data() {
        return {
            canvas: null
        };
    },
    created() {},
    mounted() {
        let css_canvas_wrap = getComputedStyle(this.$refs.canvaswrap);
        let css_toolbar = getComputedStyle(this.$refs.toolbar.$el);
        this.canvas = new fabric.Canvas("canvas", { selection: false });
        //画布宽度 同 容器宽度
        this.canvas.setWidth(parseInt(css_canvas_wrap["width"]));
        //画布高度 同 容器高度-工具条高度
        this.canvas.setHeight(
            parseInt(css_canvas_wrap["height"]) -
                parseInt(css_toolbar["height"]) -
                parseInt(css_toolbar["padding-bottom"]) -
                parseInt(css_toolbar["padding-top"])
        );

        //添加默认图片
        this.src && this.loadFromUrl(this.src);

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
            /* if (!this.isRedoing) {
                this.h = [];
            }
            this.isRedoing = false; */
        });
    },
    methods: {
        /**
         * 重置画布
         */
        reset() {
            this.canvas.clear();
            this.canvas.backgroundColor = "#1f2430";
        },
        loadFromUrl(url) {
            this.reset();
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
        }
    }
};
</script>

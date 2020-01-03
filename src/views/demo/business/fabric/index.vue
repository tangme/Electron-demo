<style>
.canvas-wrap {
    /* border: 1px dashed; */
}
.canvas-container {
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
        <div ref="canvaswrap" class="canvas-wrap">
            <canvas id="canvas" height="600"></canvas>
            <tool-bar></tool-bar>
        </div>
        <img id="my-image" src="/image/theme/d2/logo/all.png" />
        <img
            id="tanglv"
            src="https://aier-picture-1259589318.cos.ap-chengdu.myqcloud.com/100630100630/1155667283780395010/MZ201912040002/topography_A88J0U2Q.png"
        />
    </div>
</template>
<script>
import { fabric } from "fabric";
import ToolBar from "./ToolBar";

export default {
    name: "TPhone",
    components: {
        ToolBar
    },
    provide() {
        return {
            canvas: this
        };
    },
    props: {
        defaultImg: {
            type: String,
            default: "/image/testedit.jpg"
        }
    },
    data() {
        return {
            canvas: null
        };
    },
    created() {},
    mounted() {
        console.log(getComputedStyle(this.$refs.canvaswrap)["width"]);
        this.canvas = new fabric.Canvas("canvas", { selection: false });
        this.canvas.setWidth(
            parseInt(getComputedStyle(this.$refs.canvaswrap)["width"])
        );

        //添加默认图片
        this.loadFromUrl(this.defaultImg);

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

<style>
.toolbar-wrap {
    position: relative;
    background: #fafafa;
    padding: 5px;
}
</style>
<template>
    <div class="toolbar-wrap">
        <el-button-group>
            <rect-tool></rect-tool>
            <ellipse-tool></ellipse-tool>
            <arrowline-tool></arrowline-tool>
            <pencil-tool></pencil-tool>
            <mosaic-tool></mosaic-tool>
            <text-tool></text-tool>
            <undo-tool></undo-tool>
            <file-tool></file-tool>
        </el-button-group>
    </div>
</template>
<script>
import RectTool from "./tool/rect";
import EllipseTool from "./tool/ellipse";
import ArrowlineTool from "./tool/arrowline";
import PencilTool from "./tool/pencil";
import MosaicTool from "./tool/mosaic";
import TextTool from "./tool/text";
import FileTool from "./tool/file";
import UndoTool from "./tool/undo";

export default {
    name: "ToolBar",
    components: {
        RectTool,
        EllipseTool,
        ArrowlineTool,
        PencilTool,
        MosaicTool,
        TextTool,
        FileTool,
        UndoTool
    },
    provide() {
        return {
            toolbar: this
        };
    },
    inject: {
        canvas: {
            default: ""
        }
    },
    methods: {
        /**
         * 关闭所有工具组件
         */
        offAllTool(notOffObj) {
            if (notOffObj) {
                this.$children[0].$children.forEach(item => {
                    if (notOffObj !== item && item.offActive) {
                        item.offActive();
                    }
                });
            } else {
                this.$children[0].$children.forEach(item => {
                    item.offActive && item.offActive();
                });
            }
        }
    }
};
</script>
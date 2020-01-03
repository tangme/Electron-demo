<style>
.toolbar-wrap {
    background: #272822;
    padding: 5px;
}
</style>
<template>
    <div class="toolbar-wrap">
        <el-button-group>
            <rect-tool></rect-tool>
            <rect-tool></rect-tool>
        </el-button-group>
    </div>
</template>
<script>
import RectTool from "./tool/rect";
export default {
    name: "ToolBar",
    components: {
        RectTool
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
                    if (notOffObj !== item) {
                        item.offActive();
                    }
                });
            } else {
                this.$children[0].$children.forEach(item => {
                    item.offActive();
                });
            }
        }
    }
};
</script>
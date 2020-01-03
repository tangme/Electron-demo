<template>
    <el-popover v-model="tool.active" trigger="manual" placement="bottom">
        <div>
            <size-picker v-model="tool.obj" :size="[1, 3, 5]" @click="tool.obj.setSize($event)"></size-picker>
            <el-color-picker
                value="transparent"
                class="btn-text can-hover mar-l-5"
                style="vertical-align: middle;"
                :predefine="predefine"
                size="mini"
                @change="setColor($event)"
            />
        </div>
        <el-button
            slot="reference"
            :type="tool.active ? 'primary' : ''"
            icon="fa fa-long-arrow-right"
            title="箭头工具"
            @click="toggleTool"
        ></el-button>
    </el-popover>
</template>
<script>
import { ArrowLineTool } from "./arrowline-tool";
import SizePicker from "../../sizePicker";
export default {
    name: "ArrowlineTool",
    components: {
        SizePicker
    },
    inject: {
        toolbar: {
            default: ""
        },
        canvas: {
            default: ""
        }
    },
    data() {
        return {
            tool: {
                obj: null,
                active: false,
                getInst: canvas => {
                    return new ArrowLineTool(canvas);
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
    methods: {
        /**
         * 切换矩形工具启用状态
         */
        toggleTool() {
            this.toolbar.offAllTool(this);
            this.$set(this.tool, "active", !this.tool.active);
            if (this.tool.active) {
                if (!this.tool.obj) {
                    this.tool.obj = this.tool.getInst(this.canvas.canvas);
                }
                this.tool.obj.onWork();
            } else {
                this.tool.obj.offWork();
            }
        },
        /**
         * 关闭矩形工具
         */
        offActive() {
            this.tool.obj && this.tool.obj.offWork();
            this.tool.active = false;
        },
        /**
         * 设置矩形描边颜色
         */
        setColor(color) {
            this.tool.obj.setColor(color);
        }
    }
};
</script>
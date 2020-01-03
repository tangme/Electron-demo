<template>
    <span>
        <el-button icon="fa fa-undo" title="撤销" @click="undo"></el-button>
    </span>
</template>
<script>
import { HISTORY } from "../common";
export default {
    name: "UndoTool",
    inject: {
        toolbar: {
            default: ""
        },
        canvas: {
            default: ""
        }
    },
    created() {
        HISTORY.splice(0);
    },
    methods: {
        undo() {
            if (HISTORY.length > 0) {
                let delId = HISTORY.pop();
                let objs = this.canvas.canvas
                    .item(0)
                    .getObjects()
                    .filter(item => item.customId === delId);
                objs.forEach(o => {
                    this.canvas.canvas.item(0).remove(o);
                });
                this.canvas.canvas.renderAll();
            }
        }
    }
};
</script>
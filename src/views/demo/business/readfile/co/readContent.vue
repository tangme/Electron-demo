<template>
    <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
            <el-tag type="info">读取内容</el-tag>
            <el-button
                style="float: right;"
                size="mini"
                type="danger"
                icon="el-icon-delete"
                circle
                title="清空读取内容"
                @click="resetContent"
            ></el-button>
        </div>
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="原始内容" name="1">
                <div>{{originContent}}</div>
            </el-collapse-item>
            <el-collapse-item title="解析内容" name="2">
                <div style="word-wrap: break-word;">{{formatContent}}</div>
            </el-collapse-item>
        </el-collapse>
    </el-card>
</template>
<script>
/* import { ipcRenderer } from "electron";
export default {
    mounted() {
        ipcRenderer.on("afterReadFile", (event, message) => {
            if (message.code === 0) {
                console.log(message);
            } else {
                console.log(message);
                this.formatContent = message.data;
                this.originContent = message.originData;
            }
        });
    },
    data() {
        return {
            activeNames: ["1", "2"],
            originContent: "待读取",
            formatContent: "待读取"
        };
    },
    methods: {
        handleChange(val) {
            console.log(val);
        },
        resetContent() {
            this.originContent = "待读取";
            this.formatContent = "待读取";
        }
    }
}; */
</script>
<style>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both;
}

.box-card {
    min-width: 480px;
    width: 99%;
}
</style>

<template>
    <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
            <el-tag type="info">程序日志</el-tag>
            <el-button
                style="float: right;"
                size="mini"
                type="danger"
                icon="el-icon-delete"
                circle
                title="清空程序日志"
                @click="cleanLog"
            ></el-button>
        </div>
        <div v-for="(o,index) in logArr" :key="index" class="text item">{{ o }}</div>
    </el-card>
</template>
<script>
/* import { ipcRenderer } from "electron";

export default {
    mounted() {
        ipcRenderer.on("conn", (event, message) => {
            this.logArr.push(`${message.time} ${message.con}`);
        });
    },
    data() {
        return {
            logArr: []
        };
    },
    methods: {
        cleanLog() {
            this.logArr = [];
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


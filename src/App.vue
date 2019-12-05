<template>
    <div id="app">
        <el-container>
            <el-header style="height:100%;">
                <top-head></top-head>
            </el-header>
            <el-divider></el-divider>
            <el-main style="padding:0;">
                <el-row :gutter="10" style="margin:0;">
                    <el-col :span="12">
                        <program-log></program-log>
                    </el-col>
                    <el-col :span="12">
                        <read-content></read-content>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import TopHead from "./views/readfile/head";
import ProgramLog from "./views/readfile/programLog";
import ReadContent from "./views/readfile/readContent";

export default {
    name: "app",
    components: {
        TopHead,
        ProgramLog,
        ReadContent
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>

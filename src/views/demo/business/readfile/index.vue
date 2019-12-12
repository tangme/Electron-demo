<template>
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
</template>
<script>
import TopHead from "./co/head";
import ProgramLog from "./co/programLog";
import ReadContent from "./co/readContent";

export default {
    components: {
        TopHead,
        ProgramLog,
        ReadContent
    }
}
</script>
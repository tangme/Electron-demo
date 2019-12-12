<template>
    <div>
        <h2>版本~配置信息:</h2>
        <div>
            <el-tag type="warning">Node: {{nodeVersion}}</el-tag>
            <el-tag type="warning">Chrome: {{chromeVersion}}</el-tag>
            <el-tag type="warning">Electron: {{electronVersion}}</el-tag>
            <el-button type="text" @click="readLocalForTest">读取测试</el-button>
            <el-button type="text" @click="setDefaultFile">默认文件{{defaultFile}}</el-button>
        </div>
        <el-dialog title="设置默认文件" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="文件名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                    <input type="file" @change="handleChange" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveDefaultFile">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
/* const { ipcRenderer } = require("electron");
export default {
    mounted() {
        ipcRenderer.send("fetchCinfig");
        ipcRenderer.on("cinfigData", (event, message) => {
            this.defaultFile = message.defaultFile;
            this.form.name = this.defaultFile;
            console.log("message", message);
        });
    },
    data() {
        return {
            nodeVersion: process.versions.node,
            chromeVersion: process.versions.chrome,
            electronVersion: process.versions.electron,
            defaultFile: "",
            dialogFormVisible: false,
            form: {
                name: this.defaultFile
            },
            formLabelWidth: "60px"
        };
    },
    methods: {
        readLocalForTest() {
            ipcRenderer.send("readFile", "readFile");
        },
        setDefaultFile() {
            this.dialogFormVisible = true;
        },
        handleChange(e) {
            console.log(e);
            for (const f of e.target.files) {
                this.form.name = f.path;
            }
        },
        saveDefaultFile() {
            ipcRenderer.send("updateDefaultFile", this.form.name);
            this.dialogFormVisible = false;
            this.$notify({
                title: "提示",
                message: "配置修改后，重启程序生效",
                duration: 0
            });
        }
    }
}; */
</script>


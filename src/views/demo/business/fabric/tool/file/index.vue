<template>
    <span>
        <el-dropdown @command="handleFile">
            <el-button
                icon="el-icon-files"
                style="border-top-left-radius: 0;border-bottom-left-radius: 0;"
            >
                文件
                <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="new">打开新文件</el-dropdown-item>
                <el-dropdown-item command="url">在线新文件</el-dropdown-item>
                <el-dropdown-item command="save">保存</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <input ref="hidefile" style="display:none;" type="file" accept="image/*" />
        <a ref="hidea" href target="_blank" download="tanglv edit file.jpg"></a>
    </span>
</template>
<script>
export default {
    name: "FileTool",
    inject: {
        toolbar: {
            default: ""
        },
        canvas: {
            default: ""
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initNewFileBtn();
        });
    },
    methods: {
        handleFile(command) {
            switch (command) {
                case "new":
                    this.newFile();
                    break;
                case "save":
                    this.saveImg();
                    break;
                case "url":
                    this.openUrl();
                    break;
                default:
                    break;
            }
        },
        /**
         * 打开新文件
         */
        newFile() {
            let event = document.createEvent("MouseEvents");
            event.initMouseEvent("click"); //初始化
            this.$refs.hidefile.dispatchEvent(event); //触发Event
        },
        /**
         * 初始化本地图片按钮
         */
        initNewFileBtn() {
            let _this = this;
            this.$refs.hidefile.addEventListener("change", function(e) {
                _this.toolbar.offAllTool();
                _this.canvas.reset();
                var file = e.target.files[0];
                var reader = new FileReader();
                reader.onload = function(f) {
                    var data = f.target.result;
                    fabric.Image.fromURL(data, function(img) {
                        var oImg = img
                            .set({
                                customId: Date.now(),
                                hasControls: false,
                                hasBorders: false,
                                selectable: true
                            })
                            .scale(0.9);
                        oImg.scaleToWidth(800);
                        _this.canvas.canvas.add(oImg).centerObject(oImg);
                    });
                };
                reader.readAsDataURL(file);
            });
        },
        /**
         * 保存图片
         */
        saveImg() {
            var cc = this.canvas.canvas.item(0).toDataURL({
                format: "jpeg"
            });
            /* var imgElement = document.getElementById("my-image");
            imgElement.setAttribute("src", cc); */

            //设置隐藏链接地址，模拟点击下载
            this.$refs.hidea.setAttribute("href", cc);

            let event = document.createEvent("MouseEvents"); //创建Event对象
            event.initMouseEvent("click"); //初始化
            this.$refs.hidea.dispatchEvent(event); //触发Event
        },
        openUrl() {
            this.$prompt("请输入图片地址", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
                // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                // inputErrorMessage: "邮箱格式不正确"
            })
                .then(({ value }) => {
                    this.canvas.loadFromUrl(value);
                })
                .catch(() => {});
        }
    }
};
</script>
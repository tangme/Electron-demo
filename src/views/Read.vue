<style>
.flex-con {
    display: flex;
    position: absolute;
    width: 100%;
    border-top: 5px solid #ccc;
    height: calc(100% - 150px);
}

.flex-item-grow1 {
    flex-grow: 1;
    overflow: auto;
}

.flex-con .flex-item-grow1:not(:last-child) {
    border-right: 5px solid #ccc;
    flex-shrink: 0;
}

.headTitle {
    text-indent: 1em;
}
</style>
<template>
    <div>
        <h1>版本信息</h1>
        <p>node: {{nodev}}</p>
        <p>Chrome:{{chromev}}</p>
        <button type="button" class="btn-readTest">读取测试</button>
        <div class="flex-con">
            <div class="flex-item-grow1">
                <h3 class="headTitle">
                    程序日志
                    <button type="button" class="btn-clean-log" data-val="div-program">清空日志</button>
                </h3>
                <div id="div-program"></div>
            </div>
            <div class="flex-item-grow1">
                <h3 class="headTitle">
                    读取内容
                    <button
                        type="button"
                        class="btn-clean-content"
                        data-val="div-readContent"
                    >清空内容</button>
                    <el-popconfirm
                        confirmButtonText="好的"
                        cancelButtonText="不用了"
                        icon="el-icon-info"
                        iconColor="red"
                        title="这是一段内容确定删除吗？"
                    >
                        <el-button slot="reference">删除</el-button>
                    </el-popconfirm>
                </h3>
                <div id="div-readContent"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            nodev: process.versions.node,
            chromev: process.versions.chrome
        };
    }
};
</script>
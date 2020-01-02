<template>
    <el-button-group>
        <el-button
            :type="toggleSize(size[0])"
            size="mini"
            icon="fa fa-circle"
            class="mini-circle"
            @click="handleClick(size[0])"
        ></el-button>
        <el-button
            :type="toggleSize(size[1])"
            size="mini"
            icon="fa fa-circle"
            @click="handleClick(size[1])"
        ></el-button>
        <el-button
            :type="toggleSize(size[2])"
            size="mini"
            icon="fa fa-circle"
            class="max-circle"
            @click="handleClick(size[2])"
        ></el-button>
    </el-button-group>
</template>
<script>
export default {
    name: "SizePicker",
    props: {
        size: {
            type: Array,
            default: () => [1, 3, 5]
        },
        value: {
            type: Object
        }
    },
    data() {
        return {};
    },
    methods: {
        /**
         * 设置工具大小按钮选中激活状态
         */
        toggleSize(val) {
            if (!this.value) {
                return "";
            } else if (this.value.size == val) {
                return "primary";
            } else {
                return "";
            }
        },
        handleClick(val) {
            this.$emit("click", val);
        }
    }
};
</script>
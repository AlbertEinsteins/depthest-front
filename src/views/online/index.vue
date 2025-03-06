<template>
    <el-container>
        <el-header>
            <el-card>
                <el-row class="header-algo-row">
                <!-- set some options -->
                    <el-radio v-for="(name, idx) in algoNames" v-model="chooseLabel" :label="idx">{{ name }}</el-radio>
                </el-row>
                <el-row>
                <!-- File upload --> 
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-row>
            </el-card>
        </el-header>
        <el-main>
            <el-card class="second">
            <el-row>
                <el-col :span="11">
                    <!-- Origin RGB -->
                    <el-image 
                        key="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
                        src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
                    ></el-image>
                </el-col>

                <el-col :span="2"></el-col>
                <el-col :span="11">
                    <!-- Result Depth -->
                    <el-image 
                        key="pred"
                        :src="Idea1NyuResults"
                    ></el-image>
                </el-col>
            </el-row>
            <el-row>

            </el-row>
            <el-row>
                
            </el-row>
            <el-row>
                
            </el-row>
            <el-row>
                
            </el-row>
            </el-card>
        </el-main>
    </el-container>
</template>

<script lang="ts">
import Idea1NyuResults from '@/assets/images/Idea1NyuResults.png';
import { defineComponent, reactive, ref } from 'vue';


export default defineComponent({
    name: 'online',
    setup() {
        const algoNames = reactive<string[]>(['室内', '室外'])
        let chooseLabel = ref<number>(1)

        let fileList = reactive<string[]>([])
        
        return {
            Idea1NyuResults,
            algoNames,
            fileList,
            chooseLabel
        }
    }
});

</script>

<style lang="scss">

.el-header, .el-footer {
    color: #333;
    text-align: center;
    line-height: 50px;
}

.header-algo-row {
    line-height: 20px;
}


.second {
    margin-top: 60px;
}

</style>
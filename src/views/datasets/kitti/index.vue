<template>
    <!-- <el-container> -->
        <!-- <el-main> -->
    <el-row>
        <el-col :span="0.8"></el-col>
        <el-col class="col" :span="24">
            <el-card>
            <el-tag type="info">上传文件</el-tag>
            <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            </el-card>
        </el-col>
        <el-col :span="1"></el-col>
    </el-row>


    <!-- Left is Origin Img -->
    <el-row style="margin-top: 15px;">
        <el-col :span="11">
            <el-image 
                key="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
                src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
            ></el-image>
        </el-col>

        <el-col :span=1></el-col>
        <el-col :span="11">
            <el-image 
                key="pred"
                src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
            ></el-image>
        </el-col>
    </el-row>
    <!-- Right is Output Img -->

    <el-row style="margin-top: 12px;">

        <el-table
            :data="metrics"
            style="width: 100%"
            >
            <el-table-column
            prop="a1"
            label="delta1"
            width="180">
            </el-table-column>
            <el-table-column
            prop="a2"
            label="delta2"
            width="180">
            </el-table-column>
            <el-table-column
            prop="a3"
            label="delta3">
            </el-table-column>
            <el-table-column
            prop="rmse"
            label="rmse">
            </el-table-column>
        </el-table>
    </el-row>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

interface Metric {
    a1: number,
    a2: number,
    a3: number,
    rmse: number,
}

export default defineComponent({
    name: 'nyu',
    
    setup() {
        let imageUrl = ref<string>()

        let metrics = reactive<Metric[]>([
            { "a1": 0.88, "a2": 0.91, "a3": 0.99, "rmse": 0.24},
            { "a1": 0.88, "a2": 0.91, "a3": 0.99, "rmse": 0.24},
            { "a1": 0.88, "a2": 0.91, "a3": 0.99, "rmse": 0.24},
            { "a1": 0.88, "a2": 0.91, "a3": 0.99, "rmse": 0.24},
        ])
        return {
            imageUrl,
            metrics,
        }
    }
    
})


</script>


<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
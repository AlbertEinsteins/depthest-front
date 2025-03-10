<template>
    <div class="layout-main-conent">
        <el-form label-position="top" :model="modelRef" :rules="rulesRef" ref="formRef">
            <el-card shadow="never" class="cus-card" style="margin-bottom: 20px">
                <template #header>基础信息</template>
                <el-row :gutter="16">
                    <el-col :lg="8" :md="12" :sm="24">
                        <el-form-item  label="标题" prop="title">
                            <el-input v-model="modelRef.title" placeholder="请输入"  />
                        </el-form-item>
                    </el-col>
                    <el-col :lg="8" :md="12" :sm="24">
                        <el-form-item label="起止日期" prop="date">
                            <el-date-picker 
                                type="daterange" 
                                v-model="modelRef.date" 
                                range-separator="至"  
                                start-placeholder="开始日期" 
                                end-placeholder="结束日期"
                                class="form-basic-width100">                            
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :lg="8" :md="12" :sm="24">
                        <el-form-item  label="下拉选择" prop="select">
                            <el-select v-model="modelRef.select" placeholder="请选择" clearable style="width:100%">
                                <el-option label="select1" value="1"></el-option>
                                <el-option label="select2" value="2"></el-option>
                                <el-option label="select3" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :lg="8" :md="12" :sm="24">
                         <el-form-item  label="单选按钮1" prop="radio1">
                            <el-radio-group v-model="modelRef.radio1">
                                <el-radio label="1">item 1</el-radio>
                                <el-radio label="2">item 2</el-radio>
                                <el-radio label="3">item 3</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>                
            </el-card>

            <el-card shadow="never" class="cus-card" style="margin-bottom: 20px">
                <template #header>拓展信息</template>
                <el-row :gutter="16">
                    <el-col :lg="8" :md="12" :sm="24">
                        <el-form-item  label="单选按钮2" prop="radio2">
                            <el-radio-group v-model="modelRef.radio2">
                                <el-radio-button label="1">item 1</el-radio-button>
                                <el-radio-button label="2">item 2</el-radio-button>
                                <el-radio-button label="3">item 3</el-radio-button> 
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :lg="8" :md="12" :sm="24">
                        <el-form-item  label="复选框" prop="checkbox">                        
                            <el-checkbox-group v-model="modelRef.checkbox">
                                <el-checkbox label="1">item 1</el-checkbox>
                                <el-checkbox label="2">item 2</el-checkbox>
                                <el-checkbox label="3">item 3</el-checkbox>
                                <el-checkbox label="4" disabled>item 4</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                    <el-col :lg="8" :md="12" :sm="24">
                        <el-form-item  label="备注" prop="remark"> 
                            <el-input
                                type="textarea"
                                :autosize="{ minRows: 1, maxRows: 1}"
                                placeholder="请输入内容"
                                v-model="modelRef.remark">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>

            <el-card shadow="never" class="cus-card">
                <template #header>表格信息</template>
                    <TableForm v-model="modelRef.users" />
            </el-card>




            <form-footer-toolbar>
                <el-button type="primary" @click="handleSubmit" :loading="submitLoading">
                提交
                </el-button>  
                <el-button @click="resetFields">
                重置
                </el-button>                           
            </form-footer-toolbar>


        </el-form>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, Ref, ref } from "vue";
import { useStore } from "vuex";
import { ElForm, ElMessage } from "element-plus";
import { FormDataType } from "./data.d";
import { StateType as FormStateType } from "./store";
import TableForm from './components/TableForm/index.vue';
import FormFooterToolbar from "@/components/FormFooterToolbar/index.vue";

interface FormComplexPageSetupData {    
    modelRef: FormDataType;
    rulesRef: any;
    formRef: Ref<typeof ElForm | undefined>;
    resetFields: () => void;
    submitLoading: Ref<boolean>;
    handleSubmit: (e: MouseEvent) => void;
}

export default defineComponent({
    name: 'FormComplexPage',
    components: {
        TableForm,
        FormFooterToolbar
    },
    setup(): FormComplexPageSetupData {

        const store = useStore<{FormComplex: FormStateType}>();

        // 表单值
        const modelRef = reactive<FormDataType>({
            title: '',
            date: [],
            select: '',
            radio1: '',
            radio2: '',
            checkbox: [],
            remark: '',
            users: []
        });
        // 表单验证
        const rulesRef = reactive({
            title: [
                {
                    required: true,
                    message: '必填',
                },
            ],
            date: [
                {
                    required: true,
                    message: '必填',
                    trigger: 'change', 
                    type: 'array' 
                },
            ],  
            select: [
                {
                    required: true,
                    message: '请选择',
                },
            ],  
            radio1: [],  
            radio2: [
                {
                    required: true,
                    message: '请选择',
                },
            ],
            checkbox:[],
            remark: [],
            users: []      
        });
        // form
        const formRef = ref<typeof ElForm>();
        // 重置
        const resetFields = () => {
            formRef.value && formRef.value.resetFields();
            modelRef.users = [];
        }
        // 提交loading
        const submitLoading = ref<boolean>(false);
        // 提交
        const handleSubmit = async () => {
            submitLoading.value = true;
            try {
                const valid: boolean =  formRef.value ? await formRef.value.validate() : false;
                if(valid === true) {
                    const res: boolean = await store.dispatch('FormComplex/create',modelRef);                
                    if (res === true) {
                        ElMessage.success('提交成功');
                        resetFields();                 
                    }
                }
                
            } catch (error) {
                // console.log('error', error);
            }
            submitLoading.value = false;            
        };

        return {           
            modelRef,
            rulesRef,
            formRef,
            resetFields,
            submitLoading,
            handleSubmit,
        }



    }
})
</script>
<style lang="scss">
.form-basic-width100.el-input__inner {
    width: 100%;
}
</style>
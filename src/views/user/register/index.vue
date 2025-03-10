<template>
    <div class="main">
        <h1 class="title">
            {{t('page.user.register.form.title')}}
        </h1>
        <el-form :model="modelRef" :rules="rulesRef" ref="formRef">
            <el-form-item label="" prop="username">
                <el-input v-model="modelRef.username" :placeholder="t('page.user.register.form-item-username')" @keydown.enter="handleSubmit"/>
            </el-form-item>
            <el-form-item label="" prop="password">
                <el-input type="password" v-model="modelRef.password" :placeholder="t('page.user.register.form-item-password')" @keydown.enter="handleSubmit"/>
            </el-form-item>
            <el-form-item label="" prop="confirm">
                <el-input type="password" v-model="modelRef.confirm" :placeholder="t('page.user.register.form-item-confirmpassword')" @keydown.enter="handleSubmit"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="submit"  @click="handleSubmit" :loading="submitLoading">
                    {{t('page.user.register.form.btn-submit')}}
                </el-button>  
                <div class="text-align-right">
                    <router-link to="/user/login">
                        {{t('page.user.register.form.btn-jump')}}
                    </router-link>
                </div>              
            </el-form-item>

            <el-alert v-if="errorMsg !== '' && (typeof errorMsg !== 'undefined') &&  !submitLoading" :title="errorMsg" type="error" show-icon :closable="false" />
            
        </el-form>
    </div>
</template>
<script lang="ts">
import { computed, ComputedRef, defineComponent, reactive, Ref, ref } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useI18n } from "vue-i18n";
import { ElForm, ElMessage } from 'element-plus';
import { RegisterParamsType } from "./data.d";
import { StateType as RegisterStateType } from "./store";

interface UserRegisterSetupData {
    t: (key: string | number) => string;
    modelRef: RegisterParamsType;
    rulesRef: any;
    formRef: Ref<typeof ElForm | undefined>;
    submitLoading: Ref<boolean>;
    handleSubmit: () => Promise<void>;
    errorMsg: ComputedRef<string | undefined>; 
}

export default defineComponent({
    name: 'UserRegister',
    setup(): UserRegisterSetupData {
        const router = useRouter();
        const store = useStore<{userregister: RegisterStateType}>();
        const { t } = useI18n();

        // 表单值
        const modelRef = reactive<RegisterParamsType>({
            username: '',
            password: '',
            confirm: ''
        });
        // 表单验证
        const rulesRef = reactive({
            username: [
                {
                    required: true,
                    message: t('page.user.register.form-item-username.required'),
                },
            ],
            password: [
                {
                    required: true,
                    message: t('page.user.register.form-item-password.required'),
                },
            ],
            confirm: [
                {
                    validator: (rule: any, value: string, callback: any) => {
                        if (value === '') {
                            return Promise.reject(t('page.user.register.form-item-password.required'));
                        } else if (value !== modelRef.password) {
                            return Promise.reject(t("page.user.register.form-item-confirmpassword.compare"));
                        } else {
                            return Promise.resolve();
                        }
                    }
                }
            ],          
        });
        // form
        const formRef = ref<typeof ElForm>();
        // 注册loading
        const submitLoading = ref<boolean>(false);
        // 注册
        const handleSubmit = async () => {
            submitLoading.value = true;
            try {
                const valid: boolean =  formRef.value ? await formRef.value.validate() : false;
                if(valid === true) {
                    const res: boolean = await store.dispatch('userregister/register',modelRef);                
                    if (res === true) {
                        ElMessage.success(t('page.user.register.form.register-success'));
                        router.replace('/user/login');
                    }
                }
            } catch (error) {
                console.log('error', error);
                ElMessage.warning(t('app.global.form.validatefields.catch'));
            }
            submitLoading.value = false;
        };   
        
         // 注册状态
        const errorMsg = computed<string | undefined>(()=> store.state.userregister.errorMsg);


        return {
            t,
            modelRef,
            rulesRef,
            formRef,
            submitLoading,
            handleSubmit,            
            errorMsg
        }

    }
})
</script>
<style lang="scss" scoped>
.main {
  flex: none;
  width: 248px;
  padding: 36px;
  margin: 0 auto;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0,0,0,.1);
  .title {
    font-size: 28px;
    margin-top: 0;
    margin-bottom: 30px;
    text-align: center;
    // color: #ffffff;
    color: rgba(0,0,0,.85);
    /* background-image:-webkit-linear-gradient(right,#FFFFFF,#009688, #FFFFFF); 
        -webkit-background-clip: text; 
        -webkit-text-fill-color:transparent; */
  }
  .submit {
    width: 100%;
  }
}
</style>
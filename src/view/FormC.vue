<template>
 <div>
   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">    
          <el-form-item label="别名"  prop="modelargs">
            <el-input v-model="ruleForm.modelargs"></el-input>
          </el-form-item>
         <el-form-item label="模型名称"  prop="modelname">
             <el-select v-model="ruleForm.modelname" placeholder="请选择活动区域">
              <el-option
                v-for="item in options"
                :label="item.modelname"
                :value="item.modelname">
              </el-option>
            </el-select>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="handleReset">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div> 
    </div>
</template>

<script>
  export default {
 
    data() {
      return {
        ruleForm: {
          modelargs: '',
          modelname:''
        },
        options:[{modelname:123}],
        rules: {
          modelargs: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          modelname: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      handleReset() {
        this.$refs.ruleForm.resetFields();
      },
      handleSubmit(ev) {
        debugger;
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>
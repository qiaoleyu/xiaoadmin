<template>
  <div class="hello">
    <h2 style="font-weight: 600">{{ msg }}</h2>

    <el-form :model="admin" status-icon :rules="rules" ref="admin" style="width: 45%;margin: auto;text-align: left">
      <el-form-item prop="aname">
        <el-input placeholder="请输入管理员姓名" v-model="admin.aname" name="aname" size="large" style="width: 450px">
          <template slot="prepend" >管理员姓名</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="apassword">
        <el-input placeholder="请输入管理员密码" v-model="admin.apassword" name="apassword" size="large" style="width: 450px">
          <template slot="prepend" >管理员密码</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="atell">
        <el-input placeholder="请输入管理员电话" v-model="admin.atell" name="atell" size="large" style="width: 450px">
          <template slot="prepend" >管理员电话</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="astatue">
        <el-input placeholder="请输入管理员状态" v-model="admin.astatue" name="astatue" size="large" style="width: 450px">
          <template slot="prepend" >管理员状态</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="aemail">
        <el-input placeholder="请输入管理员邮箱" v-model="admin.aemail" name="aemail" size="large" style="width: 450px">
          <template slot="prepend" >管理员邮箱</template>
        </el-input>
      </el-form-item>

      <el-button type="success" style="margin-left: 200px" round plain @click="add()">确认新增</el-button>
    </el-form>
  </div>
</template>
<style>
  .el-main{
    line-height: inherit;
  }
  .el-form-item__error{
    /*left: 430px;*/
  }
</style>
<script>
  import axios from 'axios'
  import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item";
export default {
  //name: 'Main',
  components: {ElFormItem},
  data () {
    var checkaName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('管理名称不能为空'));
      }else{
        return callback();
      }
    };
    var checkaPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('管理员密码不能为空'));
      }else{
        return callback();
      }
    };
    var checkaTell = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('管理员电话不能为空'));
      }else{
        return callback();
      }
    };
    var checkaStatue = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('管理员状态不能为空'));
      }else{
        return callback();
      }
    };
    var checkaEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('管理员邮箱地址不能为空'));
      }else{
        return callback();
      }
    };
    return {
      msg: '管理员新增页面',
    admin:{
       aid:'',
      aname:'',
      apassword:'',
      atell:'',
      astatue:'',
      createTime:'',
      aemail:''
    },rules:{
        aname: [{ validator: checkaName, trigger: 'blur' }],
        apassword: [{ validator: checkaPassword, trigger: 'blur' }],
        atell: [{ validator: checkaTell, trigger: 'blur' }],
        astatue: [{ validator: checkaStatue, trigger: 'blur' }],
        aemail: [{ validator: checkaEmail, trigger: 'blur' }],
      }
    }
  },
  methods: {
     add:function () {
       var url="api/insert"
       //console.log(this.admin)
       this.$refs['admin'].validate((valid)=> {
         if (valid) {
           axios.post(url, this.admin).then(res => {
             //alert(res.data);
             if (res.data == 1) {
               this.$message({
                 message: '恭喜你，新增成功',
                 type: 'success'
               });
               this.$router.push("/administrator")
             } else if (res.data == 0) {
               this.$message.error('错了哦，您没有修改权限');
               this.$router.push('/unauth')

             } else {
               //           alert("新增失败！")
               this.$message.error('错了哦，新增失败');
             }

           })
         }else{
             return false;
         }
       })
     }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

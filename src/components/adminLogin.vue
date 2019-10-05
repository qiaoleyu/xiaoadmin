<template>
  <div style="">
    <!--<h1 >{{ msg }}</h1>-->
    <br>
    <el-form :model="admin" status-icon :rules="rules" ref="admin" label-width="100px" style="width: 40%;margin: auto" >
      <el-form-item label="昵称" prop="aName" style="text-align: left">
        <el-input type="text" name="aName" v-model="admin.aName" style="width: 350px" placeholder="用户名/邮箱/手机号"></el-input>
      </el-form-item><br>
      <el-form-item label="密码" prop="aPassword" style="text-align: left">
        <el-input type="aPassword" password="aPassword" v-model="admin.aPassword" style="width: 350px" placeholder="请输入密码"></el-input>
      </el-form-item><br>
      <el-row style="margin-right: 10px">
        <el-button type="primary" plain @click="login()" style="width: 80px">确认</el-button>
        <el-button type="primary" plain @click="resetForm('admin')" style="width: 80px">重置</el-button>
        <el-button type="primary" plain @click="reback()" style="width: 80px">返回</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
  data () {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }else{
        return callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.admin.aPassword !== '') {
          this.$refs.admin.validateField('aPassword');
        }
        callback();
      }
    };
    return {
      msg: '登录',
      admin:{
          aId:'',
        aName:'',
        aPassword:'',
        aEmail:''
      },
      rules: {
        aName: [{ validator: checkName, trigger: 'blur' }],
        aPassword: [{ validator: validatePass, trigger: 'blur' }],
      }
    }
  },
    methods: {
      login:function () {
          this.$refs['admin'].validate((valid)=>{
              if(valid){
//                  alert("submit");
                  //获得用户的数据
                //console.log(this.user.name, this.user.password )

                //发送请求 把参数发给后端（把用户名和密码发给后端 验证是否存在这个账号）
                axios.post("api/adminLogin", this.admin).then(res=>{
                    //接收后端返回来的数据
                  if(res.data!=null&&res.data!=''){
                      alert("登录成功！");
                      this.$router.push("/adminManager");
                  }else{
                      alert("登录失败");
                      this.$router.push("/adminLogin");
                  }
                })
              }else{
                return false;
              }
          })
//        axios.post('http://localhost/login',{name:this.user.name,password:this.user.password}).then(res => {
//          if (res.data!= null) {
//            this.$router.push({name:"userlist"})
//          } else {
//            alert(res.data);
//          }
//        })
      },resetForm(formName) {
        this.$refs[formName].resetFields();
      },reback:function () {
        this.$router.push("/")
      },
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

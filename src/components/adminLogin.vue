<template>
  <div style="margin-top: 150px">
    <h1 style="font-weight: bolder;margin-bottom: 30px">{{ msg }}</h1>
    <br>
    <el-form status-icon :rules="rules" ref="admin" label-width="100px" style="width: 40%;margin: auto" >
      <el-form-item label="昵称" prop="loginName" style="text-align: left">
        <el-input type="text" name="loginName" v-model="loginName" style="width: 350px" placeholder="用户名/邮箱/手机号"></el-input>
      </el-form-item><br>
      <el-form-item label="密码" prop="password" style="text-align: left">
        <el-input type="Password" name="password" v-model="password" style="width: 350px" placeholder="请输入密码"></el-input>
      </el-form-item><br>
      <el-row style="margin-right: 10px">
        <el-button type="primary" plain @click="login()" style="width: 80px">确认</el-button>
        <el-button type="primary" plain @click="resetForm('admin')" style="width: 80px">重置</el-button>
        <el-button type="primary" plain @click="reback()" style="width: 80px">返回</el-button>
      </el-row>
    </el-form>
  </div>
</template>
<style>
  body{
    background-color: aquamarine;
  }
</style>
<script>
  import axios from 'axios'
  import Cookies from 'js-cookie'

  export default {
  data () {
    var checkName = (rule, value, callback) => {
      /*if (!value) {
        return callback(new Error('用户名不能为空'));
      }else{*/
        return callback();
//      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.password != '') {
          this.$refs.validateField('aPassword');
        }
        callback();
      }
    };
    return {
      msg: 'Welcome to 后台登录界面',
      admin:{
//          aId:'',
        aname:'',
        apassword:'',
        aemail:''
      },
      password:'',
      loginName:'',
      rules: {
        loginName: [{ validator: checkName, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
      }
    }
  },mounted(){
      if(Cookies.get('name')!=null){
        Cookies.remove('name');
        Cookies.remove('name',{ path: '/' })
      }
    },
    methods: {
      login:function () {


        /*  this.$refs['admin'].validate((valid)=>{
              if(valid){
//                  alert("submit");
                  //获得用户的数据
                console.log(this.admin )*/

                //发送请求 把参数发给后端（把用户名和密码发给后端 验证是否存在这个账号）
                axios.post("api/adminLogin", {loginName:this.loginName,password:this.password}).then(res=>{
                    //接收后端返回来的数据
                  if(res.data=="success"){
//                      alert("登录成功！");
//                    alert(this.admin.aname);
                    Cookies.set('name',this.loginName,{ expires: 7, path: '/' });

                      this.$router.push("/shops");
                  }else{
                      alert("登录失败");
                      this.$router.push("/adminLogin");
                  }
                })
             /* }else{
                return false;
              }
          })*/
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

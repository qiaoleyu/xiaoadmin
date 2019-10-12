<template>
  <div class="hello">
    <h3>{{ msg }}</h3>

    <form>
    <el-input placeholder="请输入管理员姓名" v-model="admin.aname" size="large" style="width: 450px">
      <template slot="prepend" >管理员姓名</template>
    </el-input><br><br>
    <el-input placeholder="请输入管理员密码" v-model="admin.apassword" size="large" style="width: 450px">
      <template slot="prepend" >管理员密码</template>
    </el-input><br><br>
    <el-input placeholder="请输入管理员电话" v-model="admin.atell" size="large" style="width: 450px">
      <template slot="prepend" >管理员电话</template>
    </el-input><br><br>
    <el-input placeholder="请输入管理员状态" v-model="admin.astatue" size="large" style="width: 450px">
      <template slot="prepend" >管理员状态</template>
    </el-input><br><br>
      <el-input placeholder="请输入管理员邮箱" v-model="admin.aemail" size="large" style="width: 450px">
        <template slot="prepend" >管理员邮箱</template>
      </el-input><br><br>

    <el-button type="success" round plain @click="add()">确认新增</el-button>
    </form>
  </div>
</template>
<style>
  .el-main{
    line-height: inherit;
  }
</style>
<script>
  import axios from 'axios'
export default {
  //name: 'Main',
  data () {
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
    }
    }
  },
  methods: {
     add:function () {
       var url="api/insert"
       //console.log(this.admin)
       axios.post(url,this.admin).then(res=>{
         //alert(res.data);
         if(res.data==1){
           this.$message({
             message: '恭喜你，新增成功',
             type: 'success'
           });
           this.$router.push("/administrator")
         }else if(res.data==0) {
           this.$message.error('错了哦，您没有修改权限');
           this.$router.push('/unauth')

         }else {
//           alert("新增失败！")
           this.$message.error('错了哦，新增失败');
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

<template>
  <div class="hello">
    <h2 style="font-weight: 600">{{ msg }}</h2>

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
        <el-button type="success" round plain @click="update()">确认修改</el-button>
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
      msg: '管理员修改页面',
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
  mounted(){

    var ids=this.$route.params.id
    var url="api/selectById/"+ids
    //alert(ids)
    axios.get(url).then(res=>{
      if(res.data!=''){
        this.admin=res.data
      }
    })
  },
  methods: {
     update:function () {
       var url="api/update"
       //console.log(this.admin)
       axios.post(url,this.admin).then(res=>{
         //alert(res.data);
         if(res.data==1){
           this.$message({
             message: '恭喜你，修改成功',
             type: 'success'
           });
           this.$router.push("/administrator")
         }else {
//           alert("修改失败！")
           this.$message.error('错了哦，修改失败');

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

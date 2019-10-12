<template>
  <div class="hello">
    <h2 style="font-weight: 600">{{ msg }}</h2>

    <el-form label-width="100px" style="width: 600px;margin: auto;text-align: left">

      <el-form-item label="选择管理员:">
        <el-select v-model="role.aid" placeholder="请选择" style="width: 500px">
          <el-option
            v-for="item in admin"
            :key="item.aid"
            :label="item.aname"
            :value="item.aid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="height: 60px;width: 200px;margin: auto">
        <el-button type="primary" round plain style="width: 100px" @click="update()">确认修改</el-button>
      </el-form-item>
    </el-form>
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
      msg: '角色新增页面',
    role:{
       rid:'',

     },
      admin:[]
    }
  },
  mounted(){
    var url ="api/findAll"
    axios.get(url).then(res=>{
      this.admin=res.data

    })
    var ids=this.$route.params.id
    var url="api/selectRoleById/"+ids
    //alert(ids)
    axios.get(url).then(res=>{
      if(res.data!=''){
        this.role=res.data
      }
    })
  },
  methods: {
     update:function () {
       var url="api/updateRole"

       axios.post(url,this.role).then(res=>{
         //alert(res.data);
         if(res.data==1){
           this.$message({
             message: '恭喜你，修改成功',
             type: 'success'
           });
           this.$router.push("/role")
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

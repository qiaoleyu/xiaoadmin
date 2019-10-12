<template>
  <div class="hello">
    <h2 style="font-weight: 600">{{ msg }}</h2>

    <el-form label-width="100px" style="width: 600px;margin: auto;text-align: left">
      <el-form-item label="角色名称:">
        <el-input class="arrow"  v-model="role.rname" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item style="height: 60px;width: 200px;margin-left: 150px">
        <el-button type="primary" round plain style="width: 100px" @click="add()">确认增加</el-button>
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
      rname:''
     },
      admin:[]
    }
  },
  mounted(){
    var url ="api/findAll"
    axios.get(url).then(res=>{
      this.admin=res.data

    })
  },
  methods: {
     add:function () {
       var url="api/insertRole"
       //console.log(this.admin)
       axios.post(url,this.role).then(res=>{
         //alert(res.data);
         if(res.data==1){
           this.$message({
             message: '恭喜你，新增成功',
             type: 'success'
           });
           this.$router.push("/role")
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

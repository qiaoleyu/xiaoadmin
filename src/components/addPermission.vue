<template>

  <div class="hello">
    <h1>{{msg}}</h1>
    <el-form label-width="100px" style="width: 600px;margin: auto;text-align: left">

      <el-form-item label="权限姓名：">
        <el-input v-model="permission.pname" name="factory" style="width: 400px">
        </el-input>
      </el-form-item>
      <el-form-item label="权限信息:">
        <el-input v-model="permission.pinfo" name="shopInfo" style="width: 400px">
        </el-input>
      </el-form-item>
      <el-form-item label="角色名称:">
        <el-select v-model="permission.rid" placeholder="请选择" style="width: 400px">
          <el-option
            v-for="item in roles"
            :key="item.rid"
            :label="item.rname"
            :value="item.rid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="height: 60px;width: 200px;margin: auto">
        <el-button type="primary" plain @click="addPermission()">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import ElUpload from "../../node_modules/element-ui/packages/upload/src/index";
  import ElInput from "../../node_modules/element-ui/packages/input/src/input";
  export default{
    components: {ElInput},
    data(){
      return{
        msg:"权限新增页面",
        roles:[],
        permission:[],
      }
    },mounted(){
      var url = "api/findAllRoles";
      axios.get(url).then(res => {
          this.roles = res.data;
      })
    },
    methods:{
      addPermission:function () {
        axios.post("/api/addPermission",this.permission).then(res=>{
          if(res.data==1){
            this.$router.push('/permission');
          }else {
            alert("新增失败");
          }
        })
      }
    }

  }

</script>

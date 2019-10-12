<template>

  <div class="hello">
    <h2 style="font-weight: 600">{{msg}}</h2>
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
      <el-form-item style="height: 60px;width: 200px;margin: auto;margin-left: 150px">
        <el-button type="primary" plain round style="width: 100px" @click="updatePermission()">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import ElUpload from "../../node_modules/element-ui/packages/upload/src/index";
  export default{
    data(){
      return{
        msg:"权限修改页面",
        roles:[],
        permission:[],
      }
    },
    mounted() {
      this.findPermissionById();
      var url = "api/findAllRoles";
      axios.get(url).then(res => {
        this.roles = res.data;
      })
    },
    methods:{
      findPermissionById:function () {
        var pid=this.$route.params.pid;
        //alert(pid)
        axios.post("/api/findPermissionById/"+pid).then(res=>{
          this.permission=res.data;
        })
      },
      updatePermission:function () {
        axios.post("/api/updatePermission",this.permission).then(res=>{
          if(res.data==1){
            this.$message({
              message: '恭喜你，修改成功',
              type: 'success'
            });
            this.$router.push('/permission');
          }else {
//            alert("修改失败");
            this.$message.error('错了哦，修改失败');

          }
        })
      }
    }

  }

</script>

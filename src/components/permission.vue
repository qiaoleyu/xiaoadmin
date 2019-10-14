<template>
  <div class="hello" style="width: 100%;margin: auto">

    <h2 style="font-weight: 600">{{ msg }}</h2>
    <el-button type="primary" round @click="insert()">新增权限</el-button>

    <el-table :data="permission" stripe style="width: 100%" align="center">

      <el-table-column align="center" type="center" prop="pid" label="权限编号" width="200"></el-table-column>
      <el-table-column align="center" prop="pname" label="权限名称" width="200"></el-table-column>
      <el-table-column align="center" prop="pinfo" label="权限信息" width="200"></el-table-column>
      <el-table-column align="center" prop="rid" label="角色名称" width="200">
        <template slot-scope="scope">
          <div  v-for="(roles,index) in roles">
            <span v-if="scope.row.rid==roles.rid">{{roles.rname}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <el-button-group slot-scope="scope">
          <el-button type="primary" plain icon="el-icon-edit" @click="update(scope.row.pid)"></el-button>
          <el-button type="primary" plain icon="el-icon-delete" @click="del(scope.row.pid)"></el-button>
        </el-button-group>
      </el-table-column>
    </el-table>


    <el-row style="height: 20px"></el-row>

  </div>
</template>

<script>
  import axios from 'axios'
  import ElRow from "element-ui/packages/row/src/row";
  import ElInput from "../../node_modules/element-ui/packages/input/src/input";
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  export default {
    components: {
      ElButton,
      ElInput,
      ElRow},
    name: 'permission',
    data (){
      return {
        msg: '权限信息展示',
        permission:[],
        roles:[]
      }
    },
    mounted(){
      this.queryPermission();
      this.queryRoles();
    },
    methods:{
      insert:function () {
       axios.get("api/unauth").then(res=>{
          if(res.data==1){
            this.$router.push('/addPermission');
          }if(res.data==0) {
           this.$message.error('错了哦，您没有添加的权限');
           this.$router.push('/unauth')
          }
        })
      },
      update:function (pid) {

          axios.get("api/unauth").then(res=>{
            if(res.data==1){
              this.$router.push({path:'/updatePermission/'+pid})
            }if(res.data==0) {
              this.$message.error('错了哦，您没有修改的权限');
              this.$router.push('/unauth')
            }
          })

      },
      del:function (pid) {

        axios.post("api/deletePermission/" + pid).then(res => {

          if (res.data == 1) {
            this.queryPermission();
            this.$message({
              message: '恭喜你，删除成功',
              type: 'success'
            });
          } else if(res.data==0) {
            this.$message.error('错了哦，您没有权限');
            this.$router.push('/unauth')
          }
          else {
//              alert("删除失败")
            this.$message.error('错了哦，删除失败');
          }

        })
      },
      queryPermission:function() {
        var url = "api/findAllPermissions"
        axios.get(url).then(res => {
          this.permission=res.data;
        })
      },
      queryRoles:function() {
        var url = "api/findAllRoles"
        axios.get(url).then(res => {
          this.roles = res.data;
        })
      }
    }
  }
</script>

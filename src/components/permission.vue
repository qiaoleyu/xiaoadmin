<template>
  <div class="hello" style="width: 100%;margin: auto">

    <h1>{{ msg }}</h1>

    <el-table :data="permission" stripe style="width: 100%" align="center">

      <el-table-column align="center" type="center" prop="pid" label="权限编号" width="80"></el-table-column>
      <el-table-column align="center" prop="pname" label="权限名称" width="80"></el-table-column>
      <el-table-column align="center" prop="pinfo" label="权限信息" width="80"></el-table-column>
      <el-table-column align="center" prop="rid" label="角色名称" width="100">
        <template slot-scope="scope">
          <div  v-for="(roles,index) in roles">
            <span v-if="scope.row.rid==roles.rid">{{roles.rname}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <el-button-group slot-scope="scope">
          <el-button type="primary" plain icon="el-icon-edit" @click="update(scope.row.pid)"></el-button>
          <el-button type="primary" plain icon="el-icon-delete" @click="delete(scope.row.pid)"></el-button>
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
        this.$router.push('/addPermission');
      },
      update:function (pid) {
        this.$router.push({path:'/updatePermission/'+pid})
      },
      delete:function (pid) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get("/api/deletePermission/"+pid).then(res=>{
            this.queryPermission();

          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
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

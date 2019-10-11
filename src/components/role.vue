<template>
  <div class="hello">
    <h3>{{ msg }}</h3>
    <el-button type="primary" round @click="toAdd()">增加角色</el-button>

      <el-table align="center"
              :data="role"
              border
              style="width: 100%">
      <el-table-column align="center"
                       prop="rid"
                       label="角色编号"
                       width="100">
      </el-table-column>
      <el-table-column align="center"
                       prop="aid"
                       label="管理员姓名"
                       width="140">
        <template slot-scope="scope">
          <div  v-for="(admin,index) in admin">
            <span v-if="scope.row.aid==admin.aid">{{admin.aname}}</span>
          </div>
        </template>
      </el-table-column>
        <el-table-column align="center"
                        prop="rname"
                       label="角色名称"
                       width="140"  >
      </el-table-column>

      <el-table-column align="center"
                       label="操作"
                       width="140">
        <template slot-scope="role">

          <el-button type="danger" icon="el-icon-delete" circle @click="del(role.row.rid)"></el-button>
          <el-button type="primary" icon="el-icon-edit" circle @click="update(role.row.rid)"></el-button>
        </template>

      </el-table-column>
    </el-table>

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

    data () {
      return {
        msg: '角色详情页面',
        role:[],
        admin:[]
      }
    },
    mounted(){
      this.query()
      this.queryRole()
    },
    methods: {
      query:function () {
        var url ="api/findAll"
        axios.get(url).then(res=>{
          this.admin=res.data

          })
       },
      queryRole:function () {
        var url ="api/findAllRoles"
        axios.get(url).then(res=>{
          this.role=res.data

        })
      },
      toAdd:function () {

        axios.get("api/unauth").then(res=>{
          if(res.data==1){
            this.$router.push("/addRole")
          }if(res.data==0) {
            this.$router.push('/unauth')
          }
        })
      },
      update:function (id) {

        axios.get("api/unauth").then(res=>{
          if(res.data==1){
            this.$router.push({path:"/updateRole/"+id})
          }if(res.data==0) {
            this.$router.push('/unauth')
          }
        })
      },
      del:function (id) {
       // alert(id)
        var url="api/deleteRole/"+id
        axios.get(url).then(res=>{
            if(res.data==1){
              this.queryRole()
            }else if(res.data==0) {
              this.$router.push('/unauth')
            }
            else{
                alert("删除失败！")
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

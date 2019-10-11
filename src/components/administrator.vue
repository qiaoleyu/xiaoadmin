<template>
  <div class="hello">
    <h3>{{ msg }}</h3>

    <el-button type="primary" round @click="toAdd()">新增管理员</el-button>
      <el-table align="center"
              :data="admins"
              border
              style="width: 100%">
      <el-table-column align="center"
                       prop="aid"
                       label="管理员编号"
                       width="100">
      </el-table-column>
      <el-table-column align="center"
                       prop="aname"
                       label="管理员姓名"
                       width="140">
      </el-table-column>
        <el-table-column align="center"
                        type="password"
                       prop="apassword"
                       label="管理员密码"
                       width="140"  >
      </el-table-column>
      <el-table-column
        align="center"
        prop="atell"
        label="管理员电话"
        width="140"  >
      </el-table-column>
      <el-table-column align="center"
                       prop="createTime"
                       label="创建时间"
                       width="140"  >
      </el-table-column>
        <el-table-column align="center"
                         prop="astatue"
                         label="管理员状态"
                         width="140"  >
        </el-table-column>
      <el-table-column align="center"
                       prop="aemail"
                       label="管理员邮箱"
                       width="140"  >
      </el-table-column>
      <el-table-column align="center"
                       label="操作"
                       width="140">
        <template slot-scope="admin">
          <el-button type="danger" icon="el-icon-delete" circle @click="del(admin.row.aid)"></el-button>
          <el-button type="primary" icon="el-icon-edit" circle @click="update(admin.row.aid)"></el-button>
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
    name: 'Main',
    data () {
      return {
        msg: '管理员详情页面',
        admins:[]

      }
    },
    mounted(){
      this.query()
    },
    methods: {
      query:function () {
        var url ="api/findAll"
        axios.get(url).then(res=>{
          this.admins=res.data

          })
       },
      toAdd:function () {
        this.$router.push("/addAdmin")
      },
      update:function (id) {
         // alert(id)
        this.$router.push({path:"/updateAdmin/"+id})
      },
      del:function (id) {
       // alert(id)
        var url="api/delete/"+id
        axios.get(url).then(res=>{
            if(res.data==1){
              this.query()
            }else if(res.data=="unauth"){
              this.$router.push('/unauth')
            }else{
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

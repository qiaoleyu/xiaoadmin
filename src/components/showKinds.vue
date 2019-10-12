<template>

  <div  style="">
    <h2 style="width: 200px;height: 20px;line-height: 20px;float: left;margin-bottom: 20px">{{ msg }}</h2>
    <el-table :data="shopKinds" stripe style="width: 100%;">
      <el-table-column prop="skId" label="类别编号" width="100"> </el-table-column>
      <el-table-column prop="skName" label="类别名称" width="130"></el-table-column>
      <el-table-column label="操作" width="180">
        <el-button-group slot-scope="scope">
          <el-button type="primary" plain icon="el-icon-edit" @click="toupdate(scope.row.skId)"></el-button>
          <el-button type="primary" plain icon="el-icon-delete" @click="deleteUser(scope.row.skId)"></el-button>
        </el-button-group>
      </el-table-column>
    </el-table>

    <el-pagination  style="float: left;margin-left: 100px" background layout="prev, pager, next" :page-size="this.params.size" v-on:current-change="changePage"
                   :total="total" :current-page="this.params.page"></el-pagination>

    <el-row style="height: 20px"></el-row>
  </div>
</template>
<style>
  .el-main{
    /*background-color: inherit;*/
    line-height: inherit;
  }
</style>
<script>
  import axios from 'axios'
  import ElRow from "element-ui/packages/row/src/row";
  import ElInput from "../../node_modules/element-ui/packages/input/src/input";
  export default {
    components: {
      ElInput,
      ElRow},
    name: 'users',
    data (){
      return {
        msg: '类别展示',
        shopKinds:[],
        total:0,
        params:{
          size:5,
          page:1,
        }
      }

    },
    mounted(){
      this.query();

    },
    methods:{
      toupdate:function (skId) {
        this.$router.push({path:'/updateShopKinds/'+skId})
      },
      deleteUser:function (skId) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          axios.get("/api/deleteShopKinds/"+skId).then(res=>{
              this.query();
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
      changePage:function (page) {
        this.params.page=page;
        this.query()
      },
      query:function() {
        var url = "api/findAllKinds/"+this.params.page+"/"+this.params.size;
        axios.get(url).then(res => {
          this.shopKinds = res.data.list;
          this.total=res.data.total;
        })
      }
    }
  }
</script>

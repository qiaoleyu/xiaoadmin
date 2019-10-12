<template>
  <div class="hello" style="float: left;width: 400px;text-align: left;margin-left: 40px">
    <h2 style="height: 40px;line-height: 40px;margin-left: 100px;font-weight: 600">{{ msg }}</h2>

    <el-form label-width="100px" style="width: 400px">
      <el-input type="hidden" v-model="shopKinds.skId" name="skId"></el-input>
      <el-form-item label="类别名称">
        <div style="width: 200px;float: left"><el-input class="arrow" name="skName" v-model="shopKinds.skName" style="width: 200px"></el-input></div>
        <div style="width: 100px;float: left"><el-button type="primary"  style="width: 100px" plain @click="updateShopKinds()">确认</el-button></div>
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
  import axios from 'axios';
  import ElInput from "../../node_modules/element-ui/packages/input/src/input";

  export default{
    components: {ElInput},
    name:'updateShopKinds',
    data(){
      return{
        msg: '修改类别',

        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shopKinds:{

        }
      }
    },
    mounted:function () {
      var skId=this.$route.params.skId;
      axios.get("/api/findShopKindsById/"+skId).then(res=>{
        this.shopKinds=res.data;
      })
    },
    methods:{
      updateShopKinds:function () {
        axios.post("/api/updateShopKinds",this.shopKinds).then(r=>{
          if (r.data!=null){
            this.$message({
              message: '恭喜你，修改成功',
              type: 'success'
            });
            this.$router.push('/showKinds');
          }
        })
      }
    }
  }

</script>

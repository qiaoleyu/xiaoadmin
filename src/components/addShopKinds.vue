<template>

  <div class="hello" style="float: left;width: 400px;text-align: left;margin-left: 40px">
    <h2 style="height: 40px;line-height: 40px;margin-left: 100px">{{ msg }}</h2>

    <el-form :model="shopKinds" status-icon :rules="rules" ref="shopKinds" label-width="100px"  style="width: 400px;margin-top: 20px;text-align: left;float: left">
      <el-form-item label="类别名称:" prop="skName">
        <div style="width: 200px;float: left"><el-input class="arrow" name="skName" v-model="shopKinds.skName" style="width:200px"></el-input></div>
        <div style="width: 100px;float: left"><el-button type="primary"  style="width:100px" round plain to="/add" @click="add()">确认</el-button></div>
      </el-form-item>
    </el-form>

  </div>
</template>

<style>
  .el-form-item__error{

  }
</style>
<script>
  import axios from 'axios'
  import ElUpload from "../../node_modules/element-ui/packages/upload/src/index";
  export default{
    components: {ElUpload},
    data(){
      var checkskName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('商品类别不能为空'));
        }else{
          return callback();
        }
      };
      return{
        msg: '新增类别',
        shopKinds:{
          skName:''
        },rules: {
          skName: [{validator: checkskName, trigger: 'blur'}],
        }
        ,
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    },
    methods:{
      add:function () {
        this.$refs['shopKinds'].validate((valid)=> {
          if (valid) {
            axios.post("/api/addShopKinds", this.shopKinds).then(res => {
              if (res.data == 'success') {
                this.$message({
                  message: '恭喜你，新增成功',
                  type: 'success'
                });
                this.$router.push('/showKinds');
              }
              else {
                //            alert(res.data);
                this.$message.error('错了哦，新增失败');
              }
            })
          }else{
              return false;
          }
        })
      }
    }

  }

</script>

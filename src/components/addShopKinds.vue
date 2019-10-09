<template>

  <div class="hello" style="float: left;width: 400px;">
    <h3>{{ msg }}</h3>

    <el-form label-width="100px" style="margin-left: 100px">
      <el-form-item label="类别名称">
        <el-input class="arrow" name="skName" v-model="shopKinds.skName" style="width:300px"></el-input>
      </el-form-item>

      <el-row style="margin-right: 70px">
        <el-button type="primary" plain to="/add" @click="add()">确认</el-button>
      </el-row>
    </el-form>

  </div>
</template>

<script>
  import axios from 'axios'
  import ElUpload from "../../node_modules/element-ui/packages/upload/src/index";
  export default{
    components: {ElUpload},
    data(){
      return{
        msg: '新增类别',
        shopKinds:{

        },
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    },
    methods:{
      add:function () {
        axios.post("/api/addShopKinds",this.shopKinds).then(res=>{
          if(res.data=='success'){
            this.$router.push('/showKinds');
          }
          else {
            alert(res.data);
          }
        })
      }
    }

  }

</script>

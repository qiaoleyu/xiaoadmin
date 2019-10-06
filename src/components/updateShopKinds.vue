<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-radio-group size="small">
    </el-radio-group>
    <div style="margin: 20px;"></div>
    <el-form label-width="400px" style="margin-left: 100px">
      <el-input type="hidden" v-model="shopKinds.skId" name="skId"></el-input>
      <el-form-item label="类别名称">
        <el-input class="arrow" name="skName" v-model="shopKinds.skName" style="width: 40%;margin-right: 400px"></el-input>
      </el-form-item>
      <el-row style="height: 10px"></el-row>
      <el-row style="margin-right: 70px">
        <el-button type="primary" plain @click="updateShopKinds()">确认</el-button>
      </el-row>
    </el-form>

  </div>
</template>

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
alert(skId)
      axios.get("/api/findShopKindsById/"+skId).then(res=>{
        this.shopKinds=res.data;
      })
    },
    methods:{
      updateShopKinds:function () {
        axios.post("/api/updateShopKinds",this.shopKinds).then(r=>{
          if (r.data!=null){
            this.$router.push('/showKinds');
          }
        })
      }
    }
  }

</script>

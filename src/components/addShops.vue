<template>

  <div class="hello">
    <h1>{{ msg }}</h1>

    <el-radio-group size="small">
    </el-radio-group>
    <div style="margin: 20px;"></div>
    <el-form label-width="400px" style="margin-left: 100px">
      <el-form-item label="商品名称">
        <el-input class="arrow" name="shopName" v-model="shop.shopName" style="width: 40%;margin-right: 400px"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <input type="file" @change="getFile($event)" style="width: 40%;margin-right: 400px"></input>
      </el-form-item>
      <el-form-item label="商品单价">
        <el-input name="shopPrice" v-model="shop.shopPrice" style="width: 40%;margin-right: 400px"></el-input>
      </el-form-item>
      <el-form-item label="商品库存">
        <el-input name="shopRepertory" v-model="shop.shopRepertory" style="width: 40%;margin-right: 400px"></el-input>
      </el-form-item>
      <el-form-item label="生产日期">
        <el-date-picker name="productTime" v-model="shop.productTime" type="date" placeholder="选择日期" style="width: 40%;margin-right: 400px"></el-date-picker>
      </el-form-item>
      <el-form-item label="生产厂家">
        <el-input v-model="shop.factory" name="factory" style="width: 40%;margin-right: 400px">
        </el-input>
      </el-form-item>
      <el-form-item label="商品详情描述">
        <el-input v-model="shop.shopInfo" name="shopInfo" style="width: 40%;margin-right: 400px">
        </el-input>
      </el-form-item>
      <el-form-item label="商品类别">
        <el-input v-model="shop.skId" name="skId" style="width: 40%;margin-right: 400px">
        </el-input>
      </el-form-item>
      <el-row style="margin-right: 70px">
        <el-button type="primary" plain @click="addShops()">确认</el-button>
      </el-row>
    </el-form>

  </div>
</template>

<script>
  import axios from 'axios'
  import ElUpload from "../../node_modules/element-ui/packages/upload/src/index";
  export default{
    data(){
      return{
        msg: '新增商品',
        file:'',
        shop:{

        },
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    },
    methods:{
      getFile: function (event) {
        this.file = event.target.files[0];
        console.log(this.file);
      },

      /*submit: function (event) {
        //阻止元素发生默认的行为
        event.preventDefault();
        let formData = new FormData();
        formData.append("file", this.file);
        axios.post('api/upload', formData).then(function (r) {
          alert(r.data);
          window.location.reload();
        })
          .catch(function (error) {
            alert("上传失败");
            console.log(error);
            window.location.reload();
          });
      },*/

      addShops:function () {
        let formData = new FormData();
        formData.append("file", this.file);
        axios.post("/api/addShops",{shops:this.shop,file:formData}).then(res=>{
          window.location.reload();
          if(res.data!=null){
            this.$router.push('/shops');
          }
          else {
            alert("新增失败");
          }
        })
      }
    }

  }

</script>

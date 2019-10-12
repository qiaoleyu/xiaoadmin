<template>

  <div class="hello">
    <div style="width: 600px;margin: auto;height: 60px;line-height: 40px">
      <div style="width: 100px;margin: auto;float: left">商品小图:</div>
      <div style="width: 400px;margin: auto;float: left"><input type="file" @change="getFile($event)"></div>
      <div style="width: 100px;margin: auto;float: left"><el-button type="primary" round plain @click="upload()"  style="width: 100px">上传</el-button></div>
    </div>

    <div style="width: 600px;margin: auto;height: 60px;line-height: 40px">
      <div style="width: 100px;margin: auto;float: left">商品大图:</div>
      <div style="width: 400px;margin: auto;float: left"><input type="file" @change="getFile($event)"></div>
      <div style="width: 100px;margin: auto;float: left"><el-button type="primary" round plain @click="upload2()" style="width: 100px">上传</el-button></div>
    </div>

    <el-form label-width="100px" style="width: 600px;margin: auto;text-align: left">

      <el-form-item label="商品名称:">
        <el-input class="arrow" name="shopName" v-model="shop.shopName" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="商品小图:">
        <img :src="shop.shopPic" v-model="shop.shopPic" name="shopPic" width="40" height="40" class="pic"/>
      </el-form-item>
      <el-form-item label="商品大图:">
        <img :src="shop.shopBigPic" v-model="shop.shopBigPic" name="shop.shopBigPic" width="40" height="40" class="pic"/>
      </el-form-item>
      <el-form-item label="商品单价:">
        <el-input name="shopPrice" v-model="shop.shopPrice" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="商品库存:">
        <el-input name="shopRepertory" v-model="shop.shopRepertory" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="生产日期：">
        <el-date-picker name="productTime" v-model="shop.productTime" type="date" placeholder="选择日期" style="width: 500px"></el-date-picker>
      </el-form-item>
      <el-form-item label="生产厂家：">
        <el-input v-model="shop.factory" name="factory" style="width: 500px">
        </el-input>
      </el-form-item>
      <el-form-item label="商品详情描述:">
        <el-input v-model="shop.shopInfo" name="shopInfo" style="width: 500px">
        </el-input>
      </el-form-item>
      <el-form-item label="商品类别:">
        <el-select v-model="shop.skId" placeholder="请选择" style="width: 500px">
          <el-option
            v-for="item in shopKinds"
            :key="item.skId"
            :label="item.skName"
            :value="item.skId">
          </el-option>
        </el-select>
        <!--<el-input v-model="shop.skId" name="skId" style="width: 40%;margin-right: 400px">
        </el-input>-->
      </el-form-item>
      <el-form-item style="height: 60px;width: 200px;margin: auto">
        <el-button type="primary" round plain style="width: 100px" @click="addShops()">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import ElUpload from "../../node_modules/element-ui/packages/upload/src/index";
  import ElInput from "../../node_modules/element-ui/packages/input/src/input";
  export default{
    components: {ElInput},
    data(){
      return{
        file:'',
        shop:{
            shopPic:'',
            shopBigPic:''
        },
        shopKinds:[],
//        skId:'',
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    },mounted(){
      var url = "api/show1";
      axios.get(url).then(res => {
          this.shopKinds = res.data;
      })
    },
    methods:{
      getFile: function (event) {
        this.file = event.target.files[0];
        console.log(this.file);
      },
      upload:function () {
        let formData = new FormData();
        formData.append("file", this.file);
        axios.post("/api/upload",formData).then(res=>{
          //window.location.reload();
          console.log(res.data)
          if(res.data!="fail"){
            this.shop.shopPic=res.data;
//            alert(this.shop.shopPic)
          }
          else {
            alert(res.data);
          }
        })
      },
      upload2:function () {
        let formData = new FormData();
        formData.append("file", this.file);
        axios.post("/api/upload",formData).then(res=>{
          //window.location.reload();
          console.log(res.data)
          if(res.data!="fail"){
            this.shop.shopBigPic=res.data;
//            alert(this.shop.shopBigPic)
          }
          else {
            alert(res.data);
          }
        })
      },
      addShops:function () {

        axios.post("/api/addShops",this.shop).then(res=>{
          if(res.data==1){
            this.$message({
              message: '恭喜你，新增成功',
              type: 'success'
            });
            this.$router.push('/shops');
          }else {
//            alert("新增失败");
            this.$message.error('错了哦，新增失败');

          }
        })
      }
    }

  }

</script>

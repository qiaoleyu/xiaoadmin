<template>

  <div class="hello">

    <el-form label-width="100px" style="width: 600px;margin: auto;text-align: left">
      <el-form-item label="商品名称:">
        <el-input class="arrow" name="shopName" v-model="shop.shopName" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="商品小图:">
        <el-upload
          class="avatar-uploader"
          action="api/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="shop.shopPic" :src="shop.shopPic" name="shopPic" width="80px" height="80px" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品大图:">
        <el-upload
          class="avatar-uploader"
          action="api/upload"
          :show-file-list="false"
          :on-success="AvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="shop.shopBigPic" :src="shop.shopBigPic" name="shopBigPic" width="80px" height="80px" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品单价:">
        <el-input name="shopPrice" v-model="shop.shopPrice" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="商品库存:">
        <el-input name="shopRepertory" v-model="shop.shopRepertory" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="生产日期:">
        <el-date-picker name="productTime" v-model="shop.productTime" type="date" placeholder="选择日期" style="width: 500px"></el-date-picker>
      </el-form-item>
      <el-form-item label="生产厂家:">
        <el-input v-model="shop.factory" name="factory" style="width: 500px">
        </el-input>
      </el-form-item>
      <el-form-item label="商品详情描述:">
        <el-input v-model="shop.shopInfo" name="shopInfo" style="width: 500px">
        </el-input>
      </el-form-item>
      <el-form-item label="商品类别:">
        <el-select v-model="shop.skId" name="skId" placeholder="请选择" style="width: 500px">
          <div  v-for="(shopKinds,index) in shopKinds">
            <span v-if="shop.skId==shopKinds.skId">{{shopKinds.skName}}</span>
          </div>
          <el-option
            v-for="item in shopKinds"
            :key="item.skId"
            :label="item.skName"
            :value="item.skId">
          </el-option>
        </el-select>
        <!--<el-input v-model="shop.skId" name="skId" style="width: 40%;margin-right: 400px">
          <span>{{shopKind}}</span>
        </el-input>-->
      </el-form-item>
      <el-form-item style="height: 60px;width: 200px;margin: auto">
        <el-button type="primary" round plain style="width: 100px" @click="updateShops()">确认</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import axios from 'axios'
  import ElUpload from "../../node_modules/element-ui/packages/upload/src/index";
  export default{
    data(){
      return{
        msg: '修改商品',
        file:'',
        shop:{

        },
        shopKinds:[],
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    },
    mounted:function () {
      this.query2();
      this.query();
    },

    methods:{
        query2:function () {
          var shopId=this.$route.params.shopId;
//      alert(shopId)
          axios.get("/api/findShopsById/"+shopId).then(res=>{
            this.shop=res.data;
          })
        },
      query:function () {
        axios.get("api/show1").then(res => {
          this.shopKinds = res.data;
        })
      },
      handleAvatarSuccess(res, file) {
        this.shop.shopPic = res;
      },
      AvatarSuccess(res, file) {
        this.shop.shopBigPic = res;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      updateShops:function () {
        axios.post("/api/updateShops",this.shop).then(res=>{
          if (res.data==1){
            this.$router.push('/shops');
          }else{
              alert("修改失败")
          }
        })
      }
    }

  }

</script>

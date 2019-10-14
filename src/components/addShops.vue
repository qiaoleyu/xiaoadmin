<template>

  <div class="hello">
    <el-form :model="shop" status-icon :rules="rules" ref="shop" label-width="100px" style="width: 600px;margin: auto;text-align: left">
      <h2 style="width: 200px;height: 20px;line-height: 20px;margin: auto;margin-bottom: 20px">{{ msg }}</h2>
      <el-form-item label="商品名称:" prop="shopName">
        <el-input class="arrow" name="shopName" v-model="shop.shopName" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="商品小图:" prop="shopPic">
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
      <el-form-item label="商品大图:" prop="shopBigPic">
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
      <el-form-item label="商品单价:" prop="shopPrice">
        <el-input name="shopPrice" v-model="shop.shopPrice" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="商品库存:" prop="shopRepertory">
        <el-input name="shopRepertory" v-model="shop.shopRepertory" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="生产日期:" prop="productTime">
        <el-date-picker name="productTime" v-model="shop.productTime" type="date" placeholder="选择日期" style="width: 500px"></el-date-picker>
      </el-form-item>
      <el-form-item label="生产厂家:" prop="factory">
        <el-input v-model="shop.factory" name="factory" style="width: 500px">
        </el-input>
      </el-form-item>
      <el-form-item label="商品详情:" prop="shopInfo">
        <el-input v-model="shop.shopInfo" name="shopInfo" style="width: 500px">
        </el-input>
      </el-form-item>
      <el-form-item label="商品类别:" prop="skId">
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

<style>
  .el-form-item__error{

  }
</style>
<script>
  import axios from 'axios'
  import ElUpload from "../../node_modules/element-ui/packages/upload/src/index";
  import ElInput from "../../node_modules/element-ui/packages/input/src/input";
  export default{
    components: {ElInput},
    data(){
      var checkshopName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('商品名称不能为空'));
        }else{
          return callback();
        }
      };
      var checkshopPic = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('商品图片不能为空'));
        }else{
          return callback();
        }
      };
      var checkshopBigPic = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('商品大图不能为空'));
        }else{
          return callback();
        }
      };
      var checkshopPrice = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('商品价格不能为空'));
        }else{
          return callback();
        }
      };
      var checkshopRepertory = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('商品库存不能为空'));
        }else{
          return callback();
        }
      };
      var checkproductTime = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('生产日期不能为空'));
        }else{
          return callback();
        }
      };
      var checkfactory = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('生产厂家不能为空'));
        }else{
          return callback();
        }
      };
      var checkshopInfo = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('商品描述不能为空'));
        }else{
          return callback();
        }
      };
      var checkskId = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('商品类别不能为空'));
        }else{
          return callback();
        }
      };
      return{

          msg:'商品添加页面',
        file:'',
        shop:{
              shopName:'',
              shopPrice:'',
          shopRepertory:'',
              factory:'',
            shopPic:'',
            shopBigPic:'',
          productTime:'',
          shopInfo:'',
          skId:''
        },
        rules:{
          shopName: [{ validator: checkshopName, trigger: 'blur' }],
          shopPrice: [{ validator: checkshopPrice, trigger: 'blur' }],
          shopRepertory: [{ validator: checkshopRepertory, trigger: 'blur' }],
          factory: [{ validator: checkfactory, trigger: 'blur' }],
          shopPic: [{ validator: checkshopPic, trigger: 'blur' }],
          shopBigPic: [{ validator: checkshopBigPic, trigger: 'blur' }],
          productTime: [{ validator: checkproductTime, trigger: 'blur' }],
          shopInfo: [{ validator: checkshopInfo, trigger: 'blur' }],
          skId: [{ validator: checkskId, trigger: 'blur' }],
        }
        ,
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
      addShops:function () {
        this.$refs['shop'].validate((valid)=> {
          if (valid) {
            axios.post("/api/addShops", this.shop).then(res => {
              if (res.data == 1) {
                this.$message({
                  message: '恭喜你，新增成功',
                  type: 'success'
                });
                this.$router.push('/shops');
              } else if (res.data == 0) {
                this.$message.error('错了哦，您没有修改权限');
                this.$router.push('/unauth')

              }else {
                //            alert("新增失败");
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

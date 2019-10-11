<template>
  <div class="hello" style="width: 100%;margin: auto">

     <div style="width: 900px;;height: 80px;margin: auto">
       <!--<div style="float: left;width: 200px;height: 80px;line-height: 50px">-->
         <!--<h1 style="text-align: left">{{ msg }}</h1>-->
       <!--</div>-->
       <div style="float: left;width: 900px;height: 80px;line-height: 90px">
       <template>
         <el-select v-model="value" placeholder="请选择">
           <el-option
             v-for="item in options"
             :key="item.value"
             :label="item.label"
             :value="item.value">
           </el-option>
         </el-select>
       </template>
      <el-input type="text" style="width: 200px;height: 40px"
                v-model="input" placeholder="输入要查询内容"></el-input>
       <el-button plain type="primary" style="width: 80px;height: 40px" @click="search()">查询</el-button>
         <template>
           <el-select v-model="name" placeholder="请选择">
             <el-option
               v-for="item in orderBy"
               :key="item.name"
               :label="item.info"
               :value="item.name">
             </el-option>
           </el-select>
         </template>
         <el-button plain type="primary" style="width: 80px;height: 40px" @click="orderShops()">排序
         </el-button>
       </div>
     </div>


    <el-button type="primary" round @click="toinsert()">增加权限</el-button>
    <el-table :data="shops" stripe style="width: 100%;">
      <el-table-column prop="shopId" label="编号" width="60"> </el-table-column>

      <el-table-column label="图片" width="100" >
        <template slot-scope="scope">
          <img :src="scope.row.shopPic" width="40" height="40" class="pic"/>
        </template>
      </el-table-column>

      <el-table-column prop="shopName" label="商品名称" width="120"></el-table-column>
      <el-table-column prop="shopPrice" label="商品单价" width="80"></el-table-column>
      <el-table-column prop="shopNumber" label="商品销量" width="80"> </el-table-column>
      <el-table-column prop="shopRepertory" label="商品库存" width="80px"></el-table-column>
      <el-table-column prop="productTime" label="生产日期" width="100"></el-table-column>
      <el-table-column prop="factory" label="生产厂家" width="100"></el-table-column>
      <el-table-column prop="shopInfo" label="商品详情描述" width="150"></el-table-column>
      <el-table-column prop="skId" label="商品类别">
        <template slot-scope="scope">
          <div  v-for="(shopKinds,index) in shopKinds">
            <span v-if="scope.row.skId==shopKinds.skId">{{shopKinds.skName}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <el-button-group slot-scope="scope">
          <el-button type="primary" plain icon="el-icon-edit" @click="toupdate(scope.row.shopId)"></el-button>
          <el-button type="primary" plain icon="el-icon-delete" @click="deleteUser(scope.row.shopId)"></el-button>
        </el-button-group>
      </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next" :page-size="this.params.size" v-on:current-change="changePage"
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
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  export default {
    components: {
      ElButton,
      ElInput,
      ElRow},
    name: 'shops',
    data (){
      return {
        input:'',
        msg: '商品信息展示',
        shops:[],
        shopKinds:[],
        total:0,
        params:{
          size:8,
          page:1,
        },
        orderBy:[{
          name: 'shopPrice',
          info: '商品价格'
          }, {
          name: 'shopNumber',
          info: '商品销量'
          }, {
          name: 'skName',
          info: '商品类别'
          }],
        options: [{
          value: 'shopName',
          label: '商品名称'
        }, {
          value: 'shopInfo',
          label: '商品描述'
        }],
        value: '',
        name:''
      }

    },
    mounted(){
      this.queryShopKinds();
        this.queryShops();
    },
    methods:{

      search:function () {
          axios.post("api/findByValues/"+this.params.page+"/"+this.params.size,{value:this.value,name:this.input}).then(res=>{
              if (res.data!=null){
                this.shops = res.data.list;
                this.total=res.data.total;
              }else {
                  alert("无此类商品")
              }
          })
        },
      orderShops:function () {
          console.log(this.name);
        axios.post("api/orderShops/"+this.params.page+"/"+this.params.size+"/"+this.name).then(res=>{
            if (res.data!=null){
              this.shops = res.data.list;
              this.total=res.data.total;
            }else {
              alert("无此类商品")
            }
        })

      },

      toinsert:function () {

        axios.get("api/unauth").then(res=>{
          if(res.data==1){
            this.$router.push('/addShops');
          }if(res.data==0) {
            this.$router.push('/unauth')
          }
        })
      },
      toupdate:function (shopId) {

        axios.get("api/unauth").then(res=>{
          if(res.data==1){
            this.$router.push({path:'/updateShops/'+shopId})
          }if(res.data==0) {
            this.$router.push('/unauth')
          }
        })
      },
      deleteUser:function (shopId) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get("/api/deleteShops/"+shopId).then(res=>{
            if(res.data==1){
              this.queryShops();
            }else if(res.data==0) {
              this.$router.push('/unauth')
            }


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
        if (this.value!=''&& this.input!=''){
          this.search();
        }else if (this.name!='') {
            this.orderShops();
        }else{
          this.queryShops();
        }
      },
      queryShops:function() {
        var url = "api/findAllShops/"+this.params.page+"/"+this.params.size;
        axios.get(url).then(res => {
          this.shops = res.data.list;
          this.total=res.data.total;
        })
      },
      queryShopKinds:function() {
        var url = "api/show1";
        axios.get(url).then(res => {
          this.shopKinds = res.data;
        })
      }
    }
  }
</script>

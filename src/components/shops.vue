<template>
  <div class="hello" style="width: 95%;margin: auto">

     <div style="width: 800px;;height: 80px;margin: auto">
       <div style="float: left;width: 200px;height: 80px">
         <h1 style="text-align: left">{{ msg }}</h1>
       </div>
       <div style="float: left;width: 600px;height: 80px;line-height: 90px">
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
                v-model="input"></el-input>
       <el-button plain type="primary" style="width: 80px;height: 40px">查询
       </el-button>
       </div>
     </div>



    <el-table :data="shops" stripe style="width: 100%;">
      <el-table-column prop="shopId" label="商品编号" width="80"> </el-table-column>

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
      <el-table-column prop="shopInfo" label="商品详情描述"></el-table-column>
      <el-table-column prop="skId" label="商品类别">
        <template slot-scope="scope">
          <div  v-for="(shopKinds,index) in shopKinds">
            <span v-if="scope.row.skId==shopKinds.skId">{{shopKinds.skName}}</span>
          </div>
        </template>

      </el-table-column>
      <el-table-column label="操作" width="180">
        <el-button-group slot-scope="scope">
          <el-button type="primary" plain icon="el-icon-edit" @click="toupdate(scope.row.shopId)"></el-button>
          <el-button type="primary" plain icon="el-icon-delete" @click="deleteUser(scope.row.shopId)"></el-button>
        </el-button-group>
      </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next" :page-size="this.params.size" v-on:current-change="changePage"
                   :total="total" :current-page="this.params.page"></el-pagination>

    <el-row style="height: 20px"></el-row>

    <el-row>
      <el-button type="primary" plain @click="toinsert()">新增</el-button>
    </el-row>

  </div>
</template>

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
        options: [{
          value: 'shopNmae',
          label: '商品名称'
        }, {
          value: 'shopPrice',
          label: '商品价格'
        }, {
          value: 'shopInfo',
          label: '商品描述'
        }, {
          value: 'shopNumber',
          label: '商品销量'
        }, {
          value: 'skNmae',
          label: '商品类别'
        }],
        value: ''
      }

    },
    mounted(){
      this.query();

    },
    methods:{
      toinsert:function () {
        this.$router.push('/addShops');
      },
      toupdate:function (shopId) {
        this.$router.push({path:'/updateShops/'+shopId})
      },
      deleteUser:function (shopId) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get("/api/deleteShops/"+shopId).then(res=>{

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
        var url = "api/findAllShops/"+this.params.page+"/"+this.params.size;
        axios.get(url).then(res => {
          this.shops = res.data.list;
          this.total=res.data.total;
          this.shopKinds=res.data.shopKindsList;
        })
      }
    }
  }
</script>

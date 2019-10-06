<template>
  <div style="width: 95%;margin: auto">
    <span style="font-size: 36px;font-weight: bolder">{{msg}}</span>
    <br>
    <br>
    <el-container>
      <el-header>
        <el-breadcrumb separator-class="iconfont el-icon-arrow-right" style="margin-left: 120px;line-height: 60px;width: 600px;float: left;font-size: 16px">
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;line-height: 60px;float: left">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>
          <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '' }">用户管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '' }">商品管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '' }">角色管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '' }"></el-breadcrumb-item>
        </el-breadcrumb>

        <div style="width: 400px;text-align: right;float: right;margin-right: 40px">
        <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
        <el-dropdown-item class="el-icon-delete">注销</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
        <span class="el-icon-s-custom">王小虎</span>
        </div>
      </el-header>

      <!--<el-container>-->

        <!--<template >-->
          <!--<el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">-->

          <!--</el-radio-group>-->

          <!--<el-tabs :tab-position="tabPosition" >-->
            <!--<el-tab-pane label="用户管理" style="font-size: 16px">-->
             <!--&lt;!&ndash;用户管理&ndash;&gt;-->
              <!--<div style="background-color: yellow;width: 1200px;height: 600px">用户管理</div>-->
            <!--</el-tab-pane>-->
            <!--<el-tab-pane label="商品管理" style="font-size: 16px">-->
              <!--<div style="background-color: yellow;width: 1200px;height: 600px">商品管理</div>-->
            <!--</el-tab-pane>-->
            <!--<el-tab-pane label="角色管理" style="font-size: 16px">-->
              <!--<div style="background-color: yellow;width: 1200px;height: 600px">角色管理</div>-->
            <!--</el-tab-pane>-->
          <!--</el-tabs>-->
        <!--</template>-->




        <el-container style="height: 500px; border: 1px solid #eee">
          <el-aside width="200px" style="background-color: rgb(238, 241, 246)">


            <el-menu :default-active="this.$route.path"
                     class="el-menu-vertical-demo"
                     @open="handleOpen"
                     @close="handleClose"
                     :collapse="isCollapse" background-color="#545c64"
                     text-color="#fff"
                     active-text-color="#ffd04b"
                     router>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-message"></i>
                  <span slot="title">角色管理</span>
                </template>
                <el-menu-item-group>
                  <span slot="title">权限设置</span>
                  <el-menu-item index="1-1" class="el-icon-document">查看</el-menu-item>
                  <el-menu-item index="1-2" class="el-icon-circle-plus">添加</el-menu-item>
                  <el-menu-item index="1-3" class="el-icon-edit">修改</el-menu-item>
                  <el-menu-item index="1-4" class="el-icon-delete">删除</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="管理员维护">
                  <el-menu-item index="1-5" class="el-icon-document">查看</el-menu-item>
                  <el-menu-item index="1-6" class="el-icon-circle-plus">添加</el-menu-item>
                  <el-menu-item index="1-7" class="el-icon-delete">删除</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span slot="title">用户管理</span>
                </template>
                <el-menu-item-group>
                  <span slot="title">权限设置</span>
                  <el-menu-item index="2-1" class="el-icon-circle-plus">信息维护</el-menu-item>
                  <el-menu-item index="2-2" class="el-icon-edit">修改密码</el-menu-item>
                  <el-menu-item index="2-3" class="el-icon-delete">注销账户</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span slot="title">商品管理</span>
                </template>
                <el-menu-item-group>
                  <span slot="title">类别管理</span>
                  <el-menu-item index="3-1" class="el-icon-document">查看</el-menu-item>
                  <el-menu-item index="3-2" class="el-icon-circle-plus">添加</el-menu-item>
                  <el-menu-item index="3-3" class="el-icon-edit">修改</el-menu-item>
                  <el-menu-item index="3-4" class="el-icon-delete">删除</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <span slot="title">商品管理</span>
                  <el-menu-item index="3-5" class="el-icon-document">查看</el-menu-item>
                  <el-menu-item index="3-6" class="el-icon-circle-plus">添加</el-menu-item>
                  <el-menu-item index="3-7" class="el-icon-edit">修改</el-menu-item>
                  <el-menu-item index="3-8" class="el-icon-delete">删除</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>

            <!--<el-menu :default-openeds="['1', '3']">-->
              <!--<el-submenu index="1">-->
                <!--<template slot="title"><i class="el-icon-message"></i>角色管理</template>-->
                <!--<el-menu-item-group>-->
                  <!--<template slot="title">权限设置</template>-->
                  <!--<el-menu-item index="1-1" class="el-icon-document">查看</el-menu-item>-->
                  <!--<el-menu-item index="1-2" class="el-icon-delete">删除</el-menu-item>-->
                  <!--<el-menu-item index="1-3" class="el-icon-circle-plus">添加</el-menu-item>-->
                  <!--<el-menu-item index="1-4" class="el-icon-edit">修改</el-menu-item>-->
                <!--</el-menu-item-group>-->
                <!--<el-menu-item-group>-->
                  <!--<template slot="title">普通管理员</template>-->
                  <!--<el-menu-item index="1-5" class="el-icon-document">查看</el-menu-item>-->
                  <!--<el-menu-item index="1-6" class="el-icon-delete">删除</el-menu-item>-->
                  <!--<el-menu-item index="1-7" class="el-icon-circle-plus">添加</el-menu-item>-->
                  <!--<el-menu-item index="1-8" class="el-icon-edit">修改</el-menu-item>-->

                <!--</el-menu-item-group>-->
              <!--</el-submenu>-->
              <!--<el-submenu index="2">-->
                <!--<template slot="title"><i class="el-icon-menu"></i>用户管理</template>-->
                <!--<el-menu-item-group>-->
                  <!--&lt;!&ndash;<template slot="title">信息维护</template>&ndash;&gt;-->
                  <!--<el-menu-item index="2-1" class="el-icon-edit">修改密码</el-menu-item>-->
                  <!--&lt;!&ndash;<el-menu-item index="2-2" class="el-icon-delete">注销</el-menu-item>&ndash;&gt;-->
                <!--</el-menu-item-group>-->
              <!--</el-submenu>-->
              <!--<el-submenu index="3">-->
                <!--<template slot="title"><i class="el-icon-setting"></i>商品管理</template>-->
                <!--<el-menu-item-group>-->
                  <!--<template slot="title">类别管理</template>-->
                  <!--<el-menu-item index="3-1" class="el-icon-document">查看</el-menu-item>-->
                  <!--<el-menu-item index="3-2" class="el-icon-circle-plus">添加</el-menu-item>-->
                  <!--<el-menu-item index="3-3" class="el-icon-edit">修改</el-menu-item>-->
                  <!--<el-menu-item index="3-4" class="el-icon-delete">删除</el-menu-item>-->

                <!--</el-menu-item-group>-->
                <!--<el-menu-item-group >-->
                  <!--<template slot="title">商品管理</template>-->
                  <!--<el-menu-item index="3-5" class="el-icon-document">查看</el-menu-item>-->
                  <!--<el-menu-item index="3-6" class="el-icon-circle-plus">添加</el-menu-item>-->
                  <!--<el-menu-item index="3-7" class="el-icon-edit">修改</el-menu-item>-->
                  <!--<el-menu-item index="3-8" class="el-icon-delete">删除</el-menu-item>-->
                <!--</el-menu-item-group>-->
              <!--</el-submenu>-->
            <!--</el-menu>-->
          </el-aside>

          <!--<el-container>-->
            <!--&lt;!&ndash;<el-header style="text-align: right; font-size: 12px">&ndash;&gt;-->
              <!--&lt;!&ndash;<el-dropdown>&ndash;&gt;-->
                <!--&lt;!&ndash;<i class="el-icon-setting" style="margin-right: 15px"></i>&ndash;&gt;-->
                <!--&lt;!&ndash;<el-dropdown-menu slot="dropdown">&ndash;&gt;-->
                  <!--&lt;!&ndash;<el-dropdown-item>注销</el-dropdown-item>&ndash;&gt;-->
                <!--&lt;!&ndash;</el-dropdown-menu>&ndash;&gt;-->
              <!--&lt;!&ndash;</el-dropdown>&ndash;&gt;-->
              <!--&lt;!&ndash;<span>王小虎</span>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-header>&ndash;&gt;-->

            <el-main>
              <el-table :data="tableData">
                <el-table-column prop="date" label="日期" width="140">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
              </el-table>
            </el-main>
          </el-container>
        <!--</el-container>-->
      <!--</el-container>-->
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>


<style>

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }


  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  body{
    font-size: 16px;
  }

</style>

<script>
  import axios from 'axios'
  import ElFooter from "../../node_modules/element-ui/packages/footer/src/main";
  import ElRadioButton from "../../node_modules/element-ui/packages/radio/src/radio-button";
  export default{
    components: {
      ElRadioButton,
      ElFooter},
    data(){
          return{
              msg:'Welcome to 后台管理界面',
            tabPosition: 'left',
            isCollapse: true
          }
      },methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

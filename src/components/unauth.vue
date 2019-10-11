<template>
 <div>
   <h1>对不起，您没有该权限</h1>
   <el-button type="primary" round @click="toAdmin()">返回主界面</el-button>
 </div>
</template>

<script>
  export default{
    data(){
      return{

      }
    },
    methods:{
      toAdmin:function () {
        this.$router.push('/admin')
      }
    }
  }
</script>

<template>

  <div class="hello">
    <h2 style="font-weight: 600">{{msg}}</h2>
    <el-form :model="permission" status-icon :rules="rules" ref="permission"  label-width="100px" style="width: 600px;margin: auto;text-align: left">

      <el-form-item label="权限名称:" prop="pname">
        <el-input v-model="permission.pname" name="pname" style="width: 400px">
        </el-input>
      </el-form-item>
      <el-form-item label="权限信息:" prop="pinfo">
        <el-input v-model="permission.pinfo" name="pinfo" style="width: 400px">
        </el-input>
      </el-form-item>
      <el-form-item label="角色名称:" prop="rid">
        <el-select v-model="permission.rid" placeholder="请选择" style="width: 400px">
          <el-option
            v-for="item in roles"
            :key="item.rid"
            :label="item.rname"
            :value="item.rid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="height: 60px;width: 200px;margin: auto;margin-left:150px ">
        <el-button type="primary" round plain style="width: 100px" @click="addPermission()">确认</el-button>
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
      var checkpName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('权限名称不能为空'));
        }else{
          return callback();
        }
      };
      var checkpInfo = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('权限信息不能为空'));
        }else{
          return callback();
        }
      };
      var checkRid = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('角色名称不能为空'));
        }else{
          return callback();
        }
      };
      return{
        msg:"权限新增页面",
        roles:[],
        permission:{
          pname:'',
          pinfo:'',
          rid:''
        },rules:{
          pname: [{ validator: checkpName, trigger: 'blur' }],
          pinfo: [{ validator: checkpInfo, trigger: 'blur' }],
          rid: [{ validator: checkRid, trigger: 'blur' }],
        }
      }
    },mounted(){
      var url = "api/findAllRoles";
      axios.get(url).then(res => {
          this.roles = res.data;
      })
    },
    methods:{
      addPermission:function () {
          console.log(this.permission)
        this.$refs['permission'].validate((valid)=> {
          if (valid) {
            axios.post("/api/addPermission", this.permission).then(res => {
              if (res.data == 1) {
                this.$message({
                  message: '恭喜你，新增成功',
                  type: 'success'
                });
                this.$router.push('/permission');
              } else if (res.data == 0) {
                this.$message.error('错了哦，您没有修改权限');
                this.$router.push('/unauth')

              } else {
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

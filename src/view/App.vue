<template>
    <div id="app">
    <!-- 头部导航 -->
        <nvHead></nvHead>
         <div class="main">
           <el-row>
            <el-col :span="24">
              <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="1">处理中心</el-menu-item>
              <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
              </el-submenu>
              <el-menu-item index="3">订单管理</el-menu-item>
            </el-menu>
          </el-col>
          </el-row> 
                <!-- 左侧导航 -->
            <el-row>
              <el-col :span="6">
           
                    <div class="leftc">
                    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
                      <el-submenu index="1">
                        <template slot="title">导航一</template>
                        <el-menu-item-group title="分组一">
                          <el-menu-item index="1-1">选项1</el-menu-item>
                          <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                          <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                          <template slot="title">选项4</template>
                          <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                      </el-submenu>
                      <el-menu-item index="2">导航二</el-menu-item>
                      <el-menu-item index="3">导航三</el-menu-item>
                    </el-menu>
                  </div>
             </el-col>
              <el-col :span="18">
                <div class="grid-content bg-purple-light">
                    <router-view></router-view>
                   <!--  <router-link to="/activePublic">Go to Foo</router-link> -->
                </div>
              </el-col>
            
            </el-row>
          </div>
      </div>
  </div>
</template>

  

<script type="text/javascript">
    import nvHead from '../components/Header.vue';
    export default {
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      }
    },
     components: {
       nvHead   
    }
  };
</script>
</script>

<style>
  .main{
    margin-top: 36px;
  }
  body{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  .leftc{
    background-color: #324057;;
  }
</style>



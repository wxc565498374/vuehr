<template>
  <el-container>
    <el-header class="homeHeader">
      <div class="title">
        微人事
      </div>
      <el-dropdown class="userInfo" @command="handleCommand">
        <span class="el-dropdown-link">
          {{user.name}}<i><img :src="user.userface" alt=""></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
          <el-dropdown-item command="setting">设置</el-dropdown-item>
          <el-dropdown-item divided command="logout">注销登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: #222d32;margin-bottom: -200px">
<!--        <el-menu router>-->
<!--          <el-submenu index="1">-->
<!--            <template slot="title">-->
<!--              <i class="el-icon-location"></i>-->
<!--              <span>导航一</span>-->
<!--            </template>-->
<!--            <el-menu-item index="/test1">选项1</el-menu-item>-->
<!--            <el-menu-item index="/test2">选项2</el-menu-item>-->
<!--          </el-submenu>-->
<!--        </el-menu>-->
        <el-menu router unique-opened
                 background-color="#222d32"
                 text-color="#fff"
                 active-text-color="#ffd04b">
          <!--  this.$router.options.routes     使用的是router中的路由   -->
          <el-submenu :index="index+''" v-for="(item,index) in routes" v-if="!item.hidden" :key="index">
            <template slot="title">
              <i style="color: #409eff;margin-right: 5px" :class="item.iconCls"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item :index="child.path" v-for="(child,indexj) in item.children" :key="indexj">
              {{child.name}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="homeWelcome" v-if="this.$router.currentRoute.path=='/home'">
          欢迎来到微人事！
        </div>
        <router-view class="homeRouterView"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user"))
    }
  },
  computed:{
    routes(){
      return this.$store.state.routes;
    }
  },
  methods:{
    handleCommand(cmd){
      if (cmd=='logout'){
        this.$confirm('此操作将注销操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getRequest("/logout");
          window.sessionStorage.removeItem("user");
          // 注销移除store路由数据，否则其他用户登陆同一台电脑会看到上个人的菜单数据，刷新后正常显示
          this.$store.commit("initRoutes", []);
          this.$router.replace("/")
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }
    }
  }
}
</script>

<style>

   .homeRouterView{
     margin-top: 10px;
   }
   .homeWelcome{
     text-align: center;
     color: #409eff;
     font-size: 40px;
     font-family: 华文行楷;
     padding-top: 50px;
   }

  .homeHeader{
    background-color: #3c8dbc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 15px;
    box-sizing: border-box;
  }

  .homeHeader .title {
    font-size: 30px;
    font-family: 华文行楷;
    color: #ffffff
  }

  .homeHeader .userInfo {
    cursor: pointer;
  }

  .el-dropdown-link img {
    width: 48px;
    height: 48px;
    border-radius: 24px;
    margin-left: 8px;
  }

  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
</style>

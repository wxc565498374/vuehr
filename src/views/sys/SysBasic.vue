<template>
  <div>
    <el-tabs v-model="activeName" type="card" >
      <el-tab-pane label="部门管理" name="first"><DepMana></DepMana></el-tab-pane>
      <el-tab-pane label="职位管理" name="second"><PosMana></PosMana></el-tab-pane>
      <el-tab-pane label="职称管理" name="third"><JobLevel></JobLevel></el-tab-pane>
      <el-tab-pane label="奖惩管理" name="fourth"><EcMana></EcMana></el-tab-pane>
      <el-tab-pane label="权限组" name="fourth2"><PermMana></PermMana></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import DepMana from "@/components/sys/basic/DepMana";
  import EcMana from "@/components/sys/basic/EcMana";
  import JobLevel from "@/components/sys/basic/JobLevel";
  import PosMana from "@/components/sys/basic/PosMana";
  import PermMana from "@/components/sys/basic/PermMana";
export default {
  name: "SysBasic",
  data(){
    return{
      activeName: 'second'
    }
  },
  components: {
    DepMana,
    EcMana,
    JobLevel,
    PosMana,
    PermMana
  }
}
</script>

<style scoped>

</style>

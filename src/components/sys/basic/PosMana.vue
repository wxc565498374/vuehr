<template>
  <div>
    <div>
      <el-input
          class="posInput"
          size="small"
          placeholder="添加职位"
          prefix-icon="el-icon-circle-plus"
          v-model="pos.name">
      </el-input>
      <el-button icon="el-icon-circle-plus" size="small" type="primary">添加</el-button>
    </div>
    <div class="posMain">
      <el-table
          :data="positions"
          border
          stripe
          size="small"
          style="width: 100%">
        <el-table-column
            prop="id"
            label="编号"
            width="60">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="120">
        </el-table-column>
        <el-table-column
            prop="createDate"
            label="创建时间"
            width="250">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "PosMana",
  data(){
    return {
      pos:{
        name:''
      },
      positions: []
    }
  },
  mounted() {
    this.initPositions();
  },
  methods:{
    initPositions(){
      this.getRequest("/system/basic/pos/").then(resp=>{
        this.positions = resp;
      })
    }
  }
}
</script>

<style>
  .posInput{
    width: 300px;margin-right: 8px
  }

  .posMain{
    margin-top: 10px;
  }
</style>

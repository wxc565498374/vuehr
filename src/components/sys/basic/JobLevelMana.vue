<template>
  <div>
    <div>
      <el-input
          class="posInput"
          size="small"
          placeholder="添加职称.."
          prefix-icon="el-icon-circle-plus"
          v-model="jl.name"
          @keydown.enter.native="addPosition">
      </el-input>
      <el-select v-model="jl.titleLevel" placeholder="职称等级" size="small">
        <el-option
            v-for="item in selectJobLevels"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select>
      <el-button icon="el-icon-circle-plus"
                 size="small"
                 type="primary"
                 style="margin-left: 8px"
                 @click="addPosition">添加</el-button>
    </div>
    <div class="posMain">
      <el-table
          :data="jobLevels"
          border
          stripe
          size="small"
          style="width: 100%"
          v-loading="loading"
          element-loading-text="加载中..."
          element-loading-spinner="el-icon-loading"
          element-loading-background="255,255,255,0"
          @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="id"
            label="编号"
            width="60">
        </el-table-column>
        <el-table-column
            prop="name"
            label="职称"
            width="120">
        </el-table-column>
        <el-table-column
            prop="titleLevel"
            label="职级"
            width="120">
        </el-table-column>
        <el-table-column
            prop="createDate"
            label="创建时间"
            width="180">
        </el-table-column>
        <el-table-column
            label="是否启用"
            width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.enabled" type="success">已启用</el-tag>
            <el-tag v-else type="danger">未启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="showEditView(scope.$index, scope.row)">编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="danger" size="small" style="margin-top: 10px" :disabled="multipleSelection.length==0" @click="deleteBatch">批量删除</el-button>
    </div>

    <el-dialog
        title="修改职称"
        :visible.sync="dialogVisible"
        width="30%">

      <table>
        <tr>
          <td>
            <el-tag>职称名</el-tag>
          </td>
          <td>
            <el-input class="updatePosInput" size="small" v-model="updateLevel.name"></el-input>
          </td>
        </tr>
        <tr>
          <td>
            <el-tag>职称级别</el-tag>
          </td>
          <td>
            <el-select v-model="updateLevel.titleLevel" placeholder="职称等级" size="small" style="margin-left: 5px">
              <el-option
                  v-for="item in selectJobLevels"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>
            <el-tag>是否启用</el-tag>
          </td>
          <td>
            <el-switch
                style="display: block"
                v-model="updateLevel.enabled"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="启用"
                inactive-text="禁用"
            >
            </el-switch>
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="doUpdate" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "JobLevelMana",
  data(){
    return {
      // 添加框属性
      jl:{
        name:'',
        titleLevel:''
      },
      updateLevel:{
        name:'',
        titleLevel:'',
        enabled: false
      },
      multipleSelection: [],
      dialogVisible: false,
      jobLevels: [],
      selectJobLevels: [
          '正高级',
          '副高级',
          '初级',
          '中级'
      ],
      loading: false
    }
  },
  mounted() {
    this.initJobLevels();
  },
  methods:{
    addPosition(){
      if (this.jl.name && this.jl.titleLevel) {
        this.postRequest("/system/basic/jobLevel/", this.jl).then(resp=>{
          if (resp) {
            this.initJobLevels();
            this.jl.name='';
            this.jl.titleLevel = '';
          }
        })
      } else {
        this.$message.error('职称、职级不能为空！');
      }

    },

    initJobLevels(){
      this.loading = true;
      this.getRequest("/system/basic/jobLevel/").then(resp=>{
        this.loading = false;
        this.jobLevels = resp;
      })
    },

    showEditView(index, data){
      this.dialogVisible = true;
      Object.assign(this.updateLevel, data);
    },

    doUpdate(){
      this.putRequest("/system/basic/jobLevel/", this.updateLevel).then(resp=>{
        if (resp) {
          this.dialogVisible = false;
          this.initJobLevels();
        }
      })
    },

    handleDelete(index, data){
      this.$confirm('此操作将永久删除[' + data.name + '｜' + data.titleLevel + ']职称, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest("/system/basic/jobLevel/" + data.id).then(resp=>{
          this.initJobLevels();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    deleteBatch(){
      let ids = '';
      this.multipleSelection.forEach(item=>{
        ids += item.id + ','
        console.log(ids);
      });
      this.deleteRequest("/system/basic/jobLevel/delBatch/" + ids).then(resp=>{
        if (resp) {
          this.initJobLevels();
        }
      });
    }
  }
}
</script>

<style>
.posInput{
  width: 300px;margin-right: 8px
}

.updatePosInput{
  width: 200px;
  margin-left: 8px;
}
.posMain{
  margin-top: 10px;
}
</style>

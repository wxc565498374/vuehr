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
        title="修改职位"
        :visible.sync="dialogVisible"
        width="30%">
      <div>
        <el-tag>职位名称</el-tag>
        <el-input class="updatePosInput" size="small" v-model="updatePos.name"></el-input>
      </div>
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
      pos:{
        name:''
      },
      updatePos:{
        name:''
      },
      multipleSelection: [],
      dialogVisible: false,
      jobLevels: [],
      jl:{
        name:'',
        titleLevel:''
      },
      selectJobLevels: [
          '正高级',
          '副高级',
          '初级',
          '中级',
          '高级'
      ],
      value: true
    }
  },
  mounted() {
    this.initPositions();
  },
  methods:{
    addPosition(){
      if (this.pos.name) {
        this.postRequest("/system/basic/pos/", this.pos).then(resp=>{
          if (resp) {
            this.initPositions();
            this.pos.name='';
          }
        })
      } else {
        this.$message.error('职位不能为空！');
      }

    },

    initPositions(){
      this.getRequest("/system/basic/jobLevel/").then(resp=>{
        this.jobLevels = resp;
      })
    },

    showEditView(index, data){
      this.dialogVisible = true;
      //this.updatePos=data
      Object.assign(this.updatePos, data);
    },

    doUpdate(){
      this.putRequest("/system/basic/pos/", this.updatePos).then(resp=>{
        if (resp) {
          this.dialogVisible = false;
          this.initPositions();
        }
      })
    },

    handleDelete(index, data){
      this.$confirm('此操作将永久删除[' + data.name + ']职位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest("/system/basic/pos/" + data.id).then(resp=>{
          this.initPositions();
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
      this.deleteRequest("/system/basic/pos/delBatch/" + ids).then(resp=>{
        if (resp) {
          this.initPositions();
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

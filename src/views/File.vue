<!--
 * @Author: zsj 2318940149@qq.com
 * @Date: 2023-02-08 02:04:47
 * @LastEditors: zsj 2318940149@qq.com
 * @LastEditTime: 2023-02-12 04:48:23
 * @FilePath: \vue\src\views\Files.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--  -->
<template>
  <div>
    <div style="margin: 10px 0">
      <el-input
        style="width: 200px"
        placeholder="请输入名称搜索"
        suffix-icon="el-icon-search"
        v-model="name"
      ></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>
    <div style="margin: 10px 0">
      <el-upload
        action="http://101.132.37.235:9090/file/upload"
        :show-file-list="false"
        :on-success="handleFileUploadSuccess"
        style="display: inline-block"
        class="mr-5"
      >
        <el-button type="primary" class="ml-5"
          >上传文件 <i class="el-icon-top"></i
        ></el-button>
      </el-upload>
      <el-popconfirm
        class="ml-5"
        confirm-button-text="确定"
        cancel-button-text="取消"
        icon="el-icon-info"
        icon-color="red"
        title="确定删除吗？"
        @confirm="delBatch"
      >
        <el-button type="danger" slot="reference"
          >批量删除 <i class="el-icon-remove-outline"></i
        ></el-button>
      </el-popconfirm>
    </div>
    <el-table
      :data="tableData"
      border
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="ID" width="80"> </el-table-column>
      <el-table-column prop="name" label="文件名称">
      </el-table-column>
      <el-table-column prop="type" label="文件类型">
      </el-table-column>
      <el-table-column prop="size" label="文件大小(KB)">
      </el-table-column>
      <el-table-column label="下载">
        <template slot-scope="scope">
          <el-button type="primary" @click="download(scope.row.url)">下载</el-button>
        </template>
      </el-table-column>
      <el-table-column label="启用">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.enable" active-color="#13ce66" inactive-color="#ccc" @change="changeEnable(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-popconfirm
            class="ml-5"
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="确定删除吗？"
            @confirm="del(scope.row.id)"
          >
            <el-button type="danger" slot="reference"
              >删除 <i class="el-icon-remove-outline"></i
            ></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div style="padding: 10px 0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      name: '',
      multipleSelection: [],
      pageNum: 1,
      pageSize: 10,
      total:0
    };
  },
  created(){
    this.load()
  },
  methods: {
    load() {
      this.request
        .get('/file/page', {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            name: this.name,
          },
        })
        .then((res) => {
          console.log(res.data)
          this.tableData = res.data.records;
          this.total = res.data.total;
        });
    },
    del(id) {
      this.request.delete('/file/' + id).then((res) => {
        if (res.code === '200') {
          this.$message.success('删除成功');
          this.load();
        } else {
          this.$message.error('删除失败');
        }
      });
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    delBatch() {
      let ids = this.multipleSelection.map((v) => v.id);
      console.log(ids);
      this.request.post('/file/del/batch', ids).then((res) => {
        if (res.code === '200') {
          this.$message.success('批量删除成功');
          this.load();
        } else {
          this.$message.error('批量删除失败');
        }
      });
    },
    changeEnable(row){
      this.request.post('/file/update', row).then((res) => {
        if(res.code === '200'){
          this.$message.success("操作成功")
        }
      })
    },
    reset() {
      this.name = '';
      this.load();
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.load();
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.load();
    },
    handleFileUploadSuccess(res){
      console.log(res)
      this.load()
    },
    download(url){
      window.open(url)
    },
  },
};
</script>

<style scoped></style>

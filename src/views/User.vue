<!--
 * @Author: zsj 2318940149@qq.com
 * @Date: 2023-02-05 09:08:09
 * @LastEditors: zsj 2318940149@qq.com
 * @LastEditTime: 2023-02-17 12:06:12
 * @FilePath: \vue\src\views\User.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--  -->
<template>
  <div>
    <div style="margin-bottom: 30px"></div>

    <div style="margin: 10px 0">
      <el-input
        style="width: 200px"
        placeholder="请输入名称搜索"
        suffix-icon="el-icon-search"
        v-model="username"
      ></el-input>
      <el-input
        style="width: 200px"
        placeholder="请输入邮箱搜索"
        suffix-icon="el-icon-message"
        class="ml-5"
        v-model="email"
      ></el-input>
      <el-input
        style="width: 200px"
        placeholder="请输入地址搜索"
        suffix-icon="el-icon-position"
        class="ml-5"
        v-model="address"
      ></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>

    <div style="margin: 10px 0">
      <el-button type="primary" @click="handleAdd"
        >新增 <i class="el-icon-circle-plus-outline"></i
      ></el-button>
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
      <el-upload action="http://101.132.37.235:9090/user/import" :show-file-list="false" accept="xlsx" :on-success="handleExcelIimportSuccess" style="display: inline-block;" class="mr-5">
        <el-button type="primary" class="ml-5"
          >导入 <i class="el-icon-bottom"></i
        ></el-button>
      </el-upload>
      <el-button type="primary" @click="exp"
        >导出 <i class="el-icon-top"></i
      ></el-button>
    </div>

    <el-table
      :data="tableData"
      border
      stripe
      :header-cell-class-name="headerBg"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="ID" width="80"> </el-table-column>
      <el-table-column prop="username" label="用户名" width="140">
      </el-table-column>
      <el-table-column prop="role" label="角色信息"> </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="120">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="120"> </el-table-column>
      <el-table-column prop="phone" label="电话"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="handleEdit(scope.row)"
            >编辑 <i class="el-icon-edit"></i
          ></el-button>
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
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="用户名">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select clearable v-model="form.role" placeholder="请选择角色" style="width: 100%;">
            <el-option v-for="item in roles" :key="item.name" :label="item.name" :value="item.flag"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      username: '',
      email: '',
      address: '',
      dialogFormVisible: false,
      form: {},
      multipleSelection: [],
      headerBg: 'headerBg',
      roles:[]
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.request
        .get('/user/page', {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            username: this.username,
            email: this.email,
            address: this.address,
          },
        })
        .then((res) => {
          this.tableData = res.data.records;
          this.total = res.data.total;
        });
        this.request
        .get('/role').then(res =>{
          this.roles = res.data
        })
    },
    save() {
      this.request.post('/user', this.form).then((res) => {
        if (res.code === '200') {
          this.$message.success('保存成功');
          this.dialogFormVisible = false;
          this.load();
        } else {
          this.$message.error('保存失败');
        }
      });
    },
    handleAdd() {
      this.form = {};
      this.dialogFormVisible = true;
    },
    handleEdit(row) {
      this.form = row;
      this.dialogFormVisible = true;
    },
    del(id) {
      this.request.delete('/user/' + id).then((res) => {
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
      this.request.post('/user/del/batch', ids).then((res) => {
        if (res.code === '200') {
          this.$message.success('批量删除成功');
          this.load();
        } else {
          this.$message.error('批量删除失败');
        }
      });
    },
    reset() {
      this.username = '';
      this.email = '';
      this.address = '';
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
    exp() {
      window.open('http://101.132.37.235:9090/user/export');
    },
    handleExcelIimportSuccess(){
      this.$message.success("导入成功")
      this.load()
    },
  },
};
</script>

<style>
.headerBg {
  background-color: #eee !important;
}
</style>

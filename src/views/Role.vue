<!--
 * @Author: zsj 2318940149@qq.com
 * @Date: 2023-02-05 09:08:09
 * @LastEditors: zsj 2318940149@qq.com
 * @LastEditTime: 2023-02-10 08:59:25
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
        v-model="name"
      ></el-input>
      <!-- <el-input
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
        ></el-input> -->
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
      <!-- <el-upload action="http://localhost:9090/user/import" :show-file-list="false" accept="xlsx" :on-success="handleExcelIimportSuccess" style="display: inline-block;" class="mr-5"> -->
      <!-- <el-button type="primary" class="ml-5"
            >导入 <i class="el-icon-bottom"></i
          ></el-button>
        </el-upload>
        <el-button type="primary" @click="exp"
          >导出 <i class="el-icon-top"></i
        ></el-button> -->
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
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="flag" label="唯一"> </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>

      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button type="info" @click="selectMenu(scope.row)"
            >分配菜单 <i class="el-icon-menu"></i
          ></el-button>
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
    <el-dialog title="角色信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="唯一">
          <el-input v-model="form.flag" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="菜单分配" :visible.sync="menuDialogVis" width="30%">
      <el-tree
        :props="props"
        :data="menuata"
        show-checkbox
        node-key="id"
        :default-expanded-keys="expends"
        :default-checked-keys="checks"
        ref="tree"
      >
        <span class="custom-tree-node" slot-scope="{ data }">
          <span> <i :class="data.icon"></i> {{ data.name }}</span>
        </span>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="menuDialogVis = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleMenu">确 定</el-button>
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
      name: '',
      dialogFormVisible: false,
      form: {},
      multipleSelection: [],
      headerBg: 'headerBg',
      menuDialogVis: false,
      menuata: [],
      props: {
        label: 'name',
      },
      expends: [],
      checks: [],
      roleId: 0,
      roleFlad: '',
    };
  },
  created() {
    this.load();
  },
  methods: {
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    load() {
      this.request
        .get('/role/page', {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            name: this.name,
          },
        })
        .then((res) => {
          this.tableData = res.data.records;
          this.total = res.data.total;
        });
    },
    save() {
      this.request.post('/role', this.form).then((res) => {
        if (res.code === '200') {
          this.$message.success('保存成功');
          this.dialogFormVisible = false;
          this.load();
        } else {
          this.$message.error('保存失败');
        }
      });
    },
    saveRoleMenu() {
      this.request
        .post('/role/roleMenu/' + this.roleId, this.$refs.tree.getCheckedKeys())
        .then((res) => {
          if (res.code === '200') {
            this.$message.success('绑定成功');
            this.menuDialogVis = false;
            if (this.roleFlad === 'ROLE_ADMIN') {
              this.$store.commit('logout');
            }
          } else {
            this.$message.error(res.msg);
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
      this.request.delete('/role/' + id).then((res) => {
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
      this.request.post('/role/del/batch', ids).then((res) => {
        if (res.code === '200') {
          this.$message.success('批量删除成功');
          this.load();
        } else {
          this.$message.error('批量删除失败');
        }
      });
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
    selectMenu(role) {
      this.roleId = role.id;
      this.roleFlad = role.flag;
      this.menuDialogVis = true;
      this.request.get('/menu').then((res) => {
        this.menuata = res.data;
        this.expends = this.menuata.map((v) => v.id);
      });
      this.request.get('/role/roleMenu/' + this.roleId).then((res) => {
        this.checks = res.data;

        this.request.get('/menu/ids').then((r) => {
          const ids = r.data;
          ids.forEach((id) => {
            if (!this.checks.includes(id)) {
              this.$nextTick(() =>{
                this.$refs.tree.setChecked(id, false);
              })
            }
          })
        });
      });
    },
  },
};
</script>

<style>
.headerBg {
  background-color: #eee !important;
}
</style>

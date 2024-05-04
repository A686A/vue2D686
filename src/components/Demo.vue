<template>
  <div>
    <i class="fa fa-camera-retro fa-lg"></i>
    <h2>用户信息表</h2>
    <el-row>
      <el-col :span="6" style="margin-bottom: 10px">
        <el-button type="primary" @click="add">新增</el-button>
        <el-input
          v-model="username"
          style="width: 70%"
          @keyup.enter.native="loadTable(1)"
        ></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" style="margin-bottom: 10px">
        <el-button type="primary" @click="add">检索</el-button>
        <el-input
          v-model="username"
          style="width: 70%"
          @keyup.enter.native="loadTable(1)"
        ></el-input>
      </el-col>
    </el-row>
    <el-table
      :data="tableData.records"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      align="center"
    >
      <el-table-column prop="id" label="编号" sortable width="180"> </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180"
      ></el-table-column>
      <el-table-column prop="gender" label="姓别" width="180"></el-table-column>
      <el-table-column prop="birthday" label="生日" width="180">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
            circle
            @click="edit(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            circle
            @click="del(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row type="flex" justify="center" style="margin-top: 10px">
      <el-pagination
        layout="prev, pager, next"
        :page-size="size"
        :current-page="current"
        @prev-click="loadTable"
        @current-change="loadTable"
        @next-click="loadTable"
        :total="tableData.total"
      >
      </el-pagination>
    </el-row>

    <el-dialog title="用户信息" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="编号">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="form.gender" label="男">男</el-radio>
          <el-radio v-model="form.gender" label="女">女</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
  
<script>
export default {
  created: function () {
    this.loadTable(this.current);
  },
  methods: {
    loadTable(num) {
      this.current = num;
      this.$axios
        .get("/user/findByPage?current=" + this.current + "&size=" + this.size)
        .then((response) => {
          this.tableData = response.data.data;
        });
    },
    add() {
      this.dialogVisible = true;
      this.form = {};
    },
    edit(row) {
      this.form = row;
      this.dialogVisible = true;
    },
    del(id) {
      this.$axios.delete("/user/" + id).then(() => {
        this.loadTable(1);
      });
    },
    save() {
      let data = JSON.stringify(this.form);
      // 编辑
      this.$axios
        .post("/userAdd", data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          this.dialogVisible = false;
          this.loadTable(1);
        });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex% 2 === 1) {
        return "warning-row";
      } else if (rowIndex % 2 === 0) {
        return "success-row";
      }
      return "";
    },
  },
  data() {
    return {
      username: "",
      current: 1,
      size: 8,
      dialogVisible: false,
      tableData: [],
      form: {},
    };
  },
};
</script>
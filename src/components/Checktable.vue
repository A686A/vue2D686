<template>
  <div>
    <el-button @click="del" :disabled="selectedIds.length === 0">
      Delete Selected
    </el-button>
    <el-table
      :data="tableData.records"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      align="center"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="编号" sortable width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180"
      ></el-table-column>
      <el-table-column prop="gender" label="姓别" width="180"></el-table-column>
      <el-table-column prop="birthday" label="生日" width="180">
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

    <el-table :data="newUsers" border>
      <el-table-column label="编号" width="100">
        <template #default="{ row }">
          {{ row.id || "自动生成" }}
        </template>
      </el-table-column>

      <el-table-column label="姓名">
        <template #default="{ row }">
          <el-input v-model="row.username" placeholder="请输入姓名"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="性别">
        <template #default="{ row }">
          <el-select v-model="row.gender" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>

    <el-button @click="addNewRow">添加用户</el-button>
    <el-button @click="submitUsers" :disabled="!hasValidUsers"
      >批量新增</el-button
    >
  </div>
</template>

<script>
export default {
  created: function () {
    this.loadTable(this.current);
  },
  computed: {
    hasValidUsers() {
      return this.newUsers.some(
        (user) => user.username.trim() !== "" && user.gender.trim() !== ""
      );
    },
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
    handleSelectionChange(selected) {
      this.selectedIds = selected.map((item) => item.id);
    },
    del() {
      if (this.selectedIds.length > 0) {
        this.$axios
          .delete("/user/deleteUserList", { data: this.selectedIds })
          .then(() => {
            this.loadTable(1); // 删除后刷新列表
            this.selectedIds = [];
          });
      }
    },
    addNewRow() {
      this.newUsers.push({ username: "", gender: "" });
    },
    submitUsers() {
      const validUsers = this.newUsers.filter(
        (user) => user.username.trim() !== "" && user.gender.trim() !== ""
      );
      if (validUsers.length > 0) {
        this.$axios
          .post("/addUserList", validUsers, {
            headers: { "Content-Type": "application/json" },
          })
          .then((response) => {
            console.log("Users added:", response.data);
            this.newUsers = [{ username: "", gender: "" }]; // 重置
          });
      }
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
      selectedIds: [],
      newUsers: [{ username: "", gender: "" }],
    };
  },
};
</script>

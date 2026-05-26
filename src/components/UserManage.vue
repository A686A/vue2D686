<template>
  <div class="user-manage">
    <h2>用户管理</h2>

    <el-card>
      <div class="actions">
        <el-button type="primary" @click="addRow">新增一行</el-button>
        <el-button type="success" @click="submitUsers">添加</el-button>
      </div>

      <el-table :data="users" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="80"></el-table-column>

        <el-table-column label="姓名">
          <template slot-scope="scope">
            <el-input v-model="scope.row.username" placeholder="请输入姓名"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="邮箱">
          <template slot-scope="scope">
            <el-input v-model="scope.row.email" placeholder="请输入邮箱"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "UserManage",
  data() {
    return {
      users: [{ id: 1, username: "", email: "" }],
    };
  },
  methods: {
    addRow() {
      this.users.push({
        id: this.users.length + 1,
        username: "",
        email: "",
      });
    },
    submitUsers() {
      const payload = this.users.map((user) => ({
        id: user.id,
        username: (user.username || "").trim(),
        email: (user.email || "").trim(),
      }));

      this.$axios
        .post("http://localhost:8080/userAdd", payload, {
          headers: { "Content-Type": "application/json" },
        })
        .then(() => {
          this.$message.success("添加成功");
        })
        .catch(() => {
          this.$message.error("添加失败");
        });
    },
  },
};
</script>

<style scoped>
.user-manage {
  margin: 30px auto;
  max-width: 900px;
  text-align: left;
}

.user-manage h2 {
  margin-bottom: 16px;
}

.actions {
  margin-bottom: 12px;
}
</style>

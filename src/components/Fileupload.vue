<template>
  <div>
    <input type="file" @change="handleFileUpload" />
    <button @click="uploadFile">上传文件</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedFile: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    uploadFile() {
    var url = "createUploadUrl";

      if (!this.selectedFile) {
        alert("请选择文件");
        return;
      }

      try {
        this.$axios.put(
            url,
          this.selectedFile,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        alert("文件上传成功！");
      } catch (error) {
        console.error("上传文件时发生错误:", error);
        alert("文件上传失败！");
      }
    },
  }
};
</script>
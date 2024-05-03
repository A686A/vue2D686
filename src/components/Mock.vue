<template>
  <div id="mock">
    <img alt="Vue logo" :src="img" />
  </div>
</template>

<script>
export default {
  name: "Mock",
  data: function () {
    return {
      img: "",
    };
  },
  mounted: function () {
    this.$axios.get("/product/search?id=10").then((res) => {
      console.log(res.data.data.img);
      this.img = res.data.data.img;
    });
  },
};
</script>
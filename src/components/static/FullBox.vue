<template>
  <div class="box">

    <slot />
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .box {
    min-height:80px;
		width:95%;
		float:left;
		margin-right: 1.5%;
    margin-left: 1.5%;
    margin-bottom: 1%;
    padding: 1%;
    border-radius: 15px;
    background: white;

  }

</style>

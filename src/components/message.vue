<template>
  <div>
    <p
      :style="receive ? 'margin: 2px;float: left;padding: 10px;background: #4c4c4d2a;border-radius: 30px;border-top-left-radius: 0px;width: 70%;' : 'margin: 2px;float: right;padding: 10px;background: #4c4c4d2a;border-radius: 30px;border-top-right-radius: 0px;width: 70%;'"
    >
      <strong>{{ de }}</strong>
      {{ msg }}
    </p>
  </div>
</template>

<script>
export default {
  data: () => ({
  }),

  props: ["de", "msg", "receive"]
};
</script>

<style></style>

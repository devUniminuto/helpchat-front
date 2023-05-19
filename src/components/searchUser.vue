<template>
  <div>
    <v-autocomplete
      v-model="selectedUpdate"
      :disabled="isUpdating"
      :items="peopleUpdate"
      :key ="updateKey"
      color="blue-grey lighten-2"
      label="Seleccionar usuario"
      item-text="nombre"
      item-value="id"
      chips
      closable-chips
    >
      <template v-slot:selection="data">
        <v-chip
          v-bind="data.attrs"
          :input-value="data.selected"
          close
          @click="data.select"
          @click:close="remove(data.item)"
        >
          {{ data.item.nombre }}
        </v-chip>
      </template>
      <template v-slot:item="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-item-content v-text="data.item"></v-list-item-content>
        </template>
        <template v-else>
          <v-list-item-content>
            <v-list-item-title v-html="data.item.nombre"></v-list-item-title>
          </v-list-item-content>
        </template>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
export default {
  data() {
    return {
      autoUpdate: true,
      isUpdating: false,
      name: "Midnight Crew",
      title: "The summer breeze",
      peopleUpdate: [],
      selectedUpdate: [],
      updateKey: 0
    };
  },

  props: {
    people: Array,
  },

  watch: {
    isUpdating(val) {
      if (val) {
        this.timeout = setTimeout(() => (this.isUpdating = false), 3000);
      }
    },
    people(newVal) {
      this.updateKey++;
      this.peopleUpdate = newVal;
    },
    selectedUpdate(newVal) {
      this.$emit("selected", newVal);
    },
  },

  mounted(){
    this.peopleUpdate = this.people
  },

  methods: {
    remove(item) {
      const index = this.selectedUpdate.indexOf(item.nombre);
      if (index >= 0) this.selectedUpdate = ""
    },
  },
};
</script>

<style></style>

<template>
  <FullBoxVue class="shadowHover">
    <h1>Mis chats creados</h1>

    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" v-bind="attrs" v-on="on">
          Crear nuevo chat
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Crear un nuevo chat
        </v-card-title>

        <v-form>
          <v-container>
              <v-text-field
                  v-model="nombreChat"
                  label="Nombre de nuevo chat"
                ></v-text-field>
          </v-container>
        </v-form>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="createConversationalFlow()"> Guardar </v-btn>
          <v-btn color="primary" text @click="dialog = false"> Cancelar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="chats"
      item-key="id"
      class="elevation-1"
      :search="search"
      @click:row="seleccionarPeticion"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Buscar"
          class="mx-4"
        ></v-text-field>
      </template>
    </v-data-table>
  </FullBoxVue>
</template>

<script>
import FullBoxVue from "@/components/static/FullBox.vue";
import { getAllConversationalFlows, createConversationalFlow } from "@/api";

export default {
  data() {
    return {
      search: "",
      chats: [],
      headers: [
        {
          text: "Id Conversación",
          value: "id",
        },
        {
          text: "Nombre",
          value: "name",
        },
      ],
      dialog: false,
      nombreChat: ""
    };
  },

  methods: {
    getAllConversationalFlows() {
      getAllConversationalFlows().then(
        function (response) {
          let respuesta = response.data.response;
          this.chats = respuesta;
        }.bind(this)
      );
    },

    createConversationalFlow() {
      createConversationalFlow({"name": this.nombreChat}).then(
        function (response) {
          this.getAllConversationalFlows()
          this.nombreChat = "";
          this.dialog = false;
        }.bind(this)
      )
    },

    filterOnlyCapsText(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
      );
    },

    seleccionarPeticion(option) {
      let idSolicitudSeleccionada = option;
      this.$router.push({ path: '/flujoConversacional/'+idSolicitudSeleccionada.id}).catch(()=>{});
      //this.$swal('Hello Vue world!!!');
    },
  },

  mounted: function () {
    this.getAllConversationalFlows();
  },

  components: {
    FullBoxVue,
  },
};
</script>

<style></style>

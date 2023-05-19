<template>
  <div>
    <FullBoxVue class="shadowHover">
      <h1>Panel de usuarios</h1>

      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" v-on="on">
            Agregar nueva usuario
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Crear un usuario
          </v-card-title>

          <v-form>
            <v-container>
              <v-text-field v-model="username" label="Nombre"></v-text-field>
              <v-text-field v-model="email" label="Correo"></v-text-field>
              <v-text-field v-model="password" label="Contraseña" type="password"></v-text-field>
              <v-select :items="roles" v-model="rol" name="rol" item-text="name" label="Rol de usuario"></v-select>
            </v-container>
          </v-form>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="createUser()"
            >
              Guardar
            </v-btn>
            <v-btn color="primary" text @click="dialog = false">
              Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-data-table
        :headers="headers"
        :items="respuesta"
        item-key="id"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:top>
          <v-text-field
            v-model="search"
            label="Buscar"
            class="mx-4"
          ></v-text-field>
        </template>

        <template v-slot:body="{ items, headers }">
          <tbody>
            <tr v-for="(item, idx, k) in items" :key="idx">
              <td v-for="(header, key) in headers" :key="key">
                <v-edit-dialog
                  :return-value.sync="item[header.value]"
                  @save="save(item)"
                  save-text="Guardar"
                  @cancel="cancel"
                  cancel-text="Cancelar"
                  @open="open"
                  @close="close"
                  large
                >
                  {{ item[header.value] }}
                  <template v-slot:input>
                    <v-text-field
                      v-model="item.username"
                      label="Nombre de usuario"
                      single-line
                    ></v-text-field>
                    <v-textarea
                      v-model="item.email"
                      label="Correo"
                    ></v-textarea>
                  </template>
                </v-edit-dialog>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </FullBoxVue>
  </div>
</template>

<script>
import FullBoxVue from "@/components/static/FullBox.vue";
import {
  getAllUsers,
  getAllRoles,
  postUser,
  updateUser,
} from "@/api";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      rol: "",

      search: "",
      respuesta: [],
      headers: [
        {
          text: "Id usuario",
          value: "id",
        },
        {
          text: "Nombre de usuario",
          value: "username",
        },
        {
          text: "Correo",
          value: "email",
        },
      ],
      dialog: false,
      query: "",
      urlBot: "",
      answer: "",
      infoFlujo: {},
      roles: [],
      showModal: false,
    };
  },

  methods: {
    getAllUsers() {
      getAllUsers().then(
        function (response) {
          let respuesta = response.data.response;
          this.respuesta = respuesta;
        }.bind(this)
      );
      getAllRoles().then(
        function (response) {
          let respuesta = response.data.response;
          this.roles = respuesta;
        }.bind(this)
      );
    },

    createUser() {
      postUser({
        username: this.username,
        email: this.email,
        password: this.password,
        roles: [this.rol],
      }).then(
        function (response) {
          this.getAllUsers();
          this.dialog = false;
        }.bind(this)
      );
    },

    save(item) {
      updateUser(item).then(
        function (response) {
          this.getConversationalFlows();
          this.dialog = false;
        }.bind(this)
      );
    },
    cancel() {},
    open() {},
    close() {},
  },

  mounted: function () {
    this.getAllUsers();
  },

  components: {
    FullBoxVue,
  },
};
</script>

<style scoped>
div {
  width: 100%;
}
</style>

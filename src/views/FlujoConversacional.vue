<template>
  <div>


    <FullBoxVue class="shadowHover">
      <h1>Flujo conversacional {{ infoFlujo.name }}</h1>

      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" v-on="on"> Agregar nueva pregunta </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Crear una pregunta
          </v-card-title>

          <v-form>
            <v-container>
              <v-text-field v-model="query" label="Pregunta"></v-text-field>

              <v-text-field v-model="answer" label="Pregunta"></v-text-field>
            </v-container>
          </v-form>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="createConversationalFlowMessage()"
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
        :items="chats"
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
                      v-model="item.query"
                      label="Pregunta"
                      single-line
                    ></v-text-field>
                    <v-textarea
                      v-model="item.response"
                      label="Respuesta"
                    ></v-textarea>
                  </template>
                </v-edit-dialog>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </FullBoxVue>

    <FullBoxVue class="shadowHover">
      <h1>Script chat</h1>
      <p>Copia y pega dentro del head de tu página</p>
      <v-text-field v-model="urlBot" readonly filled></v-text-field>
    </FullBoxVue>
  </div>
</template>

<script>
import FullBoxVue from "@/components/static/FullBox.vue";
import {
  getAllConversationalFlowsMessages,
  createConversationalFlowMessage,
  updateConversationalFlowMessage,
} from "@/api";

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
          text: "Pregunta",
          value: "query",
        },
        {
          text: "Respuesta",
          value: "response",
        },
      ],
      dialog: false,
      query: "",
      urlBot: "",
      answer: "",
      infoFlujo: {},
      showModal: false,
    };
  },

  methods: {
    getConversationalFlows() {
      getAllConversationalFlowsMessages(this.$route.params.id).then(
        function (response) {
          let respuesta = response.data;
          this.chats = respuesta.conversationalFlowMessages;
          this.infoFlujo = respuesta.infoFlow;
          this.urlBot = respuesta.scriptChat
        }.bind(this)
      );
    },

    createConversationalFlowMessage() {
      createConversationalFlowMessage({
        idConversationalFlow: this.infoFlujo.id,
        query: this.query,
        response: this.answer,
      }).then(
        function (response) {
          this.getConversationalFlows();
          this.nombreChat = "";
          this.dialog = false;
        }.bind(this)
      );
    },

    save(item) {
      updateConversationalFlowMessage(item).then(
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
    this.getConversationalFlows();
  },

  components: {
    FullBoxVue,
  },
};
</script>

<style scoped>
  div{
    width: 100%;
  }
</style>

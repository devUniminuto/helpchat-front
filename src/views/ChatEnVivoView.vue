<template>
  <div>
    <QuarterBox class="shadowHover">
      <h2>Chats Activos</h2>
      <div
        v-for="(chat, index) in chatsActivos"
        :key="index"
        @click="openChat(chat.idConversacion)"
      >
        <message
          de=""
          :msg="'Nuevo chat ' + chat.idConversacion"
          :receive="true"
        ></message>
      </div>
    </QuarterBox>
    <MiddleBox class="shadowHover">
      <div
        id="messages-container"
        style="overflow-y: scroll; height: 500px; padding: 10px"
        v-if="nombreChatSeleccionado != ''"
      >
        <h2>Chat con {{ nombreChatSeleccionado }}</h2>

        <div
          v-for="(chat, index) in mensajesActualChat[nombreChatSeleccionado]"
          :key="index"
        >
          <message
            :de="chat.from"
            :msg="chat.message"
            :receive="chat.receive"
          ></message>
        </div>

        <div style="display: flex; justify-content: space-between">
          <input
            type="text"
            v-model="mensaje"
            placeholder="Escribe un mensaje..."
            style="
              width: 100%;
              padding: 8px;
              border: 1px solid rgb(204, 204, 204);
              border-radius: 5px;
            "
          /><button
            @click="enviarMensaje()"
            style="
              background-color: rgb(76, 175, 80);
              color: rgb(255, 255, 255);
              border: none;
              border-radius: 5px;
              padding: 8px;
              margin-left: 10px;
              cursor: pointer;
            "
          >
            Enviar
          </button>
        </div>
      </div>
    </MiddleBox>
  </div>
</template>

<script>
import message from "@/components/message.vue";
import MiddleBox from "@/components/static/MiddleBox.vue";
import QuarterBox from "@/components/static/QuarterBox.vue";
import * as io from "socket.io-client";

export default {
  data: () => ({
    nombreChatSeleccionado: "",
    chatsActivos: [],
    mensajesActualChat: {},
    socket: null,
    mensaje: "",
  }),

  methods: {
    chatEntrante(data) {
      console.log("Nuevo chat!");
      console.log(data);
      this.chatsActivos.push(data);
    },

    openChat(idChat) {
      this.nombreChatSeleccionado = idChat;
      this.socket.emit("server:support_access", {
        idChat: idChat,
      });
    },

    enviarMensaje() {
      if (this.mensajesActualChat[this.nombreChatSeleccionado] == null) {
        this.mensajesActualChat[this.nombreChatSeleccionado] = [];
      }
      this.mensajesActualChat[this.nombreChatSeleccionado].push({
        from: "Tú",
        message: this.mensaje,
        receive: false,
      });
      this.socket.emit("server:sendMessageSupport", {
        msg: this.mensaje,
      });
      this.mensaje = "";
    },

    nuevoMensaje(data) {
      if (this.mensajesActualChat[this.nombreChatSeleccionado] == null) {
        this.mensajesActualChat[this.nombreChatSeleccionado] = [];
      }
      let nuevoMensaje = data;
      nuevoMensaje.receive = true;
      this.mensajesActualChat[this.nombreChatSeleccionado].push(data);
    },

    makeConnectionWS() {
      this.socket = io.connect("ws://localhost:9000/", {
        cors: {
          credentials: true,
        },
      });
      this.socket.emit("server:connectTest", { text: "HOla!" });
      this.socket.on("client:newChatLive", this.chatEntrante);
      this.socket.on("client:newMessageSupport", this.nuevoMensaje);
    },
  },

  mounted() {
    this.makeConnectionWS();
  },

  components: {
    message,
    MiddleBox,
    QuarterBox,
  },
};
</script>

<style scoped>
div {
  width: 100%;
}
</style>

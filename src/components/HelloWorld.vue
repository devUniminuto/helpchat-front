<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.jpeg')"
          class="my-3"
          contain
          height="400"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          ¡Bienvenido/a!
        </h1>

        <!-- <p class="subheading font-weight-regular">
          COLPRYST - Estudios de confiabilidad

        </p> -->
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Enlaces que le pueden interesar
        </h2>

        <v-row justify="center">
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </v-row>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode'

export default {
  name: 'HelloWorld',

  data: () => ({
    nombreUser: null,
    importantLinks: [
      {
        text: 'Página principal',
        href: 'https://www.google.com/'
      }
    ]
  }),
  methods: {
    validLogin() {
      if (localStorage.getItem("userTkn") === null) {
        this.validUser = false;
      } else {
        this.nombreUser = VueJwtDecode.decode(localStorage.getItem("userTkn")).nombre
      }
    },
  },
  mounted: function () {
    this.validLogin();
  },
}
</script>

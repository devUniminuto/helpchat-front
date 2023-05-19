<template>
  <FullBoxVue class="shadowHover">
    <h1>Estadísticas</h1>
    <MiddleBox class="shadowHover" >
      <h2>Usuarios que han usado el chat</h2>
      <BarChartVue
        :chartData="chartDataUsers"
        :chartOptions="chartOptions"
        :key="visible"
      ></BarChartVue>
    </MiddleBox>
    <MiddleBox class="shadowHover">
      <h2>Usuarios que han registrado correo</h2>
      <BarChartVue
        :chartData="chartDataEmail"
        :chartOptions="chartOptions"
        :key="visible"
      ></BarChartVue>
    </MiddleBox>
    <FullBoxVue>
      <h1>Conteo de chats en total <b>{{ conteoChats }}</b></h1>
    </FullBoxVue>
  </FullBoxVue>
</template>

<script>
import BarChartVue from "@/components/static/graphs/BarChart.vue";
import RadarChart from "@/components/static/graphs/RadarChart.vue";
import FullBoxVue from "@/components/static/FullBox.vue";
import MiddleBox from "@/components/static/MiddleBox.vue";

import { getStadistics } from "@/api";

export default {
  data: () => ({
    conteoChats: 0,
    visible: false,
    chartDataUsers: {
      labels: [],
      datasets: [
        {
          label: "Ingresos usuarios",
          backgroundColor: "#f87979",
          data: [],
        },
      ],
    },

    chartDataEmail: {
      labels: [],
      datasets: [
        {
          label: "Ingresos de Emails",
          backgroundColor: "#f87979",
          data: [],
        },
      ],
    },
    chartOptions: {
      responsive: true,
      maintainAspectRatio: true,
    },
  }),

  methods: {
    getStadistics() {
      getStadistics().then(
        function (response) {
          this.chartDataUsers.labels = response.data.usuarios
          this.chartDataUsers.datasets[0].data = response.data.valoresUsuarios

          this.chartDataEmail.labels = response.data.conteoEmail
          this.chartDataEmail.datasets[0].data = response.data.valoresEmail

          this.conteoChats = response.data.countChats
          this.visible++
        }.bind(this)
      );
    },
  },

  mounted: function () {
    this.getStadistics();
  },

  components: {
    BarChartVue,
    RadarChart,
    FullBoxVue,
    MiddleBox
  },
};
</script>

<style></style>

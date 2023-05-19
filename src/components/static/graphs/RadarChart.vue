<template>
  <Radar :data="chartData" :options="chartOptions" class="Bar" />
</template>

<script>
import { Radar } from "vue-chartjs";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default {
  name: "RadarChart",
  components: { Radar },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped>
.Bar {
  min-height: 400px;
}
</style>

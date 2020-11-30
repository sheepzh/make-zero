<template>
  <div>
    <v-app id="inspire">
      <v-system-bar app>
        <v-spacer></v-spacer>
        <v-icon>mdi-square</v-icon>
        <v-icon>mdi-circle</v-icon>
        <v-icon>mdi-triangle</v-icon>
      </v-system-bar>
    </v-app>
  </div>
</template>
<script>
import Engines from "../../components/engine/engine-composite";
export default {
  name: "Engine",
  data() {
    return {
      engines: Engines,
    };
  },
};
</script>
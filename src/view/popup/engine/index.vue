<template>
  <div>
    <p>搜索引擎筛选</p>
    <div id="switch_container">
      <p v-for="engine in engines" :key="engine.key">
        <input
          type="checkbox"
          v-model="engine.on"
          @click="({ target }) => reverse(engine)"
        />
        {{ engine.name }}
      </p>
    </div>
  </div>
</template>
<script>
import engineComposite from "../../../components/engine/engine-composite";
import switcher from "../../../components/engine/switcher";
export default {
  name: "Engine",
  data() {
    const engines = engineComposite.map((engine) => {
      const en = {};
      this.$set(en, "key", engine.key);
      this.$set(en, "name", engine.name);
      this.$set(en, "on", false);
      return en;
    });
    return {
      engines,
    };
  },
  methods: {
    reverse({ key, on }) {
      switcher.set(key, !on);
    },
  },
  created() {
    switcher.init((data) => {
      this.engines.forEach((engine) => {
        this.$set(engine, "on", data[engine.key]);
      });
    });
  },
};
</script>
<template>
  <div>
    <p>{{$t('engine.enabled.title')}}</p>
    <el-form>
      <el-row :gutter="10">
        <el-col :span="12"
                v-for="engine in engines"
                :key="engine.key">
          <el-form-item :label="$t(`engine.${engine.key}.name`)">
            <el-switch type="checkbox"
                       v-model="engine.on"
                       @change="newOn=>change(engine.key,newOn)">

            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <Words />
  </div>
</template>
<script>
import engineComposite from "../../../components/engine/engine-composite"
import switcher from "../../../components/engine/switcher"
import Words from './words'
export default {
  name: "Engine",
  components: { Words },
  data () {
    const engines = engineComposite.map((engine) => {
      const en = {}
      this.$set(en, "key", engine.key)
      this.$set(en, "name", engine.name)
      this.$set(en, "on", false)
      return en
    })
    return {
      engines
    }
  },
  methods: {
    change (key, on) {
      switcher.set(key, on)
    },
  },
  created () {
    switcher.init((data) => {
      this.engines.forEach((engine) => {
        this.$set(engine, "on", data[engine.key])
      })
    })
  },
}
</script>
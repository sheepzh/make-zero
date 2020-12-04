<template>
  <div id="gater_app">
    <FilterSetting />
    <ZeroSetting />
  </div>
</template>
<script>
import FilterSetting from "./engine/index"
import ZeroSetting from './sns-zero/index'
import cryptorConfig from "../../components/sns-zero/cryptor-config"

export default {
  name: "PopMain",
  components: { FilterSetting, ZeroSetting }
}
</script>
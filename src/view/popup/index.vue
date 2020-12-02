<template>
  <div id="gater_app">
    <FilterSetting />
    <p>加密设置</p>
    <form>
      开启 <input id="encrupt_on_off" type="checkbox" /> 口令
      <input id="encrupt_keyword" />
    </form>
  </div>
</template>
<script>
import FilterSetting from "./engine/index";
import cryptorConfig from "../../components/sns-zero/cryptor-config";
export default {
  name: "PopMain",
  components: { FilterSetting },
};
</script>
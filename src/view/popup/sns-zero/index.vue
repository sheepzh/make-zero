<template>
  <div>
    <p>加密设置</p>
    <form>
      开启
      <input v-model="enabled"
             type="checkbox" />
      口令
      <input v-model="password" />
    </form>
  </div>
</template>
<script>
import cryptorConfig from '../../../components/sns-zero/cryptor-config'
export default {
  name: 'ZeroSetting',
  data () {
    return {
      password: '',
      enabled: false
    }
  },
  created () {
    cryptorConfig.getPassword(password => this.password = password)
    cryptorConfig.getAutoFill(isOn => this.enabled = isOn)
  },
  watch: {
    password (nv, ov) {
      cryptorConfig.changePassword(nv)
    },
    enabled (nv) {
      cryptorConfig.changeAutoFill(nv)
    }
  }
}
</script>
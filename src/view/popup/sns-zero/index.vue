<template>
  <div>
    <el-alert type="success" :title="$t('sns.enabled.label')"></el-alert>
    <el-form label-position="left">
      <el-form-item :label="$t('sns.enabled.title')">
        <el-switch v-model="enabled"
                   size="mini" />
      </el-form-item>
      <el-form-item :label="$t('sns.password.title')">
        <el-input v-model="password"
                  size="mini" />
      </el-form-item>
    </el-form>
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
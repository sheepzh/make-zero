<template>
  <div>
    <el-form label-position="left"
             label-width="90px">
      <el-form-item>
        <template slot="label">
          <span>{{$t('sns.auto.encryptLabel')}}</span>
          <el-tooltip placement="top">
            <div slot="content">
              <p>{{$t('sns.auto.encryptTip')}}</p>
            </div>
            <i class="el-icon-question" />
          </el-tooltip>
        </template>
        <el-switch v-model="enabled"
                   size="mini" />
      </el-form-item>
      <el-form-item :label="$t('sns.password.title')">
        <el-input v-model="password">
          <el-tooltip slot="append"
                      :content="$t('button.copy')">
            <el-button icon="el-icon-copy-document"
                       class="copy-append"
                       @click="copyPsw()" />
          </el-tooltip>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import copy from '../../util/copy-util'
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
  },
  methods: {
    copyPsw () {
      copy(this.password, this)
    }
  }
}
</script>

<style scoped>
.copy-append {
  padding: 12px 12px !important;
}
</style>

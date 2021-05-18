<template>
  <div class="guide-container">
    <h2>{{ $t('guide.autoEncryption.title') }}</h2>
    <el-alert :type="on?'success':'warning'">
      {{ $t(`guide.autoEncryption.${on?'alertIfOn':'alertIfOff'}`) }}
    </el-alert>
    <p>
      <el-form label-width="120px"
               label-position="left">
        <el-form-item :label="$t('guide.autoEncryption.form1')">
          <el-input v-model="foo"
                    :disabled="!on"
                    clearable />
        </el-form-item>
        <el-form-item :label="$t('guide.autoEncryption.form2')">
          <el-input v-model="bar"
                    type="textarea"
                    rows="4"
                    :disabled="!on"
                    clearable />
        </el-form-item>
      </el-form>
    </p>
  </div>
</template>
<script>
import cryptorConfig from '../../../zero/cryptor-config'
export default {
  name: "Auto-encryption",
  data () {
    return {
      on: false,
      foo: '',
      bar: ''
    }
  },
  created () {
    cryptorConfig.getAutoFill().then(af => this.on = af)
  }
}
</script>
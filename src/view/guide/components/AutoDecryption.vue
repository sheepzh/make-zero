<template>
  <div class="guide-container">
    <h2>{{ $t('guide.autoDecryption.title') }}</h2>
    <el-alert :type="on?'success':'warning'">
      {{ $t(`guide.autoDecryption.${on?'alertIfOn':'alertIfOff'}`) }}
    </el-alert>
    <!-- Use faked text -->
    <p style="text-indent:2em;"
       v-bind:[ciphertextAttrName]="true">
      {{ foo }}
    </p>
  </div>
</template>
<script>
import cryptor from '../../../components/zero/cryptor'
import { CIPHER_ATTR_NAME, PLAIN_ATTR_NAME } from '../../../components/zero/dbclick'

import cryptorConfig from '../../../components/zero/cryptor-config'
export default {
  name: "Auto-decryption",
  data () {
    return {
      on: false,
      foo: '',
    }
  },
  computed: {
    ciphertextAttrName () {
      return this.on ? PLAIN_ATTR_NAME : CIPHER_ATTR_NAME
    }
  },
  created () {
    this.foo = this.$t('guide.welcome')
    cryptorConfig.getAutoDecrypt(ad => {
      this.on = ad
      if (!this.on) this.foo = cryptor.encrypt(this.foo)
    })
  }
}
</script>
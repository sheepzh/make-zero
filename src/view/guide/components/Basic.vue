<template>
  <div>
    <h2>{{ $t('guide.basic.title') }}</h2>
    <el-alert type="success">
      <p slot="title">{{ $t('guide.basic.currentPassword') }}<b><i>{{ password }}</i></b>{{ $t('guide.period') }}</p>
    </el-alert>
    <!-- Encrypt -->
    <h3>{{ $t('guide.basic.encrypt.title') }}</h3>
    <!-- 1st -->
    <p>
      <a class="step-sort">1.</a>
      <span ref="spanToSelect">{{ $t('guide.basic.encrypt.selectText') }}</span>
      <a href="#"
         @click="selectText()"> {{ $t('guide.basic.clickMe') }}
      </a>
      {{ $t('guide.period') }}
    </p>
    <!-- 2nd -->
    <p>
      <a class="step-sort">2.</a>
      <i18n path="guide.basic.encrypt.rightClick"
            tag="span">
        <template v-slot:shortcut><b><i>{{ $t('guide.basic.shortcut') }}</i></b></template>
        <template v-slot:menuItemPath><b><i>{{ $t('app.name') }} >> {{ $t('contextMenu.encrypt') }}</i></b></template>
      </i18n>
    </p>
    <!-- 3rd paste -->
    <p>
      <a class="step-sort">3.</a>
      <i18n path="guide.basic.encrypt.paste"
            tag="span">
        <template v-slot:btn><b><i>{{ $t('guide.basic.encrypt.pasteButton') }}</i></b></template>
      </i18n>
    </p>
    <div>
      <el-input :placeholder="$t('guide.basic.encrypt.pasteInputHolder')"
                style="width:500px;"
                clearable
                v-model="ciphertext">
        <el-button slot="append"
                   icon="el-icon-document-copy"
                   @click="pasteCiphertext()">
          {{ $t('guide.basic.encrypt.pasteButton') }}
        </el-button>
      </el-input>
    </div>
    <!-- Decrypt -->
    <h3>{{ $t('guide.basic.decrypt.title') }}</h3>
    <!-- 1st -->
    <p>
      <a class="step-sort">1.</a>
      <i18n path="guide.basic.decrypt.selectText"
            tag="span">
        <template v-slot:clickMe>
          <a href="#"
             @click="selectCiphertext()"> {{ $t('guide.basic.clickMe') }}
          </a>
        </template>
        <template v-slot:ciphertextPrefix><b><i>{{ $t('guide.basic.decrypt.ciphertextPrefix') }}</i></b></template>
      </i18n>
    </p>
    <p style="text-indent:2em;"
       v-bind:[ciphertextAttrName]="true">
      <b><i>{{ ciphertextExample }}</i></b>
    </p>
    <!-- 2nd -->
    <p>
      <a class="step-sort">2.1.</a>
      <i18n path="guide.basic.decrypt.rightClick1"
            tag="span">
        <template v-slot:shortcut><b><i>{{ $t('guide.basic.shortcut') }}</i></b></template>
        <template v-slot:menuItemPath><b><i>{{ $t('app.name') }} >> {{ $t('contextMenu.decrypt') }}</i></b></template>
      </i18n>
    </p>
    <p>
      <a class="step-sort">2.2.</a>
      <a>{{ $t('guide.basic.decrypt.rightClick2') }}</a>
    </p>
  </div>
</template>
<script>
import cryptorConfig from '../../../components/zero/cryptor-config'
import { read as readClipboard } from 'clipboardy'
import cryptor from '../../../components/zero/cryptor'
import { CIPHER_ATTR_NAME } from '../../../components/zero/dbclick'
export default {
  name: 'Basic',
  data () {
    return {
      ciphertext: '',
      ciphertextExample: '',
      password: '',
      ciphertextAttrName: CIPHER_ATTR_NAME
    }
  },
  created () {
    // Get the password
    cryptorConfig.getPassword(p => {
      this.password = p
      this.ciphertextExample = cryptor.encrypt(this.$t('guide.welcome'))
    })
  },
  methods: {
    selectText () {
      const span = this.$refs.spanToSelect
      const text = span.innerHTML
      // Use window.find to select the text
      // Forwards || backwards
      window.find(text) || window.find(text, true, true)
    },
    pasteCiphertext () {
      readClipboard().then(content => {
        this.ciphertext = content || ''
      }).catch(e => {
        this.$message({
          message: this.$t('guide.basic.pasteError'),
          duration: 2000,
          type: 'error'
        })
      })
    },
    selectCiphertext () {
      window.find(this.ciphertextExample) || window.find(this.ciphertextExample, true, true)
    }
  }
}
</script>
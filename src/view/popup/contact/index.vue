<template>
  <div>
    <el-form label-position="left"
             label-width="70px"
             :model="feedback"
             :rules="rules"
             ref="form">
      <el-form-item label-width="0px"
                    prop="message">
        <el-input type="textarea"
                  v-model="feedback.message"
                  rows="4"
                  maxlength="150"
                  clearable
                  resize="none"
                  show-word-limit
                  :placeholder="$t('contact.messagePlaceholder')" />
      </el-form-item>
      <el-form-item :label="$t('contact.contactLabel')">
        <el-input clearable
                  :placeholder="$t('contact.contactPlaceholder')"
                  v-model="feedback.contact" />
      </el-form-item>
      <el-form-item>
        <div style="float:right">
          <el-button size="medium"
                     icon="el-icon-s-promotion"
                     type="primary"
                     @click="send()">
            {{$t('contact.sendButton')}}
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Loading } from 'element-ui'
import { sendFeedback } from '../../../api/feedback'
export default {
  name: '',
  data () {
    return {
      feedback: {
        message: '',
        contact: ''
      },
      rules: {
        message: [{ required: true, message: this.$t('contact.needMessage'), trigger: 'blur' }]
      }
    }
  },
  methods: {
    send () {
      this.$refs.form.validate(validate => {
        if (validate) {
          const loading = Loading.service({ title: this.$t('contact.sendLoadingTitle') })
          sendFeedback(this.feedback).then(r => {

          }).catch(e => {
            console.log(e)
          }).finally(() => {
            loading.close()
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

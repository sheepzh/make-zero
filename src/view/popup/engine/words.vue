<template>
  <div>
    <p>{{ $t('engine.words.title') }}</p>
    <el-tag :key="tag"
            v-for="tag in words"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
      {{tag}}
    </el-tag>
    <el-input class="input-button"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveWordInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm">
    </el-input>
    <el-button v-else
               class="input-button"
               size="small"
               @click="showInput">+ {{$t('engine.words.newOne')}}</el-button>
  </div>
</template>
<script>
import badWordDictionary from '../../../components/engine/bad-word-dictionary'
import badWords from '../../../components/engine/bad-word-dictionary'
export default {
  name: 'BadWords',
  data () {
    return {
      words: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  created () {
    badWords.allWords(words => this.words = words)
  },
  methods: {
    handleClose (word) {
      this.words.splice(this.words.indexOf(word), 1);
      badWordDictionary.remove(word)
    },

    showInput () {
      this.inputVisible = true;
      this.$nextTick(_ => { this.$refs.saveWordInput.$refs.input.focus(); });
    },

    handleInputConfirm () {
      let inputValue = this.inputValue;
      if (inputValue) {
        inputValue = inputValue.trim()
        if (inputValue.indexOf(' ') > -1) {
          this.$message(this.$t('engine.words.noBlankMsg'))
          return
        } else {
          this.words.push(inputValue);
          badWordDictionary.add(inputValue)
        }
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
}
</script>

<style scoped>
.input-button,
.el-tag {
  margin: 2px !important;
}
</style>
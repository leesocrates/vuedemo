<template>
  <div class="hello">
    <h1>{{ this.$store.state.token }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank">
          Core Docs
        </a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank">
          Forum
        </a>
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank">
          Community Chat
        </a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank">
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a href="http://vuejs-templates.github.io/webpack/" target="_blank">
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a href="http://router.vuejs.org/" target="_blank">
          vue-router
        </a>
      </li>
      <li>
        <a href="http://vuex.vuejs.org/" target="_blank">
          vuex
        </a>
      </li>
      <li>
        <a href="http://vue-loader.vuejs.org/" target="_blank">
          vue-loader
        </a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" target="_blank">
          awesome-vue
        </a>
      </li>
    </ul>
    <button @click="logClick()">submit log</button>
    <button @click="testVuex()">testVuex</button>
  </div>
</template>

<script>
import Logan from 'logan-web'
import Api from '@/api/apis'
import { Message } from 'element-ui'

Logan.initConfig({
  reportUrl: 'http://106.14.1.219:8080/loganweb/logan/web/upload.json',
  errorHandler: function (e) {
    console.log('Log errorHandler')
  },
  succHandler: function (logItem) {
    var content = logItem.content
    var logType = logItem.logType
    var encrypted = logItem.encrypted
    console.log('Log succHandler:' + content + ' , logtype :' + logType + ', entrypted: ' + encrypted)
  },
  dbName: 'hello_db'
})

Logan.log('test web log', 1)

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Hello'
    }
  },
  methods: {
    logClick () {
      Logan.report({
        reportUrl: 'http://106.14.1.219:8081/loganweb/logan/web/upload.json',
        deviceId: 'LocalDeviceIdOrUnionId',
        fromDayString: '2022-1-18',
        toDayString: '2022-1-22',
        webSource: 'edge'
      }).then(value => {
        for (let key in value) {
          console.log('key:', key, '; value: ' + value[key])
          for (let key1 in value[key]) {
            console.log('key:', key1, '; value: ' + value[key][key1])
          }
        }
      })
    },
    testVuex () {
      this.$store.commit('setMessage', 'hi')
    }
  },
  mounted () {
    Api.hello()
      .then(response => {
        Message(response.data.data)
      })
      .catch(response => {
        Message('hello failed')
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

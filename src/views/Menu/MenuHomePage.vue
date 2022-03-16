<template>
  <div>
    <p>菜单列表</p>
    <menu-list :total="total" :currentPage="currentPage" :pageSize="pageSize" :listData="menuList" :handlePageChange="handlePageChange"></menu-list>
  </div>
</template>

<script>
import MenuList from './MenuList.vue'
import Api from '@/api/apis'

export default {
  name: 'MenuHome',
  data () {
    return {
      menuList: [],
      total: 0,
      currentPage: 1,
      pageSize: 2
    }
  },
  components: { MenuList },
  methods: {
    handlePageChange (pageNum) {
      Api.getMenuList(pageNum, 2, this.$store.state.userId)
        .then(response => {
          this.menuList = response.data.data.list
          this.total = response.data.data.total
          this.currentPage = response.data.data.pageNum
          console.log('getMenuLIst success')
        })
        .catch(response => {
          console.log('getMenuLIst failed')
        })
    }
  },
  mounted () {
    Api.getMenuList(1, 2, this.$store.state.userId)
      .then(response => {
        this.menuList = response.data.data.list
        this.total = response.data.data.total
        this.currentPage = response.data.data.pageNum
        console.log('getMenuLIst success')
      })
      .catch(response => {
        console.log('getMenuLIst failed')
      })
  }
}
</script>

<style scoped>
</style>

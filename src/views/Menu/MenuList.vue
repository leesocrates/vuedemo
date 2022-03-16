<template>
  <div>
    <el-card v-for="item in listData" :key="item">
      <el-row gutter="20">
        <el-col :span="4">
          <el-image class="icon" src="/images/test.jpg"></el-image>
        </el-col>
        <el-col :span="16">
          <div class="time">更新时间：{{item.updateTime}}</div>
          <div class="title">{{item.name}}</div>

          <div class="desc">{{item.menuDesc}}</div>
        </el-col>
      </el-row>

    </el-card>
    <el-pagination :total="total" :current-page="currentPage" :page-size="pageSize" @current-change="handleCurrentChange" layout="prev, pager, next">

    </el-pagination>
  </div>

</template>

<script>

export default {
  name: 'MenuList',
  props: {
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 0
    },
    listData: {
      type: Array,
      default: null
    },
    handlePageChange: {
      type: Function,
      default: null
    }
  },
  methods: {
    handleCurrentChange (pageNum) {
      this.handlePageChange(pageNum)
    }
  }
}
</script>

<style scoped>
.card {
}
.title {
  text-align: left;
  height: 40px;
}
.time {
  float: right;
}
.desc {
  text-align: left;
}
.icon {
}
</style>

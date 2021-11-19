<template>
  <el-table class="huaxia"
    :data="tableData2"
    min-width="1516"
    :max-height="maxHeight"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="name"
      label="姓名"
      width="170">
    </el-table-column>
    <el-table-column
      prop="account"
      label="学号"
      width="220">
    </el-table-column>
    <el-table-column
      prop="create_at"
      label="申请时间"
      width="250">
    </el-table-column>
    <el-table-column
      prop="type"
      label="请假类型"
      width="150">
    </el-table-column>
    <el-table-column
      prop="status1"
      label="审核结果"
      width="150">
    </el-table-column>
    <el-table-column
      prop="veto_reason"
      label="备注"
      width="250">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="170">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row), xiugai(scope.row)" type="text" size="small">修改</el-button>
        <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
    methods: {
        //点击修改，显示组件
        handleClick(row) {
          this.$emit('fyincang');
        },
        //点击修改，给 Vuex 中数据赋值
        xiugai(row) {
              this.$store.state.name2 = row.name;
              this.$store.state.class2 = row.class;
              this.$store.state.reason2 = row.reason;
              this.$store.state.veto_reason2 = row.veto_reason;
              if(row.type == "事假")
              {
                  this.$store.state.type3 = true;
                  this.$store.state.type4 = false;
              }
              else
              {
                  this.$store.state.type4 = true;
                  this.$store.state.type3 = false;
              };
              this.$store.state.id2 = row.id;
              this.$store.state.teacher = row.teacher;
              this.$store.state.status1 = row.status1;
              this.$store.state.status2 = row.status2;
              this.$store.state.apply_time2 = row.apply_time;
              //sessionStorage.setItem('qwe', '123');
              //sessionStorage.clear();
        },
        //点击删除，删除请假记录
        del(row) {
            this.$store.state.id2 = row.id;
            if(this.$store.state.id2 > -1)
            {
                this.$axios.post("api/admin/delete", {
                    id: this.$store.state.id2
                }, {}).then(value => {
                    //console.log("删除：",value.data);
                    if(value.data.code==200)
                    {
                        //console.log("删除成功。");
                        var index = this.$store.state.tableData.map(item => item.id).indexOf(this.$store.state.id2)
                        this.$store.state.tableData.splice(index, 1);
                        location.reload();
                    }
                    else
                    {
                        //console.log(value.data);
                        //console.log(this.$store.state.id2);
                    }
                }, reason => {
                    console.log(reason);
                })
            }
        },
    },
    created: function () {
        //去后端获取已审批数据
        this.$axios.get("/api/admin/look_leave", {
                  params: {},
                  headers: {}
              }).then(value => {
                  var arr = Object.keys(value.data.data);
                  for(let i = 0; i < arr.length; i++) {
                    if(value.data.data[arr[i]].type == 1)
                    {
                        value.data.data[arr[i]].type = "事假";
                    }
                    else
                    {
                        value.data.data[arr[i]].type = "病假";
                    }
                    if(value.data.data[arr[i]].status1 == 1)
                    {
                        value.data.data[arr[i]].status1 = "通过";
                    }
                    else
                    {
                        value.data.data[arr[i]].status1 = "未通过";
                    }
                    this.tableData2.push(value.data.data[arr[i]]);
                    this.$store.state.tableData2.push(value.data.data[arr[i]]);
                  }
              }, reason => {
                  console.log(reason);
              })
    },
    data() {
      return {
        tableData2: [],
        maxHeight: '800'
      }
    },
    watch: {
        screenWidth(val){
            // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
            if(!this.timer){
                // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
                this.maxHeight = val
                this.timer = true
                let that = this
                setTimeout(function(){
                    // 打印screenWidth变化的值
                    console.log(that.maxHeight)
                    that.timer = false
                },400)
            }
        }
    },
    mounted () {undefined
        const that = this
        window.addEventListener('resize', function(e) {
            //this.maxHeight = document.querySelector('.sihai').offsetHeight;
            //console.log(document.querySelector('.sihai').offsetHeight);
            window.screenWidth = document.querySelector('.sihai').offsetHeight
            that.maxHeight = window.screenWidth
        })
    }
}
</script>

<style scoped>
    .huaxia {
        /*position: absolute;
        top: 275px;
        right: 340px;
        width: 50%!important;
        border: 1px solid #000;
        height: 100%;*/
    }
    .el-table .el-table__fixed {
        height: auto!important;
        width: 17px!important;
    }
    .el-table__body-wrapper {
        z-index: 2;
    }
</style>
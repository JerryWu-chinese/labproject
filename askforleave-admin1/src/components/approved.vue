<template>
  <el-table class="huaxia"
    :data="tableData"
    :row-style="{height:60+'px'}"
    :cell-style="{textAlign: 'center'}"
    :header-cell-style="{height:60+'px',textAlign: 'center'}"
    border
    style="width: 100%">
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
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
      prop="reason"
      label="备注"
      width="250">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
        <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
    methods: {
      handleClick(row) {
        this.$store.state.examine = 'revise';
        this.$store.state.name2 = row.name;
        this.$store.state.class2 = row.class;
        this.$store.state.reason2 = row.reason;
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
        this.$store.state.status1 = row.status1;
        this.$store.state.status2 = row.status2;
        this.$store.state.apply_time2 = row.apply_time;
      },
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
    data() {
      return {
        tableData: []
      }
    },
    created: function () {
        //去后端获取已审批数据
        this.$axios.get("/api/admin/look_leave", {
                  params: {},
                  headers: {}
              }).then(value => {
                  //console.log(value);
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
                    this.tableData.push(value.data.data[arr[i]]);
                  }
              }, reason => {
                  console.log(reason);
              })
    },
}
</script>

<style scoped>
    
</style>
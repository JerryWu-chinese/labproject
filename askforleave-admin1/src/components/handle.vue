<template>
  
    <el-table
      stripe
      ref="table"
      class="tableBox"
      :data="tableData"
      :row-style="{height:60+'px'}"
      :cell-style="{textAlign: 'center'}"
      :header-cell-style="{height:60+'px',textAlign: 'center'}"
      style="width: 100%;">
      <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="account"
      label="学号"
      width="350">
    </el-table-column>
    <el-table-column
      prop="create_at"
      label="申请时间"
      width="450">
    </el-table-column>
    <el-table-column
      prop="type"
      label="请假类型"
      width="240">
    </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small">
            审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  
</template>

<script>
  export default {
    methods: {
      deleteRow(index, rows) {
        /*rows.splice(index, 1);*/
        this.$store.state.examine = 'examine';
        this.$store.state.name = this.tableData[index].name;
        this.$store.state.class = this.tableData[index].class;
        if(this.tableData[index].type == "事假")
        {
            this.$store.state.type1 = true;
            this.$store.state.type2 = false;
        }
        else
        {
            this.$store.state.type2 = true;
            this.$store.state.type1 = false;
        };
        this.$store.state.id = this.tableData[index].id;
        this.$store.state.apply_time = this.tableData[index].apply_time;
        this.$store.state.reason = this.tableData[index].reason;
      }
    },
    data() {
      return {
        tableData: []
      }
    },
    created: function () {
        //去后端获取待审批数据
        this.$axios.post("/api/leave/show_leave", {
            }, {}).then(value => {
                for(let i = 0; i < value.data.length; i++)
                {
                    if(value.data[i].type == 1)
                    {
                        value.data[i].type = "事假";
                    }
                    else
                    {
                        value.data[i].type = "病假";
                    }
                }
                this.tableData = this.tableData.concat(value.data);
            }, reason => {
                console.log(reason);
        })
    },
  }
</script>

<style scoped lang="less">
  /deep/ .cell {
    overflow: visible!important;
  }
</style>
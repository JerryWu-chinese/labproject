<template>
  <el-table class="huaxia"
    :data="tableData"
    style="width: 100%"
    max-height="500">
    <el-table-column
      prop="name"
      label="姓名"
      width="170">
    </el-table-column>
    <el-table-column
      prop="account"
      label="学号"
      width="190">
    </el-table-column>
    <el-table-column
      fixed
      prop="create_at"
      label="申请时间"
      width="170">
    </el-table-column>
    <el-table-column
      prop="type"
      label="请假类型"
      width="140">
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
        //点击审核，显示组件，并给 Vuex 中数据赋值
        deleteRow(index, rows) {
            this.$emit('fhide');
            this.$store.state.index = index;
            this.$store.state.name = this.$store.state.tableData[index].name;
            this.$store.state.class = this.$store.state.tableData[index].class;
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
            this.$store.state.id = this.$store.state.tableData[index].id;
            this.$store.state.apply_time = this.$store.state.tableData[index].apply_time;
            this.$store.state.reason = this.$store.state.tableData[index].reason;
            this.$store.state.veto_reason = this.$store.state.tableData[index].veto_reason;
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
                this.$store.state.tableData = this.$store.state.tableData.concat(value.data);
                //console.log(this.tableData);
            }, reason => {
                console.log(reason);
        })
    },
    data() {
      return {
          tableData: []
      }
    }
  }
</script>

<style scoped>
    .huaxia {
        position: absolute;
        top: 275px;
        right: 340px;
        width: 50%!important;
        border: 1px solid #000;
    }
</style>
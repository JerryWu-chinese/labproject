<template>
    <div>
        <h1>原因填写1</h1>
        <i @click="chacha">X</i>
        <textarea rows="10" cols="40" v-model="veto_reason"></textarea>
        <button @click="sendchacha">确定</button>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            veto_reason: ''
        }
    },
    methods: {
        chacha() {
            this.$emit('fchacha');
        },
        ////审批请假——否决
        sendchacha() {
            this.$emit('fchacha');
            this.$store.state.veto_reason = this.veto_reason;
            this.$axios.post("/api/leave/leave_veto", {
                veto_reason: this.$store.state.veto_reason,
                id: this.$store.state.id
            }, {}).then(value => {
                if(value.data.code==200 && this.$store.state.index>-1)
                {
                    //this.$store.state.tableData.splice(this.$store.state.index, 1);
                    this.veto_reason = '';
                    location.reload();
                }
            }, reason => {
                console.log(reason);
            })
        }
    }
}
</script>

<style scoped>
    div {
        position: absolute;
        bottom: 350px;
        right: 650px;
        width: 350px;
        height: 250px;
        border: 1px solid #000;
        text-align: center;
        background-color: #fff;
        z-index: 999;
    }
    i {
        position: absolute;
        top: 0;
        right: 10px;
        font-size: 24px;
    }
    textarea {
        display: block;
        margin: 10px auto 0;
        padding: 5px;
    }
    button {
        width: 60px;
        height: 35px;
        margin-top: 3px;
        background-color: #1E90FF;
        border-radius: 5px;
    }
    @media screen and (max-width: 1271px) {
        div {
            right: 450px;
        }
    }
    @media screen and (max-width: 1045px) {
        div {
            right: 250px;
        }
    }
    @media screen and (max-width: 708px) {
        div {
            right: 150px;
        }
    }
</style>
<template>
    <div>
        <h1>原因填写2</h1>
        <i @click="chacha02">X</i>
        <textarea rows="10" cols="40"></textarea>
        <button @click="chacha02(), agree2()">确定</button>
    </div>
</template>

<script>
export default {
    data: function() {
        return {

        }
    },
    methods: {
        chacha02() {
            this.$emit('fchacha02');
        },
        //修改请假状态为——不通过
        agree2() {
            if(this.$store.state.id2>-1 && this.$store.state.status1!=-1 && this.$store.state.status2!=-1)
            {
                this.$axios.post("/api/admin/examine_staus", {
                    id:this.$store.state.id2,
                    status1:2,
                    status2:this.$store.state.status2
                }, {}).then(value => {
                    if(value.data.code==200)
                    {
                        //console.log("修改成功，否决。");
                        location.reload();
                    }
                    else
                    {
                        //console.log(value.data);
                        //console.log(this.$store.state.id2);
                        //console.log(this.$store.state.status2);
                    }
                }, reason => {
                    console.log(reason);
                })
            }
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
</style>
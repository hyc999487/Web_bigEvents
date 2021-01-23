$(function(){
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        samePwd:function(value){
            if(value === $('[name=oldpwd]').val()){
                return '原密码和新密码不能相同！'
            }
        },
        rePwd:function(value){
            if(value !== $('[name=newPwd]').val()){
                return '两次密码不一致！'
            }
        }
    })
    //为重置密码表单添加事件
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
              if (res.status !== 0) {
                return layui.layer.msg('更新密码失败！')
              }
              layui.layer.msg('更新密码成功！')
              // 重置表单
              $('.layui-form')[0].reset()
            }
        })
    })
})
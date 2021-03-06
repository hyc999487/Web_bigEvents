$(function(){
    // 点击“去注册账号”的链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击“登录账号”的链接
    $('#link_login').on('click',function(){
        $('.reg-box').hide();
        $('.login-box').show();
    })
    // 验证密码框
    // 从layui中获取form对象
    var form = layui.form;
    // 通过form.vaerfy({})函数自定义校验规则
    form.verify({
        // 自定义一个pwd的校验规则
        pwd:[/^[\S]{6,12}$/,'密码必须为6-12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd:function(value){
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val();
            if(pwd !== value){
                return '两次密码不一致!'
            }
        }

    })
    // 监听注册表单的提交事件 http://api-breakingnews-web.itheima.net/
    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) { 
    // 1. 阻止默认的提交行为
        e.preventDefault()
    // 2. 发起Ajax的POST请求
        $.ajax({
            method:'POST',
            url:'api/reguser',
            // 快速获取表单中的数据
            data:$(this).serialize(),
            success:function(res){
                if(res.status != 0){
                    return layer.msg(res.message)
                }
                layer.msg('注册成功',{time:1500},function(){
                    localStorage.setItem('token',res.token);
                    location.href = "login.html"
                })
            }
        })
    })
    // 监听表单登录事件
    $('#form_login').on('submit',function(e){
        // 阻止默认行为
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'api/login',
            data: $(this).serialize(),
            success:function(res){
                if(res.status != 0){
                    return layer.msg(res.message)
                }
                layer.msg('登录成功',{time:1500},function(){
                    localStorage.setItem('token',res.token);
                    location.href = "index.html"
                })
            }
        })
    })
})
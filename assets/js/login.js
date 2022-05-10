$(function() {
    $('#link_reg').on('click', function() {
        $('.login_in').hide()
        $('.login_regin').show()

    })

    $('#link_login').on('click', function() {
        $('.login_regin').hide()
        $('.login_in').show()

    })

    // 调用layui中的 form.verify方法 自定义 验证规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'
        ],
        // 校验两次密码是否一致的规则
        repass: function(value) {
            var pwd = $('#passwd').val()
            if (pwd !== value) {
                return '两次密码不一致！ '
            }
        },
        pas: [
            /^[0-9A-Za-z_]{6,12}$/, '用户名必须6到12位英文字母或数字'
        ]
    })

    // 监听注册表单的事件
    // $('#form_reg').on('submit', function(e) {
    //     e.preventDefault()
    //     $.post('http://www.liulongbin.top:3007/api/reguser', {
    //         username: $('#form_reg [name=username]').val(),
    //         password: $('#form_reg [name=password]').val()
    //     }, function(res) {
    //         if (res.status !== 0) {
    //             return console.log(res.message);
    //         }
    //         console.log('注册成功');
    //     })

    // })
    // 监听注册表单的事件

    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        var YHM = $('#usernames').val()
        var MM = $('#passwd').val()
        $.post('http://www.liulongbin.top:3007/api/reguser', {
            username: YHM,
            password: MM,

        }, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')

            // 模拟点击行为 点击登录按钮 
            $('#link_login').click()
        })
    })


    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: 'http://www.liulongbin.top:3007/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功')
                localStorage.setItem('token', res.token)
                    // console.log(res.token);

                // 跳转到主页后台
                location.herf = './index.html'
            }
        })
    })



})
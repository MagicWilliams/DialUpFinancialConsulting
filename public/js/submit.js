function subForm(){
    $.ajax({
        url:'/addstock',
        type:'post',
        data:$('#form').serialize(),
        success:function(){
        }
    });
}
(function ($){

    $().ready(function (){
        $(".loadUser").click(function(){
            requestUserData($(this).attr("data-id"))
        });
        $(".saveUser").click(function(){
            var userData = {
                id: 3,
                name: "Posted User"
            }
            postUserData(3, userData)
        });
        //updateContent("I'M INJECTED FROM DEMO_AJAX.JS FILE!");
    })

    function updateContent(text){
        var $el = $('#block-demo-ajax-demo-ajax-one .userData');
        $el.html(text);
    }

    function requestUserData(id){
        $.get("demo_ajax_get?id="+id, function(res){
            updateContent(JSON.stringify(res,undefined,2));
        })
    }

    function postUserData(id, data){
        $.post("demo_ajax_post?id="+id, data, function(res){
            updateContent(JSON.stringify(res, undefined, 2));
        })
    }
    
})(jQuery)
//remove ajax itm notification from top bar 
function removeNotificationItmTopBar(nid, byid, pathsend) {
    var notif_errbl = $('.notif_remove_ress');
    var btn_dngr = $('.btn.notification_itm_ico span');
    var modal_body = $('.modal_body_pos_centr');
    notif_errbl.fadeOut("fast");

    if (nid && byid && pathsend) {
        $.ajax({
            url: pathsend,
            method: 'get',
            dataType: 'json',
            success: function(data){
                //var obj = jQuery.parseJSON(data);
                if (data.status == true) {
                    notif_errbl.html("<p class='notif_st_tru'>Removed sucessfull</p>");
                    notif_errbl.fadeIn("fast");
                    $("#"+byid).hide();

                    if (data.count == 0) {
                        btn_dngr.removeClass("notification_linck_itm_ico_dngr");
                        btn_dngr.addClass("notification_linck_itm_ico_none");
                        modal_body.html("<div class='notif_none'>There are no messages.</div>");
                    }
                }else if(data.status == false) {
                    notif_errbl.html("<p class='notif_st_false'>"+data.msg+"</p>");
                    notif_errbl.fadeIn("fast");
                }
            },
            error: function (jqXHR, exception) {
                var sherr;
                if (jqXHR.status === 0) {
                    sherr = 'Not connect. Verify Network.';
                } else if (jqXHR.status == 404) {
                    sherr = 'Requested page not found (404).';
                } else if (jqXHR.status == 500) {
                    sherr = 'Internal Server Error (500).';
                } else if (exception === 'parsererror') {
                    sherr = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    sherr = 'Time out error.';
                } else if (exception === 'abort') {
                    sherr = 'Ajax request aborted.';
                } else {
                    sherr = 'Uncaught Error. ' + jqXHR.responseText;
                }
                if (sherr) {
                    notif_errbl.html("<p class='notif_st_false'>"+sherr+"</p>");
                    notif_errbl.fadeIn("fast");
                }
            }
        });
    }else{
        console.log("Arguments is empty")
    }
}
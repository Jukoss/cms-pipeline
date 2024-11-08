let timeoutID = null;

function getMockData() {
    const response = [
        {
            "busines_name": "Text 1",
            "program_type": "Text",
            "url": "https://link.to.item/123",
        },
        {
            "busines_name": "Text 2",
            "program_type": "Text",
            "url": "https://link.to.item/123",
        },
    ];

    const options = response.map(item => (`<a class="dropdown-item" target="_blank" href="${item.url}">${item.busines_name}</a>`))
    $(".dropdown-menu").html(options.join(""));
    $('.dropdown-toggle').dropdown('toggle');
}

function getRealData(data) {
    $.ajax({
        url: "/",
        cache: false,
        dataType: "json",
        type: "POST",
        data: data,
        success: function(result) {
            const options = result.map(item => (`<a class="dropdown-item" target="_blank" rel="noopener noreferrer" href="${item.url}">${item.busines_name}</a>`))
            $(".dropdown-menu").html(options.join(""));
            $('.dropdown-toggle').dropdown('toggle');
        },
        error:function(error){
            $(".dropdown-menu").html(`<span class="dropdown-item">${error[0].msg}</span>`);
            $('.dropdown-toggle').dropdown('toggle');
        }
    });
}

$("#search").keyup(function() {
    if($(this).val().length > 0) {
        $(this).parent().addClass("active");
        $('body').addClass("active-search");
    } else {
        $(this).parent().removeClass("active");
        $('body').removeClass("active-search");
    }
    clearTimeout(timeoutID);
//   const value = e.target.value;
//   getRealData(value);
    timeoutID = setTimeout(() => getMockData(), 500);
});

$(".cancel").click(function() {
    $("#search").val("");
    $(this).parent().removeClass("active");
    $('body').removeClass("active-search");
});


$(document).on('click', '.search .dropdown-menu', function (e) {
    e.stopPropagation();
});

$(document).on('click', '.active-search', function (e) {
    $("#search").val("");
    $(".search").removeClass("active");
    $('body').removeClass("active-search");
});

function getUrlParameter(sParam) {
    const sPageURL = window.location.search.substring(1);
    const sURLVariables = sPageURL.split('&');
        

    for (let i = 0; i < sURLVariables.length; i++) {
        let sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

const page = getUrlParameter('page') || 1;
const pages = $(".page-item").toArray().length - 2;

$(".page-item.active").removeClass("active");
const activePage = $(".page-item").removeClass("active").toArray()[page];
$(activePage).addClass("active");

$(".prev-link").click((e) => {
    e.preventDefault();
    if(page > 1) {
        location.href = `?page=${page-1}`;
    }
})

$(".next-link").click((e) => {
    e.preventDefault();
    if(page < pages) {
        location.href = `?page=${+page+1}`;
    }
})

const submissionDate = getUrlParameter('submission-date');

if(submissionDate === "up") {
    $(".submission-date").addClass("up");
} else if(submissionDate === "down") {
    $(".submission-date").addClass("down");
}

$(".submission-date").click((e) => {
    $submissionDate = $(e.currentTarget);
    if($submissionDate.hasClass("up")) {
        $submissionDate.addClass("down");
        location.href = `?submission-date=down`;
    } else if($submissionDate.hasClass("down")) {
        $submissionDate.removeClass("down");
        location.href = `?`;
    } else {
        location.href = `?submission-date=up`;
        $submissionDate.addClass("up");
    }
});

const d = new Date();
const month = d.toLocaleString('en-GB', { month: 'long' });
const year = d.getFullYear();

$(".current-month").html(`${month} ${year}`);


$('.prev-month').click(function(){
    const past = new Date(d.setMonth(d.getMonth() -1));
    $(".current-month").html(past.toLocaleString('en-GB', { month: 'long' })+' '+past.getFullYear());
    // location.href = `?date=${past.getMonth()}-${past.getFullYear()}`;
});

$('.next-month').click(function(){
    const future = new Date(d.setMonth(d.getMonth() +1));
    $(".current-month").html(future.toLocaleString('en-GB', { month: 'long' })+' '+future.getFullYear());
});

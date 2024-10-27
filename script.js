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
            const options = result.map(item => (`<a class="dropdown-item" target="_blank" href="${item.url}">${item.busines_name}</a>`))
            $(".dropdown-menu").html(options.join(""));
            $('.dropdown-toggle').dropdown('toggle');
        },
        error:function(error){
            $(".dropdown-menu").html(`<span class="dropdown-item">${error[0].msg}</span>`);
            $('.dropdown-toggle').dropdown('toggle');
        }
    });
}

$("#search").keyup(function(e) {
  clearTimeout(timeoutID);
//   const value = e.target.value;
//   getRealData(value);
  timeoutID = setTimeout(() => getMockData(), 500);
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

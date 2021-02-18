$(document).ready(function () {
    if (getUrlParameter('id')){
        var promiseTeams = new Promise(loadTeamsList);
        promiseTeams.then(fillInputs);
    }
    else{
        loadTeamsList();
    }
    $('#btn-save').on("click", function(){saveItem()});
})

function loadTeamsList(resolve, reject){
    $.ajax({
        url: BASE_URL + "plays-service/teams",
        method: "GET",
        dataType: 'json',
        headers:{
            "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI2MTY0MzcsImlzcyI6IjIifQ.YMhf7KM3eSaEwPLjRtsC5z7VFsTo3oZe47MJgg_qxZg",
        },
        success: function (response) {            
            if (response.success === true) {
                $.each(response.data, function (i, item) {
                    $("#team-id").append("<option value='"+item.id+"'>"+item.name+"</option>");
                });
                resolve(1);
            }
        }
    })
}

function fillInputs() {
    var id = getUrlParameter('id');
    $.ajax({
        url: BASE_URL + "pages-service/pages/page/"+id+"?lang=all",
        method: "GET",
        dataType: 'json',
        success: function (response) {            
            if (response.success === true) {
                response.data.content.forEach(function(item){
                    if (item.lang === 'RU'){
                        $('#title-ru').val(item.title);
                        $('#img-ru').val(item.img_url);
                        $('#content-ru').val(item.content);
                    }
                    if (item.lang === 'KG'){
                        $('#title-kg').val(item.title);
                        $('#img-kg').val(item.img_url);
                        $('#content-kg').val(item.content);
                    }
                    if (item.lang === 'EN'){
                        $('#title-en').val(item.title);
                        $('#img-en').val(item.img_url);
                        $('#content-en').val(item.content);
                    }
                  })
                $('#page-name').val(response.data.name); //
                $('#team-id').val(response.data.team_id);
            }
        }
    })
}

function generateObject()
{
    var contentRU = null;
    var contentKG = null;
    var contentEN = null;
    
    if ($('#title-ru').val()){
        contentRU = {
            "lang": "RU",
            "title": $('#title-ru').val(),
            "img_url": $('#img-ru').val(),
            "content": $('#content-ru').val()
        }    
    }

    if ($('#title-kg').val()){
        contentKG = {
            "lang": "KG",
            "title": $('#title-kg').val(),
            "img_url": $('#img-kg').val(),
            "content": $('#content-kg').val()
        }
    }

    if ($('#title-en').val()){
        contentEN = {
            "lang": "EN",
            "title": $('#title-en').val(),
            "img_url": $('#img-en').val(),
            "content": $('#content-en').val()
        }
    }
    return {
        "name": $('#page-name').val(),
        "team_id": parseInt($('#team-id').val()),
        "content": [
            contentRU,
            contentKG,
            contentEN
        ]
    }
}

function saveItem(){
    var method = "POST";
    var data = generateObject()

    var id = getUrlParameter('id');    
    if (id){
        method = "PUT"
        data.id = parseInt(id);
    }

    $.ajax({
        url: BASE_URL + "pages-service/pages/page",
        method: method,
        dataType: 'json',
        headers:{
            "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI2MTY0MzcsImlzcyI6IjIifQ.YMhf7KM3eSaEwPLjRtsC5z7VFsTo3oZe47MJgg_qxZg",
        },
        data: JSON.stringify(data),
        success: function (response) {
            if (response.success === true)
            {
                $('#success-modal').modal('show');
            }
            else{
                $('#error-modal').modal('show');
                $('#error-body').append(response.error);
            }
        },
        error: function(response){
            $('#error-modal').modal('show');
            $('#error-body').append(response.responseText);
        }
    })
}
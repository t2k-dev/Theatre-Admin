$(document).ready(function () {  
    if (getUrlParameter('id')){
        $('#caption').text("Изменить спектакль");
        
        var promiseTeams = new Promise(loadTeamsList);
        promiseTeams.then(fillInputs);
    }
    else{
        $('#caption').text("Новый спектакль");
        loadTeamsList();
    }

    $('#btn-save').on("click", function () {
        saveItem();        
    });    
});

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
        url: BASE_URL + "plays-service/plays/play/" + id + "?lang=all",
        method: "GET",
        dataType: 'json',
        success: function (response) {            
            if (response.success === true) {
                response.data.content.forEach(function(item){
                    if (item.lang === 'RU'){
                        $('#name-ru').val(item.name);
                        $('#audio-ru').val(item.track_url);
                        $('#video-ru').val(item.video_url);
                        $('#desc-ru').val(item.desc);
                        $('#short-desc-ru').val(item.short_desc);
                    }
                    if (item.lang === 'KG'){
                        $('#name-kg').val(item.name);
                        $('#audio-kg').val(item.track_url);
                        $('#video-kg').val(item.video_url);
                        $('#desc-kg').val(item.desc);
                        $('#short-desc-kg').val(item.short_desc);                        
                    }
                    if (item.lang === 'EN'){
                        $('#name-en').val(item.name);
                        $('#audio-en').val(item.track_url);
                        $('#video-en').val(item.video_url);
                        $('#desc-en').val(item.desc);
                        $('#short-desc-en').val(item.short_desc);                        
                    }
                })
                $('#age-category').val(response.data.age_category);
                $('#team-id').val(response.data.team_id);
                $('#cost').val(response.data.cost);
                //$('#is-free').val(response.data.is_free);
                $('#is-free').prop('checked', response.data.is_free);
                $('#img-url').val(response.data.img_url);
                $('#duration-min').val(response.data.duration_min);
            }
        }
    })
}

function generateObject()
{
    var contentRU = null;
    var contentKG = null;
    var contentEN = null;
    
    if ($('#name-ru').val()){
        contentRU = {
            "lang": "RU",
            "name": $('#name-ru').val(),
            "track_url": $('#audio-ru').val(),
            "video_url": $('#video-ru').val(),
            "short_desc": $('#short-desc-ru').val(),
            "desc": $('#desc-ru').val()
        }    
    }
    if ($('#name-kg').val()){
        contentKG = {
            "lang": "KG",
            "name": $('#name-kg').val(),
            "track_url": $('#audio-kg').val(),
            "video_url": $('#video-kg').val(),
            "short_desc": $('#short-desc-kg').val(),
            "desc": $('#desc-kg').val()
        }
    }
    if ($('#name-en').val()){
        contentEN = {
            "lang": "EN",
            "name": $('#name-en').val(),
            "track_url": $('#audio-en').val(),
            "video_url": $('#video-en').val(),
            "short_desc": $('#short-desc-en').val(),
            "desc": $('#desc-en').val()
        }
    }
    
    return  {
        "age_category": $('#age-category').val(),
        "team_id": parseInt($('#team-id').val()),
        "cost": parseInt($('#cost').val()),
        "is_free": $('#is-free').prop('checked'),
        "img_url": $('#img-url').val(),
        "duration_min": parseInt($('#duration-min').val()),
        "content":[
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
        url: BASE_URL + "plays-service/plays/play",
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
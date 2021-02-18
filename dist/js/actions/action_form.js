$(document).ready(function () {  
    if (getUrlParameter('id')){
        fillInputs();
        $('#caption').text("Изменить событие");
    }
    else{
        $('#caption').text("Новое событие");
    }

    $('#btn-save').on("click", function(){saveItem()});
})


function fillInputs() {
    var id = getUrlParameter('id');
    $.ajax({
        url: BASE_URL + "plays-service/actions/action/"+id +"?lang=all",
        method: "GET",
        dataType: 'json',
        success: function (response) {            
            if (response.success === true) {
                response.data.Content.forEach(function(item){
                    if (item.Lang === 'RU'){
                        $('#name-ru').val(item.Name);
                        $('#audio-ru').val(item.TrackUrl);
                        $('#video-ru').val(item.VideoUrl);
                        $('#desc-ru').val(item.Desc);
                    }
                    if (item.Lang === 'KG'){
                        $('#name-kg').val(item.Name);
                        $('#audio-kg').val(item.TrackUrl);
                        $('#video-kg').val(item.VideoUrl);
                        $('#desc-kg').val(item.Desc);
                    }
                    if (item.Lang === 'EN'){
                        $('#name-en').val(item.Name);
                        $('#audio-en').val(item.TrackUrl);
                        $('#video-en').val(item.VideoUrl);
                        $('#desc-en').val(item.Desc);
                    }
                })
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
            "Lang": "RU",
            "Name": $('#name-ru').val(),
            "TrackUrl": $('#audio-ru').val(),
            "VideoUrl": $('#video-ru').val(),
            "Desc": $('#desc-ru').val(),
        }    
    }

    if ($('#name-kg').val()){
        contentKG = {
            "Lang": "KG",
            "Name": $('#name-kg').val(),
            "TrackUrl": $('#audio-kg').val(),
            "VideoUrl": $('#video-kg').val(),
            "Desc": $('#desc-kg').val(),
        }
    }

    if ($('#name-en').val()){
        contentEN = {
            "Lang": "EN",
            "Name": $('#name-en').val(),
            "TrackUrl": $('#audio-en').val(),
            "VideoUrl": $('#video-en').val(),
            "Desc": $('#desc-en').val(),
        }
    }
    
    return  {
        "Content":[
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
        data.Id = parseInt(id);
    }

    $.ajax({
        url: BASE_URL + "plays-service/actions/action",
        method: method,
        dataType: 'json',
        headers:{
            "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI2MTY0MzcsImlzcyI6IjIifQ.YMhf7KM3eSaEwPLjRtsC5z7VFsTo3oZe47MJgg_qxZg",
        },
        data: JSON.stringify(data),
        success: function (response) {
            if (response.success === true)
            {
                alert('Сохранено')
            }
        }
    })
}
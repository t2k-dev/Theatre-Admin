$(document).ready(function () {  
    if (getUrlParameter('id')){
        fillInputs();
        $('#caption').text("Изменить маркер");
    }
    else{
        $('#caption').text("Новый маркер");        
    }

    $('#btn-save').on("click", function(){saveItem()});
})


function fillInputs() {
    var id = getUrlParameter('id');
    $.ajax({
        url: BASE_URL + "plays-service/markers/marker/"+id +"?lang=all",
        method: "GET",
        dataType: 'json',
        success: function (response) {            
            if (response.success === true) {
                $('#coor-x').val(response.data.coor_x);
                $('#coor-y').val(response.data.coor_y);
                response.data.action.forEach(function(item){
                    if (item.lang === 'RU'){
                        $('#name-ru').val(item.name);
                        $('#audio-ru').val(item.track_url);
                        $('#video-ru').val(item.video_url);
                        $('#desc-ru').val(item.desc);
                    }
                    if (item.lang === 'KG'){
                        $('#name-kg').val(item.name);
                        $('#audio-kg').val(item.track_url);
                        $('#video-kg').val(item.video_url);
                        $('#desc-kg').val(item.desc);
                    }
                    if (item.lang === 'EN'){
                        $('#name-en').val(item.name);
                        $('#audio-en').val(item.track_url);
                        $('#video-en').val(item.video_url);
                        $('#desc-en').val(item.desc);
                    }
                })
            }
        }
    })
}

function generateObject()
{
    var actionRU = null;
    var actionKG = null;
    var actionEN = null;
    
    if ($('#name-ru').val()){
        actionRU = {
            "lang": "RU",
            "name": $('#name-ru').val(),
            "track_url": $('#audio-ru').val(),
            "video_url": $('#video-ru').val(),
            "desc": $('#desc-ru').val()
        }    
    }

    if ($('#name-kg').val()){
        actionKG = {
            "lang": "KG",
            "name": $('#name-kg').val(),
            "track_url": $('#audio-kg').val(),
            "video_url": $('#video-kg').val(),
            "desc": $('#desc-kg').val()
        }
    }

    if ($('#name-en').val()){
        actionEN = {
            "lang": "EN",
            "name": $('#name-en').val(),
            "track_url": $('#audio-en').val(),
            "video_url": $('#video-en').val(),
            "desc": $('#desc-en').val()
        }
    }
    
    return  {
        "coor_x": $('#coor-x').val(),
        "coor_y": $('#coor-y').val(),
        "action":[
            actionRU,
            actionKG,
            actionEN
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
        url: BASE_URL + "plays-service/markers/marker",
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
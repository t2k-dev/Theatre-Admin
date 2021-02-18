$(document).ready(function () {  
    if (getUrlParameter('id')){
        var promiseRoles = new Promise(loadMemberRolesList);
        var promiseTeams = new Promise(loadTeamsList);
        promiseRoles.then(promiseTeams.then(fillInputs));
    }
    else{
        loadMemberRolesList();
        loadTeamsList();
    }

    $('#btn-save').on("click", function(){saveItem()});
})

function loadMemberRolesList(resolve, reject){
    $.ajax({
        url: BASE_URL + "plays-service/roles",
        method: "GET",
        dataType: 'json',
        headers:{
            "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI2MTY0MzcsImlzcyI6IjIifQ.YMhf7KM3eSaEwPLjRtsC5z7VFsTo3oZe47MJgg_qxZg",
        },
        success: function (response) {            
            if (response.success === true) {
                $.each(response.data, function (i, item) {
                    $("#member-role").append("<option value='"+item.id+"'>"+item.name_ru+"</option>");
                });
                resolve(1);
            }
        }
    })
}

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
                    $("#member-team").append("<option value='"+item.id+"'>"+item.name+"</option>");
                });
                resolve(1);
            }
        }
    })
}

function fillInputs() {
    var id = getUrlParameter('id');
    $.ajax({
        url: BASE_URL + "plays-service/members/member/"+id+"?lang=all",
        method: "GET",
        dataType: 'json',
        success: function (response) {            
            if (response.success === true) {
                response.data.member_info.forEach(function(item){
                    if (item.lang === 'RU'){
                        $('#first-name-ru').val(item.first_name);
                        $('#last-name-ru').val(item.last_name);
                        $('#middle-name-ru').val(item.middle_name);
                        $('#desc-ru').val(item.desc);
                    }
                    if (item.lang === 'KG'){
                        $('#first-name-kg').val(item.first_name);
                        $('#last-name-kg').val(item.last_name);
                        $('#middle-name-kg').val(item.middle_name);
                        $('#desc-kg').val(item.desc);
                    }
                    if (item.lang === 'EN'){
                        $('#first-name-en').val(item.first_name);
                        $('#last-name-en').val(item.last_name);
                        $('#middle-name-en').val(item.middle_name);
                        $('#desc-en').val(item.desc);
                    }
                  })
                $('#member-role').val(response.data.role_id); //
                $('#member-team').val(response.data.team_id); //
                $('#member-avatarUrl').val(response.data.avatar_url);
            }
        }
    })
}

function generateObject()
{
    var memberInfoRU = null;
    var memberInfoKG = null;
    var memberInfoEN = null;
    
    if ($('#first-name-ru').val()){
        memberInfoRU = {
            "lang": "RU",
            "first_name": $('#first-name-ru').val(),
            "last_name": $('#last-name-ru').val(),
            "middle_name": $('#middle-name-ru').val(),
            "desc": $('#desc-ru').val(),
        }    
    }

    if ($('#first-name-kg').val()){
        memberInfoKG = {
            "lang": "KG",
            "first_name": $('#first-name-kg').val(),
            "last_name": $('#last-name-kg').val(),
            "middle_name": $('#middle-name-kg').val(),
            "desc": $('#desc-kg').val(),
        }
    }

    if ($('#first-name-en').val()){
        memberInfoEN = {
            "lang": "EN",
            "first_name": $('#first-name-en').val(),
            "last_name": $('#last-name-en').val(),
            "middle_name": $('#middle-name-en').val(),
            "desc": $('#desc-en').val(),
        }
    }
    return {
        "role_id": parseInt($('#member-role').val()),
        "team_id": parseInt($('#member-team').val()),
        "avatar_url": $('#member-avatarUrl').val(),
        "member_info": [
            memberInfoRU,
            memberInfoKG,
            memberInfoEN
        ]
    }
}

function saveItem(){
    var method = "POST";
    var appendReq = "";
    var data = generateObject()

    var id = getUrlParameter('id');    
    if (id){
        method = "PUT"
        appendReq = "/"+ id;
        data.id = parseInt(id);
    }

    $.ajax({
        url: BASE_URL + "plays-service/members/member",
        method: method,
        dataType: 'json',
        headers:{
            "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI2MTY0MzcsImlzcyI6IjIifQ.YMhf7KM3eSaEwPLjRtsC5z7VFsTo3oZe47MJgg_qxZg",
        },
        data: JSON.stringify(data),
        success: function (response) {
            if (response.success === true)
            {
                alert('Сохранено');
                window.location.href = "members.html";
            }
        }
    })
}
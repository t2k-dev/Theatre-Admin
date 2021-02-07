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

    //$('#btn-save').on("click", function(){saveItem()});
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
                    $("#member-role").append("<option value='"+item.Id+"'>"+item.NameRU+"</option>");
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
                    $("#member-team").append("<option value='"+item.Id+"'>"+item.Name+"</option>");
                });
                resolve(1);
            }
        }
    })
}

function fillInputs() {
    var id = getUrlParameter('id');
    $.ajax({
        url: BASE_URL + "plays-service/members/member/"+id,
        method: "GET",
        dataType: 'json',
        success: function (response) {            
            if (response.success === true) {
                response.data.MemberInfos.forEach(function(item){
                    if (item.Lang === 'RU'){
                        $('#first-name-ru').val(item.FirstName);
                        $('#last-name-ru').val(item.LastName);
                        $('#middle-name-ru').val(item.MiddleName);
                        $('#desc-ru').val(item.Desc);
                    }
                    if (item.Lang === 'KG'){
                        $('#first-name-kg').val(item.FirstName);
                        $('#last-name-kg').val(item.LastName);
                        $('#middle-name-kg').val(item.MiddleName);
                        $('#desc-kg').val(item.Desc);
                    }
                    if (item.Lang === 'EN'){
                        $('#first-name-en').val(item.FirstName);
                        $('#last-name-en').val(item.LastName);
                        $('#middle-name-en').val(item.MiddleName);
                        $('#desc-en').val(item.Desc);
                    }
                  })
                $('#member-role').val(response.data.RoleId); //
                $('#member-team').val(response.data.TeamId); //
                $('#member-avatarUrl').val(response.data.AvatarUrl);
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
            "Lang": "RU",
            "FirstName": $('#first-name-ru').val(),
            "LastName": $('#last-name-ru').val(),
            "MiddleName": $('#middle-name-ru').val(),
            "Desc": $('#desc-ru').val(),
        }    
    }

    if ($('#first-name-kg').val()){
        memberInfoKG = {
            "Lang": "KG",
            "FirstName": $('#first-name-kg').val(),
            "LastName": $('#last-name-kg').val(),
            "MiddleName": $('#middle-name-kg').val(),
            "Desc": $('#desc-kg').val(),
        }
    }

    if ($('#first-name-en').val()){
        memberInfoEN = {
            "Lang": "EN",
            "FirstName": $('#first-name-en').val(),
            "LastName": $('#last-name-en').val(),
            "MiddleName": $('#middle-name-en').val(),
            "Desc": $('#desc-en').val(),
        }
    }
    return {
        "RoleId": parseInt($('#member-role').val()),
        "TeamId": parseInt($('#member-team').val()),
        "AvatarUrl": $('#member-avatarUrl').val(),
        "MemberInfos": [
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
        data.Id = parseInt(id);
    }

    $.ajax({
        url: BASE_URL + "plays-service/members/member" + appendReq,
        method: method,
        dataType: 'json',
        headers:{
            "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI2MTY0MzcsImlzcyI6IjIifQ.YMhf7KM3eSaEwPLjRtsC5z7VFsTo3oZe47MJgg_qxZg",
        },
        data: JSON.stringify(data),
        success: function (response) {
            if (response.success === true)
            {
                alert('Команда сохранена')
            }
        }
    })
}
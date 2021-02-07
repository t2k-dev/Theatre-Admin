$(document).ready(function () {
    fillInputs();
    $('#btn-save').on("click", function () {
        saveChanges();
    });


})

function fillInputs() {
    var id = getUrlParameter('id');
    $.ajax({
        url: "http://api.mestodteatr.kg/plays-service/roles/role/"+id,
        method: "GET",
        dataType: 'json',
        success: function (response) {            
            if (response.success === true) {
                $('#edit-name-ru').val(response.data.NameRU);
                $('#edit-name-kg').val(response.data.NameKG);
                $('#edit-name-en').val(response.data.NameEN);
                $('#edit-id').val(response.data.Id);                
            }
        }
    })
}

function saveChanges() {
    alert($('#edit-name-ru').val());
    var data = {
        "Id" : parseInt($('#edit-id').val()),
        "NameRU": $('#edit-name-ru').val(),
        "NameKG": $('#edit-name-kg').val(),
        "NameEN": $('#edit-name-en').val()
    }
    $.ajax({
        url: "http://api.mestodteatr.kg/plays-service/roles/role",
        method: "PUT",
        dataType: 'json',
        headers:{
            "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI2MTY0MzcsImlzcyI6IjIifQ.YMhf7KM3eSaEwPLjRtsC5z7VFsTo3oZe47MJgg_qxZg",
        },
        data: JSON.stringify(data),
        success: function (response) {
            if (response.success === true)
            {
                alert('Роль изменена');
                window.location.href = "member_roles.html";
            }
        }
    })
}



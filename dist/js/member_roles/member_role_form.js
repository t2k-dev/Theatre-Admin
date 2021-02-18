$(document).ready(function () {
    fillInputs();
    $('#btn-save').on("click", function () {
        saveChanges();
    });


})

function fillInputs() {
    var id = getUrlParameter('id');
    $.ajax({
        url: BASE_URL + "plays-service/roles/role/"+id,
        method: "GET",
        dataType: 'json',
        success: function (response) {            
            if (response.success === true) {
                $('#edit-name-ru').val(response.data.name_ru);
                $('#edit-name-kg').val(response.data.name_kg);
                $('#edit-name-en').val(response.data.name_en);
                $('#edit-id').val(response.data.id);
            }
        }
    })
}

function saveChanges() {
    alert($('#edit-name-ru').val());
    var data = {
        "id" : parseInt($('#edit-id').val()),
        "name_ru": $('#edit-name-ru').val(),
        "name_kg": $('#edit-name-kg').val(),
        "name_en": $('#edit-name-en').val()
    }
    $.ajax({
        url: BASE_URL + "plays-service/roles/role",
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



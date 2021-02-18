$(document).ready(function () {
    loadTable();
    $('#btn-add').on("click", function () {
        newItem();        
    });
})

function newItem()
{
    var data = {
        "name_ru": $('#name-ru').val(),
        "name_kg": $('#name-kg').val(),
        "name_en": $('#name-en').val()
    }
    $.ajax({
        url: BASE_URL + "plays-service/roles/role",
        method: "POST",        
        dataType: 'json',
        headers:{
            "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI2MTY0MzcsImlzcyI6IjIifQ.YMhf7KM3eSaEwPLjRtsC5z7VFsTo3oZe47MJgg_qxZg",
        },
        data: JSON.stringify(data),
        success: function (response) {
            if (response.success === true)
            {
                alert('Добавлено');
                loadTable();
            }
        }
    })
}

function deleteItem(id)
{
    $.ajax({
        url: BASE_URL + "plays-service/roles/role/"+id,
        method: "DELETE",        
        dataType: 'json',
        headers:{
            "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI2MTY0MzcsImlzcyI6IjIifQ.YMhf7KM3eSaEwPLjRtsC5z7VFsTo3oZe47MJgg_qxZg",
        },
        success: function (response) {
            if (response.success === true)
            {
                alert('Роль удалена');
                loadTable();
            }
        }
    })
}

function editItem(id)
{
    $('#editId').val(id);
}

function loadTable()
{
    $.ajax({
        url: BASE_URL + "plays-service/roles",
        method: "GET",
        dataType: 'json',
        success: function (response) {            
            if (response.success === true) {
                $('#table-all tbody').remove();
                $('#table-all').append($('<tbody>'));

                $.each(response.data, function (i, item) {
                    var $tr = $('<tr>').append(
                        /*ID*/
                        $("<td>").text(item.id),
                        /*Name*/
                        $('<td>').text(item.name_ru),
                        $('<td>').text(item.name_kg),
                        $('<td>').text(item.name_en),
                        $('<td>').append(
                            $('<a class="btn btn-info btn-sm" href="./member_role_form.html?id='+item.id+'">')
                                .append($('<i class="fas fa-pencil-alt margin-right-5">'))
                                .append('Изменить')
                        ),
                        $('<td>').append(
                            $('<a class="btn btn-danger btn-sm" href="#">')
                                .append($('<i class="fas fa-trash margin-right-5">'))
                                .append('Удалить')
                                .on('click', function(){deleteItem(item.id)}))
                    );

                    $tr.appendTo('#table-all tbody');
                });
            }
        }
    })
}
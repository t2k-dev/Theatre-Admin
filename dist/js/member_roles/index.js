$(document).ready(function () {
    loadTable();
    $('#btn-add').on("click", function () {
        newItem();        
    });
})

function newItem()
{
    var data = {
        "NameRU": $('#name-ru').val(),
        "NameKG": $('#name-kg').val(),
        "NameEN": $('#name-en').val()
    }
    $.ajax({
        url: "http://api.mestodteatr.kg/plays-service/roles/role",
        method: "POST",        
        dataType: 'json',
        headers:{
            "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI2MTY0MzcsImlzcyI6IjIifQ.YMhf7KM3eSaEwPLjRtsC5z7VFsTo3oZe47MJgg_qxZg",
        },
        data: JSON.stringify(data),
        success: function (response) {
            if (response.success === true)
            {
                alert('Роль добавлена');
                loadTable();
            }
        }
    })
}

function deleteItem(id)
{
    var data = {
        "NameRU": $('#name-ru').val(),
        "NameKG": $('#name-kg').val(),
        "NameEN": $('#name-en').val()
    }
    $.ajax({
        url: "http://api.mestodteatr.kg/plays-service/roles/role/"+id,
        method: "DELETE",        
        dataType: 'json',
        headers:{
            "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI2MTY0MzcsImlzcyI6IjIifQ.YMhf7KM3eSaEwPLjRtsC5z7VFsTo3oZe47MJgg_qxZg",
        },
        data: JSON.stringify(data),
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
        url: "http://api.mestodteatr.kg/plays-service/roles",
        method: "GET",
        dataType: 'json',
        success: function (response) {            
            if (response.success === true) {
                $('#table-all tbody').remove();
                $('#table-all').append($('<tbody>'));

                $.each(response.data, function (i, item) {
                    var $tr = $('<tr>').append(
                        /*ID*/
                        $("<td>").text(item.Id),
                        /*Name*/
                        $('<td>').text(item.NameRU),
                        $('<td>').text(item.NameKG),
                        $('<td>').text(item.NameEN),
                        $('<td>').append(
                            $('<a class="btn btn-info btn-sm" href="./member_role_form.html?id='+item.Id+'">')
                                .text('Изменить')
                                .append($('<i class="fas fa-pencil-alt margin-left-5">'))
                        ),
                        $('<td>').append(
                            $('<a class="btn btn-danger btn-sm" href="#">')
                                .text('Удалить ')
                                .append($('<i class="fas fa-trash margin-left-5">'))
                                .on('click', function(){deleteItem(item.Id)})),
                    );

                    $tr.appendTo('#table-all tbody');
                });
            }
        }
    })
}
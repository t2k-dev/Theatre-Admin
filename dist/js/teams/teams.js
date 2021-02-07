$(document).ready(function () {
    loadTable();
    
    $('#btn-add').on("click", function () {
        newTeam();
        loadTable();
    });
    $('#btn-save').on("click", function () {
        saveItem();
    });

    
})

function newItem()
{
    var data = {
        "Name" : $('#add-name').val()
    }
    $.ajax({
        url: "http://api.mestodteatr.kg/plays-service/teams/team",
        method: "POST",        
        dataType: 'json',
        headers:{
            "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI2MTY0MzcsImlzcyI6IjIifQ.YMhf7KM3eSaEwPLjRtsC5z7VFsTo3oZe47MJgg_qxZg",
        },
        data: JSON.stringify(data),
        success: function (response) {
            if (response.success === true)
            {
                alert('Добавлено')
            }
        }
    })
}

function saveItem()
{
    var data = {
        "Id" : parseInt($('#edit-Id').val()),
        "Name" : $('#edit-Name').val()
    }

    $.ajax({
        url: "http://api.mestodteatr.kg/plays-service/teams/team",
        method: "PUT",
        dataType: 'json',
        headers:{
            "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI2MTY0MzcsImlzcyI6IjIifQ.YMhf7KM3eSaEwPLjRtsC5z7VFsTo3oZe47MJgg_qxZg",
        },
        data: JSON.stringify(data),
        success: function (response) {
            if (response.success === true)
            {
                alert('Команда сохранена');
                loadTable();
            }
        }
    })
}


function showEditDialog(id,name)
{
    $('#edit-Id').val(id);
    $('#edit-Name').val(name);
}

function deleteItem(id)
{
    $.ajax({
        url: "http://api.mestodteatr.kg/plays-service/teams/team/"+id,
        method: "DELETE",        
        dataType: 'json',
        headers:{
            "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI2MTY0MzcsImlzcyI6IjIifQ.YMhf7KM3eSaEwPLjRtsC5z7VFsTo3oZe47MJgg_qxZg",
        },
        success: function (response) {
            if (response.success === true)
            {
                alert('Команда удалена');
                loadTable();
            }
        }
    })
}


function loadTable()
{
    $.ajax({
        url: "http://api.mestodteatr.kg/plays-service/teams",
        method: "GET",
        dataType: 'json',
        headers:{
            "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI2MTY0MzcsImlzcyI6IjIifQ.YMhf7KM3eSaEwPLjRtsC5z7VFsTo3oZe47MJgg_qxZg",
        },
        success: function (response) {            
            if (response.success === true) {
                $('#table-all tbody').remove();
                $('#table-all').append($('<tbody>'));

                $.each(response.data, function (i, item) {
                    var $tr = $('<tr>').append(
                        /*ID*/
                        $("<td>").text(item.Id),
                        /*Name*/
                        $('<td>').text(item.Name),
                        $('<td class="project-actions">').append(
                            $('<button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#modal-default">')
                                .text('Изменить')
                                .append($('<i class="fas fa-pencil-alt margin-left-5">'))
                                .on('click', function(){showEditDialog(item.Id, item.Name)}),
                        ),
                        $('<td class="project-actions">').append(
                            $('<button class="btn btn-danger btn-sm">')
                                .text('Удалить')
                                .append($('<i class="fas fa-trash margin-left-5">'))
                                .on('click', function(){deleteItem(item.Id)})),
                    );

                    $tr.appendTo('#table-all tbody');
                });
            }
        }
    })
}
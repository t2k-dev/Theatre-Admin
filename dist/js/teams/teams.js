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
        "name" : $('#add-name').val()
    }
    $.ajax({
        url: BASE_URL + "plays-service/teams/team",
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

function saveItem()
{
    var data = {
        "id" : parseInt($('#edit-id').val()),
        "name" : $('#edit-name').val()
    }

    $.ajax({
        url: BASE_URL + "plays-service/teams/team",
        method: "PUT",
        dataType: 'json',
        headers:{
            "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI2MTY0MzcsImlzcyI6IjIifQ.YMhf7KM3eSaEwPLjRtsC5z7VFsTo3oZe47MJgg_qxZg",
        },
        data: JSON.stringify(data),
        success: function (response) {
            if (response.success === true)
            {
                alert('Сохранено');
                loadTable();
            }
        }
    })
}


function showEditDialog(id,name)
{
    $('#edit-id').val(id);
    $('#edit-name').val(name);
}

function deleteItem(id)
{
    $.ajax({
        url: BASE_URL + "plays-service/teams/team/"+id,
        method: "DELETE",        
        dataType: 'json',
        headers:{
            "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI2MTY0MzcsImlzcyI6IjIifQ.YMhf7KM3eSaEwPLjRtsC5z7VFsTo3oZe47MJgg_qxZg",
        },
        success: function (response) {
            if (response.success === true)
            {
                alert('Удалено');
                loadTable();
            }
        }
    })
}


function loadTable()
{
    $.ajax({
        url: BASE_URL + "plays-service/teams",
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
                        $("<td>").text(item.id),
                        /*Name*/
                        $('<td>').text(item.name),
                        $('<td class="project-actions">').append(
                            $('<button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#modal-edit">')
                                .append($('<i class="fas fa-pencil-alt margin-right-5">'))
                                .append("Изменить")
                                .on('click', function(){showEditDialog(item.id, item.name)}),
                        ),
                        $('<td class="project-actions">').append(
                            $('<button class="btn btn-danger btn-sm" data-toggle="modal" data-target="#modal-default">')
                                .append($('<i class="fas fa-trash margin-right-5">'))
                                .append('Удалить')
                                .on('click', function(){deleteItem(item.id)})),
                    );

                    $tr.appendTo('#table-all tbody');
                });
            }
        }
    })
}
$(document).ready(function () {
    loadTable();
})

function loadTable() {
    $.ajax({
        url: BASE_URL + "plays-service/plays?lang=all",
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
                    var $tr = $('<tr data-widget="expandable-table" aria-expanded="false">').append(
                        /*Name*/
                        $('<td>').text(item.content[0].name),
                        $('<td>').text(item.create_date),
                        $('<td>').text(item.age_category),
                        $('<td>').append(
                            $('<a class="btn btn-info btn-sm" href="./play_form.html?id='+item.id+'">')
                                .append($('<i class="fas fa-pencil-alt margin-right-5">'))
                                .append('Изменить')
                        ),
                        $('<td class="project-actions">').append(
                            $('<button class="btn btn-danger btn-sm">')
                                .append($('<i class="fas fa-trash margin-right-5">'))
                                .append('Удалить')
                                .on('click', function(){deleteItem(item.id)})),
                    );
                    var $tr_exp = $('<tr class="expandable-body d-none">').append(
                        $('<td colspan="7">').append($('<p>').text(item.id))
                    );

                    $tr.appendTo('#table-all tbody');
                    $tr_exp.appendTo('#table-all tbody');
                    });
                }
            }
        }
    );
}

function deleteItem(id)
{
    $.ajax({
        url: BASE_URL + "plays-service/plays/play/"+id,
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

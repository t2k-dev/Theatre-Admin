$(document).ready(function () {
    loadTable();
})

function deleteItem(id)
{
    $.ajax({
        url: BASE_URL + "pages-service/pages/page/"+id,
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
        url: BASE_URL + "pages-service/pages?lang=all",
        method: "GET",
        dataType: 'json',
        success: function (response) {            
            if (response.success === true) {
                $('#table-all tbody').remove();
                $('#table-all').append($('<tbody>'));

                $.each(response.data, function (i, item) {
                    var $tr = $('<tr>').append(
                        $('<td>').text(item.name),
                        $('<td>').text(item.team_id),
                        $('<td>').text(item.create_date),
                        $('<td>').append(
                            $('<a class="btn btn-info btn-sm" href="./page_form.html?id='+item.id+'">')
                                .append($('<i class="fas fa-pencil-alt margin-right-5">'))
                                .append('Изменить')
                        ),
                        $('<td class="project-actions">').append(
                            $('<button class="btn btn-danger btn-sm">')
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
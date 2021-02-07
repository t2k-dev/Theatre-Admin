$(document).ready(function () {
    loadTable();
})

function deleteItem(id)
{
    $.ajax({
        url: BASE_URL + "plays-service/members/member/"+id,
        method: "DELETE",        
        dataType: 'json',
        headers:{
            "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI2MTY0MzcsImlzcyI6IjIifQ.YMhf7KM3eSaEwPLjRtsC5z7VFsTo3oZe47MJgg_qxZg",
        },
        success: function (response) {
            if (response.success === true)
            {
                alert('Участник удален');
                loadTable();
            }
        }
    })
}


function loadTable()
{
    $.ajax({
        url: BASE_URL + "plays-service/members",
        method: "GET",
        dataType: 'json',
        success: function (response) {            
            if (response.success === true) {
                $('#table-all tbody').remove();
                $('#table-all').append($('<tbody>'));

                $.each(response.data, function (i, item) {
                    var $tr = $('<tr>').append(
                        /*Name*/
                        $('<td>').text(item.MemberInfos[0].FirstName),
                        $('<td>').text(item.MemberInfos[0].LastName),
                        $('<td>').text(item.MemberInfos[0].MiddleName),
                        $('<td>').text(item.RoleId),
                        $('<td>').append(
                            $('<a class="btn btn-info btn-sm" href="./member_form.html?id='+item.Id+'">')
                                .text('Изменить')
                                .append($('<i class="fas fa-pencil-alt margin-left-5">'))
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
$(document).ready(function () {
    loadTable();
})

function loadTable() {
    

    $.ajax({
        url: "http://api.mestodteatr.kg/plays-service/plays?lang=ru",
        method: "GET",
        dataType: 'json',
        headers:{
            "Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI2MTY0MzcsImlzcyI6IjIifQ.YMhf7KM3eSaEwPLjRtsC5z7VFsTo3oZe47MJgg_qxZg",
//            "Access-Control-Allow-Origin" : "*"
        },
        success: function (response) {
            if (response.success === true) {
                $('#table-all tbody').remove();
                $('#table-all').append($('<tbody>'));

                $.each(response.data, function (i, item) {                    
                    var $tr = $('<tr data-widget="expandable-table" aria-expanded="false">').append(
                        /*Name*/
                        $('<td>').text(item.Id),
                        $('<td>').text(item.Cost),
                        $('<td>').text(item.Content.ShortDesc),
                        $('<td>').text(item.CreateDate),
                        $('<td>').text(item.AgeCategory),
                        $('<td>').append(
                            $('<a class="btn btn-info btn-sm" href="./play_form.html?id='+item.Id+'">')
                                .text('Изменить')
                                .append($('<i class="fas fa-pencil-alt margin-left-5">'))
                        ),
                        $('<td class="project-actions">').append(
                            $('<button class="btn btn-danger btn-sm">')
                                .text('Удалить')
                                .append($('<i class="fas fa-trash margin-left-5">'))
                                .on('click', function(){deleteItem(item.Id)})),
                    );
                    var $tr_exp = $('<tr class="expandable-body d-none">').append(
                        $('<td colspan="7">').append($('<p>').text(item.Id))
                    );

                    $tr.appendTo('#table-all tbody');
                    $tr_exp.appendTo('#table-all tbody');
                });
            }

            /*$('#transactions_table tbody').remove();

            if (result == false) {
                $('#btn-tbl-exp').hide();
            }
            if (result != '') {
                var defCur = $(DefCurr).val();
                $.each(result, function (i, item) {
                    var spendingClass = '';

                    if (item.isSpending == true) {
                        var opChar = '-'
                        spendingClass = 'text-danger'
                    }
                    else {
                        var opChar = '+'
                        spendingClass = 'text-success'
                    }

                    if (item.name == null) {
                        item.name = "---";
                    }

                    var op_class = "";
                    if (item.isPlaned == true) {
                        op_class = "itm-opacity";
                    }
                    var $td_amt = $('<td class="text-right amt ' + spendingClass + '">').text(opChar + String.fromCharCode(160) + item.amount.toLocaleString("ru-RU") + ' ' + defCur).on("click", function () {
                        window.location.href = "/Transaction/Edit/" + item.id;
                    });

                    $tr.appendTo('#transactions_table');
                });*/
            }
        }
    );
}


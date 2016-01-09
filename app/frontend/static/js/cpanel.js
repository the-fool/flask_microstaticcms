function initProdTable() {
    var $table = $('#table');
    var $add = $('#add-tire');
    var $stop = $('#remove-tire');
    var selections = [];

    $table.bootstrapTable({
        cache: false,
        showExport: true,
        exportTypes: ['json', 'xml', 'csv', 'txt'],
        //height: 350,
        id: 'task_id',
        sortName: 'date_begun',
        sortOrder: 'desc',
        detailView: true,
        url: '/api/products',
        columns: [
            {
                field: 'state',
                checkbox: true,
                align: 'center'
            }, {
                title: 'ID',
                field: 'id',
                visible: false,
                align: 'center',
                sortable: true
            }, {
                title: 'Name',
                field: 'name',
                align: 'center',
                sortable: true
	    }, {
                title: 'Started',
                field: 'date_begun',
                align: 'center',
                sortable: true
	    }, {
                title: 'Ended',
                field: 'date_done',
                align: 'center',
                sortable: true
	    }, {
                title: 'Hash',
                field: 'task_id',
                align: 'center',

            }, {
                title: 'Type',
                field: 'simtype',
                align: 'center',
                sortable: true
            }, {
                title: 'Status',
                field: 'status',
                align: 'center',
                sortable: true
            }]
    });

    $table.on('check.bs.table uncheck.bs.table ' +
        'check-all.bs.table uncheck-all.bs.table',
        function () {
            $add.prop('disabled',
                $table.bootstrapTable('getSelections').length);
            $stop.prop('disabled', !$table.bootstrapTable('getSelections').length);
            $table.data('selections', getIdSelections());
            set_tr();
        });

    $stop.click(function () {
        var data = {
            'tid': getIdSelections()
        };
        $('tr.selected').each(function () {
            var $that = $(this).find('td').last()
            if (($that.text() === "PENDING") || ($that.text() === "PROGRESS")) {
                $that.text("Shutting down");
            }
        });

        $.ajax({
            url: '/api/shutdown',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify(data),
            success: function (d, s) {
                $('tr').removeClass('selected');
                $table.bootstrapTable('uncheckAll');
                console.log('status:' + s);
            },
            error: function () {
                alert("error");
            }
        });
    });

    function getIdSelections() {
        return $.map($table.bootstrapTable('getSelections'), function (row) {
            return row['task_id'];
        });
    }
    $table.on('load-success.bs.table', function () {
        $add.prop('disabled', false);
        $stop.prop('disabled', true);
        set_tr();
        $table.find('td:contains("PENDING"), td:contains("PROGRESS")').each(update_status);
    });
    $table.on('reset-view.bs.table', function () {
        set_tr();
    });

}

$(function () {
    initProdTable();
});
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
                title: 'Price',
                field: 'price',
                align: 'center',
                sortable: true
	    }, {
                title: 'Size',
                field: 'size',
                align: 'center',
                sortable: true
            }, {
                title: 'Text',
                field: 'description',
                align: 'center',
                sortable: true
	    }, {
                title: 'Image',
                field: 'image',
                align: 'center',

            }, {
                title: 'Status',
                field: 'status',
                align: 'center',
                sortable: true
            }]
    });

    $table.on('check.bs.table uncheck.bs.table ' + 'check-all.bs.table uncheck-all.bs.table',
        function () {
            $add.prop('disabled',
                $table.bootstrapTable('getSelections').length);
            $stop.prop('disabled', !$table.bootstrapTable('getSelections').length);
            $table.data('selections', getIdSelections());
        });

    $('#add-tire').click(function () {

    });


    function getIdSelections() {
        return $.map($table.bootstrapTable('getSelections'), function (row) {
            return row['id'];
        });
    }

    $table.on('load-success.bs.table', function () {
        $add.prop('disabled', false);
        $stop.prop('disabled', true);
    });

    $table.on('reset-view.bs.table', function () {

    });

}

$(function () {
    initProdTable();
});
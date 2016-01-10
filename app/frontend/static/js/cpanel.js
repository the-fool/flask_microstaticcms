function initProdTable() {
    var $table = $('#table');
    var $add = $('#add-tire');
    var $remove = $('#remove-tire');
    var selections = [];

    $table.bootstrapTable({
        cache: false,
        showExport: true,
        showRefresh: true,
        exportTypes: ['json', 'xml', 'csv', 'txt'],
        search: true,
        locale: 'en-US',
        id: 'id',
        sortName: 'date_begun',
        sortOrder: 'desc',
        toolbar: '#toolbar',
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
                formatter: textFormatter,
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

    function textFormatter(v) {
        if (v.length > 35) {
            v = v.slice(0,30) + " . . . ";
        }
        return v;
    }
    function getIdSelections() {
        return $.map($table.bootstrapTable('getSelections'), function (row) {
            return row['id'];
        });
    }
    $table.on('check.bs.table uncheck.bs.table ' + 'check-all.bs.table uncheck-all.bs.table',
        function () {
            $add.prop('disabled',
                $table.bootstrapTable('getSelections').length);
            $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
            $table.data('selections', getIdSelections());
        });
   

    $table.on('load-success.bs.table', function () {
        $add.prop('disabled', false);
        $remove.prop('disabled', true);
    });

    $table.on('reset-view.bs.table', function () {

    });

}

$(function () {
    initProdTable();
});
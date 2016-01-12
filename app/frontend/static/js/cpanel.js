function initProdTable() {
    var $table = $('#table');
    var $add = $('#add-tire');
    var $remove = $('#remove-tire');
    var selections = [];

    $table.bootstrapTable({
        cache: false,
        rowStyle: styleRows,
        classes: "table table-bordered",
        showExport: true,
        showRefresh: true,
        exportTypes: ['json', 'xml', 'csv', 'txt'],
        search: true,
        locale: 'en-US',
        idField: 'id',
        sortName: 'status',
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
                sortable: true,
                editable: {
                    type: 'text',
                    title: 'Name',
                    url: '/api/products/update/name',
                    name: 'name'
                }
	    }, {
                title: 'Quantity Left',
                field: 'quantity',
                align: 'center',
                editable: {
                    type: 'text',
                    title: 'Quantity Remaining',
                    url: '/api/products/update/quantity',
                    name: 'quantity'
                }
        }, {
                title: 'Price',
                field: 'price',
                align: 'center',
                sortable: true,
                editable: {
                    type: 'text',
                    validate: priceValidator,
                    title: 'Price',
                    url: '/api/products/update/price',
                    name: 'price'
                }
	    }, {
                title: 'Size',
                field: 'size',
                align: 'center',
                sortable: true,
                editable: {
                    type: 'text',
                    title: 'Size',
                    url: '/api/products/update/size',
                    name: 'size'
                }
        }, {
                title: 'Text',
                field: 'description',
                align: 'left',
                editable: {
                    type: 'textarea',
                    title: 'Description',
                    url: '/api/products/update/description',
                    name: 'description'
                }
	    }, {
                title: 'Image',
                field: 'image',
                formatter: imgIcon,
                align: 'center',

            }, {
                title: 'Status',
                field: 'status',
                align: 'center',
                sortable: true,
                sorter: statusSorter,
                editable: {
                    name: 'status',
                    type: 'select',
                    //emptytext: 'select status',
                    //defaultValue: 'Select Status',
                    source: '/api/products/statuses',
                    title: 'Change Status',
                    url: '/api/products/update/status',
                }
            }]
    });

    function statusSorter(a, b) {
        if (transStatus(a) > transStatus(b)) return 1;
        else if (transStatus(a) < transStatus(b)) return -1;
        else return 0;
    }

    function transStatus(x) {
        switch (x) {
        case 'sold':
            return 0;
        case 'active':
            return 1;
        case 'inactive':
            return -1;
        }
    }


    function priceValidator(v) {
        if (isNaN(parseFloat(v))) {
            return "Enter a simple decimal"
        }
        // return {newValue: String(Math.round(parseFloat(v) * 100)/100)}
    }

    function imgIcon(v, r) {
        if (v === undefined) {
            return '-';
        }
        return '<a href="#" class="img-link" data-id=' + r.id + '><i class="fa fa-picture-o"></i></a>'
    }

    function getIdSelections() {
        return $.map($table.bootstrapTable('getSelections'), function (row) {
            return row['id'];
        });
    }

    $remove.click(function () {
        $('#conf-modal').modal('show');
    });
    $('#delete-tires').click(function () {
            var ids = getIdSelections();
            console.log(ids);
            $.ajax({
                    url: '/api/products/delete',
                    data: JSON.stringify({
                        ids: ids
                    }),
                    dataType: 'json',
                    contentType: 'application/json',
                    method: 'POST',
                }
            ).done(function () {
            $table.bootstrapTable('refresh');
        });
    });

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

$table.on('click', 'tr > td > a.img-link', function () {
    showImageModal($(this).data('id'));
});

}

function styleRows(r) {
    if (r.status === 'sold')
        return {
            classes: 'sold'
        };
    else if (r.status == 'inactive')
        return {
            classes: 'inactive'
        };
    else
        return {
            classes: ''
        };
}

function showImageModal(id) {
    $('#img-modal').modal('show');
    $('#img-modal .modal-body #pk').attr('value', id);
    $.ajax({
        url: '/api/products/',
        data: {
            id: id
        },
        success: function (d) {
            $('#tire-img').attr('src', '/static/img/' + d.image);
        },

    });
}

$(function () {
    initProdTable();
});
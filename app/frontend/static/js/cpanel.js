function initProdTable() {
    var $table = $('#table');
    var $add = $('#add-tire');
    var $remove = $('#remove-tire');
    var selections = [];

    $table.bootstrapTable({
        cache: false,
        classes: "table table-hover table-bordered",
        showExport: true,
        showRefresh: true,
        exportTypes: ['json', 'xml', 'csv', 'txt'],
        search: true,
        locale: 'en-US',
        idField: 'id',
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
                sortable: true,
                editable: {
                    type: 'text',
                    title: 'Name',
                    url: '/api/products/update/name',
                    name: 'name'
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
                formatter: textFormatter,
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

    function textFormatter(v) {
        /*if (v.length > 45) {
            v = v.slice(0, 40) + " . . . ";
        }*/
        return v;
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
    
    $table.on('click', 'tr > td > a.img-link', function() {
        showImageModal($(this).data('id'));
    }); 

}

function showImageModal(id) {
    console.log(id);
    $('#img-modal').modal('show');
    $.ajax({
        url: '/api/products/',
        data: {id: id},
        success: function(d) {
            $('#tire-img').attr('src', '/static/img/' + d.image);
        },
        
    });
}

$(function () {
    initProdTable();
});
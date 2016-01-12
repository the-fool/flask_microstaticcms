
$('a.modal-anchor').click(function () {
    var id = $(this).data('id');
    var $m = $('#tire-modal div.modal-body');
    $m.hide();
    $.ajax({
            url: '/api/products',
            data: {
                id: id
            }
        })
        .done(function (data) {
          $m.show();
          $m.find('#name').text(data.name);
          $m.find('img').attr('src', '/static/img/'+data.image);
          $m.find('#description').text(data.description);
          $m.find('#price').text('$'+data.price.toFixed(2));
        });
});

$(function() {
    $('div.portfolio-item div.itemdesc h4.t-price').each(function() {
        $(this).text(function(i,t) {
           return '$' + parseFloat(t).toFixed(2); 
        });
    });
});
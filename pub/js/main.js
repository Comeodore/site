$('.delete-art').click(function () {
    const id = $(this).attr('id');

    $.ajax({
		method: 'DELETE',
	    url: '/articles/'+id,

	    success: function(res){
			alert('Article was delete');
			window.location.href = '/';
	    }
    });
});

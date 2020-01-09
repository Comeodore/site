// eslint-disable-next-line no-undef
$('.delete-art').click(function () {
  const id = $(this).attr('id');

  $.ajax({
    method: 'DELETE',
    url: `/articles/${id}`,

    success(res) {
      alert('Информация о студенте была удалена');
      window.location.href = '/';
    },
  });
});

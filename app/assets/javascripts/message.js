$(document).on('turbolinks:load', function() {
  $(function() {
    function buildMessage(message) {
      var image = message.image.url == null ? '' : `<img src=${message.image.url}>`; 
      var message = `<div class='message'>
                      <span class='message__name'>
	                ${message.user_name}
	              </span>
	              <span class='message__time'>
	                ${message.time}
	              </span>
	              <div class='message__content'>
	                ${message.content}
	              </div>
	              <div class='message__image'>
	                ${image}
	              </div>
	            </div>`
      return message
    } 
  
    $('#new_message').on('submit', function(e) {
      e.preventDefault();
      var formdata = new FormData($('#new_message').get(0));
      $.ajax({
        url:         location.href,
        type:        "POST",
        data:        formdata,
        dataType:    'json',
        processData: false,
        contentType: false
      })
      .done(function(data) {
	console.log(1111)
        var html = buildMessage(data);
        $('.messagesbox__body').append(html);
	$('#message_content').val('');
	$('.image').val('');
	$(".button").prop("disabled", false);
      })
      .fail(function() {
        $(".button").prop("disabled", false);
	alert('メッセージを入力してください');
      })
    })
  }) 
})


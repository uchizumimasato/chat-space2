$(document).on('turbolinks:load', function() {
  $(function() {
    // メッセージの作成
    function buildMessage(message) {
      var image = message.image.url == null ? '' : `<img src=${message.image.url}>`;
      var message = `<div class='message' data-message-id="${message.id}">
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
      return message;
    }
    // 非同期通信の関数
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
        var html = buildMessage(data);
        $('.messagesbox__body').append(html);
        //$('#message_content').val('');
        //$('.image').val('');
        $('#new_message')[0].reset();
        $('.messagesbox__body').animate({scrollTop: $('.messagesbox__body')[0].scrollHeight}, 'fast');
        $(".button").prop("disabled", false);
      })
      .fail(function() {
        $(".button").prop("disabled", false);
        alert('メッセージを入力してください');
      });
    });
    // 自動更新の関数
    setInterval(update, 5000)
    function update() {
      var last_id = $('.message:last').data('message-id');
      $.ajax({
        dataType: 'json',
        url:      location.href,
        data:     { id: last_id }
      })
      .done(function(messages) {
        $.each(messages, function(i, message) {
          var message = buildMessage(message);
          $('.messagesbox__body').append(message);
        });
      });
    };
  });
});


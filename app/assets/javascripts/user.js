
  $(function() {
    function buildUser(user, hidden) {
      if (hidden) {
        var btn = `<div class="chat-group-user__btn chat-group-user__btn--remove">削除</div>`
      } else {
        var btn = `<div class="chat-group-user__btn chat-group-user__btn--add">追加</div>`
      }

      var html = `<div class="chat-group-user clearfix" id=${user.id}>
                   <p class="chat-group-user__name">${user.name}</p>
	           ${btn}
	           ${hidden}
	         </div>`
       
      //hidden ? $("").text('削除') : '追加' 
      return html
    }

    $('#user-search-field').on('keyup', function(e) {
      var input = $("#user-search-field").val();
      $.ajax({
        type:     'GET',
	url:      '/users',
	data:     { keyword: input },
	dataType: 'json'
      })
      .done(function(users) {
	// インクリメンタルサーチの表示
        $('#user-search-result').children().remove()
	$.each(users, function(index, user) {
	  var html = buildUser(user, "")
	  $('#user-search-result').append(html)   
      	})
	// 追加ボタンをクリックした時
	$(document).on('click', '.chat-group-user__btn--add', function() {
	  $(this).parent().remove()
	  var id = $(this).parent().attr('id')
	  $.each(users, function(i, user) {
	    if (user.id == id) {
	      var hidden = `<input name="group[user_ids][]" type="hidden" id="${user.id}" value=${user.id}>`
	      var html = buildUser(user, hidden)
	      $('.chat-group-users').append(html)
	    }
	  });
	  
        });
	 // 削除ボタンをクリックした時
          $(document).on('click', '.chat-group-user__btn--remove', function() {
            $(this).parent().remove()
            var id = $(this).parent().attr('id')
  	    $.each(users, function(i, user) {
  	      if (user.id == id) {
  	        var hidden = ""
  	        var html = buildUser(user, hidden)
  	        $('#user-search-result').append(html)
  	      }
            });
          })
      }); //doneの括弧 
    }); //keyupの括弧 
  });


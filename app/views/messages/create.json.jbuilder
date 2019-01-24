json.content   @message.content
json.image     @message.image
json.user_name @message.user.name
json.time      @message.created_at.strftime("%-m月%-d日%-H時%-M分")



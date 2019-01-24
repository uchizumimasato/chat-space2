class MessagesController < ApplicationController
  before_action :set_group, only: [:index, :create]

  def index 
    @messages = @group.messages.includes(:user)
    @message = Message.new
  end

  def create
    @message = Message.new(message_params)
    if @message.save
      respond_to do |format|
        format.json
      end      
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index 
    end 
  end

  private

  def message_params
    params.require(:message).permit(:content, :image, :user_id).merge(group_id: params[:group_id])
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end

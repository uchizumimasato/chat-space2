class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]

  def index
    @groups = Group.all
  end

  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    @group = Group.create(group_params)
    if @group.save
      redirect_to root_path, notice: "グループの作成に成功しました。"
    else
      render :new
    end
  end

  def edit 
  end

  def update 
    if @group.update(group_params)
      redirect_to root_path, notice: "グループの編集に成功しました。"
    else
      render :edit
    end
  end

  private

  def group_params
    params.require(:group).permit(:name, { :user_ids => [] })
  end

  def set_group
    @group = Group.find(params[:id])
  end 
end

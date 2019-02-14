class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  has_many :messages
  validates :name, presence: true
  accepts_nested_attributes_for :group_users

  attr_accessor :keyword 
  def show_last_message
    if (last_message = messages.last).present?
      last_message.content? ? last_message.content : '画像が投稿されています'
    else
      'メッセージがありません'
    end
  end
end

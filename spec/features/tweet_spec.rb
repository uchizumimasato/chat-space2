require 'rails_helper'

reature 'tweet7, type: :feature do
  let(:user) { create(:user) }

  scenario 'post tweet' do
    visit new_user_session_path
    fill_in 'user_email', with: user.email
    fill_in 'user_password', with: user.password
    find('input[name="commit"]').click
    expect(current_path).to eq root_path
    expect(page).to have_no_content('投稿する')
  end 
end

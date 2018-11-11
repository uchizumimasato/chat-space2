require 'rails_helper'

describe MessagesController, type: :controller do 
  let(:group) { create(:group) } 
  let(:user)  { create(:user) }

  describe 'GET #index' do

    context 'login' do
      before do
        login user
	get :index, params: {group_id: group.id}
      end

      it "assigns @message" do
	expect(assigns(:message)).to be_a_new(Message)
      end

      it "assigns @messages" do
      end

      it "assings @group" do
	expect(assigns(:group)).to eq group
      end

      it "renders the :index template" do 
        expect(response).to render_template :index
      end
    end

    context 'not login' do
      it "redirects to new_user_session_path" do
	get :index, params: {group_id: group.id}
	expect(response).to redirect_to(new_user_session_path)
      end	
    end
  end

  describe 'POST #create' do 
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

    context 'login' do
      before do
	login user	
      end

      context 'can save' do
        subject {
          post :create,
          params: params
        }

        it 'count up message' do
          expect{ subject }.to change(Message, :count).by(1)
        end

        it 'redirects to group_messages_path' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
	end 
      end 
    end
 
    context 'not login' do

    end
  end
end

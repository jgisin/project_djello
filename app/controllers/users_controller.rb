class UsersController < ApplicationController
  respond_to :json

  def index
    @users = User.all
    respond_to do |format|
      format.json {render json: @users.to_json}
    end
  end
end

class ListsController < ApplicationController
  respond_to :json

  def show
    @list = List.find(params[:id])
    respond_to do |format|
      format.json {render json: @list.to_json}
    end
  end

  def create
    board = current_user.owned_boards.find(params[:board_id])
    @list = board.lists.build(list_params)
    if @list.save
      respond_to do |format|
        format.json {render :nothing => true, :status => :ok}
      end
    end
  end

  def update
    @list = List.find(params[:id])
    if @list.update(list_params)
      respond_to do |format|
        format.json {render :nothing => true, :status => :ok}
      end
    end
  end

  def destroy
    @list = List.find(params[:id])
    if @list.destroy
      respond_to do |format|
        format.json { render nothing: true, status: :ok}
      end
    end
  end

  private

  def list_params
    params.require(:list).permit(:title, :description, :user_id)
  end
end

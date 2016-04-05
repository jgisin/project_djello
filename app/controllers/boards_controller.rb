class BoardsController < ApplicationController
  before_action :current_user
  respond_to :json

  def index
    @boards = current_user.owned_boards
    respond_to do |format|
      format.json {render json: @boards.to_json(:include => [:lists => {include: [:cards => {include: [:members, :card_members]}]},
                                                             :members => {:include => :boards}])}
    end
  end

  def show
    @board = Board.find(params[:id])
    respond_to do |format|
      format.json {render json: @board.to_json}
    end
  end

  def create
    @board = Board.new(board_params)
    respond_to do |format|
      if @board.save
        format.json {render nothing: true, status: :ok}
      else
        format.json {render nothing: true, status: :unprocessable_entity}
      end
    end
  end

  def update
    @board = Board.find(params[:id])
      respond_to do |format|
        if @board.update(board_params)
          format.json {render :nothing => true, :status => :ok}
        else
          format.json {render nothing: true, status: :unprocessable_entity}
        end
      end
  end

  def destroy
    @board = Board.find(params[:id])
    respond_to do |format|
      if @board.destroy
        format.json { render nothing: true, status: :ok}
      else
        format.json { render nothing: true, status: :unprocessable_entity}
      end
    end
  end

  private

  def board_params
    params.require(:board).permit(:title, :user_id)
  end
end

class CardsController < ApplicationController
  respond_to :json

  def show
    @card = Card.find(params[:id])
    respond_to do |format|
      format.json {render json: @card.to_json}
    end
  end

  def create
    list = current_user.lists.find(params[:list_id])
    @card = list.cards.build(card_params)
    if @card.save
      respond_to do |format|
        format.json {render :nothing => true, :status => :ok}
      end
    end
  end

  def update
    @card = Card.find(params[:id])
    if @card.update(card_params)
      respond_to do |format|
        format.json {render :nothing => true, :status => :ok}
      end
    end
  end

  def destroy
    @card = Card.find(params[:id])
    if @card.destroy
      respond_to do |format|
        format.json {render nothing: true, status: :ok}
      end
    end
  end

  private

  def card_params
    params.require(:card).permit(:title, :description, :list_id)
  end
end

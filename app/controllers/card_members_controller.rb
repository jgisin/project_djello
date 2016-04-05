class CardMembersController < ApplicationController
  respond_to :json

  def index
    @member = CardMember.all
    respond_to do |format|
      format.json { render json: @member.to_json}
    end
  end

  def show
    @member = CardMember.find(params[:id])
    respond_to do |format|
      format.json { render json: @member.to_json}
    end
  end

  def create
    @member = CardMember.new(member_params)
    if @member.save
      respond_to do |format|
        format.json { render nothing: true, status: :ok }
      end
    end
  end

  def destroy
    @member = CardMember.find(params[:id])
    if @member.destroy
      respond_to do |format|
        format.json { render nothing: true, status: :ok}
      end
    end
  end

    private

    def member_params
      params.require(:card_member).permit(:member_id, :card_id)
    end
end

class BoardMembersController < ApplicationController
  respond_to :json

  def index
    @member = BoardMember.all
    respond_to do |format|
      format.json { render json: @member.to_json}
    end
  end

  def show
    @member = BoardMember.find(params[:id])
    respond_to do |format|
      format.json { render json: @member.to_json}
    end
  end

  def create
    @member = BoardMember.new(member_params)
    if @member.save
      respond_to do |format|
        format.json { render nothing: true, status: :ok }
      end
    end
  end

  def destroy
    @member = BoardMember.find(params[:id])
    if @member.destroy
      respond_to do |format|
        format.json { render nothing: true, status: :ok}
      end
    end
  end

  private

  def member_params
    params.require(:board_member).permit(:member_id, :board_id)
  end
end

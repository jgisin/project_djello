class TodosController < ApplicationController
  respond_to :json

  def show
    @todo = Todo.find(params[:id])
    respond_to do |format|
      format.json {render json: @todo.to_json, status: :ok}
    end
  end

  def create
    @todo = Todo.new(todo_params)
    respond_to do |format|
      if @todo.save
        format.json { render nothing: true, status: :ok}
      else
        format.json { render nothing: true, status: :unprocessable_entity}
      end
    end
  end

  def update
    @todo = Todo.find(params[:id])
    respond_to do |format|
      if @todo.update(todo_params)
        format.json { render nothing: true, status: :ok}
      else
        format.json { render nothing: true, status: :unprocessable_entity}
      end
    end
  end

  def destroy
    @todo = Todo.new(params[:id])
    respond_to do |format|
      if @todo.destroy
        format.json { render nothing: true, status: :ok}
      else
        format.json { render nothing: true, status: :unprocessable_entity}
      end
    end
  end

  private

  def todo_params
    params.require(:todo).permit(:item, :complete, :card_id)
  end

end

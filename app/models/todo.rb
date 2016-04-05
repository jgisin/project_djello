class Todo < ActiveRecord::Base
  after_create :add_activity_new
  after_update :add_activity_update

  belongs_to :card

  def add_activity_new
    act = Activity.new(activable_type: 'Card', activable_id: self.card.id)
    act.user_id = self.card.list.board.user_id
    act.description = "Created New Todo Item: #{self.item}"
    act.save
  end

  def add_activity_update
    act = Activity.new(activable_type: 'Card', activable_id: self.card.id)
    act.user_id = self.card.list.board.user_id
    act.description = "Updated Card Todo: #{self.item}-#{self.complete ? 'Complete' : 'In-Progress'}"
    act.save
  end
end

class Card < ActiveRecord::Base
  after_create :add_self_member, :add_activity_new
  after_update :add_activity_update
  before_destroy :remove_activity

  belongs_to :list

  has_many :card_members, class_name: "CardMember"
  has_many :members, :through => :card_members, source: :user

  has_many :todos, :dependent => :destroy

  has_many :activities, :as => :activable,
           :dependent => :destroy

  def add_self_member
    CardMember.create(card_id: self.id, member_id: self.list.board.user.id)
  end

  def add_activity_new
    act = Activity.new(activable_type: 'Card', activable_id: self.id)
    act.user_id = self.list.board.user_id
    act.description = "Created New Card"
    act.save
  end

  def add_activity_update
    act = Activity.new(activable_type: 'Card', activable_id: self.id)
    act.user_id = self.list.board.user_id
    act.description = "Updated Card"
    act.save
  end

  def remove_activity
    act = Activity.where(activable_id: self.id)
    act.each do |activ|
      activ.destroy
    end
  end
end

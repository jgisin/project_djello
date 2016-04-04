class Card < ActiveRecord::Base
  after_create :add_self_member

  belongs_to :list

  has_many :card_members, class_name: "CardMember"
  has_many :members, :through => :card_members, source: :user

  def add_self_member
    CardMember.create(card_id: self.id, member_id: self.list.board.user.id)
  end
end

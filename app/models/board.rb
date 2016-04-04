class Board < ActiveRecord::Base
  after_create :add_self_member

  has_many :lists, dependent: :destroy
  belongs_to :user, foreign_key: :user_id

  has_many :board_members, class_name: "BoardMember", dependent: :destroy
  has_many :members, :through => :board_members, source: :user

  def add_self_member
    BoardMember.create(board_id: self.id, member_id: self.user.id)
  end
end

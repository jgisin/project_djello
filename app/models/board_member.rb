class BoardMember < ActiveRecord::Base

  belongs_to :board
  belongs_to :user, foreign_key: :member_id

  validates :member_id, :uniqueness => { :scope => :board_id }
end

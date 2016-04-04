class User < ActiveRecord::Base
  after_create :make_board
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable


  has_many :owned_boards, class_name: "Board", dependent: :destroy

  has_many :board_memberships, class_name: "BoardMember", foreign_key: :member_id, dependent: :destroy
  has_many :board_subscriptions, :through => :board_memberships, source: :board

  has_many :lists, through: :owned_boards

  has_many :card_memberships, class_name: "CardMember", foreign_key: :member_id
  has_many :cards, through: :card_memberships



  def make_board
    board = Board.new(title: "Give me a title", user_id: self.id)
    board.save
  end

end

class Activity < ActiveRecord::Base

  belongs_to :activable, :polymorphic => true

end

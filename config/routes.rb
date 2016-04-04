
Rails.application.routes.draw do

  root 'staticpages#index'

  devise_for :users

  scope :api do
    scope :v1 do
      resources :boards
      resources :lists
      resources :cards
    end
  end


end

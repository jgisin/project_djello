
Rails.application.routes.draw do

  resources :todos
  root 'staticpages#index'

  devise_for :users

  scope :api do
    scope :v1 do
      resources :boards
      resources :lists
      resources :cards
      resources :users
      resources :card_members
      resources :board_members
      resources :todos
    end
  end


end

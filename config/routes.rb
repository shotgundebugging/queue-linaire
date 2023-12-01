Rails.application.routes.draw do
  root 'homepage#index'

  namespace :api do
    get 'ingredients/search', to: 'ingredients#search'
  end
end

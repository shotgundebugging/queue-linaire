Rails.application.routes.draw do
  root 'homepage#index'

  namespace :api do
    get 'ingredients/search', to: 'ingredients#search'

    get 'recipes/find_by_ingredients', to: 'recipes#find_by_ingredients'
    get 'recipes/search_by_title', to: 'recipes#search_by_title'
    get 'recipe/:id/ingredients', to: 'recipes#ingredients'
    get 'recipe/:id/instructions', to: 'recipes#instructions'
  end
end

Rails.application.routes.draw do
  resources :budgets, only: [:create, :index, :destroy, :update]
  resources :transactions, only: [:create, :index, :destroy]
  resources :tags, only: [:index, :create, :destroy]
  resources :users, only: [:destroy]

  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end

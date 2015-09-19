Rails.application.routes.draw do

 # landing page
  root 'home#index'


  # shows login form
  get '/login' => 'sessions#index' 

  get '/login_action' => 'sessions#create'
  # render sign up form
  get '/signup' => 'users#new'

  post '/users' => 'users#create'

  # all parties
  get '/parties' => 'parties#index'
  # show one party
  get '/parties/:id' => 'parties#show'

  # form for creating new party
  get '/parties/new' => 'parties#new'

  # post new party
  post '/parties' => 'parties#create'


  # creates new sesh and sends to root
  get '/sessions/new' => 'sessions#new'

  resource :sessions, only: [:create,:destroy]
  resource :welcome, only: [:index]
  resources :recipes





end

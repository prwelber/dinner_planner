class SessionsController < ApplicationController

  def new
    # creates session and sends to root path
    puts params[:username]
    user = User.find_by({username: params[:username]})
    
    if user && user.authenticate(params[:password])
      session[:username] = user.username
      session[:dinner_party] = params[:dinner_party]
      redirect_to "/recipes"
    else
      redirect_to "/"
    end

  end

  def index

  end

  def create
    
    # dinner = Party.find_by("party_name ~* ?", params[:dinner_party]) 
    # puts dinner.party_name 
    # session[:logged_in] = true
    # redirect_to "/restaurants"
  end

  def destroy
    session[:username] = nil
    redirect_to "/"
  end

end
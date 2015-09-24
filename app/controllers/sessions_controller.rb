class SessionsController < ApplicationController

  def new # get /login
    # creates session and sends to root path
    # store userID in session if two identicla usernames
    @parties = Party.all

  end

  def index

  end

  def create # post /sessions??
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

  def destroy
    session[:username] = nil
    redirect_to "/"
  end

end


    # dinner = Party.find_by("party_name ~* ?", params[:dinner_party]) 
    # puts dinner.party_name 
    # session[:logged_in] = true
    # redirect_to "/restaurants"
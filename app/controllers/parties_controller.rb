class PartiesController < ApplicationController


  def index
    if session[:username]
      @all_parties = Party.all
    end
  end


  def show
    if session[:username]
      @party_members = User.find_by({username: session[:username]})
      @party_members = @party_members.party.users
    end
  end

  # form for new party
  def new
    
  end

  # create new party in DB
  def create
    @party = Party.create(party_name: params[:party_name])
    redirect_to "/"
  end

end
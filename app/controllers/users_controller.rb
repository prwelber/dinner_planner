class UsersController < ApplicationController


  def create

  	party = Party.find_by({party_name: params[:dinner_party]})
  	puts party.id
    user = User.create(
      username: params[:username],
      password: params[:password],
      party_id: party.id
    )
	puts params
	puts user.username
	puts user.party_id
    redirect_to "/"
  end


end
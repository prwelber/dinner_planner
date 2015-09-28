class UsersController < ApplicationController


  def create

  	party = Party.find_by({party_name: params[:dinner_party]})
    user = User.create(
      username: params[:username],
      password: params[:password],
      party_id: party.id
    )

    redirect_to "/"
  end


end
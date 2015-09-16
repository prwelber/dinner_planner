class RecipesController < ApplicationController
  def show

    # actual_user = User.find(session[:usename])
    # if logged_in? == true && check_current_user? == true
      # @current_user = User.find(session[:username])
      @recipes = Recipe.order(upvotes: :desc)
      @user = User.find_by({username: session[:username]})
      @party = Party.find_by({party_name: session[:dinner_party]})
    # else
    #   redirect_to "/"
    # end


    # clean recipe search input
    # raw_recipe_search = params[:q]
    # recipe_search = raw_recipe_search.gsub(/\s/, "+").to_s
  
    # HTTParty API Request 
    # @recipe_results = HTTParty.get('http://api.yummly.com/v1/api/recipes?_app_id='+ENV["yummly_application_id"]+'&_app_key='+ENV["yummly_application_key"]+'&q='+recipe_search)
    
    # # this pulls in first match
    # puts @recipe_results['matches'][0]['attributes']['course']
    # puts @recipe_results['matches'][0]['attributes']['cuisine']
    # puts @recipe_results['matches'][0]['rating']
    # puts @recipe_results['matches'][0]['ingredients']
    # puts @recipe_results['matches'][0]['totalTimeInSeconds'] / 60
    # puts @recipe_results['matches'][0]['recipeName']


    # NOMINATING
    if params[:nominated] 
      @recipe = Recipe.find_by(name: params[:name])
      @recipe.nominated = true
      @recipe.save
    end
    # UPVOTING
    if params[:upvote]
      @recipe = Recipe.find_by(name: params[:name])
      @recipe.upvotes = @recipe.upvotes + 1
      @recipe.save
    end
  end

  def update


    
    redirect_to "/recipes"
  end

end
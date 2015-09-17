class RecipesController < ApplicationController
  
  def index

    # actual_user = User.find(session[:usename])
    # if logged_in? == true && check_current_user? == true
      # @current_user = User.find(session[:username])
      # @recipes = Recipe.order(upvotes: :desc)
      @user = User.find_by({username: session[:username]})
      @party = Party.find_by({party_name: session[:dinner_party]})
    # else
    #   redirect_to "/"
    # end

    if !params[:q]
      recipe_search = "banana+pudding"
    else
      raw_recipe_search = params[:q]
      # clean recipe search input
      recipe_search = raw_recipe_search.gsub(/\s/, "+").to_s
    end
  
    # HTTParty API Request 
    @recipe_results = HTTParty.get('http://api.yummly.com/v1/api/recipes?_app_id='+ENV["yummly_application_id"]+'&_app_key='+ENV["yummly_application_key"]+'&q='+recipe_search)
    
    # this takes in 6 rando matches
    @recipe_array = @recipe_results['matches'].sample(8)
    # each_with_index loop to edit recipe object
    @recipe_array = @recipe_array.each_with_index do |element, index|
      element[:nominated] = false
      element[:id] = index
      element['ingredients'] = element['ingredients'].join(", ")
      if element['attributes']['course']
        element['attributes']['course'] = element['attributes']['course'].join(", ")
      end
      if element['attributes']['cuisine']
        element['attributes']['cuisine'] = element['attributes']['cuisine'].join(", ")
      end
    end

    
    # puts @recipe_results['matches'][0]['attributes']['course']
    # puts @recipe_results['matches'][0]['attributes']['cuisine']
    # puts @recipe_results['matches'][0]['rating']
    # puts @recipe_results['matches'][0]['ingredients']
    # puts @recipe_results['matches'][0]['totalTimeInSeconds'] / 60
    # puts @recipe_results['matches'][0]['recipeName']


    # NOMINATING
    # if params[:nominated] 
    #   @recipe = Recipe.find_by(name: params[:name])
    #   @recipe.nominated = true
    #   @recipe.save
    # end
    # UPVOTING
  end

  def update

    if params[:upvote]
      @recipe = Recipe.find_by(name: params[:name])
      @recipe.upvotes = @recipe.upvotes + 1
      @recipe.save
    end

    
    # redirect_to "/recipes"
  end

  def show

  end

  def create
    @recipe = Recipe.create({name: params[:name], course: params[:course], ingredients: params[:ingredients], cuisine: params[:cuisine], rating: params[:rating], time: params[:time], upvotes: 0, nominated: params[:nominated]})

    render json: @recipe

    # redirect_to "/recipes"
  end

end
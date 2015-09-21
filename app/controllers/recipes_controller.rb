class RecipesController < ApplicationController
  
  def index

    # actual_user = User.find(session[:usename])
    if logged_in? == true 
      # puts logged_in? -- this was true

      # the issue here is that the params with username, which is needed for
      # check_current_user goes to sessions/new .. and .. get /recipes is where i'm checking for that

      # binding.pry
    if session[:username]
      # @current_user = User.find(session[:username])
      # @recipes = Recipe.order(upvotes: :desc)
      @user = User.find_by({username: session[:username]})
      @party = Party.find_by({party_name: session[:dinner_party]})
      @recipe_all = Recipe.order(upvotes: :desc)
    

    if !params[:q]
      recipe_search = "banana+pudding"
    else
      raw_recipe_search = params[:q]
      # clean recipe search input
      recipe_search = raw_recipe_search.gsub(/\s/, "+").to_s
    end
  
    # HTTParty API Request 
    @recipe_results = HTTParty.get('http://api.yummly.com/v1/api/recipes?_app_id='+ENV["yummly_application_id"]+'&_app_key='+ENV["yummly_application_key"]+'&q='+recipe_search)
    
    # this takes in 8 rando matches
    @recipe_array = @recipe_results['matches'].sample(8)
    # each_with_index loop to edit recipe object

    @recipe_array = @recipe_array.each_with_index do |element, index|
      element[:nominated] = false
      element[:id] = index
      element[:party_id] = @party[:id]
      element['ingredients'] = element['ingredients'].join(", ")
      if element['attributes']['course']
        element['attributes']['course'] = element['attributes']['course'].join(", ")
      end
      if element['attributes']['cuisine']
        element['attributes']['cuisine'] = element['attributes']['cuisine'].join(", ")
      end
    end

  else
        redirect_to "/"
      end
    end
  end #end of index method

  def update

    if params[:upvote]
      @recipe = Recipe.find_by(id: params[:id])
      @recipe.upvotes = @recipe.upvotes + 1
      @recipe.save
      render json: @recipe
    end

    
    # redirect_to "/recipes"
  end

  def show

  end

  def create
    @recipe = Recipe.create({name: params[:name], course: params[:course], ingredients: params[:ingredients], cuisine: params[:cuisine], rating: params[:rating], time: params[:time], upvotes: 0, nominated: params[:nominated], party_id: params[:party_id]})

    render json: @recipe

    # redirect_to "/recipes"
  end

end
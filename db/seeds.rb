# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.create({username: "admin", password: "admin", party_id: 1})
User.create({username: "phil", password: "phil", party_id: 1})

User.create({username: "nelly", password: "nelly", party_id: 1})
User.create({username: "cooper", password: "cooper", party_id: 2})
User.create({username: "rach", password: "rach", party_id: 4})
User.create({username: "doug", password: "doug", party_id: 5})


Recipe.create({name: "french onion soup", course: "soup", ingredients: "onions, water, broth, cheese", cuisine: "french", rating: 4, time: 50, upvotes: 5, nominated: true, party_id: 1})
Recipe.create({name: "baked potato", course: "appetizer", ingredients: "potato, cheese, sour cream, bacon, chives, butter, salt, pepper", cuisine: "american", rating: 3, time: 10, upvotes: 1, nominated: true, party_id: 2})
Recipe.create({name: "turkey sandwich", course: "entree", ingredients: "turkey, bread, bacon, swiss cheese, lettuce, tomato salt, pepper", cuisine: "american", rating: 2, time: 5, upvotes: 2, nominated: true, party_id: 3})
Recipe.create({name: "baked salmon", course: "entree", ingredients: "salmon, dill, olive oil, lemon, capers, salt", cuisine: "seafood", rating: 3, time: 20, upvotes: 7, nominated: true, party_id: 4})
Recipe.create({name: "fried fruit", course: "appetizer", ingredients: "mango, watermelon, apple, orange, pear, peach", cuisine: "fruit", rating: 3, time: 5, upvotes: 1, nominated: true, party_id: 5})


Party.create({party_name: "dinner party"})
Party.create({party_name: "lunch party"})
Party.create({party_name: "phil's party"})
Party.create({party_name: "rach's party"})
Party.create({party_name: "Thursday night party"})

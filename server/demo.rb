require 'rubygems'
require 'sinatra'
require 'json'

people = [
  {
    :guid           => "/people/1",
    :firstName      => "Dwight",
    :lastName       => "Schrutte",
    :project        => "/projects/1"
  },
  {
    :guid           => "/people/2",
    :firstName      => "Michael",
    :lastName       => "Scott",
    :project        => "/projects/1"
  },
  {
    :guid           => "/people/3",
    :firstName      => "Jim",
    :lastName       => "Halpert",
    :project        => "/projects/1"
  },
  {
    :guid           => "/people/4",
    :firstName      => "Sid",
    :lastName       => "Bergerac",
    :project        => "/projects/1"
  },
  {
    :guid           => "/people/5",
    :firstName      => "Evgenij",
    :lastName       => "Kalasnikov",
    :project        => "/projects/1"
  },
  {
    :guid           => "/people/6",
    :firstName      => "Eva",
    :lastName       => "Sombrero",
    :project        => "/projects/1"
  },
  {
    :guid           => "/people/7",
    :firstName      => "John",
    :lastName       => "Doe",
    :project        => "/projects/1"
  },
  {
    :guid           => "/people/8",
    :firstName      => "Jane",
    :lastName       => "Doe",
    :project        => "/projects/1"
  },
  {
    :guid           => "/people/9",
    :firstName      => "Mr",
    :lastName       => "White",
    :project        => "/projects/1"
  },
  {
    :guid           => "/people/10",
    :firstName      => "Scott",
    :lastName       => "Parkinson",
    :project        => "/projects/1"
  },
  {
    :guid           => "/people/11",
    :firstName      => "Mark",
    :lastName       => "Shuttleworth",
    :project        => "/projects/1"
  },
  {
    :guid           => "/people/12",
    :firstName      => "Peregrin",
    :lastName       => "Took",
    :project        => "/projects/1"
  },
  {
    :guid           => "/people/13",
    :firstName      => "Stanislav",
    :lastName       => "Lemm",
    :project        => "/projects/1"
  },
  {
    :guid           => "/people/14",
    :firstName      => "John",
    :lastName       => "Tolkien",
    :project        => "/projects/1"
  },
  {
    :guid           => "/people/15",
    :firstName      => "Harry",
    :lastName       => "Potter",
    :project        => "/projects/1"
  },
  
]

projects = [
  {
    :guid => "/projects/1",
    :name => "Tidy home",
    :people => [
      "/people/1",
      "/people/2",
      "/people/3",
      "/people/4",
      "/people/5",
      "/people/6",
      "/people/7",
      "/people/8",
      "/people/9",
      "/people/10",
      "/people/11",
      "/people/12",
      "/people/13",
      "/people/14",
      "/people/15"
    ],
    :tasks => [
      "/tasks/1"
    ]
  },
  {
    :guid => "/projects/2",
    :name => "SFDC",
    :people => [
    ],
    :tasks => []
  }
]

tasks = [
  {
    :guid => "/tasks/1",
    :what => "Clean your room"
  }
]

get '/people' do
  ids = request.params['ids'];
  ids = ids.split(',') unless ids.nil?
  if ids.nil?
    people.to_json
  else
    ids.collect {|id| people.find {|p| p[:guid] === id}}.to_json
  end
end

get '/people/:id' do
  people[params[:id].to_i - 1].to_json
end

get '/people_list' do
  people.map {|p| p[:guid] }.to_json
end

get '/best_people' do
  best_people = []
  best_people << people[-1]
  best_people << people[4]
  best_people << people[3]
  best_people.to_json
end

put '/people/:id' do
  data = JSON.parse(request.body.read)
  people[params[:id].to_i - 1] = data
  # puts people[params[:id].to_i - 1].to_json
  nil
end

get '/projects' do
  projects.to_json
end

get '/projects/:id' do
  projects[params[:id].to_i - 1].to_json
end

put '/projects/:id' do
  data = JSON.parse(request.body.read)
  projects[params[:id].to_i - 1] = data
  # puts people[params[:id].to_i - 1].to_json
  {:status => "OK"}.to_json
end

get '/tasks' do
  projects.to_json
end

get '/tasks/:id' do
  tasks[params[:id].to_i - 1].to_json
end

put '/tasks/:id' do
  data = JSON.parse(request.body.read)
  tasks[params[:id].to_i - 1] = data
  # puts people[params[:id].to_i - 1].to_json
  {:status => "OK"}.to_json
end

get '/all' do
  {
    :person     => people,
    :task       => tasks,
    :project    => projects
  }.to_json
end
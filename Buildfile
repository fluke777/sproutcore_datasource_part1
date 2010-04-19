# ===========================================================================
# Project:   Md
# Copyright: ©2010 My Company, Inc.
# ===========================================================================

# Add initial buildfile information here
config :all, :required => :sproutcore

proxy '/people', :to => 'localhost:9393'
proxy '/people_list', :to => 'localhost:9393'
proxy '/best_people', :to => 'localhost:9393'
proxy '/projects', :to => 'localhost:9393'
proxy '/tasks', :to => 'localhost:9393'
proxy '/all', :to => 'localhost:9393'
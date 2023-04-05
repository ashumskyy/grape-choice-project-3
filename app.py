import csv
from pymongo import MongoClient
import os
import sys
import subprocess
from flask import Flask, jsonify, render_template, redirect

try:
    import pandas as pd
    from flask_cors import CORS
    import sqlalchemy
    from sqlalchemy.ext.automap import automap_base
    from sqlalchemy.orm import Session
    from sqlalchemy import create_engine
    import psycopg2
except ImportError:
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'pandas'])
    subprocess.check_call(
        [sys.executable, '-m', 'pip', 'install', 'flask_cors'])
    subprocess.check_call(
        [sys.executable, '-m', 'pip', 'install', 'sqlalchemy'])
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'psycopg2'])
finally:
    import pandas as pd
    from flask_cors import CORS
    import sqlalchemy
    from sqlalchemy.ext.automap import automap_base
    from sqlalchemy.orm import Session
    from sqlalchemy import create_engine
    import psycopg2





from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import (Table, Column, String, Float, MetaData, Integer,  Numeric, VARCHAR, delete, REAL)

meta = MetaData()
Base = declarative_base()


# Read in wine ratings csv file
finale_data_df = pd.read_csv("data/new_final_wine_data.csv")


#Establishing flask
app = Flask(__name__)



# the different routes for the data
@app.route('/', methods=['GET'])
def home_page():
    return render_template('index.html')



@app.route("/ourTeam", methods=['GET'])
def ourTeam():
    return render_template('our_team.html')

@app.route("/githubRepo", methods=['GET'])
def githubRepo():
    return render_template('github_repo.html')




#Gamma 1-2: Don't forget to add 'return' for each database var in the engine code.
# Ex: return database_var_return

# Gamma 1-1: This is the page where data needs to be passed through
@app.route("/dashboard", methods=['GET'])
def dashboard():

    # Base = declarative_base()
    # database_path = "..data/finale_dataset.sqlite"
    engine = create_engine("sqlite:///data/new_final_wine_data.sqlite")
    # Base.metadata.create_all(engine)
    conn = engine.connect()
    # Base_metadata.create_all(engine)
    finale_data_df.to_sql("new_final_wine_data", conn, if_exists='replace')

    #Creating a query and saving it to a variable
    #test_data = pd.read_sql("select * from new_final_wine_data", conn)
    #alpha = pd.read_sql("select title, price, country  from new_final_wine_data", conn)
    alpha = pd.read_sql("select title, points, price, province, country, name, type  from new_final_wine_data", conn)

    #convert to JSON
    alpha = alpha.to_json(orient = "records")

    #Stopping the engine
    engine.dispose()


    return render_template('dashboard.html', alpha = alpha)










# API Routes
@app.route('/api/chart_alpha', methods=['GET'])
def sql_alpha():
    # Base = declarative_base()
    # database_path = "..data/finale_dataset.sqlite"
    engine = create_engine("sqlite:///data/new_final_wine_data.sqlite")
    # Base.metadata.create_all(engine)
    conn = engine.connect()
    # Base_metadata.create_all(engine)
    finale_data_df.to_sql("new_final_wine_data", conn, if_exists='replace')

    #Creating a query and saving it to a variable
    #test_data = pd.read_sql("select * from new_final_wine_data", conn)
    #alpha = pd.read_sql("select title, price, country  from new_final_wine_data", conn)
    alpha = pd.read_sql("select title, points, price, province, country, name, type  from new_final_wine_data", conn)

    #convert to JSON
    alpha = alpha.to_json(orient = "records")

    #Stopping the engine
    engine.dispose()

    return alpha








if __name__ == '__main__':
    app.run(debug=True)

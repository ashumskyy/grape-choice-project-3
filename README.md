# grape_choice
For Project 3, we were asked to create an interactive web application with at least 3 visualizations using Flask, HTML, CSS, JavaScript, at least 2 JavaScript libraries and a SQL database. This web application was constructed in 14 days.

![Picture1](https://user-images.githubusercontent.com/44728723/229258983-59c3e312-2487-46fe-abb8-4cbb471055f6.jpg)

## Motivation
Many of us have on occasion been tasked with selecting a bottle of wine for a house-warming gift or holiday party and found ourselves overwhelmed by the sheer volume of options on the shelf! So we set out to build a wine selection dashboard to make it easier for the occasional wine drinker to find his/her next great wine or **"Grape Choice"**.

## Data Description
We used a wine review dataset which was scraped from WineEnthusiast in 2017, available on Kaggle [here](https://www.kaggle.com/datasets/zynicide/wine-reviews). The original dataset contained nearly 130,000 records of wine and included the following columns: the label title, points, price, varietal, winery, country, province, region, designation, reviewers' name and twitter handle and the reviewers' description of the wine. We cleaned the data in Pandas/Python as follows: removed null values, dropped wines priced over $200 and condensed the dataset to the last 50 years. The final, cleaned dataset contained over 99,000 records. The final dataset was uploaded to a SQLite database.

## Web Application Overview

- We deployed Flask as the web server to host the page routes and import the data housed in the SQLite database through SQLAlchemy.
- The web application navigation contains links to 3 webpages (Project Overview, Dashboard and Our Team) and a link to this GitHub repository. 
- To see the live version of the website application, download the source code and launch the Flask app.py file.  The web app is also hosted on render.com through the following link:  [grape_choice](https://grape-choice.onrender.com/)


<p><b>Project Overview:</b></p>
<p align="center">
<img width="620" alt="Screen Shot 2023-04-04 at 9 00 13 AM" src="https://user-images.githubusercontent.com/44728723/229799835-cd104dd0-5746-4a06-ac10-5d578290ac7b.png">
  
__________________________________________________________________________________
  
<p><b>Dashboard:</b></p>

- The Dashboard contains a dropdown menu for the user to select the type of wine they are interested in:  White, Red, Rosé or Sparkling.
- Once selected, the web application will display a horizontal bar chart of the Top 10 Wines in the category based on points.
- At the bottom of the page is a chart showing the Top 25 and Bottom 25 Wines ranked by Price per Point (lower is better) for the category selected in the dropdown menu.
- Both the Top 10 by Points and the Top/Bottom Price per Point bar charts update when the dropdown selection changes.
- On the right side of the dashboard is a stream graph from Highcharts which depicts the number of wines by country by wine points. This chart also has a zoom feature.
- All three charts are interactive and contain hover features showing additional data details.
<p align="center">
<img width="619" alt="Screen Shot 2023-04-04 at 9 04 55 AM" src="https://user-images.githubusercontent.com/44728723/229800736-c49bd85a-854a-40e1-8075-420dd6c4ecd5.png">

  __________________________________________________________________________________
  
<p><b>Our Team Page:</b></p>

Our team page contains links to each member's GitHub repository, LinkedIn profile and Twitter account that displays when the user hovers over an avatar.
<p align="center">
<img width="619" alt="Screen Shot 2023-04-04 at 9 00 37 AM" src="https://user-images.githubusercontent.com/44728723/229799869-21557b5d-0cd9-49eb-9bc0-091a7d307510.png">

## Technology

- Data Cleansing:  **Pandas** and **Python**
- Data Warehousing:  **SQLite** was used to house the dataset
- Frontend:  **HTML5, CSS** and **Bootstrapping** for content and styling
- Backend Data Manipulation:  **JavaScript, D3, Plotly** and **Highcharts** for interactive data visualizations
- Web Enablement:  **Flask** was used as the skinny web server and was also the connection point between the SQLite database via **SQLAlchemy**, JavaScript and HTML files
- Web App Hosting:  **Render.com** is hosting the web app through a connectionn to **GitHubb**

<img width="812" alt="Screen Shot 2023-04-06 at 12 02 41 PM" src="https://user-images.githubusercontent.com/44728723/230434752-57f80d51-2f3a-4cc6-bc8a-f66187e146f6.png">

## Future Considerations
In the future, we could expand upon this web application by:
- Adding additional user selection multi-level dropdowns or sliders for price range, wine points and/or province & country
- Applying machine learning to predict wine rating based on variables in the data set
- Deploying a recommendation engine based on user inputs or a similarly rated wine selection
- Securing more recent data

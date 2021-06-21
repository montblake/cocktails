# Forking Cocktails
## Cocktail Database & Recipe Development Tool

On the simplest level, this app allows a user to explore a cocktail recipe database. In addition to accessing and reading data of creators and their cocktail recipes, the app facilitates the creation, editing/updating, and deletion of data. The unique angle to the app is the ability to create new recipes using other recipes as the starting point (sort of a combination EDIT/NEW route). In software development this is often called "forking" -- in the restaurant world, we'd probably call it a "riff" or "spin" or "variation". In addition to the core properties of cocktails and creators, the database should facilitate the exploration of lineage &geneology of forked cocktails, ie. what recipe a cocktail is a variation on and what recipes are derived from that cocktail. Hopefully, the app is able to provide value to the general drinking public as well as professional and amateur drink-makers.

## Getting Started
Three major sections of database to explore:
Cocktail recipes, Ingredients, and Users. Any visitor should be able to read and explore the data. In order to create, you will need to register and then log in. If you wish, log in as Jane Smith whose email is jane@smith.com and her password is "password". Add ingredients or cocktails, edit or delete your work, or fork any recipe on the site. 

The app is deployed on Heroku here:
https://salty-inlet-99632.herokuapp.com/

![Cocktail Index](https://i.imgur.com/TRiUCM7.png)

## Supporting Details
### Technologies Used:
MongoDB, NodeJS, Express with EJS and Mongoose
HTML5, CSS, Javascript, jQuery

### Data Modeling:
The database utilizes three main linked data models in relationship: a Cocktail model, an Ingredient model, and an Author/Contributor model. The ingredients are passed into an "ingredient line" model so that the Cocktail recipe is able to expand to contain as many lines as needed. Also, the Cocktail model has a "Parent" property which holds a reference to another Cocktail, so it adds self-reference to its portfolio of relationships.
![Entity Relationship Diagram](https://i.imgur.com/hSzsdaV.png)

### Authentication and Authorization
The app works as a read only database for guests while registered users can create, edit, and delete their cocktails. Registered Users should also be able to fork any cocktail, either their own or someone else's. Administrators should be able to perform any data operation on any asset.

### Visual Design
In terms of user experience and design, I believe the app is best served for now with a clean, text-only layout. I've focused on legibility and a mobile-first design so the app is usable by professional bartenders on their phones during shift.

![Add Cocktail Page](https://i.imgur.com/1nYgqsu.png)

### Future Goals and Features to Add
In the end, I'm hoping the app can serve as a recipe development tool as well as a database, connecting professionals and enthusiasts by forking each others work and building new cocktails in collaborative, virtual environment. Key to this will be adding more tools for creators, especially the ability to keep their recipes private (whether permanently or until deemed worthy of release). This feature holds some challenges if cocktails were once public and then made private &mdash; how would this affect the tracking of parent and child cocktails? This is just one challenging aspect to the data collection that becomes more clear the more developed the app becomes. There must be an easy way of handling a new recipe if a desired ingredient isn't already in the database (without having to stop, create the ingredient, and then restart the cocktail creation). Also, as the number of entries for cocktails, ingredients, and people increase, the need to search and sort through the data will become more important. For now, working on the app has been a great introduction to using databases but it has also made clear how much more there is to learn about making use of the technology.

## Wireframes
Here are the first generation of wireframes for the app:
![App Wireframes](https://i.imgur.com/IFdlqM1.png)

Here are the second  generation as the complexity of the site expanded:
![2nd Gen Wireframes](https://i.imgur.com/Jp3vFW0.png)

![Dashboard](https://i.imgur.com/uFI1MVr.png)
# Forking Cocktails
## Cocktail Database & Recipe Development Tool

On the simplest level, this app allows a user to explore a cocktail recipe database. In addition to accessing and reading data of creators and their cocktail recipes, the app facilitates the creation, editing/updating, and deletion of data. The unique angle to the app is the ability to create new recipes using other recipes as the starting point (sort of a combination EDIT/NEW route). In software development this is often called "forking" -- in the restaurant world, we'd probably call it a riff or spin or variation.
In addition to the core properties of cocktails and creators, the database should facilitate the exploration of lineage/geneology. What recipe a cocktail is a variation on, and what recipes have evolved from that cocktail.

## Data Modeling
The database utilizes two data models in relationship: a Cocktail model and a Person model. Eventually, the Cocktail might want to be connected to an Ingredient model as well. 
![Entity Relationship Diagram](https://i.imgur.com/kAOKqTg.png)

## Authentication and Authorization
Also, the app doesn't truly make sense until an authentication and authorization process can be added. It works as a read only database for guests while registered users can create, edit, and delete their cocktails. Registered Users should also be able to fork any cocktail, either their own or someone else's. Administrators should be able to perform any data operation on any asset. Once this authorization aspect is added, other features suggest themselves: the ability to keep cocktails public or private, to add a dashboard for users to view/edit their own body of work.

## Challenges
The current challenge in development is keeping site of the features that make this a UNIQUE app and not adding complexity that isn't essential. Also, trying to create controls for standardizing entry of ingredients has added a layer of complexity that isn't yet clearly achievable. 

## Visual Design
In terms of user experience and design, I believe the app is best served for now with a clean, text-only layout. I'd like to focus on mobile-first design so the app is usable by professional bartenders on their phones during shift.

## Goals
In the end, I'm hoping the app can serve as a recipe development tool as well as a database, connecting professionals and enthusiasts by forking each others work and building new cocktails in collaborative, virtual environment.


![App Wireframes](https://i.imgur.com/IFdlqM1.png)
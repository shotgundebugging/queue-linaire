# README

# Stack used
- Rails 7.1.2
- Ruby 3.2.2
- PostgreSQL 16
- React 18.2.0
- esbuild 0.19.8

# Deliverables

## Production deployment

[Available on fly.io](https://queue-linaire.fly.dev/)

## User stories

### User story 1
**As an** unauthenticated user (John Cook),  
**I want to** utilize ingredients I have at home,  
**So that I can** find recipes to cook with those specific ingredients.

**Acceptance Criteria:**
- John Cook enters the available ingredients into the ingredient search.
- The system provides a list of recipes that can be prepared with the entered ingredients.
- 10 potential recipes are displayed based on the input ingredients.

### User story 2
**As an** unauthenticated user (John Cook),  
**I want to** cook my favorite recipe but I don't have all the ingredients,  
**So that I can** find alternative recipes resembling my favorite one but adjusted to the ingredients I have.

**Acceptance Criteria:**
- John Cook searches for a specific recipe.
- The system presents the required ingredients for that recipe.
- John selects only the ingredients he currently has.
- The system suggests alternative recipes similar to the selected one.

## Database structure

```
           table_name            |      column_name      |          data_type
---------------------------------+-----------------------+-----------------------------
 ar_internal_metadata            | key                   | character varying
 ar_internal_metadata            | value                 | character varying
 ar_internal_metadata            | created_at            | timestamp without time zone
 ar_internal_metadata            | updated_at            | timestamp without time zone
 ingredients                     | id                    | bigint
 ingredients                     | name                  | character varying
 ingredients                     | recipe_count          | integer
 ingredients                     | created_at            | timestamp without time zone
 ingredients                     | updated_at            | timestamp without time zone
 ingredients_recipe_instructions | ingredient_id         | bigint
 ingredients_recipe_instructions | recipe_instruction_id | bigint
 recipe_instructions             | id                    | bigint
 recipe_instructions             | recipe_id             | bigint
 recipe_instructions             | description           | character varying
 recipe_instructions             | created_at            | timestamp without time zone
 recipe_instructions             | updated_at            | timestamp without time zone
 recipes                         | id                    | bigint
 recipes                         | title                 | character varying
 recipes                         | ratings               | double precision
 recipes                         | image                 | character varying
 recipes                         | created_at            | timestamp without time zone
 recipes                         | updated_at            | timestamp without time zone
 schema_migrations               | version               | character varying

                                       List of relations
 Schema |                  Name                  | Type  |   Owner    |        Table
--------+----------------------------------------+-------+------------+----------------------
 public | ar_internal_metadata_pkey              | index | postgres   | ar_internal_metadata
 public | index_recipe_instructions_on_recipe_id | index | postgres   | recipe_instructions
 public | ingredients_pkey                       | index | postgres   | ingredients
 public | recipe_instructions_pkey               | index | postgres   | recipe_instructions
 public | recipes_pkey                           | index | postgres   | recipes
 public | schema_migrations_pkey                 | index | postgres   | schema_migrations
 ```

# Notes 

## Datasets

The ingredients in the dataset provided contain various quantity measures, brand names, adjectives (large, small, blue, red, green etc) without any specific order or format. I have used an additional [dataset of ingredients](https://www.kaggle.com/datasets/kaggle/recipe-ingredients-dataset/) to overcome this issue. The DB structure I have used allows finding the ingredients in a recipe and the recipes which have certain ingredients with a single query.

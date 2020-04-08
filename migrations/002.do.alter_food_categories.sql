CREATE TYPE food_category AS ENUM (
    'Burger',
    'Burrito',
    'Sushi',
    'Pizza'
);

ALTER TABLE restaurants
    ADD COLUMN
        food_category food_category;
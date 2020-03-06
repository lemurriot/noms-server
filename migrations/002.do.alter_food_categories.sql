CREATE TYPE food_category AS ENUM (
    'Burger',
    'Burrito',
    'Falafel',
    'Pizza'
);

ALTER TABLE restaurants
    ADD COLUMN
        food_category food_category;
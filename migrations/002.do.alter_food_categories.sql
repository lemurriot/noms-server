CREATE TYPE category AS ENUM (
    'Burger',
    'Burrito',
    'Falafel'
);

ALTER TABLE noms_restaurants
    ADD COLUMN
        food_category category;
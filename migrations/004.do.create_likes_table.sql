CREATE TABLE likes_and_comments (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    restaurant_id INTEGER REFERENCES noms_restaurants(id) ON DELETE CASCADE NOT NULL,
    comment VARCHAR(185),
    date_liked TIMESTAMP DEFAULT now() NOT NULL,
    date_commented TIMESTAMP DEFAULT now() NOT NULL
);
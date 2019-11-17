-- space for writing raw sql queries before knex wrapping



SELECT * FROM restaurants AS rez left join likes_and_comments AS lc on rez.id=lc.restaurant_id;

SELECT rez.id, rez.name, COUNT(lc.user_id) AS vote_count FROM restaurants AS rez left join likes_and_comments AS lc on rez.id=lc.restaurant_id GROUP BY rez.id;


-- provides basic table with vote tally
SELECT rez.*, COUNT(lc.user_id) AS vote_count FROM restaurants AS rez left join likes_and_comments AS lc on rez.id=lc.restaurant_id GROUP BY rez.id;

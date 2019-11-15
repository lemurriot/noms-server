ALTER TABLE restaurants
    DROP COLUMN IF EXISTS nominated_by_user;

DROP TABLE IF EXISTS users;
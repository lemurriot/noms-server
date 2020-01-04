const UpvotesService = {
  getUserDidUpvoteRestaurant(db, userId, restaurantId) {
    return db
      .from("likes_and_comments")
      .select("id")
      .where({
        user_id: userId,
        restaurant_id: restaurantId
      });
  },
  insertNewUpvote(db, user_id, restaurant_id) {
    return db
      .into("likes_and_comments")
      .insert({ user_id, restaurant_id, comment: "" })
      .returning("*");
  },
  deleteUpvote(db, upvoteObjectId) {
    return db
      .from("likes_and_comments")
      .where({ id: upvoteObjectId })
      .del();
  }
};

module.exports = UpvotesService;

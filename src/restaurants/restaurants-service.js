const xss = require("xss");

const RestaurantsService = {
  getAllRestaurants(db) {
    return db
      .from("restaurants AS noms")
      .select(
        "noms.id",
        "noms.name",
        "noms.date_nominated",
        "noms.nominated_by_user",
        "noms.food_category",
        db.raw("count(lc.user_id) as vote_count")
      )
      .leftJoin("likes_and_comments AS lc", "noms.id", "lc.restaurant_id")
      .groupBy("noms.id");
  },
  getRestaurantById(db, restaurantId) {
    return db
      .from("restaurants AS noms")
      .select("noms.*", db.raw("count(lc.user_id) as vote_count"))
      .where("noms.id", restaurantId)
      .first()
      .leftJoin("likes_and_comments AS lc", "noms.id", "lc.restaurant_id")
      .groupBy("noms.id");
  },
  getCommentsAndUsers(db, restaurantId) {
    return db
      .from("likes_and_comments AS lc")
      .select("lc.*", "users.user_name")
      .where("lc.restaurant_id", restaurantId)
      .leftJoin("users", "lc.user_id", "users.id")
      .groupBy("lc.id", "lc.date_commented", "users.user_name");
  },
  postNewRestaurant(db, newRestaurant) {
    console.log(newRestaurant);
  },
  serializeRestaurant(restaurant) {
    const {
      id,
      name,
      date_nominated,
      nominated_by_user,
      food_category,
      vote_count
    } = restaurant;
    return {
      id,
      name: xss(name),
      date_nominated,
      nominated_by_user,
      food_category,
      vote_count
    };
  },
  serializeComments(comments) {
    const {
      id,
      user_id,
      restaurant_id,
      comment,
      date_liked,
      date_commented,
      user_name
    } = comments;
    return {
      id,
      user_id,
      restaurant_id,
      comment: xss(comment),
      date_liked,
      date_commented,
      user_name: xss(user_name)
    };
  },
  serializeRestaurantUsersAndComments(restaurant) {
    const serializedRestaurant = this.serializeRestaurant(restaurant);
    const { comments } = restaurant;
    serializedComments = comments.map(comment =>
      this.serializeComments(comment)
    );
    return {
      ...serializedRestaurant,
      comments: comments.map(comment => this.serializeComments(comment))
    };
  }
};

module.exports = RestaurantsService;

const xss = require('xss')

const RestaurantsService = {
    getAllRestaurants(db){
        return db
            .from('restaurants AS noms')
            .select(
                'noms.id',
                'noms.name',
                'noms.date_nominated',
                'noms.nominated_by_user',
                'noms.food_category',
                db.raw('count(lc.user_id) as vote_count')
            )
            .leftJoin(
                'likes_and_comments AS lc',
                'noms.id',
                'lc.restaurant_id'
            )
            .groupBy('noms.id')
    },
    serializeRestaurant(restaurant){
        const { id, name, date_nominated, nominated_by_user, food_category, vote_count } = restaurant
        return {
            id,
            name: xss(name),
            date_nominated,
            nominated_by_user,
            food_category,
            vote_count
        }
    }
}

module.exports = RestaurantsService
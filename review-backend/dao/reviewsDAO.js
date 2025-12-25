import mongodb from "mongodb";
const ObjectID = mongodb.ObjectId;

let reviews
export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {
            return;
        }

        try {
            reviews = await conn.db("reviews").collection("reviews");
        } catch (e) {
            console.error(`Unable to establish connection handles in userDao: ${e}`);
        }
    }

    static async addReview(movieId, user, review) {
        try {
            const reviewDoc = {
                movieId: movieId,
                user: user,
                review: review
            };

            return await review.insertOne(reviewDoc);
        } catch (e) {
            console.error(`Unable to post review: ${e}`);
            return { error: e };
        }
    }

    static async getReview(reviewID) {
        try {
            return await reviews.findOne({ _id: ObjectID(reviewID) });
        } catch (e) {
            console.error(`Unable to get review: ${e}`);
            return { error: e };
        }
    }

    static async updateReview(reviewID, user, review) {
        try {
            const updateResponse = await reviews.updateOne(
                { _id: ObjectID(reviewID) },
                { $set: { user: user, review: review } }
            );
            return updateResponse
        } catch (e) {
            console.error(`Unable to update review: ${e}`);
            return { error: e };
        }
    }

    static async deleteReview(reviewID) {
        try {
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectID(reviewID)
            });
            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete review: ${e}`);
            return { error: e };
        }
    }

    static async getReviewsBymovieId(movieId) {
        try {
            const cursor = await reviews.find({ movieId: parseInt(movieId) });
            return cursor.toArray();
        } catch (e) {
            console.error(`Unable to get review: ${e}`);
            return { error: e };
        }
    }
}
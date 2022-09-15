import {Router} from "express"

import RatingController from "../controllers/rating.controller"

import verifyTokenMiddleware from "../middlewares/verifyToken.middleware"
import verifyCourseExistsMiddleware from "../middlewares/verifyCourseExists.middleware"
import verifyStudentExistsMiddleware from "../middlewares/verifyStudentExists.middleware"


const route = Router()


const ratingRoute = () => {
    route.get("/:rating_id", RatingController.getRating)
    route.get("", RatingController.getRatings)
    route.post("/:course_id", verifyTokenMiddleware, verifyCourseExistsMiddleware, verifyStudentExistsMiddleware, RatingController.createRating)
    route.delete("/:rating_id", verifyTokenMiddleware, RatingController.deleteRating)

    return route
}


export default ratingRoute
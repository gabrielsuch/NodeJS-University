import {Request} from "express"

import {AppDataSource} from "../data-source"
import {Rating} from "../entities/rating.entity"
import {Course} from "../entities/course.entity"
import {Student} from "../entities/student.entity"


class RatingService {
    getRating = async ({params}: Request) => {
        const ratingRepository = AppDataSource.getRepository(Rating)
        const rating = await ratingRepository.findOneBy({
            id: params.rating_id
        })

        if(!rating) {
            return {status: 404, message: {error: "Rating not found."}}
        }

        return {status: 200, message: rating}
    }

    getRatings = async () => {
        const ratingRepository = AppDataSource.getRepository(Rating)
        const ratings = await ratingRepository.find()

        return {status: 200, message: ratings}
    }

    createRating = async ({body, params, decoded}: Request) => {
        const ratingRepository = AppDataSource.getRepository(Rating)

        const courseRepository = AppDataSource.getRepository(Course)
        const course = await courseRepository.findOneBy({
            id: params.course_id
        })

        const studentRepository = AppDataSource.getRepository(Student)
        const student = await studentRepository.findOneBy({
            email: decoded
        })

        const rating = new Rating()
        rating.id = body.id
        rating.description = body.description
        rating.course = course
        rating.student = student

        ratingRepository.create(rating)
        await ratingRepository.save(rating)

        return {status: 201, message: body}
    }

    deleteRating = async ({params, decoded}: Request) => {
        const ratingRepository = AppDataSource.getRepository(Rating)
        const rating = await ratingRepository.findOneBy({
            id: params.rating_id
        })

        const studentRepository = AppDataSource.getRepository(Student)
        const student = await studentRepository.findOneBy({
            email: decoded
        })

        if(!rating) {
            return {status: 404, message: {error: "Rating not found."}}
        }

        if(rating.student.id != student.id) {
            return {status: 401, message: {error: "You don't own this Rating to delete."}}
        }

        await ratingRepository.delete(rating.id)

        return {status: 204, message: ""}
    }
}


export default new RatingService()
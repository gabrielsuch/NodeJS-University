import * as yup from "yup"


const createStudentSchema = yup.object().shape({
    name: yup.string().required().max(100),
    birthdate: yup.date().required(),
    cpf: yup.string().required().length(14),
    telephone: yup.string().required().length(14),
    cellphone: yup.string().required().length(15),
    sex: yup.string().optional(),
    email: yup.string().required().email(),
    password: yup.string().required()
})

const updateStudentSchema = yup.object().shape({
    name: yup.string().optional().max(100),
    birthdate: yup.date().optional(),
    cpf: yup.string().optional().length(14),
    telephone: yup.string().optional().length(14),
    cellphone: yup.string().optional().length(15),
    sex: yup.string().optional(),
    email: yup.string().optional().email(),
    password: yup.string().optional()
})

const loginStudentSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required()
})


export {createStudentSchema, updateStudentSchema, loginStudentSchema}
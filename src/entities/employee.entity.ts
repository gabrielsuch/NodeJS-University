import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany} from "typeorm"

import {Grade} from "./grade.entity"


enum SexRole {
    Masculino = "Masculino",
    Feminino = "Feminino",
    NULL = "null"
}


@Entity()
export class Employee {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        length: 100
    })
    name: string

    @Column()
    birthdate: Date

    @Column({
        unique: true,
        length: 14
    })
    cpf: string

    @Column({
        length: 10
    })
    telephone: string

    @Column({
        length: 11
    })
    cellphone: string

    @CreateDateColumn()
    created_at: Date

    @Column({
        type: "enum",
        enum: SexRole,
        default: SexRole.NULL
    })
    sex: SexRole

    @Column({
        unique: true,
        length: 150
    })
    email: string

    @Column({
        length: 255
    })
    password: string

    @Column({
        default: false
    })
    is_adm: boolean

    @OneToMany(() => Grade, (grade) => grade.teacher)
    grade: Grade 
}
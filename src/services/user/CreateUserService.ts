
import prismaCliente from '../../prisma/'
import { hash } from 'bcryptjs'


interface UserRequest {
    name: string;
    email: string;
    password: string;
    phone: string;
    city: string
}

class CreateUserService{
    async execute({name, email, password, phone, city}: UserRequest){

        if(!email){
            throw new Error('e-mail not sent')
        }

        const userAlreadyExists = await prismaCliente.user.findFirst({
            where :{
                email: email
            }
        })

        if(userAlreadyExists){
            throw new Error('user Already Exists')
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaCliente.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash,
                phone: phone,
                city: city,
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })


        return user;
    }
}

export { CreateUserService }
import {z} from 'zod'

const userSchema = z.object({
    id: z.union([z.number(), z.string()]),
    username : z.string().min(10),
    age: z.number().min(1).max(100),
    isProgrammer: z.boolean(),
    hobby : z.enum(['programming', 'Guitar', 'weight liffting']),
    friends: z.array(z.string())
})

type User = z.infer<typeof userSchema>

userSchema.shape.friends.element

const user:User = {
    id: 23,
    username : 'eyob',
    age: 2,
    isProgrammer: true,
    hobby: 'programming',
    friends: ['hello']
}

console.log(userSchema.parse(user))
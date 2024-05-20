import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcryptjs"
import database from "../../../../../database/lib/mongoose"
import UserInfo from "../../../../../database/schemas/userData"

const handler = NextAuth({
    pages: {
      error: "/signin",
      signIn: "/signin",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID??"",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET??"",
            profile(profile){
              return{
                id: profile.sub,
                name: profile.name,
                email: profile.email,
              }
            }
        }),
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "email", placeholder: "email" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            await database.connectMongo()

            try {
              if (!credentials) {
                return null
              }

              const { email, password } = credentials
              if (!email || !password) {
                return null;
              }

              const user = await UserInfo.findOne({ email })

              if (user) {
                const validPassword = await bcrypt.compare( password, user.password )
                if(validPassword){
                  return user
                } else {
                throw new Error("usuário ou senha não encontrado")
                }
              } else {
                throw new Error("usuário ou senha não encontrado")
              }
            } catch (error) {
              throw new Error("error ao autenticar" + error)
            }
          }
        })
      ]
})

export { handler as GET, handler as POST }
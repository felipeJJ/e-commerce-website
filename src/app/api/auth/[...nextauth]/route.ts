import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    pages: {
      signIn: "/signin",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID??"",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET??"",
            profile(profile){
              console.log(profile)
              return{
                id: profile.sub,
                name: profile.name,
              }
            }
        }),
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "email", placeholder: "email" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            console.log(credentials)
            if (!credentials){
              return null
            }

            if(credentials.email === "a@a.com" && credentials.password === "123456"){
              return{
                id: "1",
                name: "cuzinho",
                email: "a@a.com"
              }
            }
    
            return null
          }
        })
      ]
})

export { handler as GET, handler as POST }
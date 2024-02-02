import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {login} from "@/app/api/api";

const authOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                const {username, password} = credentials
                const user = await login(username, password)
                //localStorage.setItem('access_token', user.accessToken)
                if (user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({token, user}) {
            return {...user, ...token}
        },
        async session({session, token, user}) {
            session.user = token
            return session
        }

    }
}
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}
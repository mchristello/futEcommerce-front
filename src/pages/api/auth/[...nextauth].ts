import { connectBack } from "utils/serverConnection";
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: "login-next-auth",
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const response = await connectBack.post('/users/login', {
                    email: credentials?.email,
                    password: credentials?.password
                })
                .catch((err) => {
                    if(err) {
                        console.log(`ERROR IN AUTHORIZE LOGIN--->`, err.response.data.message);
                    }
                })

                if(!response) {
                    return null
                }

                const token = response.data.token

                if (token) {
                    try {
                        const response = await connectBack.get("/api/users/current", {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        
                        const user = response.data.payload;
                        // console.log(`USER FROM LINE 45`, user);
    
                        return {
                            id: user._id,
                            name: user.first_name + ' ' + user.last_name,
                            email: user.email,
                            rol: user.rol,
                            token: token,
                            cart: user.cart,
                            cartId: user.cart._id,
                            last_connection: user.last_connection
                        } as any
                    } catch (error) {
                        console.log(`CATCH IN TOKEN CONDITIONAL--->`, error)
                        
                    }
                    
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null
                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        }) 
    ],
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60,
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            // console.log(`USER FROM JWT CALLBACK`, user);
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.rol = user.rol;
                token.token = user.token;
                token.cart = user.cart;
                token.cartId = user.cartId;
            }
            // console.log(`TOKEN FROM JWT CALLBACK`, token);
            return token;
        },
        async session({ session, token }) {
            // console.log(`TOKEN DESDE SESSION CALLBACK`, token);
            if (session.user && token) {
                session.user._id = token.id;
                session.user.name = token.name;
                session.user.rol = token.rol;
                session.user.token = token.token;
                session.user.cart = token.cart;
                session.user.cartId = token.cartId
            }
            // console.log(`SESSION DE NEXTAUTH--->`, session);

            return session;
        },
    },
}


export default NextAuth(authOptions)
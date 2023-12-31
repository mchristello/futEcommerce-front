import { DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user?: DefaultUser & {
            _id: string;
            rol: string;
            token: string;
            cart: string;
            cartId: string;
        };
    }
    interface User extends DefaultUser {
        rol: string;
        token: string;
        cart: string;
        cartId: string;
    }
}
declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        rol: string;
        token: string;
        cart: string;
        cartId: string;
    }
}
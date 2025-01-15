import CredentialsProvider from "next-auth/providers/credentials";
import { postRequest } from "./utils/axiosHelper";



import { CredentialInput } from "next-auth/providers/credentials";

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: string
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
  
export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Enter your username" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials: Record<string, string> | undefined, req): Promise<LoginResponse | null  | any> {
        try {
          if (!credentials) {
            throw new Error("Credentials are missing");
          }

          const loginData = {
            username: credentials.username,
            password: credentials.password,
          };

          console.log("loginData", loginData);

          const response:any = await postRequest({
            url: "/auth/login",
            data: loginData,
          });

          console.log("respeyob", response);

          if (response?.status === 200 && response?.data) {
            return {
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
                user: response.data.user
            }
          }

          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  secret: "234234214123wqq3241234",
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 3600
  },
  callbacks: {
    async jwt({token, user, account}:any) {
        if (user){
            token.accessToken = user.accessToken;
            token.refreshToken = user.refreshToken
            token.user = user.user
        }
        return token;
        
    },
    async session({session, token}: any) {
        session.accesstoken = token.accesstoken;
        session.refreshToken = token.refreshToken
        session.user = token.user;
        return session
    }
   
  }


};

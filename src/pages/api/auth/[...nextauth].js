import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
// import { postData } from "../../../functions/auth";
import { myFetch } from "@/utils/myFetch";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  // pages: {
  //   signIn: '/signin',
  // },
  callbacks: {
    async session({ session, token, user }) {
        // Check if the user ID is already stored in the session
        if (!session?.user?.id) {
            const email = session.user.email;
            const url = process.env.API_URL + `api/user/users/email/` + email;

            try {
                const data = await myFetch(url);
                
                if (data?.id) {
                    // Set the user ID in the session if found
                    session.user.id = data.id;
                    console.log('User ID fetched and set:', session.user.id);
                }
            } catch (e) {
                console.error('Failed to fetch user ID:', e);
            }
        }

        return session;
    },

    async signIn({ user, account, profile, credentials }) {
        const r = (Math.random() + 1).toString(36).substring(7);
        const firstname = profile.given_name;
        const lastname = profile.family_name;
        const email = profile.email;
        const url = process.env.API_URL + `api/user/users/create/`;

        console.log(firstname, lastname, email);

        try {
            await myFetch(url, "POST", {
                password: r,
                username: email,
                first_name: firstname,
                last_name: lastname,
                email: email
            });
            return true;
        } catch (error) {
            console.error('Error during signIn:', error);
            return true;
        }
    },
},

  
})
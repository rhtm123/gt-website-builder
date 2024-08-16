import { getProviders, useSession, signIn, signOut, getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

import { FaGoogle } from "react-icons/fa";


export default function Login({providers}) {
    const { data: session } = useSession();

    return (<>

    <Head>
        <title>Login | Website Builder </title>
        <meta name="description" content="Login to Website Builder and start your journey of building" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

      </Head>


      <div className="container max-w-none">

      <div className="text-sm breadcrumbs">
        <ul>
            <li>
            <Link href={"/"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                Home
            </Link>
            </li> 
        
            <li>
                Login
            </li>
        </ul>
        </div>

    
        <div className="my-20 text-center">
        {Object.values(providers).map((provider) => (
            <div className="title" style={{ fontSize:16 }} key={provider.name}>
                <button onClick={() => signIn(provider.id)} data-aos="flip-right" className="btn" role="button" style={{textTransform:"none"}}>

                <FaGoogle size={24} className="text-blue-800" />

                LOGIN WITH GOOGLE
                </button>
            </div>
        ))}


        </div>


        </div>
    
    </>)
  }


  export async function getServerSideProps(context) {
    const { req, res, query } = context;
    const session = await getSession({ req });
  
    const { callbackUrl } = query;
  
  
    if (session && callbackUrl) {
      return {
        redirect: { destination: callbackUrl },
      };
    } else if (session) {
      return {
        redirect: { destination: "/" },
      };
    }
  
    return { props: { providers: await getProviders() } };
  }
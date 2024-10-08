import Link from 'next/link';
import { useSession, signOut, signIn} from "next-auth/react";
import ThemeSwitcher from './ThemeSwitcher';


const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gradient-to-r from-primary to-secondary shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
            <Link href="/" className='flex items-center'>
            <img src="/img/logo.png" alt="Logo" className="h-8 w-8 mr-2 fill-base-100" />
            <span className="text-xl font-bold text-base-100">CraftMySite</span>
            </Link>
          <div className='flex items-center gap-4'>
            {session ? (
              <button className='btn btn-sm' onClick={() => signOut()}>Logout</button>
            ) : (
              <button className='btn btn-sm' onClick={() => signIn()}>Login</button>

            )}
            {/* <ThemeSwitcher /> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

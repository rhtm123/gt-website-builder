import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "@/components/Navbar";
import Head from 'next/head';


export default function HomePage() {
  return (
    <>
      <Head>
        <title>CraftMySite - Build Websites Effortlessly</title>
        <meta name="description" content="Experience the power of our website builder, designed for developers who love Tailwind CSS." />
        <meta name="keywords" content="website builder, Tailwind CSS, web development, responsive design, real-time preview" />
        <meta name="author" content="GrowTech Lab" />
        <meta property="og:title" content="CraftMySite - Build Websites Effortlessly" />
        <meta property="og:description" content="Experience the power of our website builder, designed for developers who love Tailwind CSS." />
        <meta property="og:image" content="/img/website.jpg" />
        {/* <meta property="og:url" content="https://www.craftmysite.com" /> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CraftMySite - Build Websites Effortlessly" />
        <meta name="twitter:description" content="Experience the power of our website builder, designed for developers who love Tailwind CSS." />
        <meta name="twitter:image" content="/img/website.jpg" />
        {/* <link rel="canonical" href="https://www.craftmysite.com" /> */}
      </Head>

      <Navbar />

      <div className="bg-base-100">
        {/* Hero Section */}
        <section className="py-12 md:py-24 bg-gradient-to-r from-primary to-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-base-100 mb-6 leading-tight">
                  Build Websites Effortlessly
                </h1>
                <p className="text-xl md:text-2xl text-base-100 mb-10">
                  Experience the power of our website builder, designed for developers who love Tailwind CSS.
                </p>
                <Link href={"/projects"}>
                  <button className="btn btn-accent shadow-lg transform hover:scale-105 transition-transform">
                    Get Started Now
                  </button>
                </Link>
              </div>
              <div className="hidden md:block">
                <img
                  src="/img/website.jpg"
                  alt="Website Builder"
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 md:py-36">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl text-neutral font-extrabold mb-16 text-center">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Feature 1 */}
              <div className="card bg-base-200 shadow p-8 transform hover:-translate-y-2 transition-transform">
                <div className="flex items-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-10 h-10 text-primary mr-4"
                  >
                    <rect width="18" height="7" x="3" y="3" rx="1"></rect>
                    <rect width="9" height="7" x="3" y="14" rx="1"></rect>
                    <rect width="5" height="7" x="16" y="14" rx="1"></rect>
                  </svg>
                  <h3 className="text-2xl font-bold">Pre-built Sections</h3>
                </div>
                <p className="text-lg">
                  Start fast with a range of beautiful sections designed for different needs.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="card bg-base-200 shadow p-8 transform hover:-translate-y-2 transition-transform">
                <div className="flex items-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-10 h-10 text-primary mr-4"
                  >
                    <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z"></path>
                    <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
                    <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2"></path>
                    <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2"></path>
                  </svg>
                  <h3 className="text-2xl font-bold">Real-time Preview</h3>
                </div>
                <p className="text-lg">
                  Watch your website come to life with instant updates as you make changes.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="card bg-base-200 shadow p-8 transform hover:-translate-y-2 transition-transform">
                <div className="flex items-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-10 h-10 text-primary mr-4"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  <h3 className="text-2xl font-bold">Easy Editing</h3>
                </div>
                <p className="text-lg">
                  You can change the style or text of any element just by clicking on it.
                </p>
              </div>
              
            </div>
          </div>
        </section>

        {/* How-to Section */}

        <section className="py-24 bg-base-200">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-4xl md:text-5xl font-extrabold mb-16 text-center ">
      How to Use CraftMySite
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { step: 1, title: "Create a Project", description: "Start by creating a new project from the My Projects page." },
        { step: 2, title: "Add Sections", description: "Build your website by adding pre-designed sections to your project." },
        { step: 3, title: "Customize", description: "Modify styles and text of any element with live preview updates." },
        { step: 4, title: "Save Progress", description: "Save your work to continue later or keep for future reference." },
        { step: 5, title: "Generate Code", description: "Export your design as HTML or JSX code for easy deployment." },
        { step: 6, title: "Use the Code", description: "Use the generated code in your tailwind based projects." },

      ].map(({ step, title, description }) => (
        <div key={step} className="bg-base-100 rounded-xl p-8 border border-base-300 hover:shadow transition-shadow">
          <div className="flex items-center mb-4">
            <span className="bg-primary text-base-100 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-4">
              {step}
            </span>
            <h3 className="text-xl font-bold opacity-80">{title}</h3>
          </div>
          <p className="opacity-100">{description}</p>
        </div>
      ))}
    </div>

    <div className="mt-12 flex justify-center">
      <Link href="/projects">
        <button className="btn btn-primary shadow-lg px-8 py-4 transition-transform hover:scale-105">
          Start Building Now
        </button>
      </Link>
    </div>
  </div>
</section>



        {/* Call to Action Section */}
        <section className="py-24 md:py-36 bg-base-300">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                  Join Thousands of Developers
                </h2>
                <p className="text-xl mb-8">
                Connect with like-minded developers, share your journey, and get support on our Discord server.
                </p>
                <a target="_blank" href="https://discord.com/invite/8jHuMEBVPV">
                  <button className="btn btn-secondary">Join Discord</button>
                </a>
              </div>
              <div className="hidden md:block">
                <img
                  src="/img/developer.jpg"
                  alt="Customer Feedback"
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

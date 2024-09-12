import Link from "next/link"


export default function HomePage(){

  return(

<div className="bg-base-100 dark:bg-gray-900">
  {/* Hero Section */}
  <section className="py-24 md:py-36 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
            Build Websites Effortlessly
          </h1>
          <p className="text-xl md:text-2xl text-white mb-10">
            Experience the power of our website builder, designed for developers who love Tailwind CSS.
          </p>
          <Link href={"/projects"}>
          <button className="btn btn-accent btn shadow-lg transform hover:scale-105 transition-transform">
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
      <h2 className="text-4xl md:text-5xl text-base-100 font-extrabold mb-16 text-center">
        Key Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Feature 1 */}
        
        {/* Feature 2 */}
        <div className="card bg-base-200 shadow-xl p-8 transform hover:-translate-y-2 transition-transform">
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
            <h3 className="text-2xl font-bold">Pre-built Templates</h3>
          </div>
          <p className="text-lg">
            Start fast with a range of beautiful templates designed for different needs.
          </p>
        </div>
        {/* Feature 3 */}
        <div className="card bg-base-200 shadow-xl p-8 transform hover:-translate-y-2 transition-transform">
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

        <div className="card bg-base-200 shadow-xl p-8 transform hover:-translate-y-2 transition-transform">
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
              <path d="M2 2l8 8"></path>
              <path d="M22 2l-8 8"></path>
              <ellipse cx="12" cy="9" rx="10" ry="5"></ellipse>
              <path d="M7 13.4v7.9"></path>
              <path d="M12 14v8"></path>
              <path d="M17 13.4v7.9"></path>
              <path d="M2 9v8a10 5 0 0020 0V9"></path>
            </svg>
            <h3 className="text-2xl font-bold">Drag-and-Drop Interface</h3>
          </div>
          <p className="text-lg">
            Seamlessly create your website by dragging and dropping elements into place.
          </p>
        </div>
      </div>
    </div>
  </section>

  {/* Call to Action Section */}
  <section className="py-24 md:py-36 bg-neutral">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-base-100">
            Join Thousands of Developers
          </h2>
          <p className="text-xl text-neutral-content mb-8">
            Sign up now and start building websites like a pro.
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

  
  )
}
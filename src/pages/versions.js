
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const VersionHistory = () => {
  const [versions, setVersions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);

  const fetchVersions = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch version history');
      }
      const data = await response.json();
      console.log(data);
      setVersions(prevVersions => [...prevVersions, ...data.results]);
      setNextUrl(data.next);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVersions(process.env.API_URL +  'api/version/versions?app_name=builder&ordering=updated');
  }, []);

  const handleLoadMore = () => {
    if (nextUrl) {
      fetchVersions(nextUrl);
    }
  };

  if (error) {
    return <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{error}</span>
      </div>
    </div>;
  }

  return (
    <>
    <Navbar />
    <Head>
        <title>App Version History</title>
        <meta name="description" content="Version history of our app" />
      </Head>

    <div className="min-h-screen bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
      

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-base-content mb-8">Version History</h1>
        
        <div className="space-y-8">
          {versions.slice().reverse().map((version) => (
            <div key={version.id} className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title text-primary">
                  {version.name}
                </h3>
                
                { version.is_published ?
            <div className="flex items-stretch gap-1 ">
            <p className="opacity-80 font-semibold ">Release Date: {version.release_date}</p>
            <span className="badge badge-success">Published</span>
            </div>
              :
            <div className="flex items-stretch gap-1 ">
            <p className="opacity-80 font-semibold">Release Date: {version.release_date} </p>
              <span className="badge badge-info">Working</span>
            </div>
            }
                <div>
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: version.detail }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {nextUrl && (
          <div className="text-center mt-8">
            <button 
              className="btn btn-primary" 
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                'Load More'
              )}
            </button>
          </div>
        )}

        {isLoading && versions.length === 0 && (
          <div className="flex justify-center mt-8">
            <span className="loading loading-spinner"></span>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>

  );
};

export default VersionHistory;
//home page
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
        <div className="text-center">
          <h1 className="wt-title-better">
            Welcome to the Blog
          </h1>
          <p className="text-xl text-black-600 mb-8">
            Discover amazing articles and stories.
          </p>
          <button className="px-8 py-3 bg-black text-white rounded-full text-lg hover:bg-gray-800 transition duration-300">
            Explore Now
          </button>
        </div>
    </Layout>
  );
}

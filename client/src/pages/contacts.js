// Contacts page
import Layout from '../components/Layout';

export default function Contacts() {
  return (
    <Layout>
      
        <div className="max-w-2xl">
          <h1 className="wt-title-better">
            Contact Us!
          </h1>
          <p className="text-lg text-gray-600 mb-8 font-roboto">
            We would love to hear from you! Please reach out with any questions, comments, or feedback you may have.
          </p>
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Your Message"
              className="p-2 border border-gray-300 rounded"
              rows="4"
            />
            <button className="px-8 py-3 bg-black text-white rounded-full text-lg hover:bg-gray-800 transition duration-300">
              Send Message
            </button>
          </form>
        </div>

    </Layout>
  );
}

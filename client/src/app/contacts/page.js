"use client";

import { useUser } from "../../components/UserContext";
import emailjs from "emailjs-com";

export default function Contacts() {
  const { user, login } = useUser();

  const sendEmail = (e) => {
    e.preventDefault();

    // Envoie de l'email via EmailJS
    emailjs.sendForm(
      "service_z973i1p", // Ton service ID
      "template_sw0icqv", // Ton template ID
      e.target, // Les données du formulaire
      "V1nebE-hihE-Gii2K" // Ta clé utilisateur EmailJS
    )
      .then(
        (result) => {
          console.log(result.text);
          alert("Message envoyé !");
        },
        (error) => {
          console.log(error.text);
          alert("Une erreur est survenue, veuillez réessayer.");
        }
      );
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-FS_Sinclair">
      {user ? (
        <div className="max-w-2xl w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Contact Us!
          </h1>
          <p className="text-lg text-gray-700 mb-6 font-roboto dark:text-gray-300 text-center">
            Hello {user.name}, we’d love to hear from you! Send us your questions, comments, or feedback.
          </p>
          <form className="space-y-4" onSubmit={sendEmail}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Name
              </label>
              <input
                id="name"
                name="from_name" // Correspond à la variable 'from_name' dans le template
                type="text"
                placeholder="John Doe"
                defaultValue={user.name}
                required
                className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Email
              </label>
              <input
                id="email"
                name="from_email" // Correspond à la variable 'from_email' dans le template
                type="email"
                placeholder="example@example.com"
                defaultValue={user.email}
                required
                className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Message
              </label>
              <textarea
                id="message"
                name="message" // Correspond à la variable 'message' dans le template
                placeholder="Write your message here..."
                required
                rows="4"
                className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 focus:outline-none transition duration-300 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Send Message
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome!
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Please log in or sign up to access the contact form.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => login("github")}
              className="px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 focus:outline-none transition duration-300"
            >
              Log In with GitHub
            </button>
            <button
              onClick={() => login("discord")}
              className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 focus:outline-none transition duration-300"
            >
              Log In with Discord
            </button>
            <button
              onClick={() => window.location.href = "/login_native"}
              className="px-6 py-3 bg-gray-200 text-gray-900 font-bold rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 focus:outline-none transition duration-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              Log In with Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

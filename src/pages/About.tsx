import PageLayout from "../components/PageLayout";

const About = () => {
  return (
    <PageLayout userRole="adopter" userName="John Doe">
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">About Tale of Tails</h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          Welcome to Tale of Tails, a platform dedicated to connecting loving homes with pets in need.
          Our mission is to make the process of adoption and fostering as seamless and joyful as possible.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Tale of Tails was founded in 2023 by a group of animal lovers who saw the need for a better way
          to connect shelters, hospitals, and potential pet owners. We believe that every pet deserves a
          loving home, and every family deserves the joy of pet companionship.
        </p>
        <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
          <li>A comprehensive database of pets available for adoption and fostering.</li>
          <li>A streamlined application process to ensure pets are matched with suitable homes.</li>
          <li>Resources and guides on pet care to help owners provide the best possible life for their pets.</li>
          <li>A community forum to connect with other pet lovers, share experiences, and seek advice.</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Our team is comprised of dedicated professionals and volunteers who are passionate about animal welfare.
          From software developers to veterinary experts, we work together to create a platform that serves
          the best interests of pets and their future owners.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have any questions or would like to learn more about Tale of Tails, please don't hesitate to
          contact us at <a href="mailto:info@taleoftails.com" className="text-teal-500 hover:underline">info@taleoftails.com</a>.
          We'd love to hear from you!
        </p>
      </div>
    </PageLayout>
  );
};

export default About;

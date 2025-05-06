// Blog.js
import React from "react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for a Healthy Lifestyle",
      snippet:
        "Explore essential tips to maintain a healthy lifestyle and improve your well-being.",
      imageUrl:
        "https://media.istockphoto.com/id/2153823097/photo/cheerful-athletic-couple-jogging-through-the-park.jpg?s=612x612&w=0&k=20&c=7ZDGNkOSuXWxEmJkKpbisVSvo5mM3d3VcHkVhLhSD1Q=",
    },
    {
      id: 2,
      title: "The Importance of Regular Check-Ups",
      snippet:
        "Learn why regular check-ups are crucial for early diagnosis and better health outcomes.",
      imageUrl:
        "https://img.freepik.com/free-photo/young-doctor-is-using-stethoscope-listen-heartbeat-patient-shot-female-doctor-giving-male-patient-check-up_657921-875.jpg?semt=ais_hybrid&w=740",
    },
    {
      id: 3,
      title: "How to Manage Stress Effectively",
      snippet:
        "Discover practical strategies to manage stress and enhance mental health.",
      imageUrl:
        "https://careerguidanceadvice.com/wp-content/uploads/2024/06/woman-working-in-the-office-2023-11-27-05-03-19-utc-1-1-1-1024x683.jpg",
    },
  ];

  return (
    <div className=" py-16 px-5 my-10">
      {/* Page Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-700">
          Stay informed with the latest articles and tips on health, wellness,
          and more.
        </p>
      </section>

      {/* Blog Posts */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-700 mb-4">{post.snippet}</p>
              <a
                href={`/blog-details/${post.id}`}
                className="inline-block text-yellow-600 font-semibold hover:text-yellow-800 transition-colors"
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;

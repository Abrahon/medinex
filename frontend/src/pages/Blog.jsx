// Blog.js
import React from "react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for a Healthy Lifestyle",
      snippet: "Explore essential tips to maintain a healthy lifestyle and improve your well-being.",
      imageUrl: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      title: "The Importance of Regular Check-Ups",
      snippet: "Learn why regular check-ups are crucial for early diagnosis and better health outcomes.",
      imageUrl: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      title: "How to Manage Stress Effectively",
      snippet: "Discover practical strategies to manage stress and enhance mental health.",
      imageUrl: "https://via.placeholder.com/300",
    },
  ];

  return (
    <div className=" py-16 px-5 my-10">
      {/* Page Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-700">
          Stay informed with the latest articles and tips on health, wellness, and more.
        </p>
      </section>

      {/* Blog Posts */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
            <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-gray-700 mb-4">{post.snippet}</p>
              <a
                href={`/blog/${post.id}`}
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

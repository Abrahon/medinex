import { useParams } from "react-router-dom";
import React from "react";

const blogPosts = [
  {
    id: 1,
    title: "10 Tips for a Healthy Lifestyle",
    content: `
      Living a healthy lifestyle doesn't have to be complicated. Here are 10 simple tips:
      1. Eat a balanced diet.
      2. Stay hydrated.
      3. Exercise regularly.
      4. Get enough sleep.
      5. Manage stress effectively.
      6. Avoid smoking and limit alcohol.
      7. Take breaks from screens.
      8. Maintain social connections.
      9. Get regular checkups.
      10. Practice mindfulness and gratitude.
    `,
    imageUrl:
      "https://media.istockphoto.com/id/2153823097/photo/cheerful-athletic-couple-jogging-through-the-park.jpg?s=612x612&w=0&k=20&c=7ZDGNkOSuXWxEmJkKpbisVSvo5mM3d3VcHkVhLhSD1Q=",
  },
  {
    id: 2,
    title: "The Importance of Regular Check-Ups",
    content: `
      Regular check-ups are vital for maintaining good health. Early diagnosis can prevent serious diseases.
      Benefits include:
      - Early detection of illnesses
      - Keeping track of existing conditions
      - Staying updated with vaccinations
      - Professional health advice
    `,
    imageUrl:
      "https://img.freepik.com/free-photo/young-doctor-is-using-stethoscope-listen-heartbeat-patient-shot-female-doctor-giving-male-patient-check-up_657921-875.jpg?semt=ais_hybrid&w=740",
  },
  {
    id: 3,
    title: "How to Manage Stress Effectively",
    content: `
      Managing stress is key to overall well-being. Try:
      - Deep breathing and meditation
      - Physical activity
      - Talking to a therapist or trusted person
      - Practicing time management
      - Avoiding unnecessary stressors
    `,
    imageUrl:
      "https://careerguidanceadvice.com/wp-content/uploads/2024/06/woman-working-in-the-office-2023-11-27-05-03-19-utc-1-1-1-1024x683.jpg",
  },
];

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogPosts.find((post) => post.id === parseInt(id));

  if (!blog) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        Blog post not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <img
        src={blog.imageUrl}
        alt={blog.title}
        className="w-full h-96 object-cover rounded-lg shadow-md mb-6"
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>
      <p className="text-gray-700 whitespace-pre-line leading-relaxed">
        {blog.content}
      </p>
    </div>
  );
};

export default BlogDetails;

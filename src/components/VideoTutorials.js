import React from 'react';
import './styles/VideoTutorials.css';

const VideoTutorials = () => {
  const videos = [
    { title: "Introduction to Accessibility", url: "https://www.youtube.com/embed/pEDl1GPTdzc" },
    { title: "Accessibility Insights", url: "https://www.youtube.com/embed/rPN4IK2wv4U" },
    { title: "Interactive Features", url: "https://www.youtube.com/embed/g9Qff0b-lHk" },
    { title: "Understanding Accessibility", url: "https://www.youtube.com/embed/gdohlUn7fVQ" },
    { title: "Tips for Accessibility", url: "https://www.youtube.com/embed/e2nkq3h1P68" },
    { title: "Accessibility in Design", url: "https://www.youtube.com/embed/EbPbwpLRfvQ" },
    { title: "Enhancing Accessibility", url: "https://www.youtube.com/embed/3NgFI9rGCys" },
    { title: "Accessibility Tools", url: "https://www.youtube.com/embed/iaW8WwIMQdY" },
    { title: "Accessible Navigation", url: "https://www.youtube.com/embed/5znQOrGs00U" },
  ];

  return (
    <section>
      <h2>Video Tutorials</h2>
      <div className="video-grid">
        {videos.map((video, index) => (
          <div key={index} className="video-item">
            <h3>{video.title}</h3>
            <iframe
              width="100%"
              height="315" // Increased height for better visibility
              src={video.url}
              title={video.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoTutorials;
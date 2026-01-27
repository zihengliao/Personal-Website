import React from "react";
import "./Projects.css";

const Projects = () => {
  const projects = [
    {
      id: 1,
      icon: "/assets/snake.png",
      title: "Snake-Bot",
      subtitle: "A bot that plays snake for you",
      link: "https://github.com/zihengliao/Snake-Bot"
    },
    {
      id: 2,
      icon: "/assets/chart.png",
      title: "NBA Dashboard",
      subtitle: "Visual stats for any NBA player",
      link: "https://nbadash.com/"
    },
    {
      id: 3,
      icon: "/assets/ai.png",
      title: "News Insight AI",
      subtitle: "AI that searches and summarises news for you",
      link: "https://github.com/zihengliao/Agentic_workflow"
    },
    {
      id: 4,
      icon: "/assets/pollen_heatmap.png",
      title: "Pollen Forecast",
      subtitle: "Real-time pollen forecasts with interactive heatmaps.",
      link: "https://github.com/zihengliao/pollen-forecast"
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-header">
        <h2>My Projects</h2>
        <p className="projects-description">
          I love to create things, and I'm always working on something new! You can view some of my favorite projects on GitHub below.
        </p>
      </div>
      
      <div className="projects-grid">
        {projects.map((project) => (
          <a 
            key={project.id} 
            href={project.link}
            className="project-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="project-icon">
              <img src={project.icon} alt={project.title} />
            </div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-subtitle">{project.subtitle}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
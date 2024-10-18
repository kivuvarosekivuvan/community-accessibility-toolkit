import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './styles/ResourceLibrary.css'; // Import the CSS file

const resources = [
  { title: "Web Content Accessibility Guidelines (WCAG)", url: "https://www.w3.org/WAI/WCAG21/quickref/", description: "A comprehensive guide to making web content accessible to people with disabilities." },
  { title: "Color Contrast Checker", url: "https://webaim.org/resources/contrastchecker/", description: "A tool to check the contrast ratio between text and background colors to ensure readability." },
  { title: "A11Y Project", url: "https://a11yproject.com/", description: "A community-driven project to make digital accessibility easier for everyone." },
  { title: "WebAIM", url: "https://webaim.org/", description: "Resources and tools for web accessibility, including training and evaluation services." },
  { title: "WAVE Web Accessibility Evaluation Tool", url: "https://wave.webaim.org/", description: "A web accessibility evaluation tool that helps identify accessibility and Web Content Accessibility Guidelines (WCAG) issues." },
  { title: "Accessibility Checker", url: "https://www.accessibilitychecker.org/", description: "An online tool to check the accessibility of your web content." },
  { title: "Accessible Rich Internet Applications (ARIA)", url: "https://www.w3.org/WAI/ARIA/", description: "A set of attributes that define ways to make web content and applications more accessible." },
  { title: "Color Contrast Analyzer", url: "https://developer.paciellogroup.com/resources/contrastanalyser/", description: "A desktop application that allows you to analyze the color contrast of text and background." },
  { title: "Axe Accessibility Checker", url: "https://www.deque.com/axe/", description: "A suite of accessibility testing tools that help developers find and fix accessibility issues." },
  { title: "Google Accessibility Developer Guide", url: "https://developers.google.com/web/fundamentals/accessibility", description: "Guidelines and best practices for building accessible web applications." },
  { title: "Accessibility Insights", url: "https://accessibilityinsights.io/", description: "Tools for finding and fixing accessibility issues in your web applications." },
  { title: "Web Accessibility Initiative (WAI)", url: "https://www.w3.org/WAI/", description: "A comprehensive resource for web accessibility standards and guidelines." },
  { title: "Designing Accessible Websites", url: "https://www.smashingmagazine.com/2020/03/designing-accessible-websites/", description: "Best practices for designing accessible websites." },
  { title: "Inclusive Design Principles", url: "https://inclusivedesignprinciples.org/", description: "A set of principles to guide inclusive design." },
  { title: "Accessible Digital Content", url: "https://www.digital.gov/resources/accessible-digital-content/", description: "Resources for creating accessible digital content." },
  { title: "Introduction to Web Accessibility", url: "https://www.w3.org/WAI/fundamentals/accessibility-intro/", description: "An overview of web accessibility concepts." },
  { title: "Accessibility Maturity Model", url: "https://www.digital.gov/resources/accessibility-maturity-model/", description: "A framework for assessing accessibility practices." },
  { title: "Color Accessibility Guidelines", url: "https://www.w3.org/TR/WCAG21/#color-contrast", description: "Guidelines for ensuring color accessibility." },
  { title: "Section 508 Compliance", url: "https://www.section508.gov/", description: "Resources for compliance with Section 508 of the Rehabilitation Act." },
  { title: "Inclusive Design Toolkit", url: "https://www.inclusivedesigntoolkit.com/", description: "A toolkit for implementing inclusive design practices." },
  { title: "Creating Accessible Forms", url: "https://www.w3.org/WAI/tutorials/forms/", description: "Guidelines for designing accessible web forms." },
  { title: "Assistive Technology Resources", url: "https://www.w3.org/WAI/standards-guidelines/aria/", description: "Resources for assistive technologies." },
  { title: "UX Design for Accessibility", url: "https://uxdesign.cc/ux-design-for-accessibility-5b89e7f37db2", description: "Best practices for UX design with accessibility in mind." },
];

const ITEMS_PER_PAGE = 6;

const ResourceLibrary = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredResources.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentResources = filteredResources.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="section">
      <h2 className="header">{t('resource.header')}</h2>
      <input
        type="text"
        placeholder={t('resource.searchPlaceholder')}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="searchInput"
      />
      <ul className="list">
        {currentResources.map(resource => (
          <li key={resource.title} className="listItem">
            <a 
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              {resource.title}
            </a>
            <p className="description">{resource.description}</p>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <span onClick={handlePrevious} className="arrow">{'<'}</span>
        {Array.from({ length: totalPages }, (_, index) => (
          <span 
            key={index + 1} 
            className={`pageNumber ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </span>
        ))}
        <span onClick={handleNext} className="arrow">{'>'}</span>
      </div>
    </section>
  );
};

export default ResourceLibrary;
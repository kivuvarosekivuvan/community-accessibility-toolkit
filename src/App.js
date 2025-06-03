import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import Checklist from './components/Checklist';
import ResourceLibrary from './components/ResourceLibrary';
import ColorContrastAnalyzer from './components/ColorContrastAnalyzer';
import FontSizeAdjuster from './components/FontSizeAdjuster';
import KeyboardNavigator from './components/KeyboardNavigator';
import CuriosityCorner from './components/CuriosityCorner';
// import VideoTutorials from './components/VideoTutorials';
import UserFeedback from './components/UserFeedback';
import DiscussionForum from './components/DiscussionForum';
import Achievements from './components/Achievements';
import Webinars from './components/Webinars';
import './i18n';

function App() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('ColorContrastAnalyzer', true);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleKeyPress = (event, tab) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setActiveTab(tab);
      setMenuOpen(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'checklist':
        return <Checklist />;
      case 'resources':
        return <ResourceLibrary />;
      case 'colorContrast':
        return <ColorContrastAnalyzer />;
      case 'fontSize':
        return <FontSizeAdjuster />;
      case 'keyboardNavigator':
        return <KeyboardNavigator />;
      case 'curiosity':
        return <CuriosityCorner />;
      // case 'videoTutorials':
        // return <VideoTutorials />;
      case 'userFeedback':
        return <UserFeedback />;
      case 'discussionForum':
        return <DiscussionForum />;
      case 'achievements':
        return <Achievements />;
      case 'webinars':
        return <Webinars />;
      default:
        return <ColorContrastAnalyzer />;
    }
  };

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <header>
        <h1>{t('title')}</h1>
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
        <select onChange={(e) => i18n.changeLanguage(e.target.value)} defaultValue={i18n.language}>
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="sw">Swahili</option>
          <option value="sh">Sheng</option>
        </select>
      </header>
      <div className="dashboard">
        <nav className={`sidebar ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li
              tabIndex={0}
              onClick={() => { setActiveTab('colorContrast'); setMenuOpen(false); }}
              onKeyDown={(e) => handleKeyPress(e, 'colorContrast')}
            >
              {t('tabs.colorContrast')}
            </li>
            <li
              tabIndex={0}
              onClick={() => { setActiveTab('fontSize'); setMenuOpen(false); }}
              onKeyDown={(e) => handleKeyPress(e, 'fontSize')}
            >
              {t('tabs.fontSize')}
            </li>
            <li
              tabIndex={0}
              onClick={() => { setActiveTab('keyboardNavigator'); setMenuOpen(false); }}
              onKeyDown={(e) => handleKeyPress(e, 'keyboardNavigator')}
            >
              {t('tabs.keyboardNavigator')}
            </li>
            <li
              tabIndex={0}
              onClick={() => { setActiveTab('checklist'); setMenuOpen(false); }}
              onKeyDown={(e) => handleKeyPress(e, 'checklist')}
            >
              {t('tabs.checklist')}
            </li>
            <li
              tabIndex={0}
              onClick={() => { setActiveTab('resources'); setMenuOpen(false); }}
              onKeyDown={(e) => handleKeyPress(e, 'resources')}
            >
              {t('tabs.resources')}
            </li>
            <li
              tabIndex={0}
              onClick={() => { setActiveTab('videoTutorials'); setMenuOpen(false); }}
              onKeyDown={(e) => handleKeyPress(e, 'videoTutorials')}
            >
              {t('tabs.videoTutorials')}
            </li>
            <li
              tabIndex={0}
              onClick={() => { setActiveTab('curiosity'); setMenuOpen(false); }}
              onKeyDown={(e) => handleKeyPress(e, 'curiosity')}
            >
              {t('tabs.curiosity')}
            </li>
            <li
              tabIndex={0}
              onClick={() => { setActiveTab('userFeedback'); setMenuOpen(false); }}
              onKeyDown={(e) => handleKeyPress(e, 'userFeedback')}
            >
              {t('tabs.userFeedback')}
            </li>
            <li
              tabIndex={0}
              onClick={() => { setActiveTab('discussionForum'); setMenuOpen(false); }}
              onKeyDown={(e) => handleKeyPress(e, 'discussionForum')}
            >
              {t('tabs.discussionForum')}
            </li>
            <li
              tabIndex={0}
              onClick={() => { setActiveTab('achievements'); setMenuOpen(false); }}
              onKeyDown={(e) => handleKeyPress(e, 'achievements')}
            >
              {t('tabs.achievements')}
            </li>
            <li
              tabIndex={0}
              onClick={() => { setActiveTab('webinars'); setMenuOpen(false); }}
              onKeyDown={(e) => handleKeyPress(e, 'webinars')}
            >
              {t('tabs.webinars')}
            </li>
          </ul>
          <button onClick={toggleTheme} className="theme-toggle">
            {darkMode ? t('themeSwitch.light') : t('themeSwitch.dark')}
          </button>
        </nav>
        <main className="content">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
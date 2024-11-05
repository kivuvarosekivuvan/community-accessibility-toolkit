import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './styles/KeyboardNavigator.css';

const KeyboardNavigator = () => {
  const { t } = useTranslation();
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setPopupVisible(true);
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleEscapePress = (event) => {
    if (event.key === 'Escape') {
      closePopup();
    }
  };

  useEffect(() => {
    if (isPopupVisible) {
      window.addEventListener('keydown', handleEscapePress);
    } else {
      window.removeEventListener('keydown', handleEscapePress);
    }

    return () => {
      window.removeEventListener('keydown', handleEscapePress);
    };
  }, [isPopupVisible]);

  return (
    <section>
      <h2>{t('keyboardNavigator.heading')}</h2>
      <p>{t('keyboardNavigator.instructions')}</p>
      <div className="button-container">
        <button tabIndex="0" onKeyPress={handleKeyPress}>{t('keyboardNavigator.button1')}</button>
        <button tabIndex="0" onKeyPress={handleKeyPress}>{t('keyboardNavigator.button2')}</button>
        <button tabIndex="0" onKeyPress={handleKeyPress}>{t('keyboardNavigator.button3')}</button>
        <button tabIndex="0" onKeyPress={handleKeyPress}>{t('keyboardNavigator.button4')}</button>
        <button tabIndex="0" onKeyPress={handleKeyPress}>{t('keyboardNavigator.button5')}</button>
      </div>

      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <span
              className="close"
              tabIndex="0"
              onClick={closePopup}
              onKeyPress={(e) => e.key === 'Enter' && closePopup()}
            >
              &times;
            </span>
            <h3>{t('keyboardNavigator.popupTitle')}</h3>
            <p>{t('keyboardNavigator.popupMessage')}</p>
            <p>
              {t('keyboardNavigator.popupLink')} 
              <a href="https://webaim.org/techniques/keyboard/" target="_blank" rel="noopener noreferrer">
                {t('keyboardNavigator.popupLinkText')}
              </a>
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default KeyboardNavigator;
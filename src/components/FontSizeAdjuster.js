import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './styles/FontSizeAdjuster.css';

const FontSizeAdjuster = () => {
  const { t } = useTranslation();
  const [fontSize, setFontSize] = useState(16);
  const [text, setText] = useState("Adjust this text!");
  const [textColor, setTextColor] = useState('#000000');
  const [fontFamily, setFontFamily] = useState('Arial');

  const resetSettings = () => {
    setFontSize(16);
    setText("Adjust this text!");
    setTextColor('#000000');
    setFontFamily('Arial');
  };

  const handleSuggestedFontSize = (size) => {
    setFontSize(size);
  };

  return (
    <section>
      <h2>{t('fontSizeAdjuster.heading')}</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('fontSizeAdjuster.placeholder')}
      />
      <div className="controls">
        <label>{t('fontSizeAdjuster.fontSizeLabel')}</label>
        <input
          type="range"
          min="10"
          max="50"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        />
        <div className="color-font-controls">
          <div className="color-control">
            <label>{t('fontSizeAdjuster.textColorLabel')}</label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </div>
          <div className="font-control">
            <label>{t('fontSizeAdjuster.fontFamilyLabel')}</label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
            >
              <option value="Arial">Arial</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Verdana">Verdana</option>
            </select>
          </div>
        </div>
      </div>
      <p style={{ fontSize: `${fontSize}px`, color: textColor, fontFamily: fontFamily }}>
        {text}
      </p>
      <h3>{t('fontSizeAdjuster.suggestedFontSizes')}</h3>
      <ul className="suggestions">
        <li onClick={() => handleSuggestedFontSize(16)}>{t('fontSizeAdjuster.suggestionBodyText')}</li>
        <li onClick={() => handleSuggestedFontSize(24)}>{t('fontSizeAdjuster.suggestionHeadingH1')}</li>
        <li onClick={() => handleSuggestedFontSize(20)}>{t('fontSizeAdjuster.suggestionHeadingH2')}</li>
        <li onClick={() => handleSuggestedFontSize(12)}>{t('fontSizeAdjuster.suggestionSmallText')}</li>
        <li onClick={() => handleSuggestedFontSize(18)}>{t('fontSizeAdjuster.suggestionLargeText')}</li>
      </ul>
      <button onClick={resetSettings}>{t('fontSizeAdjuster.reset')}</button>
    </section>
  );
};

export default FontSizeAdjuster;
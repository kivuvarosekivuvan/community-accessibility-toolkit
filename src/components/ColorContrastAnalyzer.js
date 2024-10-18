import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './styles/ColorContrastAnalyzer.css';

const ColorContrastAnalyzer = () => {
  const { t } = useTranslation();
  const [foreground, setForeground] = useState('#000000');
  const [background, setBackground] = useState('#FFFFFF');
  const contrastRatio = calculateContrast(foreground, background);
  const recommendations = getRecommendations();

  function calculateContrast(fg, bg) {
    const fgLuminance = getLuminance(fg);
    const bgLuminance = getLuminance(bg);
    return (Math.max(fgLuminance, bgLuminance) + 0.05) / (Math.min(fgLuminance, bgLuminance) + 0.05);
  }

  function getLuminance(hex) {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    return (0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255));
  }

  function getRecommendations() {
    return [
      { fg: '#FFFFFF', bg: '#000000', ratio: calculateContrast('#FFFFFF', '#000000') },
      { fg: '#FF5733', bg: '#C70039', ratio: calculateContrast('#FF5733', '#C70039') },
      { fg: '#FFC300', bg: '#581845', ratio: calculateContrast('#FFC300', '#581845') },
    ];
  }

  const savePalette = () => {
    const palette = {
      foreground,
      background,
      contrastRatio: contrastRatio.toFixed(2),
    };
    console.log('Palette saved:', palette);
    alert(t('colorContrastAnalyzer.paletteSaved'));
  };

  return (
    <section>
      <h2>{t('colorContrastAnalyzer.heading')}</h2>
      <div className="color-inputs">
        <input
          type="color"
          value={foreground}
          onChange={(e) => setForeground(e.target.value)}
          className="color-input"
        />
        <span className="vs-text">vs</span>
        <input
          type="color"
          value={background}
          onChange={(e) => setBackground(e.target.value)}
          className="color-input"
        />
      </div>
      <p>{t('colorContrastAnalyzer.contrastRatio', { ratio: contrastRatio.toFixed(2) })}</p>
      <p>{contrastRatio >= 4.5 ? t('colorContrastAnalyzer.goodContrast') : t('colorContrastAnalyzer.poorContrast')}</p>

      <h3>{t('colorContrastAnalyzer.recommendations')}</h3>
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index}>
            Foreground: <span style={{ color: rec.fg }}>{rec.fg}</span>, 
            Background: <span style={{ backgroundColor: rec.bg, color: '#fff' }}>{rec.bg}</span> - 
            Ratio: {rec.ratio.toFixed(2)}
          </li>
        ))}
      </ul>

      <button onClick={savePalette}>{t('colorContrastAnalyzer.savePalette')}</button>
    </section>
  );
};

export default ColorContrastAnalyzer;
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './styles/Checklist.css';
import jsPDF from 'jspdf';

const Checklist = () => {
  const { t } = useTranslation();
  const [checkedItems, setCheckedItems] = useState(() => {
    const saved = localStorage.getItem('checkedItems');
    return saved ? JSON.parse(saved) : [];
  });

  const [progressHistory, setProgressHistory] = useState(() => {
    const savedHistory = localStorage.getItem('progressHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const [reminder, setReminder] = useState('');
  const [deadline, setDeadline] = useState('');

  const checklistItems = [
    { text: t('items.semanticHTML'), tip: t('tips.semanticHTML') },
    { text: t('items.altText'), tip: t('tips.altText') },
    { text: t('items.keyboardNavigation'), tip: t('tips.keyboardNavigation') },
    { text: t('items.colorContrast'), tip: t('tips.colorContrast') },
    { text: t('items.ariaRoles'), tip: t('tips.ariaRoles') },
  ];

  const handleCheck = (item) => {
    const updatedItems = checkedItems.includes(item)
      ? checkedItems.filter(i => i !== item)
      : [...checkedItems, item];

    setCheckedItems(updatedItems);

    // Update progress history
    setProgressHistory(prevHistory => [
      ...prevHistory,
      { date: new Date().toLocaleString(), items: updatedItems }
    ]);
  };

  useEffect(() => {
    localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
    localStorage.setItem('progressHistory', JSON.stringify(progressHistory));
  }, [checkedItems, progressHistory]);

  const completionPercentage = Math.round((checkedItems.length / checklistItems.length) * 100);

  const handleShare = () => {
    const checklistData = JSON.stringify(checkedItems);
    const shareableLink = `${window.location.origin}/?data=${encodeURIComponent(checklistData)}`;
    navigator.clipboard.writeText(shareableLink);
    alert(t('alerts.linkCopied'));
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(t('checklist.title'), 20, 20);
    checklistItems.forEach((item, index) => {
      const status = checkedItems.includes(item.text) ? "✔️" : "❌";
      doc.text(`${status} ${item.text}`, 20, 30 + (index * 10));
    });
    doc.save("checklist.pdf");
  };

  const handleSetReminder = () => {
    if (!deadline) {
      alert(t('alerts.setValidDeadline'));
      return;
    }
    alert(t('alerts.reminderSet', { reminder, deadline }));
    setReminder('');
    setDeadline('');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const deadlineDate = new Date(deadline);
      if (deadlineDate && deadlineDate <= now) {
        alert(t('alerts.reminderAlert'));
        setDeadline('');
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [deadline]);

  const clearProgressHistory = () => {
    setProgressHistory([]);
    localStorage.removeItem('progressHistory');
    alert(t('alerts.clearProgressHistory'));
  };

  return (
    <section className="checklist-section">
      <h2>{t('checklist.title')}</h2>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${completionPercentage}%` }} />
      </div>
      <p className="completion-text">{completionPercentage} {t('checklist.completed')}</p>
      <ul className="checklist">
        {checklistItems.map(item => (
          <li key={item.text} className={checkedItems.includes(item.text) ? 'checked' : ''}>
            <label>
              <input
                type="checkbox"
                checked={checkedItems.includes(item.text)}
                onChange={() => handleCheck(item.text)}
              />
              <span className="checkmark"></span>
              {item.text}
              <span className="tooltip">{item.tip}</span>
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleShare} className="share-button">{t('checklist.shareChecklist')}</button>
      <button onClick={handleExportPDF} className="export-button">{t('checklist.exportPDF')}</button>
      <div className="reminder-section">
        <input
          type="text"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
          placeholder={t('checklist.reminderMessage')}
        />
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          placeholder={t('checklist.deadline')}
        />
        <button onClick={handleSetReminder} className="set-reminder-button">{t('checklist.setReminder')}</button>
      </div>
      <div className="history-section">
        <h3>{t('checklist.progressHistory')}</h3>
        <ul>
          {progressHistory.map((entry, index) => (
            <li key={index}>{entry.date}: {entry.items.join(', ')}</li>
          ))}
        </ul>
        <button onClick={clearProgressHistory} className="clear-history-button">{t('checklist.clearHistory')}</button>
      </div>
    </section>
  );
};

export default Checklist;
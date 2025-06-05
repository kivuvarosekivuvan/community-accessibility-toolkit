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

  // array of my checklist items each with a text and a tooltip
  const checklistItems = [
    { text: t('items.semanticHTML'), tip: t('tips.semanticHTML') },
    { text: t('items.altText'), tip: t('tips.altText') },
    { text: t('items.keyboardNavigation'), tip: t('tips.keyboardNavigation') },
    { text: t('items.colorContrast'), tip: t('tips.colorContrast') },
    { text: t('items.ariaRoles'), tip: t('tips.ariaRoles') },
  ];


  // This toggles the checked state of an item. If the item is already checked, it removes it; otherwise, it adds it to the list of checked items
  const handleCheck = (item) => {
    const updatedItems = checkedItems.includes(item)
      ? checkedItems.filter(i => i !== item)
      : [...checkedItems, item];

    setCheckedItems(updatedItems);

    //  I'm updating progressHistory by adding a new entry with the current date and the updated list of checked items
    setProgressHistory(prevHistory => [
      ...prevHistory,
      { date: new Date().toLocaleString(), items: updatedItems }
    ]);
  };


  // this hook here synchronize checkedItems and progressHistory with local storage whenever they change (set to occur at the same time)
  useEffect(() => {
    localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
    localStorage.setItem('progressHistory', JSON.stringify(progressHistory));
  }, [checkedItems, progressHistory]);

  const completionPercentage = Math.round((checkedItems.length / checklistItems.length) * 100);


  // creating a shareable link containing the checklist data as a URL parameter and uses clipboard API and show an alert to inform my user
  const handleShare = () => {
    const checklistData = JSON.stringify(checkedItems);
    const shareableLink = `${window.location.origin}/?data=${encodeURIComponent(checklistData)}`;
    navigator.clipboard.writeText(shareableLink);
    alert(t('alerts.linkCopied'));
  };


  // creates a PDF document using jsPDF, then adds the checklist title and each item's status (checked or unchecked) to the document, then saves it as "checklist.pdf"
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


  // sets up a timer that checks every minute if the current time has passed the deadline. If it has, it alerts the user and clears the deadline
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



  // this resets the progressHistory state and removes it from local storage, while also notifying the user
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
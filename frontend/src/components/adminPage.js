// // frontend/src/components/AdminPage.js

// import React, { useState, useEffect } from 'react';
// import './styles/AdminPage.css';

// const AdminPage = () => {
//     const [feedbacks, setFeedbacks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     // Fetch all feedbacks on component mount
//     useEffect(() => {
//         const fetchFeedbacks = async () => {
//             try {
//                 const res = await fetch('http://127.0.0.1:5000/api/feedbacks');
//                 if (!res.ok) {
//                     setError(`Server returned ${res.status}`);
//                     setLoading(false);
//                     return;
//                 }
//                 const data = await res.json();
//                 setFeedbacks(data);
//             } catch (err) {
//                 console.error('Fetch error:', err);
//                 setError('Could not fetch feedbacks.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchFeedbacks();
//     }, []);

//     return (
//         <section className="admin-section">
//             <h2 className="admin-header">Admin Page: All Feedback Submissions</h2>

//             {loading && <p>Loading feedbacks…</p>}
//             {error && <div className="error-box">{error}</div>}

//             {!loading && !error && feedbacks.length === 0 && (
//                 <p>No feedbacks have been submitted yet.</p>
//             )}

//             {!loading && !error && feedbacks.length > 0 && (
//                 <div className="table-container">
//                     <table className="feedback-table">
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>Timestamp (UTC)</th>
//                                 <th>Feedback Text</th>
//                                 <th>Category</th>
//                                 <th>Rating</th>
//                                 <th>Sentiment Label</th>
//                                 <th>Sentiment Score</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {feedbacks.map((f) => (
//                                 <tr key={f.id}>
//                                     <td>{f.id}</td>
//                                     <td>{new Date(f.timestamp).toLocaleString()}</td>
//                                     <td className="feedback-text-cell">{f.feedback}</td>
//                                     <td>{f.category || '—'}</td>
//                                     <td>
//                                         {f.rating != null
//                                             ? Array(f.rating).fill('★').join('') +
//                                             Array(5 - f.rating).fill('☆').join('')
//                                             : '—'}
//                                     </td>
//                                     <td className={`sentiment-label ${f.label.toLowerCase()}`}>
//                                         {f.label}
//                                     </td>
//                                     <td>{f.score.toFixed(2)}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </section>
//     );
// };

// export default AdminPage;



// frontend/src/components/AdminPage.js

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './styles/AdminPage.css';

const AdminPage = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchText, setSearchText] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterSentiment, setFilterSentiment] = useState('');
    const [page, setPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const res = await fetch('http://127.0.0.1:5000/api/feedbacks');
                if (!res.ok) {
                    setError(`Server returned ${res.status}`);
                    setLoading(false);
                    return;
                }
                const data = await res.json();
                setFeedbacks(data);
            } catch (err) {
                setError('Could not fetch feedbacks.');
            } finally {
                setLoading(false);
            }
        };
        fetchFeedbacks();
    }, []);

    const filtered = feedbacks.filter(f => {
        const matchesText = f.feedback.toLowerCase().includes(searchText.toLowerCase());
        const matchesCategory = filterCategory ? f.category === filterCategory : true;
        const matchesSentiment = filterSentiment ? f.label === filterSentiment : true;
        return matchesText && matchesCategory && matchesSentiment;
    });

    const totalPages = Math.ceil(filtered.length / pageSize);
    const displayed = filtered.slice((page - 1) * pageSize, page * pageSize);

    const summary = feedbacks.reduce(
        (acc, f) => {
            acc.total += 1;
            if (f.label === 'Positive') acc.positive += 1;
            if (f.label === 'Neutral') acc.neutral += 1;
            if (f.label === 'Negative') acc.negative += 1;
            return acc;
        },
        { total: 0, positive: 0, neutral: 0, negative: 0 }
    );

    const chartData = [
        { name: 'Positive', count: summary.positive },
        { name: 'Neutral', count: summary.neutral },
        { name: 'Negative', count: summary.negative },
    ];

    const categories = Array.from(new Set(feedbacks.map(f => f.category))).filter(c => c);
    const sentiments = ['Positive', 'Neutral', 'Negative'];

    const exportCSV = () => {
        const headers = ['ID', 'Timestamp', 'Feedback', 'Category', 'Rating', 'Label', 'Score'];
        const rows = filtered.map(f => [
            f.id,
            f.timestamp,
            `"${f.feedback.replace(/"/g, '""')}"`,
            f.category,
            f.rating,
            f.label,
            f.score.toFixed(2),
        ]);
        const csvContent = [headers, ...rows].map(r => r.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'feedbacks.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <section className="admin-section">
            <h2 className="admin-header">Admin Page: All Feedback Submissions</h2>
            {loading && <p>Loading feedbacks…</p>}
            {error && <div className="error-box">{error}</div>}
            {!loading && !error && feedbacks.length === 0 && <p>No feedbacks have been submitted yet.</p>}
            {!loading && !error && feedbacks.length > 0 && (
                <>
                    <div className="summary-cards">
                        <div className="card">
                            <h3>Total</h3>
                            <p>{summary.total}</p>
                        </div>
                        <div className="card">
                            <h3>Positive</h3>
                            <p>{summary.positive}</p>
                        </div>
                        <div className="card">
                            <h3>Neutral</h3>
                            <p>{summary.neutral}</p>
                        </div>
                        <div className="card">
                            <h3>Negative</h3>
                            <p>{summary.negative}</p>
                        </div>
                    </div>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={chartData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="filters">
                        <input
                            type="text"
                            placeholder="Search feedback..."
                            value={searchText}
                            onChange={e => { setSearchText(e.target.value); setPage(1); }}
                        />
                        <select
                            value={filterCategory}
                            onChange={e => { setFilterCategory(e.target.value); setPage(1); }}
                        >
                            <option value="">All Categories</option>
                            {categories.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <select
                            value={filterSentiment}
                            onChange={e => { setFilterSentiment(e.target.value); setPage(1); }}
                        >
                            <option value="">All Sentiments</option>
                            {sentiments.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                        <button onClick={exportCSV} className="export-button">Export CSV</button>
                    </div>
                    <div className="table-container">
                        <table className="feedback-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Timestamp</th>
                                    <th>Feedback Text</th>
                                    <th>Category</th>
                                    <th>Rating</th>
                                    <th>Sentiment Label</th>
                                    <th>Sentiment Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayed.map(f => (
                                    <tr key={f.id}>
                                        <td>{f.id}</td>
                                        <td>{new Date(f.timestamp).toLocaleString()}</td>
                                        <td className="feedback-text-cell">{f.feedback}</td>
                                        <td>{f.category || '—'}</td>
                                        <td>
                                            {f.rating != null
                                                ? Array(f.rating).fill('★').join('') + Array(5 - f.rating).fill('☆').join('')
                                                : '—'}
                                        </td>
                                        <td className={`sentiment-label ${f.label.toLowerCase()}`}>
                                            {f.label}
                                        </td>
                                        <td>{f.score.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination">
                        <button
                            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </button>
                        <span>Page {page} of {totalPages}</span>
                        <button
                            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </section>
    );
};

export default AdminPage;

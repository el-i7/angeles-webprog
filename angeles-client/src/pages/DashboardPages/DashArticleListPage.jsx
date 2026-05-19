import { useState, useEffect } from 'react';
import { fetchArticles, createArticle, updateArticle } from '../../services/ArticleService';

const DashArticleListPage = () => {
  const [articles, setArticles]     = useState([]);
  const [search, setSearch]         = useState('');
  const [statusFilter, setStatus]   = useState('all');
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');
  const [modal, setModal]           = useState({ open: false, id: null });
  const [form, setForm]             = useState({
    slug: '', title: '', paragraphs: '', preview: '', content: '', status: 'active',
  });

  useEffect(() => { loadArticles(); }, []);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const { data } = await fetchArticles();
      setArticles(data.articles);
    } catch {
      setError('Failed to load articles. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (article = null) => {
    setModal({ open: true, id: article?._id ?? null });
    setForm(article ? {
      slug: article.slug, title: article.title,
      paragraphs: article.paragraphs, preview: article.preview ?? '',
      content: article.content ?? '', status: article.status,
    } : { slug: '', title: '', paragraphs: '', preview: '', content: '', status: 'active' });
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setForm({ slug: '', title: '', paragraphs: '', preview: '', content: '', status: 'active' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (modal.id) {
        await updateArticle(modal.id, form);
      } else {
        await createArticle({ ...form, paragraphs: Number(form.paragraphs) });
      }
      await loadArticles();
      closeModal();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save article.');
    }
  };

  const handleToggleStatus = async (article) => {
    try {
      await updateArticle(article._id, {
        status: article.status === 'active' ? 'inactive' : 'active',
      });
      await loadArticles();
    } catch {
      setError('Failed to update status.');
    }
  };

  const filtered = articles.filter((a) => {
    const matchSearch =
      a.title?.toLowerCase().includes(search.toLowerCase()) ||
      a.slug?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div style={{ padding: '1.5rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0 }}>Articles</h2>
        <button onClick={() => openModal()} style={{
          backgroundColor: '#1976d2', color: 'white', border: 'none',
          padding: '0.5rem 1.25rem', borderRadius: '4px',
          cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
        }}>
          ADD ARTICLE
        </button>
      </div>

      {error && (
        <div style={{ color: 'red', marginBottom: '1rem',
          padding: '0.5rem', background: '#fff0f0', borderRadius: 4 }}>
          {error}
        </div>
      )}

      {/* Search + Filter */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text" placeholder="Search Articles" value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: '0.5rem 1rem', borderRadius: '4px',
            border: '1px solid #ccc', fontSize: '0.9rem' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.75rem', color: '#666' }}>
          <span>Status Filter</span>
          <select value={statusFilter} onChange={(e) => setStatus(e.target.value)}
            style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left', background: '#f9f9f9' }}>
            {['ID', 'Slug', 'Title', 'Paragraphs', 'Preview', 'Status', 'Actions'].map(h => (
              <th key={h} style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
              Loading articles…
            </td></tr>
          ) : filtered.length === 0 ? (
            <tr><td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
              No articles found.
            </td></tr>
          ) : filtered.map((article) => (
            <tr key={article._id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.75rem 1rem' }}>
                {String(article._id).slice(-5).toUpperCase()}
              </td>
              <td style={{ padding: '0.75rem 1rem' }}>{article.slug}</td>
              <td style={{ padding: '0.75rem 1rem' }}>{article.title}</td>
              <td style={{ padding: '0.75rem 1rem' }}>{article.paragraphs}</td>
              <td style={{ padding: '0.75rem 1rem', maxWidth: 200,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {article.preview}
              </td>
              <td style={{ padding: '0.75rem 1rem' }}>
                <span style={{
                  backgroundColor: article.status === 'active' ? '#4caf50' : '#f44336',
                  color: 'white', padding: '3px 10px', borderRadius: '999px',
                  fontSize: '0.75rem', fontWeight: 600,
                }}>
                  {article.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td style={{ padding: '0.75rem 1rem', display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => openModal(article)} style={{
                  padding: '4px 14px', cursor: 'pointer',
                  border: '1px solid #1976d2', color: '#1976d2',
                  background: 'white', borderRadius: '4px', fontWeight: 600,
                }}>EDIT</button>
                <button onClick={() => handleToggleStatus(article)} style={{
                  padding: '4px 14px', cursor: 'pointer', border: 'none',
                  backgroundColor: article.status === 'active' ? '#f44336' : '#4caf50',
                  color: 'white', borderRadius: '4px', fontWeight: 600,
                }}>
                  {article.status === 'active' ? 'DISABLE' : 'ENABLE'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Rows count */}
      {filtered.length > 0 && (
        <div style={{ textAlign: 'right', marginTop: '1rem', fontSize: '0.8rem', color: '#666' }}>
          1–{filtered.length} of {filtered.length}
        </div>
      )}

      {/* Modal Overlay */}
      {modal.open && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
        }}>
          <div style={{ background: 'white', borderRadius: '8px',
            padding: '2rem', width: '500px', maxWidth: '90vw',
            maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginTop: 0 }}>{modal.id ? 'Edit Article' : 'Add Article'}</h3>

            <form onSubmit={handleSubmit}>
              {[
                { name: 'slug',       label: 'Slug',       type: 'text'   },
                { name: 'title',      label: 'Title',      type: 'text'   },
                { name: 'paragraphs', label: 'Paragraphs', type: 'number' },
                { name: 'preview',    label: 'Preview',    type: 'text'   },
                { name: 'content',    label: 'Content',    type: 'text'   },
              ].map(({ name, label, type }) => (
                <div key={name} style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: 4,
                    fontWeight: 500, fontSize: '0.9rem' }}>{label}</label>
                  <input
                    type={type}
                    value={form[name]}
                    onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                    required
                    style={{ width: '100%', padding: '0.5rem', borderRadius: 4,
                      border: '1px solid #ccc', boxSizing: 'border-box' }}
                  />
                </div>
              ))}

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: 4,
                  fontWeight: 500, fontSize: '0.9rem' }}>Status</label>
                <select value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem',
                    borderRadius: 4, border: '1px solid #ccc' }}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button type="button" onClick={closeModal} style={{
                  padding: '0.5rem 1rem', borderRadius: 4,
                  border: '1px solid #ccc', cursor: 'pointer', background: 'white',
                }}>Cancel</button>
                <button type="submit" style={{
                  padding: '0.5rem 1rem', borderRadius: 4, border: 'none',
                  backgroundColor: '#1976d2', color: 'white',
                  cursor: 'pointer', fontWeight: 600,
                }}>
                  {modal.id ? 'Save Changes' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashArticleListPage;
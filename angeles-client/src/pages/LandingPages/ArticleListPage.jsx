import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchArticles } from '../../services/ArticleService';

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await fetchArticles();
        // Show only active articles on public page
        setArticles(data.articles.filter((a) => a.status === 'active'));
      } catch {
        console.error('Failed to load articles');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center py-20">
        <p className="text-zinc-500 text-sm">Loading articles…</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-0">

      {/* ── PAGE HEADER ── */}
      <section className="border-y-2 border-zinc-900 bg-indigo-50 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-indigo-500">
            Blog
          </p>
          <h1 className="text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl">
            Articles
          </h1>
          <p className="mt-2 text-zinc-500 text-sm">
            Thoughts on frontend development, design, and problem solving.
          </p>
        </div>
      </section>

      {/* ── ARTICLE CARDS ── */}
      <section className="bg-zinc-50 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {articles.length === 0 ? (
            <p className="text-zinc-400 text-sm">No articles available.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <div
                  key={article._id}
                  onClick={() => navigate(`/articles/${article.slug}`)}
                  className="group cursor-pointer overflow-hidden rounded-2xl border-2 border-zinc-900 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                >
                  {/* Card Image */}
                  {article.img ? (
                    <div className="h-48 w-full overflow-hidden border-b-2 border-zinc-900">
                      <img
                        src={article.img}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    /* Fallback placeholder when no image */
                    <div className="h-48 w-full border-b-2 border-zinc-900 bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-300 text-4xl font-black select-none">
                        {article.title?.charAt(0) ?? 'A'}
                      </span>
                    </div>
                  )}

                  {/* Card Body */}
                  <div className="p-5">
                    {/* Tag + read time row */}
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      {article.tag && (
                        <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-indigo-700">
                          {article.tag}
                        </span>
                      )}
                      {article.readTime && (
                        <span className="text-[11px] text-zinc-400">{article.readTime}</span>
                      )}
                    </div>

                    <h3 className="mb-2 text-base font-bold leading-snug text-zinc-900 group-hover:text-indigo-700 transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-zinc-500 line-clamp-3">
                      {article.preview}
                    </p>

                    <div className="mt-4 text-xs font-semibold text-indigo-600 group-hover:underline">
                      Read more →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default ArticleListPage;
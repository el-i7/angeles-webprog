import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import articles from '../../data/article-content';

function ArticlePage() {
  // Reads the :name segment from /articles/:name
  const { name } = useParams();
  const article = articles.find((article) => article.name === name);

  // If article is not found in the list
  if (!article) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-zinc-900">Article not found</h1>
            <Button to="/articles" className="mt-6">Back to Articles</Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-0">

      {/* ── ARTICLE HEADER ── */}
      <section className="border-y-2 border-zinc-900 bg-indigo-50 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4">
            <Button to="/articles" variant="secondary">← Back to Articles</Button>
          </div>

          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-indigo-500">
            Article
          </p>

          <h1 className="text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl">
            {article.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            {article.tag && (
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-[11px] font-semibold text-indigo-700 uppercase tracking-wide">
                {article.tag}
              </span>
            )}
            {article.readTime && (
              <span className="text-xs text-zinc-400">{article.readTime}</span>
            )}
            <span className="text-xs text-zinc-400">
              By Angeles · BSIT Student
            </span>
          </div>
        </div>
      </section>

      {/* ── ARTICLE BODY ── */}
      <section className="border-y-2 border-zinc-900 bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">

          {/* Hero image */}
          {article.img && (
            <div className="mb-8 overflow-hidden rounded-3xl border-2 border-zinc-900">
              <img
                src={article.img}
                alt={article.title}
                className="w-full object-cover max-h-80"
              />
            </div>
          )}

          {/* Article paragraphs */}
          <div className="space-y-5">
            {article.content.map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-7 text-zinc-700 whitespace-pre-wrap"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-10 border-t-2 border-zinc-900 pt-6 flex flex-wrap gap-3">
            <Button to="/articles" variant="primary">← Back to Articles</Button>
            <Button to="/about" variant="secondary">About the Author</Button>
          </div>
        </div>
      </section>

    </div>
  );
}

export default ArticlePage;
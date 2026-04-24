import Button from '../../components/Button';
import ArticleList from '../../components/ArticleList';
import articles from '../../assets/style/article-content';

const ArticleListPage = () => {
  return (
    <div className="flex w-full flex-col gap-0">

      {/* ── PAGE HEADER ── */}
      <section className="border-y-2 border-zinc-900 bg-indigo-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-indigo-500">
            My Blog
          </p>
          <h1 className="max-w-xl text-4xl font-extrabold leading-tight text-zinc-900 sm:text-5xl">
            Thoughts on code, design, and learning IT
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
            I write about things I'm learning as a BSIT student — from HTML fundamentals
            to React components to UI/UX principles. These are honest, practical write-ups
            from someone in the middle of the learning journey.
          </p>
          <div className="mt-6">
            <Button to="/">Back Home</Button>
          </div>
        </div>
      </section>

      {/* ── ARTICLE GRID (uses ArticleList component with articles prop) ── */}
      <section className="border-y-2 border-zinc-900 bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
              Featured Articles
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Article card grid</h2>
          </div>

          {/* ArticleList receives articles as prop */}
          <ArticleList articles={articles} />
        </div>
      </section>

    </div>
  );
};

export default ArticleListPage;
import Button from '../components/Button';

const articles = [
  {
    id: 1,
    tag: 'HTML & CSS',
    title: 'Why Semantic HTML Still Matters in 2025',
    desc: 'With all the modern frameworks available today, it\'s easy to overlook the importance of writing semantic HTML. In this post, I break down why proper markup is the foundation of every great web project — from accessibility to SEO.',
    img: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=600&q=80',
    alt: 'HTML code on screen',
    readTime: '4 min read',
  },
  {
    id: 2,
    tag: 'JavaScript',
    title: 'Understanding the DOM: A Beginner\'s Guide',
    desc: 'The Document Object Model is the backbone of every interactive webpage. I share what I learned about traversing and manipulating the DOM — with real examples from projects I\'ve built as a BSIT student.',
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
    alt: 'JavaScript code',
    readTime: '6 min read',
  },
  {
    id: 3,
    tag: 'UI/UX Design',
    title: 'My First Time Using Figma: Lessons Learned',
    desc: 'Designing before coding changed the way I build things. This is a honest look at my first Figma project — the mistakes I made, what I learned about spacing and typography, and why I\'ll never skip the wireframe step again.',
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
    alt: 'UI design in Figma',
    readTime: '5 min read',
  },
  {
    id: 4,
    tag: 'React JS',
    title: 'Component Thinking: How React Changed My Approach',
    desc: 'Before React, I wrote the same button styles in five different files. Component-based architecture taught me to think in reusable pieces — and it made my code cleaner, faster to write, and much easier to maintain.',
    img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
    alt: 'React JS development',
    readTime: '7 min read',
  },
];

const ArticlePage = () => {
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
            I write about things I'm learning as a BSIT student — from HTML fundamentals to 
            React components to UI/UX principles. These are honest, practical write-ups from 
            someone in the middle of the learning journey.
          </p>
          <div className="mt-6">
            <Button to="/">Back to Home</Button>
          </div>
        </div>
      </section>

      {/* ── ARTICLE GRID ── */}
      <section className="border-y-2 border-zinc-900 bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
              Latest Posts
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Recent articles</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {articles.map((article) => (
              <article
                key={article.id}
                className="rounded-3xl border-2 border-zinc-900 bg-zinc-50 overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="aspect-[4/3] overflow-hidden bg-zinc-200">
                  <img
                    src={article.img}
                    alt={article.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-700 uppercase tracking-wide">
                      {article.tag}
                    </span>
                    <span className="text-[10px] text-zinc-400">{article.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 leading-snug">{article.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-zinc-500 line-clamp-3">{article.desc}</p>
                  <Button className="mt-4" variant="primary">Read More</Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ── */}
      <section className="border-y-2 border-zinc-900 bg-indigo-700 px-4 py-12 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-indigo-300">Stay in the Loop</p>
          <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
            Get notified when I publish
          </h2>
          <p className="mt-3 text-sm text-indigo-200 leading-7">
            I post about web development, UI/UX design, and my experience as a BSIT student.
            Drop your email below and I'll let you know when something new goes up.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="your@email.com"
              className="rounded-full px-5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none border-2 border-white bg-white w-full sm:w-64"
            />
            <button className="rounded-full bg-zinc-900 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white hover:bg-zinc-700 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ArticlePage;
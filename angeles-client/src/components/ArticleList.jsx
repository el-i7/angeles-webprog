import { Link } from 'react-router-dom';
import Button from './Button';

// Receives articles array as a prop — reusable anywhere
const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => (
        <article
          key={article.name}
          className="rounded-3xl border-2 border-zinc-900 bg-white overflow-hidden hover:shadow-lg transition-shadow group"
        >
          {/* Thumbnail */}
          <div className="aspect-[4/3] overflow-hidden bg-zinc-200">
            {article.img ? (
              <img
                src={article.img}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-zinc-200">
                <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-indigo-500">
                Article {String(index + 1).padStart(2, '0')}
              </p>
              {article.readTime && (
                <span className="text-[10px] text-zinc-400">{article.readTime}</span>
              )}
            </div>

            {article.tag && (
              <span className="inline-block rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-700 uppercase tracking-wide mb-2">
                {article.tag}
              </span>
            )}

            <h3 className="mt-1 text-base font-bold text-zinc-900 leading-snug">
              {article.title}
            </h3>
            <p className="mt-2 text-xs leading-5 text-zinc-500 line-clamp-3">
              {article.content[0].substring(0, 150)}...
            </p>

            <Link to={`/articles/${article.name}`}>
              <Button className="mt-4" variant="primary">Read More</Button>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;
import Button from '../../components/Button';

const skills = [
  { name: 'JavaScript', level: 80 },
  { name: 'HTML & CSS', level: 90 },
  { name: 'UI/UX Design', level: 75 },
  { name: 'React JS', level: 70 },
];

const overviewStats = [
  { value: '3+', label: 'Years of Study' },
  { value: '12', label: 'Projects Built' },
  { value: '09', label: 'Courses Taken' },
  { value: '03', label: 'Focus Areas' },
];

const timeline = [
  {
    year: '2022',
    title: 'Started BSIT at National University',
    desc: 'Began my journey in Information Technology, diving into programming fundamentals, computer networks, and web development basics.',
  },
  {
    year: '2023',
    title: 'Discovered Frontend Development',
    desc: 'Fell in love with building web interfaces. Started learning HTML, CSS, and JavaScript deeply — and built my first real project from scratch.',
  },
  {
    year: '2024',
    title: 'Explored UI/UX Design',
    desc: 'Started learning Figma and design principles. Realized that great software needs both solid code and thoughtful design to truly serve users.',
  },
  {
    year: '2025',
    title: 'Learning React & Modern Web Dev',
    desc: 'Currently mastering React JS, Tailwind CSS, and component-based architecture through coursework and personal projects like this portfolio.',
  },
];

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-0">

      {/* ── HERO ── */}
      <section className="border-y-2 border-zinc-900 bg-indigo-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl border-2 border-dashed border-indigo-300 bg-white p-4 overflow-hidden shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
              alt="Angeles - BSIT Student"
              className="rounded-2xl object-cover w-full h-64 lg:h-80"
            />
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-indigo-500">
              About Me
            </p>
            <h1 className="max-w-xl text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl">
              Hi, I'm Angeles — a developer who loves turning ideas into interfaces.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600">
              I'm a 3rd year BSIT student at National University, focused on web development
              and UI/UX design. I believe technology should be both functional and beautiful —
              and I work hard to build things that are both.
            </p>
            <p className="mt-3 max-w-lg text-sm leading-7 text-zinc-600">
              Outside of coding, I enjoy exploring new design trends, contributing to school
              projects, and continuously leveling up my skills one commit at a time.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">Back to Home</Button>
              <Button to="/articles" variant="secondary">Read My Articles</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y-2 border-zinc-900 bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
              Profile Overview
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">My journey in numbers</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {overviewStats.map((s) => (
              <div key={s.label} className="rounded-3xl border-2 border-zinc-900 bg-zinc-50 p-6 hover:bg-indigo-50 transition-colors">
                <p className="text-4xl font-extrabold text-indigo-700">{s.value}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS + TIMELINE ── */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-2">

          {/* Timeline */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
              My Journey
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900 mb-6">How I got here</h2>
            <div className="space-y-4">
              {timeline.map((item) => (
                <article key={item.year} className="rounded-3xl border-2 border-zinc-900 bg-white p-5 flex gap-4">
                  <div className="shrink-0">
                    <span className="inline-block rounded-full bg-indigo-700 px-3 py-1 text-[10px] font-bold text-white tracking-wide">
                      {item.year}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900">{item.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-zinc-500">{item.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="rounded-3xl border-2 border-zinc-900 bg-white p-6 self-start">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
              Technical Skills
            </p>
            <h2 className="mt-2 text-xl font-semibold text-zinc-900 mb-6">What I work with</h2>
            <div className="space-y-5">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-semibold text-zinc-800">{skill.name}</span>
                    <span className="text-xs font-medium text-indigo-600">{skill.level}%</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-zinc-200">
                    <div
                      className="h-2.5 rounded-full bg-indigo-600 transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-zinc-100 pt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400 mb-3">
                Currently Learning
              </p>
              <div className="flex flex-wrap gap-2">
                {['React JS', 'Tailwind CSS', 'Figma', 'Git & GitHub', 'REST APIs'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[11px] font-semibold text-indigo-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Button to="/articles" variant="primary" className="mt-6">
              Read My Articles
            </Button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default AboutPage;
import Button from '../../components/Button';

const stats = [
  { value: '3+', label: 'Years Coding' },
  { value: '12', label: 'Projects Done' },
  { value: '5', label: 'Tech Stacks' },
  { value: '2', label: 'Internships' },
];

const features = [
  {
    title: 'Frontend Development',
    desc: 'I build clean, responsive web interfaces using HTML, CSS, and JavaScript. Every project I work on prioritizes usability, accessibility, and visual clarity.',
    img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80',
    alt: 'Frontend development',
  },
  {
    title: 'UI/UX Design',
    desc: "Good design is more than aesthetics — it's about how things work. I create wireframes and prototypes that put the user experience at the center of every decision.",
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
    alt: 'UI UX Design process',
  },
  {
    title: 'Problem Solving',
    desc: "As a BSIT student, I've been trained to break down complex problems into manageable solutions — whether it's debugging code or designing a system architecture.",
    img: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600&q=80',
    alt: 'Problem solving with tech',
  },
];

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-0">

      {/* ── HERO ── */}
      <section className="border-y-2 border-zinc-900 bg-indigo-50 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-indigo-500">
              👋 Hello, I'm
            </p>
            <h1 className="max-w-xl text-4xl font-extrabold leading-tight text-zinc-900 sm:text-5xl">
              Angeles — <span className="text-indigo-700">BSIT Student</span> & Aspiring Web Developer
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              I'm a Bachelor of Science in Information Technology student with a passion for
              building meaningful digital experiences. I specialize in frontend development
              and UI/UX design, and I'm always looking for opportunities to grow and create.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button to="/about" variant="primary">About Me</Button>
              <Button to="/articles" variant="secondary">Read My Blog</Button>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-dashed border-indigo-300 bg-white p-4 overflow-hidden shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
              alt="Developer working on a laptop"
              className="rounded-2xl object-cover w-full h-64 lg:h-80"
            />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y-2 border-zinc-900 bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
              By the Numbers
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">A quick look at my journey so far</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
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

      {/* ── WHAT I DO ── */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
              What I Do
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">My core areas of focus</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f) => (
              <article key={f.title} className="rounded-3xl border-2 border-zinc-900 bg-white overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={f.img}
                    alt={f.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-zinc-900">{f.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{f.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-indigo-700 px-4 py-14 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Want to work together?
          </h2>
          <p className="mt-4 text-indigo-200 text-sm leading-7">
            I'm currently open to project collaborations, internship opportunities,
            and freelance work. Let's build something great together.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button to="/about" variant="secondary">Get to Know Me</Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
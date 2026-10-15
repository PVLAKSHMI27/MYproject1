import { useState } from 'react';
import {
  Code2, Search, Plus, ShieldCheck, BookOpen,
  CheckCircle, XCircle, Heart, FileText, Home
} from 'lucide-react';

const initialPosts = [
  {
    id: 1,
    title: 'Getting Started with React Hooks',
    author: 'Priya Sharma',
    category: 'React',
    status: 'Published',
    excerpt: 'Learn how React hooks simplify modern frontend development.',
    likes: 24
  },
  {
    id: 2,
    title: 'Understanding REST APIs',
    author: 'Arun Kumar',
    category: 'Backend',
    status: 'Pending',
    excerpt: 'A practical introduction to REST architecture and HTTP methods.',
    likes: 12
  },
  {
    id: 3,
    title: 'JavaScript Async/Await Explained',
    author: 'Sneha Reddy',
    category: 'JavaScript',
    status: 'Published',
    excerpt: 'Write cleaner asynchronous JavaScript using async and await.',
    likes: 36
  }
];

export default function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState('Home');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('React');
  const [excerpt, setExcerpt] = useState('');
  const [notice, setNotice] = useState('');

  const published = posts.filter(p => p.status === 'Published');
  const pending = posts.filter(p => p.status === 'Pending');

  const visiblePosts = published.filter(p =>
    `${p.title} ${p.author} ${p.category}`
      .toLowerCase().includes(search.toLowerCase())
  );

  function submitPost(event) {
    event.preventDefault();

    if (!title.trim() || !excerpt.trim()) {
      setNotice('Please fill in the title and summary.');
      return;
    }

    setPosts(current => [{
      id: Date.now(),
      title: title.trim(),
      author: 'You',
      category,
      status: 'Pending',
      excerpt: excerpt.trim(),
      likes: 0
    }, ...current]);

    setTitle('');
    setExcerpt('');
    setPage('Moderation');
    setNotice('Article submitted for moderation!');
  }

  function moderate(id, status) {
    setPosts(current =>
      current.map(post =>
        post.id === id ? { ...post, status } : post
      )
    );

    setNotice(status === 'Published'
      ? 'Article approved and published.'
      : 'Article rejected.');
  }

  return (
    <div className="app">
      <header className="topbar">
        <button className="brand" onClick={() => setPage('Home')}>
          <span className="brand-icon"><Code2 /></span>
          DevSpace
        </button>

        <div className="search">
          <Search size={18} />
          <input
            placeholder="Search developer articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <button className="primary" onClick={() => setPage('Write')}>
          <Plus size={17} /> Write
        </button>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <p className="muted label">WORKSPACE</p>

          {[
            ['Home', Home],
            ['Write', Plus],
            ['Moderation', ShieldCheck]
          ].map(([name, Icon]) => (
            <button
              key={name}
              className={`nav-item ${page === name ? 'active' : ''}`}
              onClick={() => setPage(name)}
            >
              <Icon size={19} />
              {name}
              {name === 'Moderation' && pending.length > 0 && (
                <span className="nav-count">{pending.length}</span>
              )}
            </button>
          ))}

          <div className="sidebar-note">
            <Code2 size={23} />
            <strong>Built for developers</strong>
            <p>Share what you learn. Help others grow.</p>
          </div>
        </aside>

        <main>
          {notice && (
            <div className="notice">
              {notice}
              <button onClick={() => setNotice('')}>×</button>
            </div>
          )}

          {page === 'Home' && (
            <>
              <section className="hero">
                <span className="eyebrow">THE DEVELOPER COMMUNITY</span>
                <h1>Ideas worth <span>sharing.</span></h1>
                <p>
                  Discover tutorials, engineering insights, and ideas
                  from developers around the world.
                </p>
                <button className="primary" onClick={() => setPage('Write')}>
                  Start writing <Plus size={17} />
                </button>
                <div className="hero-stats">
                  <div><strong>{published.length}</strong><span>Published articles</span></div>
                  <div><strong>{posts.length}</strong><span>Total submissions</span></div>
                  <div><strong>{pending.length}</strong><span>Awaiting review</span></div>
                </div>
              </section>

              <div className="section-heading">
                <div>
                  <h2>Explore articles</h2>
                  <p className="muted">Fresh ideas from the community</p>
                </div>
                <span className="count">{visiblePosts.length} articles</span>
              </div>

              <div className="categories">
                {['All', 'React', 'JavaScript', 'Backend'].map(item => (
                  <button
                    key={item}
                    onClick={() => setSearch(item === 'All' ? '' : item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="posts">
                {visiblePosts.map(post => (
                  <article className="post" key={post.id}>
                    <div className="post-top">
                      <span className="tag">{post.category}</span>
                      <span className="muted">Developer blog</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <div className="post-footer">
                      <span className="author">{post.author}</span>
                      <span className="muted">
                        <Heart size={15} /> {post.likes}
                      </span>
                    </div>
                  </article>
                ))}

                {visiblePosts.length === 0 && (
                  <p>No published articles found. Try another search.</p>
                )}
              </div>
            </>
          )}

          {page === 'Write' && (
            <section className="panel">
              <span className="eyebrow">CREATE SOMETHING GREAT</span>
              <h1>Write an article</h1>
              <p className="muted">
                Your submission will be reviewed before publication.
              </p>

              <form onSubmit={submitPost}>
                <label htmlFor="article-title">Article title</label>
                <input
                  id="article-title"
                  required
                  maxLength={120}
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Mastering React Hooks"
                />

                <label htmlFor="article-category">Category</label>
                <select
                  id="article-category"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  <option>React</option>
                  <option>JavaScript</option>
                  <option>Backend</option>
                  <option>AI & ML</option>
                  <option>DevOps</option>
                </select>

                <label htmlFor="article-summary">Article summary</label>
                <textarea
                  id="article-summary"
                  required
                  maxLength={2000}
                  rows={6}
                  value={excerpt}
                  onChange={e => setExcerpt(e.target.value)}
                  placeholder="What will readers learn?"
                />

                <button className="primary" type="submit">
                  <FileText size={17} /> Submit for review
                </button>
              </form>
            </section>
          )}

          {page === 'Moderation' && (
            <section>
              <span className="eyebrow">CONTENT MANAGEMENT</span>
              <h1>Moderation center</h1>
              <p className="muted">
                Review submissions and manage article visibility.
              </p>

              <div className="stats">
                <div className="stat">
                  <FileText />
                  <span>Total articles</span>
                  <strong>{posts.length}</strong>
                </div>
                <div className="stat">
                  <ShieldCheck />
                  <span>Pending review</span>
                  <strong>{pending.length}</strong>
                </div>
                <div className="stat">
                  <CheckCircle />
                  <span>Published</span>
                  <strong>{published.length}</strong>
                </div>
              </div>

              <div className="moderation-list">
                {posts.map(post => (
                  <article className="moderation-item" key={post.id}>
                    <div className="moderation-info">
                      <span className={`status ${post.status.toLowerCase()}`}>
                        {post.status}
                      </span>
                      <h3>{post.title}</h3>
                      <p>{post.author} · {post.category}</p>
                      <p>{post.excerpt}</p>
                    </div>

                    {post.status === 'Pending' && (
                      <div className="actions">
                        <button
                          className="approve"
                          onClick={() => moderate(post.id, 'Published')}
                        >
                          <CheckCircle size={16} /> Approve
                        </button>
                        <button
                          className="reject"
                          onClick={() => moderate(post.id, 'Rejected')}
                        >
                          <XCircle size={16} /> Reject
                        </button>
                      </div>
                    )}
                  </article>
                ))}

                {posts.length === 0 && <p>No submissions yet.</p>}
              </div>
            </section>
          )}
        </main>
      </div>

      <footer>DevSpace · A community for people who build.</footer>
    </div>
  );
}

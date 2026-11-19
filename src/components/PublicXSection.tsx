import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { XIcon } from './Icons';
import { personal, xPosts } from '../data/portfolio';

type Post = (typeof xPosts)[0];

export default function PublicXSection() {
  const [posts, setPosts] = useState<Post[]>(xPosts.slice(0, 3));
  const [avatar, setAvatar] = useState<string>(personal.avatar);
  const [bio, setBio] = useState<string>(personal.xBio);

  // Automatically sync the most recent posts & profile info directly from your live X account on page load
  useEffect(() => {
    let cancelled = false;
    const cleanHandle = personal.xHandle.replace('@', '');

    const syncLiveFeed = async () => {
      try {
        // 1. Fetch live RSS feed from CORS-enabled FxTwitter mirror
        const feedRes = await fetch(`https://fxtwitter.com/${cleanHandle}/feed.xml`, {
          signal: AbortSignal.timeout(6000),
        });

        if (feedRes.ok) {
          const xml = await feedRes.text();
          const rawItems = xml.split('<item>').slice(1);

          if (rawItems.length > 0) {
            const parsedPosts = rawItems.map((item, idx) => {
              const linkMatch = item.match(/<link>([\s\S]*?)<\/link>/);
              const dateMatch = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
              const descMatch =
                item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) ||
                item.match(/<description>([\s\S]*?)<\/description>/);

              let text = '';
              if (descMatch) {
                text = descMatch[1]
                  .replace(/<br\s*\/?>/gi, '\n')
                  .replace(/<p>/gi, '')
                  .replace(/<\/p>/gi, '\n')
                  .replace(/&apos;/g, "'")
                  .replace(/&quot;/g, '"')
                  .replace(/&amp;/g, '&')
                  .replace(/<[^>]+>/g, '')
                  .replace(/\n{3,}/g, '\n\n')
                  .trim();
              }

              const timestamp = dateMatch ? new Date(dateMatch[1]).getTime() : 0;
              let formattedDate = 'Recent';
              if (dateMatch) {
                try {
                  const d = new Date(dateMatch[1]);
                  formattedDate = d.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  });
                } catch {
                  formattedDate = 'Recent';
                }
              }

              return {
                id: `live-x-post-${idx}`,
                timestamp,
                date: formattedDate,
                handle: personal.xHandle,
                author: personal.name,
                avatar: avatar || personal.avatar,
                text: text || '',
                url: linkMatch ? linkMatch[1].trim() : personal.x,
              };
            });

            // Sort descending by timestamp so newest post is always at index 0
            parsedPosts.sort((a, b) => b.timestamp - a.timestamp);
            const top3 = parsedPosts.filter((p) => p.text.length > 0).slice(0, 3);

            if (!cancelled && top3.length > 0) {
              setPosts(top3);
            }
          }
        }
      } catch {
        // Silently use bundled static backup posts
      }

      // 2. Fetch live profile info (bio & avatar updates)
      try {
        const userRes = await fetch(`https://api.fxtwitter.com/${cleanHandle}`, {
          signal: AbortSignal.timeout(5000),
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          if (!cancelled && userData?.user) {
            if (userData.user.description) setBio(userData.user.description);
            if (userData.user.avatar_url) {
              const highRes = userData.user.avatar_url.replace('_normal', '_400x400');
              setAvatar(highRes);
            }
          }
        }
      } catch {
        // Keep bundled profile photo & bio
      }
    };

    syncLiveFeed();

    return () => {
      cancelled = true;
    };
  }, [personal.xHandle, personal.name, personal.x, personal.avatar, avatar]);

  return (
    <section id="public" className="py-10 border-b border-[#181818] animate-fade-in">
      {/* Header with Accent Color */}
      <div className="flex items-center justify-between mb-5 font-mono text-[12px]">
        <div className="flex items-center gap-1.5 font-bold" style={{ color: 'var(--accent)' }}>
          <span className="uppercase tracking-wider">public</span>
          <span className="text-[#888888] font-normal text-[11px]">· {personal.xHandle}</span>
        </div>
        <a
          href={personal.x}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#AAAAAA] hover:text-white flex items-center gap-1.5 transition-colors font-medium"
        >
          <span>x.com/{personal.xHandle.replace('@', '')}</span>
          <ArrowUpRight size={13} />
        </a>
      </div>

      {/* Author Profile Banner Card with Authentic Profile Picture from X */}
      <div className="bg-[#090909] border border-[#1A1A1A] rounded-xl p-4 sm:p-5 mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#2A2A2A] bg-black">
            <img
              src={avatar || personal.avatar}
              alt={personal.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[16px] font-bold text-white leading-tight">
                {personal.name}
              </h3>
              <span className="text-[12px] font-mono text-[#888888]">
                {personal.xHandle}
              </span>
            </div>
            <p className="text-[13px] text-white font-normal mt-0.5 leading-snug whitespace-pre-line">
              {bio || personal.xBio}
            </p>
          </div>
        </div>

        <a
          href={personal.x}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white text-black hover:bg-[#E5E5E5] rounded-full font-mono text-[12px] font-bold transition-all shrink-0 cursor-pointer shadow-xs"
        >
          <XIcon size={12} />
          <span>Follow {personal.xHandle}</span>
        </a>
      </div>

      {/* Curated Feed of Most Recent 3 Posts (No Metrics) */}
      <div className="space-y-4">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-[#080808] border border-[#1A1A1A] hover:border-[#282828] rounded-xl p-4 sm:p-5 transition-all duration-200"
          >
            {/* Post Header */}
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-[#222222] bg-black">
                  <img
                    src={avatar || personal.avatar}
                    alt={post.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[14px] font-bold text-white">
                      {post.author}
                    </span>
                    <span className="text-[12px] font-mono text-[#777777]">
                      {post.handle}
                    </span>
                    <span className="text-[#444444] text-[11px]">·</span>
                    <span className="text-[12px] font-mono text-[#888888]">
                      {post.date}
                    </span>
                  </div>
                </div>
              </div>

              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#666666] hover:text-white transition-colors p-1"
                aria-label="View on X"
              >
                <XIcon size={14} />
              </a>
            </div>

            {/* Post Text */}
            <div className="text-[15px] text-white leading-relaxed whitespace-pre-line font-normal pl-0 sm:pl-10">
              {post.text}
            </div>

            {/* Footer with Single Clean "View on X" Link (Zero Metrics / No counts) */}
            <div className="flex items-center justify-end pt-3 mt-3 border-t border-[#141414] pl-0 sm:pl-10">
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#AAAAAA] hover:text-white flex items-center gap-1 text-[11.5px] font-mono transition-colors"
              >
                <span>View on X</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

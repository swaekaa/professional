import { useState, useEffect } from 'react';
import { Disc3 } from 'lucide-react';

interface TrackInfo {
  name: string;
  artist: string;
  album: string;
  image: string;
  url: string;
  nowPlaying: boolean;
}

const FALLBACK_TRACK: TrackInfo = {
  name: 'Wasting Angels (with The Kid LAROI)',
  artist: 'Post Malone',
  album: 'Twelve Carat Toothache',
  image: 'https://lastfm-img.freetls.fastly.net/i/u/64s/d897b8b9afe75c015ae753ff914f9021.jpg',
  url: 'https://www.last.fm/music/Post+Malone/_/Wasting+Angels+(with+The+Kid+LAROI)',
  nowPlaying: false,
};

const LASTFM_USER = 'moanturtle';
const API_KEY = 'b25b959554ed76058ac220b7b2e0a026';

export default function LastFmCapsule() {
  const [track, setTrack] = useState<TrackInfo>(FALLBACK_TRACK);

  useEffect(() => {
    let cancelled = false;

    const fetchRecentTrack = async () => {
      try {
        const res = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${API_KEY}&format=json&limit=1`,
          { signal: AbortSignal.timeout(6000) }
        );
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;

        const raw = Array.isArray(data.recenttracks?.track)
          ? data.recenttracks.track[0]
          : data.recenttracks?.track;

        if (raw && raw.name) {
          const imageObj = Array.isArray(raw.image)
            ? raw.image.find((i: { size: string }) => i.size === 'medium') || raw.image[0]
            : null;

          setTrack({
            name: raw.name,
            artist: raw.artist?.['#text'] || raw.artist?.name || 'Unknown Artist',
            album: raw.album?.['#text'] || '',
            image: imageObj?.['#text'] || '',
            url: raw.url || `https://www.last.fm/user/${LASTFM_USER}`,
            nowPlaying: raw['@attr']?.nowplaying === 'true',
          });
        }
      } catch {
        // Silently retain current/fallback track
      }
    };

    fetchRecentTrack();

    // Poll every 25 seconds for new scrobbles
    const interval = window.setInterval(fetchRecentTrack, 25000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <aside
      aria-label="Last.fm recently played"
      className="fixed top-3 right-3 sm:top-4 sm:right-6 z-40 select-none animate-fade-in"
    >
      <a
        href={track.url}
        target="_blank"
        rel="noopener noreferrer"
        data-music={track.nowPlaying ? 'now playing' : 'recent song'}
        title={`${track.name} by ${track.artist} on Last.fm`}
        className="group flex items-center gap-2 h-7 sm:h-8 pl-1.5 pr-3 max-w-[270px] sm:max-w-[340px] rounded-full bg-[#090909]/90 hover:bg-[#121212] border border-[#222222] hover:border-[#383838] backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.6)] transition-all duration-200 cursor-pointer"
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#222222')}
      >
        {/* Album Art / Spinning Vinyl Thumbnail */}
        <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 border border-[#2A2A2A] bg-[#141414] flex items-center justify-center">
          {track.image ? (
            <img
              src={track.image}
              alt={track.album || track.name}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover ${
                track.nowPlaying ? 'animate-[spin_8s_linear_infinite]' : ''
              }`}
            />
          ) : (
            <Disc3 size={11} className="text-[#AAAAAA] group-hover:text-white transition-colors" />
          )}
        </div>

        {/* Track Title and Artist (Truncated) */}
        <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden">
          <span className="text-[11.5px] font-semibold text-white truncate leading-none group-hover:text-white transition-colors">
            {track.name}
          </span>
          <span className="text-[10.5px] text-[#AAAAAA] truncate font-normal leading-none shrink-0 max-w-[100px] sm:max-w-[130px]">
            · {track.artist}
          </span>
        </div>

        {/* Status Indicator: Animated Equalizer if Live, else Subtle Recent Badge */}
        {track.nowPlaying ? (
          <div className="flex items-end gap-[1.5px] h-2.5 w-2.5 shrink-0 ml-0.5" title="Now Playing">
            <span
              className="w-[2px] rounded-full animate-music-bar-1"
              style={{ backgroundColor: 'var(--accent)' }}
            />
            <span
              className="w-[2px] rounded-full animate-music-bar-2"
              style={{ backgroundColor: 'var(--accent)' }}
            />
            <span
              className="w-[2px] rounded-full animate-music-bar-3"
              style={{ backgroundColor: 'var(--accent)' }}
            />
          </div>
        ) : (
          <div className="flex items-center gap-1 shrink-0">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: 'var(--accent)' }}
            />
            <span className="font-mono text-[9px] text-[#888888] group-hover:text-[#CCCCCC] uppercase tracking-wider transition-colors">
              recent
            </span>
          </div>
        )}
      </a>
    </aside>
  );
}

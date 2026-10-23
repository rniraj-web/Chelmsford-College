"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

export function VideoPlayer({
  poster,
  youtubeId,
  duration,
  // caption,
  transcriptHref,
}: {
  poster: string;
  youtubeId: string;
  duration?: string;
  // caption: string;
  transcriptHref: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure>
      <div className="relative aspect-video overflow-hidden rounded-xl bg-surface-muted">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
            // title={caption}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <>
            <Image
              src={poster}
              alt=""
              fill
              sizes="(min-width: 1024px) 800px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-overlay-light" />
            {duration ? (
              <span className="type-label-s absolute right-4 top-4 rounded-full bg-surface-inverse px-3 py-1 text-fg-inverse">
                {duration}
              </span>
            ) : null}
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play video"
              className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-surface text-fg-brand shadow-lg transition-colors duration-120 ease-standard hover:bg-brand-subtle focus-visible:focus-ring"
            >
              <Play className="size-8" aria-hidden="true" />
            </button>
          </>
        )}
      </div>
      <figcaption className="type-body-s mt-3 flex items-center justify-between text-fg-secondary">
        {/* <span>{caption}</span> */}
        <Link
          href={transcriptHref}
          className="type-link-s text-fg-link focus-visible:focus-highlight"
        >
          Transcript
        </Link>
      </figcaption>
    </figure>
  );
}

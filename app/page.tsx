import { Calendar, GraduationCap } from "lucide-react";
import { getCourses, getFacets } from "@/lib/courses";
import { getEvents } from "@/lib/events";
import { getNews, formatNewsDate } from "@/lib/news";
import { getActiveCampaigns } from "@/lib/campaigns";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { SubjectTile } from "@/components/SubjectTile";
import { CourseCard } from "@/components/CourseCard";
import { CampaignBanner } from "@/components/CampaignBanner";
import { EventsMarquee } from "@/components/EventsMarquee";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Testimonial } from "@/components/Testimonial";
import { NewsCard } from "@/components/NewsCard";
import { FeatureCard } from "@/components/FeatureCard";
import { Link } from "@/components/Link";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  const courses = getCourses();
  const facets = getFacets();
  const events = getEvents().slice(0, 4);
  const featuredCourses = courses.slice(0, 3);
  const news = getNews().slice(0, 3);
  const campaigns = getActiveCampaigns();

  const subjects = facets.subject.map((subject) => ({
    ...subject,
    image:
      courses.find((course) => course.derived.subject === subject.label)
        ?.derived.image ?? "/images/students-learning.jpg",
  }));

  return (
    <>
      <Hero
        image="/images/moulsham-street.avif"
        eyebrow="Chelmsford College"
        title="Build the career"
        titleAccent="you want"
        secondaryCtaHref="/events"
        secondaryCtaLabel="Book an open event"
        latestEvent={events[0]}
      >
        Full-time courses, apprenticeships and adult learning at
        Chelmsford&rsquo;s further education college. Most September 2027
        courses are open for applications now.
      </Hero>

      <section className="section-y">
        <Reveal className="container-page">
          <SectionHeader
            eyebrow="Subjects"
            title="Browse by subject"
            viewAllHref="/courses"
          />
          <div className="gap-gutter mt-6 flex flex-col md:flex-row md:overflow-x-auto md:pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible">
            {subjects.map((subject) => (
              <div
                key={subject.value}
                className="md:w-2/5 md:shrink-0 lg:w-auto"
              >
                <SubjectTile
                  href={`/courses?subject=${subject.value}`}
                  image={subject.image}
                  label={subject.label}
                  count={subject.count}
                />
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section-y bg-surface-subtle">
        <Reveal className="container-page">
          <SectionHeader eyebrow="Courses" title="Featured courses" />
          <div className="gap-gutter mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/courses" showIcon>
              Search all {courses.length} courses
            </Link>
          </div>
        </Reveal>
      </section>

      {campaigns.length > 0 ? (
        <section className="section-y flex flex-col gap-gutter">
          {campaigns.map((campaign) => (
            <Reveal key={campaign.id} className="container-page">
              <CampaignBanner
                tone={campaign.tone}
                image={campaign.image}
                title={campaign.title}
                ctaHref={campaign.ctaHref}
                ctaLabel={campaign.ctaLabel}
              >
                {campaign.body}
              </CampaignBanner>
            </Reveal>
          ))}
        </section>
      ) : null}

      <section className="section-y bg-surface-subtle">
        <Reveal className="container-page">
          <SectionHeader
            eyebrow="What's on"
            title="Upcoming events"
            viewAllHref="/events"
          />
          <div className="mt-6">
            <EventsMarquee events={events} />
          </div>
        </Reveal>
      </section>

      <section className="section-y">
        <Reveal className="container-page grid gap-10 lg:grid-cols-2">
          <VideoPlayer
            poster="/images/students-learning.jpg"
            youtubeId="MmUFKbYLKP4"
            duration="2:14"
            caption="Welcome to Chelmsford College | Real Student Stories & College Life"
          />
          <Testimonial
            quote="Studying here gave me the confidence and skills to start my career."
            name="Alex Smith"
            // course="Placeholder testimonial  needs a real quote and consent"
          />
        </Reveal>
      </section>

      <section className="section-y bg-surface-subtle">
        <Reveal className="container-page">
          <SectionHeader eyebrow="News" title="Latest news" />
          <div className="gap-gutter mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <NewsCard
                key={item.id}
                href="#"
                image={item.image}
                date={formatNewsDate(item.date)}
                title={item.title}
                excerpt={item.excerpt}
              />
            ))}

            <FeatureCard
              tone="brand"
              icon={GraduationCap}
              title="Already enrolled?"
              href="/pay"
            >
              Make a payment for a deposit, materials fee or trip.
            </FeatureCard>
            <FeatureCard
              icon={Calendar}
              title="Visit an open event"
              href="/events"
            >
              Meet tutors and tour our facilities before you apply.
            </FeatureCard>
          </div>
        </Reveal>
      </section>
    </>
  );
}

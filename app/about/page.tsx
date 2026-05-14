import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Oskar Puchalski',
  description: 'Learn more about my background and experience.',
};

export default function AboutPage() {
  return (
    <div className="animate-fade-in-up">
      {/* Hero Section */}
      <div className="mx-auto max-w-4xl py-20 px-4 text-center md:py-32">
        <h1 className="mb-8 text-5xl font-bold tracking-tight text-white md:text-7xl">
          Done is better than perfect
        </h1>
        <p className="text-xl leading-relaxed text-gray-300">
          I&apos;m a software engineer based in Poland. I have a passion for
          building web applications and solving complex problems. I&apos;m
          always looking for new challenges and opportunities to learn and grow.
        </p>
      </div>

      <p className="text-xl leading-relaxed text-lg text-center">
        Something is cooking here, stay tuned!
      </p>

      {/* <div className="border-t border-gray-800 py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-16 text-center text-3xl font-bold text-white md:text-4xl">
            Experience
          </h2>

          <div className="relative">
            <ol className="m-0 list-none p-0">
              {experiences.map((exp, index) => (
                <ExperienceItem
                  key={index}
                  {...exp}
                  isLast={index === experiences.length - 1}
                />
              ))}
            </ol>
          </div>
        </div>
      </div> */}
    </div>
  );
}

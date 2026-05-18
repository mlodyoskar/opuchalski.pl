import { Metadata } from 'next';
import ProjectSection from '../../components/ProjectSection';

export const metadata: Metadata = {
  title: 'Portfolio - Oskar Puchalski',
  description: 'Wybrane projekty',
};

export default function PortfolioPage() {
  const projects = [
    {
      title: 'CTC Atlas',
      description:
        'CTC Atlas (ctcatlas.org) to pierwszy otwarty, kompleksowy atlas krążących komórek nowotworowych (CTC) oparty na zaawansowanej cytometrii obrazowej, służący poprawie diagnostyki biopsji płynnej i zrozumieniu mechanizmów metastaz w onkologii.',
      tags: ['Astro.js', 'Strapi CMS', 'TypeScript'],
      link: 'https://ctcatlas.org',
    },
  ];

  return (
    <div className="w-full" lang="pl">
      <div className="border-b border-gray-800 py-24 md:py-32">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 text-6xl font-bold tracking-tighter text-white md:text-9xl">
            Wybrane <br />
            projekty
          </h1>
          <p className="max-w-2xl text-xl text-gray-400 md:text-2xl">
            Tworzę starannie dopracowane cyfrowe doświadczenia, aplikacje i
            narzędzia – z precyzją, pasją i dbałością o każdy detal.
          </p>
        </div>
      </div>

      <div>
        {projects.map((project, index) => (
          <ProjectSection
            key={index}
            index={index}
            align={index % 2 === 0 ? 'left' : 'right'}
            {...project}
          />
        ))}
      </div>
    </div>
  );
}

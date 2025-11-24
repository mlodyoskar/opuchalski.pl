import React from 'react';
import Image from 'next/image';

interface ExperienceItemProps {
  company: string;
  position: string;
  date: string;
  description: string[];
  logo?: string;
  isLast?: boolean;
}

const ExperienceItem = (props: ExperienceItemProps) => {
  const { company, position, date, description, logo, isLast } = props;
  return (
    <li className="relative list-none pl-8 md:pl-0">
      {/* Timeline Line */}
      <div
        className="absolute left-[50%] top-0 bottom-0 hidden w-px -translate-x-1/2 bg-gray-800 md:block"
        aria-hidden="true"
      ></div>

      <div
        className={
          'group items-start justify-between md:flex' + (isLast ? 'mb-16' : '')
        }
      >
        {/* Date (Left side on desktop) */}
        <div className="mb-2 md:mb-0 md:w-[45%] md:pr-12 md:text-right">
          <span className="inline-block rounded-full bg-blue-900/20 px-3 py-1 font-mono text-sm font-medium text-blue-400">
            {date}
          </span>
        </div>

        {/* Dot */}
        <div
          className="absolute left-0 z-10 mt-1.5 h-4 w-4 -translate-x-[5px] rounded-full border-4 border-blue-400 bg-gray-900 transition-transform duration-300 group-hover:scale-125 md:left-[50%] md:-translate-x-1/2"
          aria-hidden="true"
        ></div>

        {/* Content (Right side on desktop) */}
        <div className="md:w-[45%] md:pl-12">
          <div className="mb-2 flex items-center gap-4">
            {logo && (
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-gray-800 bg-white">
                <Image
                  src={logo}
                  alt={`${company} logo`}
                  layout="fill"
                  objectFit="contain"
                  className="p-1"
                />
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold leading-tight text-white">
                {position}
              </h3>
              <h4 className="text-lg font-medium text-gray-400">{company}</h4>
            </div>
          </div>

          <ul className="mt-4 space-y-2">
            {description.map((item, index) => (
              <li
                key={index}
                className="flex items-start text-sm leading-relaxed text-gray-300"
              >
                <span
                  className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"
                  aria-hidden="true"
                ></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
};

export default ExperienceItem;

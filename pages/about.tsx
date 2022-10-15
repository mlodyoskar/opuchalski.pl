import Image from 'next/image';
import React from 'react';
import Layout from '../components/Layout';

export const About = (): JSX.Element => {
  return (
    <Layout
      customMeta={{
        title: 'O mnie | opuchalski.pl',
      }}
    >
      <h1 className="text-5xl">O mnie</h1>
      <section className="flex items-center gap-16">
        <div className="w-2/3">
          <p className="text-lg">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde
            accusamus nihil atque odio in, iusto praesentium earum dicta
            nostrum! Veritatis laboriosam enim delectus ratione earum excepturi
            voluptates, assumenda rem molestias ad nulla eligendi ducimus
            blanditiis tempora corrupti illo praesentium accusamus dolorum
            quibusdam, dolorem provident saepe. Dolorem incidunt inventore ab
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde
            accusamus nihil atque odio in, iusto praesentium earum dicta
            nostrum! Veritatis laboriosam enim delectus ratione earum excepturi
            voluptates, assumenda rem molestias ad nulla eligendi ducimus
            blanditiis tempora corrupti illo praesentium accusamus dolorum
            quibusdam, dolorem provident saepe. Dolorem incidunt inventore ab
            ex.
          </p>
        </div>
        <div>
          <Image src="/../public/images/about.jpeg" width="500" height="500" />
        </div>
      </section>
    </Layout>
  );
};

export default About;

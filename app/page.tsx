import { Hero } from '@/components/sections/Hero';
import { Story } from '@/components/sections/Story';
import { Stats } from '@/components/sections/Stats';
import { Sustainability } from '@/components/sections/Sustainability';
import { Products } from '@/components/sections/Products';
import { Services } from '@/components/sections/Services';
import { Innovation } from '@/components/sections/Innovation';
import { Gallery } from '@/components/sections/Gallery';
import { News } from '@/components/sections/News';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Story />
      <Stats />
      <Sustainability />
      <Products />
      <Services />
      <Innovation />
      <Gallery />
      <News />
      <Contact />
    </main>
  );
}

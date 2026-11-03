import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Gap from '@/components/Gap';
import HowItWorks from '@/components/HowItWorks';
import Pillars from '@/components/Pillars';
import Security from '@/components/Security';
import Bills from '@/components/Bills';
import Merchants from '@/components/Merchants';
import Progress from '@/components/Progress';
import Team from '@/components/Team';
import FinalCta from '@/components/FinalCta';
import SiteFooter from '@/components/SiteFooter';
import Effects from '@/components/Effects';
import { portraitURI } from '@/lib/portrait';

export default function Page() {
  // Rendered on the server, so the page carries no external image requests.
  const mockAvatar = portraitURI('chidi');
  const tillAvatar = portraitURI('Ngozi Uche', 'gele');

  return (
    <>
      <Nav />
      <Hero mockAvatar={mockAvatar} />
      <Stats />
      <Gap />
      <HowItWorks />
      <Pillars />
      <Security />
      <Bills />
      <Merchants tillAvatar={tillAvatar} />
      <Progress />
      <Team />
      <FinalCta />
      <SiteFooter />
      <Effects />
    </>
  );
}

import FloatingButtons from "@/components/layout/FloatingButtons";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import SocialSidebar from "@/components/layout/SocialSidebar";
import About from "@/components/sections/About";
import Agenda from "@/components/sections/Agenda";
import Announcements from "@/components/sections/Announcements";
import CtaBanner from "@/components/sections/CtaBanner";
import EventScale from "@/components/sections/EventScale";
import Hero from "@/components/sections/Hero";
import Objectives from "@/components/sections/Objectives";
import Organizer from "@/components/sections/Organizer";
import Partners from "@/components/sections/Partners";
import Sectors from "@/components/sections/Sectors";
import VideoGallery from "@/components/sections/VideoGallery";
import WhyBvm from "@/components/sections/WhyBvm";
import Zones from "@/components/sections/Zones";

export default function Home() {
  return (
    <>
      <SocialSidebar />
      <FloatingButtons />
      <div className="relative">
        <Header />
        <Hero />
      </div>
      <main id="main-content">
        <About />
        <Zones />
        <Sectors />
        <VideoGallery />
        <WhyBvm />
        <Objectives />
        <Agenda />
        <Partners />
        <EventScale />
        <Organizer />
        <Announcements />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}

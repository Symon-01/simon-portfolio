import React from 'react';
import { client } from '@/lib/sanity.client';
import { 
  aboutMePageQuery, 
  skillsExpertiseQuery,
  creativePhilosophyQuery,
  personalNoteQuery
} from '@/lib/sanity.queries';
import { urlFor } from '@/lib/sanity.image';
import AboutMeHero from '@/components/AboutMeHero';
import MyStory from '@/components/MyStory';
import SkillsExpertise from '@/components/SkillsExpertise';
import CreativePhilosophy from '@/components/CreativePhilosophy';
import PersonalTouch from '@/components/PersonalTouch';
import AboutMeCTA from '@/components/AboutMeCTA';

import {
  Palette, Pencil, Brush, Paintbrush, Sparkles, Star,
  BarChart3, Target, Lightbulb, Rocket, TrendingUp,
  Code2, Settings, Wrench,
  MessageSquare, Users, Handshake,
  Camera, Video, Music, FileText,
  Megaphone, Bell, Smartphone,
  Heart, Trophy, Eye, Brain
} from 'lucide-react';

type Skill = {
  skillName: string;
  skillIcon: string;
};

type AboutMeData = {
  _id: string;
  heroTitle: string;
  heroDescription: string;
  profileImage: any;
  skills?: Skill[];
};

type StoryImage = {
  asset: any;
  description: string;
};

type StoryParagraph = {
  _key: string;
  text: string;
};

type StorySection = {
  _id: string;
  title: string;
  order: number;
  paragraphs: StoryParagraph[];
  images?: StoryImage[];
};

type SkillCategory = {
  _key: string;
  title: string;
  description: string;
  items: string[];
};

type DesignTool = {
  _key: string;
  toolName: string;
};

type Pillar = {
  _key: string;
  title: string;
  description: string;
  emoji: string;
};

type Paragraph = {
  _key: string;
  text: string;
};

const iconMap: { [key: string]: React.ReactNode } = {
  palette: <Palette className="w-5 h-5" />,
  pencil: <Pencil className="w-5 h-5" />,
  brush: <Brush className="w-5 h-5" />,
  paintbrush: <Paintbrush className="w-5 h-5" />,
  sparkles: <Sparkles className="w-5 h-5" />,
  star: <Star className="w-5 h-5" />,
  chart: <BarChart3 className="w-5 h-5" />,
  target: <Target className="w-5 h-5" />,
  lightbulb: <Lightbulb className="w-5 h-5" />,
  rocket: <Rocket className="w-5 h-5" />,
  trending: <TrendingUp className="w-5 h-5" />,
  code: <Code2 className="w-5 h-5" />,
  settings: <Settings className="w-5 h-5" />,
  wrench: <Wrench className="w-5 h-5" />,
  message: <MessageSquare className="w-5 h-5" />,
  users: <Users className="w-5 h-5" />,
  handshake: <Handshake className="w-5 h-5" />,
  camera: <Camera className="w-5 h-5" />,
  video: <Video className="w-5 h-5" />,
  music: <Music className="w-5 h-5" />,
  filetext: <FileText className="w-5 h-5" />,
  megaphone: <Megaphone className="w-5 h-5" />,
  bell: <Bell className="w-5 h-5" />,
  smartphone: <Smartphone className="w-5 h-5" />,
  heart: <Heart className="w-5 h-5" />,
  trophy: <Trophy className="w-5 h-5" />,
  eye: <Eye className="w-5 h-5" />,
  brain: <Brain className="w-5 h-5" />,
};

async function getPageData() {
  try {
    const [aboutMeData, skillsData, philosophyData, personalData] = await Promise.all([
      client.fetch(aboutMePageQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(skillsExpertiseQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(creativePhilosophyQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(personalNoteQuery, {}, { next: { revalidate: 60 } }),
    ]);

    return { aboutMeData, skillsData, philosophyData, personalData };
  } catch (error) {
    console.error('❌ Error fetching page data:', error);
    return { 
      aboutMeData: null, 
      skillsData: null, 
      philosophyData: null,
      personalData: null
    };
  }
}

export default async function AboutMePage() {
  const { aboutMeData, skillsData, philosophyData, personalData } = await getPageData();
  
  const { aboutMe, storySections } = aboutMeData || {};

  // Build skills with icons for hero
  const skillsWithIcons = aboutMe?.skills?.map((skill: Skill) => ({
    name: skill.skillName,
    icon: iconMap[skill.skillIcon] || iconMap.palette,
  })) || [];

  // Prepare hero data
  let profileImageUrl = '/simon.jpg';
  if (aboutMe?.profileImage) {
    profileImageUrl = urlFor(aboutMe.profileImage).url();
  }

  const heroData = {
    heroTitle: aboutMe?.heroTitle,
    heroDescription: aboutMe?.heroDescription,
    profileImage: profileImageUrl,
    skills: skillsWithIcons,
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <AboutMeHero {...heroData} />

      {/* My Story Section */}
      {storySections && storySections.length > 0 && (
        <MyStory storySections={storySections} />
      )}

      {/* Skills & Expertise */}
      <SkillsExpertise 
        sectionDescription={skillsData?.sectionDescription}
        skillCategories={skillsData?.skillCategories}
        designTools={skillsData?.designTools}
      />

      {/* Creative Philosophy */}
      <CreativePhilosophy 
        mainQuote={philosophyData?.mainQuote}
        pillars={philosophyData?.pillars}
      />

      {/* Personal Touch */}
      <PersonalTouch 
        paragraphs={personalData?.paragraphs}
      />

      {/* Call to Action */}
      <AboutMeCTA />
    </main>
  );
}

export const metadata = {
  title: 'About Me - Simon Macharia | Creative Designer & Visual Storyteller',
  description: 'Learn about Simon Macharia, a creative designer from Kenya specializing in graphic design, pencil art, and visual storytelling.',
  keywords: ['Simon Macharia', 'Graphic Designer Kenya', 'Creative Designer', 'Pencil Artist', 'Visual Storytelling'],
};
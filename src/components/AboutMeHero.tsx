'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Palette } from 'lucide-react';

interface Skill {
  name: string;
  icon?: React.ReactNode;
}

interface AboutMeHeroProps {
  heroTitle?: string;
  heroDescription?: string;
  profileImage?: string;
  skills?: Skill[];
}

export default function AboutMeHero({
  heroTitle = "Simon Macharia",
  heroDescription = "I blend creativity with strategy to deliver impactful designs that speak louder than words.",
  profileImage = "/simon.jpg",
  skills = []
}: AboutMeHeroProps) {

  return (
    <div className="bg-gradient-to-b from-slate-50 via-green-50/50 to-white overflow-hidden relative">
      {/* Enhanced decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-green-300/30 to-transparent rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-orange-300/20 to-transparent rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-r from-green-200/20 via-orange-200/10 to-transparent rounded-full blur-3xl opacity-20"></div>
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(4,143,2,.1) 25%, rgba(4,143,2,.1) 26%, transparent 27%, transparent 74%, rgba(4,143,2,.1) 75%, rgba(4,143,2,.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(4,143,2,.1) 25%, rgba(4,143,2,.1) 26%, transparent 27%, transparent 74%, rgba(4,143,2,.1) 75%, rgba(4,143,2,.1) 76%, transparent 77%, transparent)',
            backgroundSize: '80px 80px'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-6xl px-6 sm:px-8 lg:px-12 mx-auto py-4 md:py-2">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[550px]">
          
          {/* Left Content */}
          <div className="space-y-6 flex flex-col justify-center">
            {/* Badge */}
            <div className="inline-flex w-fit">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm" style={{
                background: 'rgba(4,143,2,0.1)',
                borderColor: 'rgba(4,143,2,0.4)'
              }}>
                <span className="text-sm font-semibold text-gray-700">Creative Designer & Visual Storyteller</span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 
              className="font-bold"
              style={{
                fontSize: 'clamp(1.875rem, 5vw, 3rem)',
                lineHeight: '1.2',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #048F02 0%, #EF6203 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'fadeIn 1.2s ease-out'
              }}
            >
              {heroTitle?.trim() || "Simon Macharia"}
            </h1>
            
            {/* Description */}
            <p 
              className="text-gray-600 max-w-2xl"
              style={{
                fontSize: 'clamp(0.9375rem, 2vw, 1.125rem)',
                lineHeight: '1.6'
              }}
            >
              {heroDescription || "I blend creativity with strategy to deliver impactful designs that speak louder than words."}
            </p>

            {/* Skills Section */}
            {skills && skills.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 px-5 py-3 rounded-lg border-2 transition-all hover:shadow-lg hover:scale-105"
                    style={{
                      borderColor: index % 2 === 0 ? '#048F02' : '#EF6203',
                      background: index % 2 === 0 ? 'rgba(4,143,2,0.05)' : 'rgba(239,98,3,0.05)',
                      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                      fontWeight: '600'
                    }}
                  >
                    <span style={{ color: index % 2 === 0 ? '#048F02' : '#EF6203' }}>
                      {skill.icon}
                    </span>
                    <span className="text-gray-800">{skill.name}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-4">
              <Link
                href="/portfolio"
                className="group px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-white hover:shadow-lg hover:scale-105"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                  background: 'linear-gradient(135deg, #048F02 0%, #037a01 100%)',
                  boxShadow: '0 8px 20px rgba(4,143,2,0.3)'
                }}
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/contact"
                className="px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                  borderWidth: '2px',
                  borderColor: '#048F02',
                  color: '#048F02',
                  backgroundColor: 'rgba(4,143,2,0.05)'
                }}
              >
                Get In Touch
              </Link>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-full max-w-2xl">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt={heroTitle?.trim() || "Simon Macharia"}
                  width={600}
                  height={800}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  priority
                  quality={95}
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-400 rounded-3xl">
                  <Palette className="w-24 h-24 opacity-50" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Animated Green Banner - Full Width at Bottom */}
      <div style={{backgroundColor: '#048F02'}} className="overflow-hidden py-2.5">
        <div className="banner-scroll whitespace-nowrap inline-block">
          <span className="inline-block px-8 text-white font-semibold text-sm">
            Graphic Design & Pencil Art
          </span>
          <span className="inline-block px-8 text-white font-semibold text-sm">
            Creative Solutions for Your Brand
          </span>
          <span className="inline-block px-8 text-white font-semibold text-sm">
            Professional Design Services
          </span>
          <span className="inline-block px-8 text-white font-semibold text-sm">
            Let's Create Something Amazing
          </span>
          <span className="inline-block px-8 text-white font-semibold text-sm">
            Graphic Design & Pencil Art
          </span>
          <span className="inline-block px-8 text-white font-semibold text-sm">
            Creative Solutions for Your Brand
          </span>
          <span className="inline-block px-8 text-white font-semibold text-sm">
            Professional Design Services
          </span>
          <span className="inline-block px-8 text-white font-semibold text-sm">
            Let's Create Something Amazing
          </span>
        </div>
      </div>

      {/* Fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Banner Animation */
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .banner-scroll {
          animation: slide 25s linear infinite;
        }

        .banner-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
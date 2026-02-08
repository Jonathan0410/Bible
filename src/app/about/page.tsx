"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Code, Target, Eye } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-bold mb-6 text-center font-headline">
        About Tenglish Bible Reader
      </h1>

      <div className="max-w-2xl mx-auto space-y-6">

        {/* Welcome */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="text-primary" />
              <span>Welcome!</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              This is an offline-first Bible reader application designed for Tenglish
              (Telugu written in English script). It is built to help users read and
              understand the Telugu Bible in a simple and accessible way.
            </p>
            <p>
              The app is especially useful for people who understand spoken Telugu
              but are not comfortable reading Telugu script.
            </p>
          </CardContent>
        </Card>

        {/* Vision */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="text-primary" />
              <span>Vision</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p>
              Our vision is to make the Word of God accessible to everyone,
              especially Telugu-speaking believers who cannot read or write
              Telugu letters but understand the language.
            </p>
            <p>
              We aim to bridge the gap between spoken Telugu and written Scripture,
              so that no one feels left out during church services, Bible reading,
              or personal devotion.
            </p>
          </CardContent>
        </Card>

        {/* Mission */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="text-primary" />
              <span>Mission</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p>
              Our mission is to provide a clean, accurate, and easy-to-use Tenglish
              Bible reader that helps users follow Telugu Bible readings using
              English letters without losing the original meaning.
            </p>
            <p>
              This app was created from a personal need experienced in Telugu church
              services, where sermons are preached in Telugu but reading Telugu
              scripture was difficult.
            </p>
          </CardContent>
        </Card>

        {/* Who This App Helps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="text-primary" />
              <span>🙌 Who This App Helps</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p>This app is useful for:</p>
            <ul className="list-disc list-inside">
              <li>Telugu youth who grew up reading English</li>
              <li>Believers who understand Telugu but cannot read Telugu script</li>
              <li>Church members following Telugu sermons</li>
              <li>People who want to read the Telugu Bible in an easier format</li>
            </ul>
          </CardContent>
        </Card>
{/* Designed & Developed By */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="text-primary" />
              <span>Designed & Developed By</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>
              Jonathan A
            </p>
            <p>
              📧 jonathanlucky0402@gmail.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

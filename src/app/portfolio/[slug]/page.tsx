import type { Metadata } from "next";
import { client } from '@/lib/sanity';
import ProjectDetailClient from './ProjectDetailClient';

export const revalidate = 3600;

const projectQuery = `*[_type == "portfolio" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  category,
  description,
  client,
  projectDate,
  deliverables,
  tools,
  "images": images[]{
    "_type": _type,
    "url": select(
      _type == "projectImage" => asset.asset->url,
      asset->url
    ),
    "isCover": select(
      _type == "projectImage" => isCover,
      false
    ),
    "alt": select(
      _type == "projectImage" => alt,
      ""
    )
  },
  tags,
  featured,
  projectUrl,
  testimonials[]{
    quote,
    author,
    position,
    company,
    rating,
    photo,
    date,
    verified
  },
  testimonial{
    quote,
    author,
    position,
    photo
  },
  approach[]{
    stepTitle,
    stepDescription
  },
  downloadableFiles[]{
    "asset": asset->{ url },
    fileTitle,
    fileDescription
  },
  relatedProjects[]->{
    _id,
    title,
    slug,
    category,
    featured,
    description,
    "images": images[]{
      "_type": _type,
      "url": select(
        _type == "projectImage" => asset.asset->url,
        asset->url
      ),
      "isCover": select(
        _type == "projectImage" => isCover,
        false
      ),
      "alt": select(
        _type == "projectImage" => alt,
        ""
      )
    }
  }
}`;

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await client.fetch(
      `*[_type == "portfolio" && slug.current == $slug][0]{
        title,
        description,
        "coverImage": coalesce(
          images[_type == "projectImage" && isCover == true][0].asset.asset->url,
          images[_type == "projectImage"][0].asset.asset->url,
          images[isCover == true][0].asset->url,
          images[0].asset->url
        )
      }`,
      { slug },
      { next: { revalidate: 3600 } }
    );
    if (!project) return {};
    const description = Array.isArray(project.description)
      ? project.description.map((block: any) => block.children?.map((c: any) => c.text).join('') ?? '').join(' ')
      : project.description;
    const ogImage = project.coverImage || 'https://simondesigns.co.ke/preview.png';
    return {
      title: `${project.title} | Simon Designs`,
      description: description?.slice(0, 160),
      openGraph: {
        title: `${project.title} | Simon Designs`,
        description: description?.slice(0, 160),
        url: `https://simondesigns.co.ke/portfolio/${slug}`,
        siteName: 'Simon Designs',
        type: 'website',
        images: [{ url: ogImage, width: 1200, height: 630, alt: project.title }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${project.title} | Simon Designs`,
        description: description?.slice(0, 160),
        images: [ogImage],
      },
    };
  } catch (error) {
    console.error(`generateMetadata failed for slug "${slug}":`, error);
    return {
      title: 'Simon Designs | Portfolio',
      description: 'Professional graphic design and pencil art services in Kenya.',
    };
  }
}

export default async function ProjectPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  let project = null;
  try {
    project = await client.fetch(projectQuery, { slug }, { next: { revalidate: 3600 } });
  } catch (e) {
    console.error('Project page server fetch failed:', e);
  }

  return <ProjectDetailClient initialProject={project} slug={slug} />;
}
const Sections: ISection[] = require('./sections.json');
const SectionItems: ISectionItem[] = require('./section-titles.json');
const ProjectCards = require('./projects.json');
const Certifications = require('./certifications.json');
const WhatsNext = require('./whats-next.json');

interface ISection {
  id: number;
  name: string;
  scrollTo: number;
  title: string;
}

interface ISectionItem {
  sectionId: number;
  typography: 'button' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'inherit' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'overline' | undefined;
  content: string;
  placement: {
    top: { xs?: string; sm?: string; md?: string; lg?: string; xl?: string };
    left?: string | { xs?: string; sm?: string; md?: string; lg?: string; xl?: string };
    right?: string | { xs?: string; sm?: string; md?: string; lg?: string; xl?: string };
  };
  sx?: any;
  fadeInOut: number;
}

interface ICertificate {
  name: string;
}

interface IWhatsNext {
  title: string;
  url: string | null;
  alt: string;
  description: string;
}

export { Sections, SectionItems, ProjectCards, Certifications, WhatsNext };
export type { ISection, ISectionItem, ICertificate, IWhatsNext };

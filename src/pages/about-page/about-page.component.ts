import { afterNextRender, Component, DestroyRef, inject, signal } from '@angular/core';
import { ToolIcon } from '../../lib/tool-icon-types';
import { EducationData } from '../../components/education-component/education.component';
import { WorkExperienceData } from '../../components/work-experience-component/work-experience.component';

interface SocialLink {
  label: string;
  handle: string;
  href: string;
  iconClass?: string;
  iconPath?: string;
}

const TIME_ZONE = 'Europe/Berlin';
const MAIL_ICON_PATH = 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
  standalone: false,
})
export class AboutPageComponent {

  private readonly destroyRef = inject(DestroyRef);

  protected readonly localTime = signal<string | null>(null);

  constructor() {
    afterNextRender(() => {
      const formatter = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: TIME_ZONE,
      });

      const tick = () => this.localTime.set(formatter.format(new Date()));

      tick();
      const handle = setInterval(tick, 30_000);
      this.destroyRef.onDestroy(() => clearInterval(handle));
    });
  }

  protected readonly socials: SocialLink[] = [
    {
      label: 'GitHub',
      handle: 'MCmoderSD',
      href: 'https://github.com/MCmoderSD',
      iconClass: 'devicon-github-plain',
    },
    {
      label: 'LinkedIn',
      handle: 'Seraphin-berger',
      href: 'https://www.linkedin.com/in/seraphin-berger/',
      iconClass: 'devicon-linkedin-plain',
    },
    {
      label: 'Email',
      handle: 'business@mcmodersd.de',
      href: 'mailto:business@mcmodersd.de',
      iconPath: MAIL_ICON_PATH,
    },
  ];

  protected readonly experience: WorkExperienceData[] = [
    {
      company: 'ODDO BHF SE',
      position: 'Working Student, Full-Stack Developer',
      from: 'November 2025',
      location: 'Frankfurt, Germany',
      description: 'Currently working in Private Wealth Management on an internal web app.',
      tools: [
        ToolIcon.angular,
        ToolIcon.typescript,
        ToolIcon.html5,
        ToolIcon.sass,
        ToolIcon.csharp,
        ToolIcon.oracle,
      ],
    },
  ];

  protected readonly education: EducationData[] = [
    {
      institution: 'Esslingen University of Applied Sciences',
      qualification: 'B. Eng. Software Engineering',
      from: 'September 2025',
      location: 'Esslingen, Germany',
      description: 'Currently enrolled. The coursework so far has centred on C and C++.',
      tools: [ToolIcon.c, ToolIcon.cplusplus],
    },
    {
      institution: 'Gewerbliche Schule Waiblingen',
      qualification: 'Abitur',
      from: 'September 2022',
      to: 'July 2025',
      location: 'Waiblingen, Germany',
      grade: '2.4',
      description: 'Technical grammar school with an IT focus. Java as the main language, relational databases with SQL, the web basics with HTML and CSS, embedded C on Arduino, and Assembly on the 8051 microcontroller.',
      tools: [
        ToolIcon.java,
        ToolIcon.c,
        ToolIcon.arduino,
        ToolIcon.html5,
        ToolIcon.css3,
        ToolIcon.mysql,
      ],
    },
    {
      institution: 'Friedensschule Neustadt',
      qualification: 'Realschulabschluss',
      from: 'September 2016',
      to: 'July 2022',
      grade: '1.7',
      description: 'Where I started programming, writing embedded C for Arduino.',
      tools: [ToolIcon.arduino, ToolIcon.c],
    },
  ];
}
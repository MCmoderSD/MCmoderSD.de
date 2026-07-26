import { Component } from '@angular/core';
import { ToolIcon } from '../../lib/tool-icon-types';
import { type ProjectPreviewData } from '../../components/project-preview-component/project-preview.component';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.scss',
  standalone: false,
})
export class ProjectPageComponent {

  protected readonly projects: ProjectPreviewData[] = [
    {
      name: 'MCmoderSD.de',
      description: 'Personal portfolio website, built with Angular and a custom dark glow theme.',
      tools: [ToolIcon.angular, ToolIcon.typescript, ToolIcon.sass, ToolIcon.docker],
      github: 'https://github.com/MCmoderSD/MCmoderSD.de',
    },
    {
      name: 'YEPPBot',
      description: 'A comprehensive Twitch bot built on Twitch4J, offering moderation, entertainment and utility commands. Ships as a Docker image and stores its data in MariaDB.',
      tools: [ToolIcon.java, ToolIcon.maven, ToolIcon.docker, ToolIcon.mariadb],
      github: 'https://github.com/MCmoderSD/YEPPBot',
    },
    {
      name: 'AniLink-Downloader',
      description: 'A download tool for Debrid-Link supported hosters. It sorts the given links automatically and extracts MKV files from single or multipart RAR archives, including password-protected ones.',
      tools: [ToolIcon.java, ToolIcon.maven],
      github: 'https://github.com/MCmoderSD/AniLink-Downloader',
    },
    {
      name: 'AniLink-Skipper',
      description: 'A minimal Chrome extension that skips the ouo.io redirect on anime-loads.org by injecting a cookie. Runs entirely in the browser, without any tracking.',
      tools: [ToolIcon.typescript, ToolIcon.chrome],
      github: 'https://github.com/MCmoderSD/AniLink-Skipper',
    },
    {
      name: 'TabScraper',
      description: 'A lightweight Chrome extension that collects the URLs of all open tabs and exports them as a text file, with prefix, suffix and regex filters. Everything stays local.',
      tools: [ToolIcon.typescript, ToolIcon.chrome, ToolIcon.html5, ToolIcon.css3],
      github: 'https://github.com/MCmoderSD/TabScraper',
    },
    {
      name: 'Cola-Webpage',
      description: 'An early school project: a homepage built almost entirely from hand-written HTML and CSS, with separate desktop and mobile stylesheets. Archived and no longer maintained.',
      tools: [ToolIcon.html5, ToolIcon.css3, ToolIcon.javascript],
      github: 'https://github.com/MCmoderSD/Cola-Webpage',
    },
  ];
}
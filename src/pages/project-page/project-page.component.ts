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
      details: [
        'This site itself: a personal portfolio built with Angular, styled with a custom dark-glow theme rather than an off-the-shelf design system. Light and dark mode are not a toggle to click - the page simply reads the operating system\'s colour-scheme preference and follows it, down to a wide-gamut colour tier for displays that support it.',
        'A few details carry over from native app design: a cursor-following spotlight on desktop, a custom scrollbar that floats over the content instead of occupying a gutter, and layout and contrast checked against WCAG AA throughout.',
        'It is shipped as a Docker image, served through a Caddy reverse proxy, and built and published automatically through GitHub Actions.',
      ],
      tools: [ToolIcon.angular, ToolIcon.typescript, ToolIcon.sass, ToolIcon.docker],
      github: 'https://github.com/MCmoderSD/MCmoderSD.de',
    },
    {
      name: 'YEPPBot',
      description: 'A comprehensive Twitch bot built on Twitch4J, offering moderation, entertainment and utility commands. Ships as a Docker image and stores its data in MariaDB.',
      details: [
        'Originally created by FoxxHimself in Python in early 2021, YEPPBot was taken over after the original author stopped development and rewritten from scratch in Java 21 on top of the Twitch4J library.',
        'Any channel can add it with a simple !mod join chat command and remove it again with !mod leave, no external dashboard required. Authenticating it with !mod auth and granting it moderator status unlocks the full feature set of moderation, entertainment and utility commands.',
        'It can be run as a Docker image published on Docker Hub, or as a precompiled JAR configured entirely through JSON files and command-line arguments - including a --generate flag that scaffolds example configuration for a new instance. Persistent data is stored in MariaDB.',
      ],
      tools: [ToolIcon.java, ToolIcon.maven, ToolIcon.docker, ToolIcon.mariadb],
      github: 'https://github.com/MCmoderSD/YEPPBot',
    },
    {
      name: 'AniLink-Downloader',
      description: 'A download tool for Debrid-Link supported hosters. It sorts the given links automatically and extracts MKV files from single or multipart RAR archives, including password-protected ones.',
      details: [
        'A Java tool built around a specific chore: given a batch of Debrid-Link download links for the parts of one file, it downloads every part, puts them back in the right order automatically, and extracts the resulting single- or multipart RAR archive, password-protected or not.',
        'It supports four modes - fully automatic, a batch import from a text file, a manual mode for entering links one by one, and a movie mode that walks a folder of subfolders and processes each one. Its own README is explicit that it is meant for legally obtained, self-created or copyright-free content, and recommends a VPN plus caution around hosters of unclear legality.',
        'It pairs naturally with the two browser extensions listed here: AniLink-Skipper to get past redirect pages, and TabScraper to collect all the links open across a browser session before feeding them in.',
      ],
      tools: [ToolIcon.java, ToolIcon.maven],
      github: 'https://github.com/MCmoderSD/AniLink-Downloader',
    },
    {
      name: 'AniLink-Skipper',
      description: 'A minimal Chrome extension that skips the ouo.io redirect on anime-loads.org by injecting a cookie. Runs entirely in the browser, without any tracking.',
      details: [
        'A small, single-purpose Chrome extension: a click on its toolbar icon injects a cookie that skips the ouo.io redirect page on anime-loads.org, so the underlying link is reached immediately instead of clicking through an intermediate ad page.',
        'Everything happens locally in the browser - no request goes to any server the extension controls, and no browsing data is collected. It is published on the Chrome Web Store and can also be loaded unpacked from a GitHub release or built from source.',
      ],
      tools: [ToolIcon.typescript, ToolIcon.chrome],
      github: 'https://github.com/MCmoderSD/AniLink-Skipper',
    },
    {
      name: 'TabScraper',
      description: 'A lightweight Chrome extension that collects the URLs of all open tabs and exports them as a text file, with prefix, suffix and regex filters. Everything stays local.',
      details: [
        'Tab Scraper collects the URLs of every open Chrome tab and saves them to a text file in one click - useful for archiving research sources, sharing a batch of links, or keeping a record of a browsing session.',
        'Prefix, suffix and regular-expression filters narrow down which tabs get included, with an invert option to exclude matches instead. Filter settings persist and sync across the Chrome profile, and the interface itself supports dark mode.',
        'Like its sibling extensions, it runs entirely client-side: no URL or page content is sent to an external server, and it is available both on the Chrome Web Store and as a source build.',
      ],
      tools: [ToolIcon.typescript, ToolIcon.chrome, ToolIcon.html5, ToolIcon.css3],
      github: 'https://github.com/MCmoderSD/TabScraper',
    },
    {
      name: 'Cola-Webpage',
      description: 'An early school project: a homepage built almost entirely from hand-written HTML and CSS, with separate desktop and mobile stylesheets. Archived and no longer maintained.',
      details: [
        'A school assignment that required building a homepage using nothing but hand-written HTML and CSS - no frameworks, no build tooling. Desktop and mobile layouts were authored as separate stylesheets rather than a single responsive one.',
        'It is kept around as an archive of where things started rather than as active work, and is no longer maintained.',
      ],
      tools: [ToolIcon.html5, ToolIcon.css3, ToolIcon.javascript],
      github: 'https://github.com/MCmoderSD/Cola-Webpage',
    },
  ];
}
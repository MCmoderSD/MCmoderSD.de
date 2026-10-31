import { Component } from '@angular/core';
import { ToolIcon } from '../../lib/tool-icon-types';
import { ProjectPreviewComponent, type ProjectPreviewData } from '../../components/project-preview-component/project-preview.component';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.scss',
  imports: [ProjectPreviewComponent],
})
export class ProjectPageComponent {

  protected readonly projects: ProjectPreviewData[] = [
    {
      name: 'YEPPBot',
      description: 'A comprehensive Twitch bot built on Twitch4J, offering moderation, entertainment and utility commands. Ships as a Docker image and stores its data in MariaDB.',
      details: [
        'Originally created by FoxxHimself in Python in early 2021, YEPPBot was taken over after the original author stopped development and rewritten from scratch in Java 21 on top of the Twitch4J library.',
        'Any channel can add it with a simple !mod join chat command and remove it again with !mod leave, no external dashboard required. Authenticating it with !mod auth and granting it moderator status unlocks the full feature set of moderation, entertainment and utility commands.',
        'It can be run as a Docker image published on Docker Hub, or as a precompiled JAR configured entirely through JSON files and command-line arguments - including a -generate flag that scaffolds example configuration for a new instance. Persistent data is stored in MariaDB.',
      ],
      tools: [ToolIcon.java, ToolIcon.maven, ToolIcon.docker, ToolIcon.mariadb],
      github: 'https://github.com/MCmoderSD/YEPPBot',
    },
    {
      name: 'YEPPDash',
      description: 'The web dashboard for YEPPBot: an ASP.NET Core 10 backend and an Angular 22 frontend that let broadcasters manage the bot from a browser instead of only through chat commands.',
      details: [
        'YEPPBot is a monolithic chat bot with no console of its own, so everything used to run through Twitch chat commands. YEPPDash puts a browser interface in front of it: Twitch OAuth2 login without a separate account or password, moderator, VIP and editor management, letting the bot join or leave a channel, custom commands with a live reload of the running bot, quote management with Excel import and export, follower birthdays, and BDSM test results.',
        'The split is deliberate. Users never talk to the bot directly - the dashboard\'s backend does, through a small HTTP API on YEPPBot itself, so the bot\'s only inputs stay its own API and the Twitch API. Bot-affecting state is never written straight to the database, which keeps YEPPBot\'s existing security model intact.',
        'The backend is ASP.NET Core 10 with Dapper and MySqlConnector against the MariaDB schema YEPPBot owns, plus its own table for encrypted OAuth tokens. The frontend is Angular 22 with Angular Material and SSR. Both halves ship as Docker images and sit behind a Caddy reverse proxy. It is in early beta and actively developed, so the feature set is still moving.',
      ],
      tools: [ToolIcon.csharp, ToolIcon.angular, ToolIcon.mariadb, ToolIcon.docker],
      github: 'https://github.com/MCmoderSD/YEPPDash',
    },
    {
      name: 'MCmoderSD.de',
      description: 'This site: a personal portfolio built with Angular, server-side rendered and fully pre-rendered, with a custom dark theme on top of Angular Material.',
      details: [
        'A personal portfolio built with Angular and styled with a custom dark-glow theme rather than an off-the-shelf design system. Dark is the default; a switch in the header opts into the light tier and the choice is remembered across visits. Displays that support a wider gamut get their own P3 colour tier on top.',
        'A few details carry over from native app design: a cursor-following spotlight on desktop, a custom scrollbar that floats over the content instead of occupying a gutter, and layout and contrast checked against WCAG AA throughout.',
        'Every route is pre-rendered through Angular\'s SSR build, so pages arrive as finished HTML. It is shipped as a multi-arch Docker image, served through a Caddy reverse proxy, and built and published automatically through GitHub Actions.',
      ],
      tools: [ToolIcon.angular, ToolIcon.typescript, ToolIcon.sass, ToolIcon.docker],
      github: 'https://github.com/MCmoderSD/MCmoderSD.de',
    },
    {
      name: 'TabScraper',
      description: 'A lightweight Chrome extension that collects the URLs of all open tabs and exports them as a text file, with prefix, suffix and regex filters. Everything stays local.',
      details: [
        'Tab Scraper collects the URLs of every open Chrome tab and saves them to a text file in one click - useful for archiving research sources, sharing a batch of links, or keeping a record of a browsing session.',
        'Prefix, suffix and regular-expression filters narrow down which tabs get included, with an invert option to exclude matches instead. Invalid patterns and empty results are reported in the popup rather than failing silently, and filter settings persist and sync across the Chrome profile.',
        'Like its sibling extensions, it runs entirely client-side: no URL or page content is sent to an external server. It is available on the Chrome Web Store, as a packaged release, or as a source build.',
      ],
      tools: [ToolIcon.typescript, ToolIcon.chrome, ToolIcon.html5, ToolIcon.css3],
      github: 'https://github.com/MCmoderSD/TabScraper',
    },
    {
      name: 'AniLink-Downloader',
      description: 'A self-hosted Docker web app that downloads and unpacks single or multipart, optionally password-protected RAR archives. Paste hoster links, get direct links from Debrid-Link and end up with a renamed video in a folder named after the show.',
      details: [
        'It started as a Java command-line tool and was rewritten as a web app: an ASP.NET Core backend and an Angular frontend that ship together as one Docker container. Paste the hoster links of a season, an episode or a film, and it creates the direct links through Debrid-Link, downloads the archive parts, unpacks them with 7-Zip and moves the renamed video into place.',
        'The page checks the links while you type and shows which episodes and parts it found before anything starts. Several parts download in parallel with live progress, and every download can be paused, resumed, retried or canceled, as a whole or per episode. An archive that none of the known passwords opens waits until you enter one.',
        'Everything stays local: there is no account and no database, and 7-Zip is part of the image, so Docker is the only thing to install. The page has no authentication because it is meant for your own machine or network, and the README is explicit that it is for legally obtained, self-created or copyright-free content only. It pairs with the two browser extensions listed here: AniLink-Skipper to get past redirect pages, and TabScraper to collect the links open across a browser session.',
      ],
      tools: [ToolIcon.csharp, ToolIcon.angular, ToolIcon.docker],
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
  ];
}
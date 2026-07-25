import { Component } from '@angular/core';
import { DependencyPreviewData, MavenCoordinates } from '../../components/dependency-preview-component/dependency-preview.component';

interface Dependency {
  data: DependencyPreviewData;
  coordinates: MavenCoordinates;
}

@Component({
  selector: 'app-dependencies-page',
  templateUrl: './dependencies-page.component.html',
  styleUrl: './dependencies-page.component.scss',
  standalone: false,
})
export class DependenciesPageComponent {

  protected readonly repositorySnippet: string =
`
<repository>
    <id>Nexus</id>
    <name>Sonatype Nexus</name>
    <url>https://mcmodersd.de/nexus/repository/maven-releases/</url>
</repository>
`;

  protected readonly dependencies: Dependency[] = [
    {
      data: {
        name: 'BDSM-Test-API',
        github: 'https://github.com/MCmoderSD/BDSM-Test-API',
        description: 'A simple Java wrapper for fetching results from BDSMTest.org.',
      },
      coordinates: { groupId: 'de.MCmoderSD', artifactId: 'BDSM-Test-API' },
    },
    {
      data: {
        name: 'Cloudflare-API',
        github: 'https://github.com/MCmoderSD/Cloudflare-API',
        description: 'A simple Java library to interact with the Cloudflare API, focusing on DNS record management.',
      },
      coordinates: { groupId: 'de.MCmoderSD', artifactId: 'Cloudflare-API' },
    },
    {
      data: {
        name: 'Debrid-Link-API',
        github: 'https://github.com/MCmoderSD/Debrid-Link-API',
        description: 'The Debrid-Link API makes it possible to download fast from various file hosters.',
      },
      coordinates: { groupId: 'de.MCmoderSD', artifactId: 'Debrid-Link-API' },
    },
    {
      data: {
        name: 'HTTPS-Server',
        github: 'https://github.com/MCmoderSD/HTTPS-Server',
        description: 'A simple Java HTTPS server built on top of Undertow.',
      },
      coordinates: { groupId: 'de.MCmoderSD', artifactId: 'HTTPS-Server' },
    },
    {
      data: {
        name: 'JsonUtility',
        github: 'https://github.com/MCmoderSD/JsonUtility',
        description: 'A simple utility to read json files into a HashMap and use it as a configuration file.',
      },
      coordinates: { groupId: 'de.MCmoderSD', artifactId: 'JsonUtility' },
    },
    {
      data: {
        name: 'JSQL-Driver',
        github: 'https://github.com/MCmoderSD/JSQL-Driver',
        description: 'A simple Java SQL driver for connecting to SQL databases.',
      },
      coordinates: { groupId: 'de.MCmoderSD', artifactId: 'JSQL-Driver' },
    },
    {
      data: {
        name: 'NASA-API',
        github: 'https://github.com/MCmoderSD/NASA-API',
        description: "A lightweight Java wrapper for NASA's Open APIs.",
      },
      coordinates: { groupId: 'de.MCmoderSD', artifactId: 'NASA-API' },
    },
    {
      data: {
        name: 'OpenAI',
        github: 'https://github.com/MCmoderSD/OpenAI-Wrapper',
        description: 'A Java Wrapper for the official OpenAI Java SDK.',
      },
      coordinates: { groupId: 'de.MCmoderSD', artifactId: 'OpenAI' },
    },
    {
      data: {
        name: 'OpenWeatherMap',
        github: 'https://github.com/MCmoderSD/OpenWeatherMap',
        description: 'A Java library that provides an easy way to query weather data from the OpenWeatherMap API.',
      },
      coordinates: { groupId: 'de.MCmoderSD', artifactId: 'OpenWeatherMap' },
    },
    {
      data: {
        name: 'ZIP-Tools',
        github: 'https://github.com/MCmoderSD/ZIP-Tools',
        description: 'A Java library designed to simplify compressing and decompressing files using GZIP.',
      },
      coordinates: { groupId: 'de.MCmoderSD', artifactId: 'ZIP-Tools' },
    },
  ];
}
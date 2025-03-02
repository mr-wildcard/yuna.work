import { XMLParser } from "fast-xml-parser";

const { ASTRO_PREVIEW_SERVER_PORT_FOR_VISUAL_TESTING = 4321 } = process.env;

const previewServerURL = `http://localhost:${ASTRO_PREVIEW_SERVER_PORT_FOR_VISUAL_TESTING}`;
const rootSitemapURL = `${previewServerURL}/sitemap-index.xml`;

function getSnapshotName(websiteURL) {
  const url = new URL(websiteURL);

  return `Yuna Orsini website - ${url.pathname === "/" ? "homepage" : url.pathname.replaceAll("/", "")}`;
}

async function getWebsiteURLs() {
  const parser = new XMLParser();

  const request = await fetch(rootSitemapURL);
  const response = await request.text();

  const rootSitemap = parser.parse(response);

  const sitemapURLs = [];

  if (Array.isArray(rootSitemap.sitemapindex.sitemap)) {
    for (const { loc } of rootSitemap.sitemapindex.sitemap) {
      sitemapURLs.push(loc);
    }
  } else {
    sitemapURLs.push(rootSitemap.sitemapindex.sitemap.loc);
  }

  const websiteURLs = await Promise.all(
    sitemapURLs.map(async (sitemapURL) => {
      const request = await fetch(sitemapURL);
      const response = await request.text();

      const sitemapXML = parser.parse(response);

      if (Array.isArray(sitemapXML.urlset.url)) {
        return sitemapXML.urlset.url.map(({ loc }) => loc);
      } else {
        return [sitemapXML.urlset.url.loc];
      }
    }),
  );

  return websiteURLs.flat();
}

export default async function getPercySnapshotsConfig() {
  try {
    const websiteURLs = await getWebsiteURLs();

    websiteURLs.push(`${previewServerURL}/not-found-page`);

    const basicSnapshotConfig = {
      enableJavaScript: true,
      execute() {
        window.scrollTo({
          top: document.body.scrollHeight,
        });
      },
    };

    const desktopSnapshots = websiteURLs.map((websiteURL) => {
      return {
        ...basicSnapshotConfig,
        name: `${getSnapshotName(websiteURL)} - desktop`,
        url: websiteURL,
        widths: [1512],
      };
    });

    const mobileSnapshots = websiteURLs.map((websiteURL) => {
      return {
        ...basicSnapshotConfig,
        name: `${getSnapshotName(websiteURL)} - mobile`,
        url: websiteURL,
        widths: [640],
        additionalSnapshots: [
          {
            suffix: " - menu opened",
            execute() {
              document.querySelector("#mobile-menu-opener").click();
            },
          },
        ],
      };
    });

    return [...desktopSnapshots, ...mobileSnapshots];
  } catch (error) {
    console.error(error);
  }
}

await getPercySnapshotsConfig();

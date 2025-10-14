import { XMLParser } from "fast-xml-parser";

const {
  PREVIEW_URL,
  CLOUDFLARE_DEPLOYMENT_URL,
  CF_DEPLOYMENT_HASH_URL,
  CF_PAGES_URL,
  DEPLOYMENT_URL,
  SNAPSHOT_NAME_PREFIX = "Website",
  INCLUDE_NOT_FOUND_PAGE = "true",
  NOT_FOUND_PATH = "/not-found-page",
  INCLUDE_MOBILE_MENU_VARIANT = "true",
  MOBILE_MENU_SELECTOR = "#mobile-menu-opener",
  MOBILE_MENU_SCOPE = "header#header",
} = process.env;

const previewURL =
  PREVIEW_URL ??
  CLOUDFLARE_DEPLOYMENT_URL ??
  CF_DEPLOYMENT_HASH_URL ??
  CF_PAGES_URL ??
  DEPLOYMENT_URL;

if (!previewURL) {
  throw new Error(
    "Missing preview URL. Set PREVIEW_URL, CLOUDFLARE_DEPLOYMENT_URL, CF_DEPLOYMENT_HASH_URL, CF_PAGES_URL, or DEPLOYMENT_URL.",
  );
}

const normalizedPreviewURL = previewURL.endsWith("/")
  ? previewURL.slice(0, -1)
  : previewURL;

const rootSitemapURL = `${normalizedPreviewURL}/sitemap-index.xml`;

console.info(`✅ Using Cloudflare preview URL: ${rootSitemapURL}`);

function getSnapshotName(websiteURL) {
  const url = new URL(websiteURL);

  return `${SNAPSHOT_NAME_PREFIX} - ${
    url.pathname === "/" ? "homepage" : url.pathname.replaceAll("/", "")
  }`;
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

      return sitemapXML.urlset.url.map(({ loc }) => loc);
    }),
  );

  return websiteURLs.flat();
}

export default async function getPercySnapshotsConfig() {
  try {
    const websiteURLs = await getWebsiteURLs();

    if (INCLUDE_NOT_FOUND_PAGE !== "false") {
      websiteURLs.push(`${normalizedPreviewURL}${NOT_FOUND_PATH}`);
    }

    const basicSnapshotConfig = {
      enableJavaScript: true,
      percyCSS: `
        html {
          font-family: DM Sans Variable,sans-serif !important;
        }

        .sticky {
          position: relative;
        }
      `,
      async execute() {
        document
          .querySelectorAll("summary")
          .forEach((summary) => summary.click());

        if (window.innerHeight < document.body.scrollHeight) {
          await new Promise((resolve) => {
            window.addEventListener(
              "scrollend",
              () => {
                resolve();
              },
              {
                once: true,
              },
            );

            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
          });
        }
      },
    };

    const snapshots = websiteURLs.map((websiteURL) => {
      return {
        ...basicSnapshotConfig,
        name: getSnapshotName(websiteURL),
        url: websiteURL,
        widths: [1512, 640],
      };
    });

    const snapshotConfigs = [...snapshots];

    if (INCLUDE_MOBILE_MENU_VARIANT !== "false") {
      const mobileMenuSnapshots = websiteURLs.map((websiteURL) => {
        return {
          ...basicSnapshotConfig,
          name: `${getSnapshotName(websiteURL)} - mobile menu opened`,
          url: websiteURL,
          widths: [640],
          scope: MOBILE_MENU_SCOPE,
          execute() {
            document
              .querySelectorAll("summary")
              .forEach((summary) => summary.click());

            const opener = document.querySelector(MOBILE_MENU_SELECTOR);

            if (opener) {
              opener.click();
            } else {
              console.warn(
                `⚠️ Mobile menu selector "${MOBILE_MENU_SELECTOR}" was not found on ${websiteURL}.`,
              );
            }
          },
        };
      });

      snapshotConfigs.push(...mobileMenuSnapshots);
    }

    return snapshotConfigs;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

await getPercySnapshotsConfig();

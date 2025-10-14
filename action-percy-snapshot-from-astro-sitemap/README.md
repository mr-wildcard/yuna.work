# Percy Snapshots From Astro Sitemap

Composite GitHub Action that runs Percy CLI with an Astro sitemap-driven configuration. The action expects dependencies (Node, pnpm, Percy CLI) to already be installed by earlier workflow steps.

## Inputs

- `percy-token` (required) – Percy project token passed to the CLI.
- `preview-url` (required) – Base URL of the deployed site; the action will request `${preview-url}/sitemap-index.xml`.
- `snapshot-name-prefix` (default `Website`) – Prefix applied to generated snapshot names.
- `include-not-found-page` (default `"true"`) – Set to `"false"` to skip the not-found snapshot.
- `not-found-path` (default `/not-found-page`) – Path appended to `preview-url` when the not-found snapshot is included.
- `include-mobile-menu-variant` (default `"true"`) – Toggle the mobile menu snapshot variant.
- `mobile-menu-selector` (default `#mobile-menu-opener`) – Selector triggered to open the mobile menu during the variant snapshot.
- `mobile-menu-scope` (default `header#header`) – Percy scope applied to the mobile menu variant.
- `additional-percy-flags` (default empty) – Extra flags appended to the `pnpm percy snapshot` command.

## Example

```yaml
jobs:
  visual-testing:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v6
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install
      - name: Percy snapshots from sitemap
        uses: ./action-percy-snapshot-from-astro-sitemap
        with:
          percy-token: ${{ secrets.PERCY_TOKEN }}
          preview-url: ${{ steps.wait-for-cloudflare-deployment-url.outputs.preview_url }}
          snapshot-name-prefix: My Astro site
```

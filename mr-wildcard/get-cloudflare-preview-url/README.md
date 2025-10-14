# Get Cloudflare preview URL

Reusable composite GitHub Action that waits for a Cloudflare Pages preview deployment for a given branch and exposes the immutable URL once it is ready.

## Inputs

| Name | Required | Default | Description |
| ---- | :------: | ------- | ----------- |
| `cloudflare-account-id` | ✅ | – | Cloudflare account identifier. |
| `cloudflare-api-token` | ✅ | – | API token with Pages read access. |
| `cloudflare-pages-project` | ✅ | – | Cloudflare Pages project name. |
| `branch-name` | ❌ | `github.head_ref` | Branch to watch for the preview deployment. |
| `timeout-secs` | ❌ | `900` | Maximum wait time before failing. |
| `poll-interval-secs` | ❌ | `10` | Delay between status checks. |

## Outputs

| Name | Description |
| ---- | ----------- |
| `status` | Final status returned by Cloudflare (`success`, `failure`, `canceled`, `timeout`, …). |
| `preview-url` | Immutable URL for the deployment hash. |

The action also exports the URL via `CF_PREVIEW_HASH_URL` in the environment for downstream steps that expect that variable.

## Example

```yaml
jobs:
  visual-testing:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5

      - name: Get Cloudflare preview URL
        id: preview
        uses: mr-wildcard/get-cloudflare-preview-url@v1
        with:
          cloudflare-account-id: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          cloudflare-api-token: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          cloudflare-pages-project: my-pages-project
          branch-name: ${{ github.head_ref }}

      - name: Use the URL
        if: steps.preview.outputs.status == 'success'
        run: echo "Preview available at ${{ steps.preview.outputs.preview-url }}"
```

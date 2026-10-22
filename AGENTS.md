<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Use the shared PortfolioShell for public content pages so navigation and footer remain consistent.
- Keep portfolio selection in the browser-safe portfolio module so filtering and previews share a single source of truth.
- Films and Instagram posts/reels play only from links resolved by src/lib/video-embed.ts, without a local fallback clip. Vertical formats (Shorts, reels) must be flagged so the preview window goes tall instead of letterboxing them. Instagram embeds must always leave a link to the publication, so a post Instagram refuses to show never leaves an empty preview.
- Contact currently prepares a clipboard briefing without submission; do not imply delivery until a real contact destination is configured.
- Define visual styling through semantic tokens and reusable styles in src/styles.css.

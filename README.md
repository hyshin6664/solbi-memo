# Memo PWA

Lightweight personal memo PWA. Text + photo + auto-location → saved to private cloud queue.

## Features

- **Zero external dependencies** — no CDN, no library. 5 static files.
- **Offline-first** — Service Worker shell cache + localStorage queue. Works without network; auto-sends when online.
- **Auto-location** — geolocation attached to every memo (cached 30 min).
- **No audio recording** — recording handled by phone's native app, separately.

## Files

| File | Role |
|---|---|
| `index.html` | UI + logic (single file) |
| `sw.js` | Service Worker (offline shell) |
| `manifest.webmanifest` | PWA manifest |
| `icon-*.png` | PWA icons (192·512·maskable) |
| `apple-touch-icon.png` | iOS home screen icon |

## Deploy

GitHub Pages — Settings → Pages → Source: `main` / `root`.

## License

Personal use. Private backend (auth required).

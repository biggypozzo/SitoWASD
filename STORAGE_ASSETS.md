# WASD storage assets

WASD includes the two essential visual assets in the downloadable project under `client/public/assets/`, so the ZIP works correctly after extraction or when hosted outside WebDev. The feedback attachment workflow continues to use the managed WebDev storage layer because those files are user-submitted runtime data.

| Purpose | Runtime path | Original source file |
|---|---|---|
| Crown logo used in the header, product cards, detail pages, and preloader | `/assets/wasd-crown-logo.png` | `client/public/assets/wasd-crown-logo.png` |
| Macro close-up used in the material section and parallax effect | `/assets/wasd-material-closeup.webp` | `client/public/assets/wasd-material-closeup.webp` |

## ZIP behavior

A project ZIP now contains the logo and macro image in `client/public/assets/`. Vite copies them into the final `dist/public/assets/` directory, and the frontend references them with absolute `/assets/...` paths. This means the downloaded project is visually self-contained and does not depend on the managed storage proxy for these two assets.

If a replacement asset is needed, replace the corresponding file in `client/public/assets/` and keep the same filename, or update its frontend reference. The original source files are also retained outside the project directory for maintenance.

```bash
cp /home/ubuntu/webdev-static-assets/your-file.png client/public/assets/your-file.png
```

Then update the corresponding `/assets/...` reference in the application. These two visual assets are intentionally committed because they are required for the standalone ZIP experience.

## Feedback attachments

The feedback page accepts an optional file up to 5 MB. The browser sends the file to the `feedback.submit` tRPC procedure, the backend uploads its bytes with `storagePut()`, and the database stores only the returned storage key, URL, filename, and MIME type. This keeps the database lightweight while preserving the attachment for an authenticated administrator review workflow.

# Contributing

kreanto.dev is a personal site. The content, design and project list are Ming Tsai's, so I won't merge changes to them. Fixes and improvements to the code are welcome.

## Good contributions

- Bug fixes (a layout problem, a broken link, a build error)
- Accessibility fixes
- Typos in code comments and docs
- Dependency or tooling fixes that keep the build working

## Before you start

For anything bigger than a small fix, open an issue first and describe the problem. This avoids work on something I won't merge.

## Set up

You need Node.js 22 or newer.

```sh
npm install
npm run dev
```

Before you open a pull request, run both of these and fix anything they report:

```sh
npm run lint
npm run build
```

## Pull requests

- Keep each pull request to one change.
- Say what the problem was and how you checked the fix. A screenshot helps for visual changes.
- Do not add tracking scripts, analytics, ads or new third-party requests.
- Do not commit secrets, `.env` files or personal data.

## Security problems

Report them privately. See [SECURITY.md](SECURITY.md).

## License

By contributing, you agree that your contribution is licensed under the [MIT License](LICENSE).

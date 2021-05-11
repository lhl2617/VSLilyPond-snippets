# LilyPond AutoComplete (Commands & Keywords)

[![Visual Studio Marketplace](https://vsmarketplacebadge.apphb.com/version-short/lhl2617.lilypond-formatter.svg)](https://marketplace.visualstudio.com/items?itemName=lhl2617.lilypond-formatter)
[![Visual Studio Marketplace](https://vsmarketplacebadge.apphb.com/installs/lhl2617.lilypond-formatter.svg)](https://vsmarketplacebadge.apphb.com/installs/lhl2617.lilypond-formatter.svg)


Provides code snippets for command & keyword auto-complete and IntelliSense for LilyPond files in VSCode.

![Usage Demonstration](./assets/usage.gif)

Included in the [VSLilyPond](https://marketplace.visualstudio.com/items?itemName=lhl2617.vslilypond) extension.

Snippets are auto-generated from [LilyPond documentation](http://lilypond.org/doc/v2.22/Documentation/notation/lilypond-command-index) for LilyPond 2.22.0.

## Requirements

- (Optional but recommended): [VSLilyPond](https://marketplace.visualstudio.com/items?itemName=lhl2617.vslilypond) - Provides advanced LilyPond language support

## Issues

Please submit issues in the [GitHub repository](https://github.com/lhl2617/VSLilyPond-snippets).

## Contributing

- File bugs and/or feature requests in the [GitHub repository](https://github.com/lhl2617/VSLilyPond-snippets)
- Pull requests are welcome in the [GitHub repository](https://github.com/lhl2617/VSLilyPond-snippets)
- Buy me a Coffee ☕️ via [PayPal](https://paypal.me/lhl2617)

## Development

#### Requirements

- [VSCode](https://code.visualstudio.com/)
- `npm`

#### Setup

- Clone repository
  ```bash
  git clone https://github.com/lhl2617/VSLilyPond-formatter
  ```
- Install `npm` dependencies
  ```bash
  npm i
  ```
- Hit `F5` to run an Extension Development Host.

  See [here](https://code.visualstudio.com/api/get-started/your-first-extension) for a detailed extension development guide.

#### Releasing

Releasing is done automatically via GitHub Actions. Bump the version in `package.json` and update `CHANGELOG.md` before merging into the default branch.

Data scraper, scraping infos about most popular beers in Poland from:<br/>
[abcalkoholu.pl](https://abcalkoholu.pl)<br/>
[carlsbergpolska.pl](https://carlsbergpolska.pl/)<br/>
[grupazywiec.pl](https://www.grupazywiec.pl/)<br/>
[vanpur.com.pl](https://vanpur.com.pl/)

---

## Getting Started

Install dependencies

```bash
yarn
```

Scrape!

```bash
yarn start
```

Progress will be displayed in the terminal

Starting from root dir, data about individual companies is placed in `scraper/out` Combined single file is in `shared/beers-data.json`

# Required node version: v16.8.0

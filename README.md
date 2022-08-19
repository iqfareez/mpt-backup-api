![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
[![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)](#put-it-togother-how-does-it-works)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

# mpt-backup-api

**Attention** :exclamation: This API is meant to be used by the [Malaysia Prayer Time app](https://github.com/iqfareez/app_waktu_solat_malaysia) **as a backup** if JAKIM's API is unreachable.

## To run

### Pull the latest data from JAKIM.

Prerequisites: **Node** & **Python 3.10**

> **⚠️ Careful:** Don't run too much, for one run, it will poll this data from JAKIM server about 58 times _(number of zones, it could be more than that)_ every 1.5 secs. It will retry when fail getting a data for a zone.

Install required packages

```
pip install requests urllib3
```

Run the fetcher

```
py fetcher.py
```

### Start local server

```
npm install
```

Then

```
npm start
```

## Put it togother, how does it works?

```mermaid
flowchart TD
    A{{OpenNotifyAPI}}
    A <--> C
    C[[Fetch latest prayer data]] --- D[(db.json)] & E[(log.json)] --> F(Commit & push)
    F -->|Heroku build triggered| G[Deployed to Heroku]
```

> This workflow will trigger automatically on the first day of the month via [GitHub Actions](https://github.com/iqfareez/mpt-backup-api/actions/workflows/fetcher.yml).

[![api fetcher](https://github.com/iqfareez/mpt-backup-api/actions/workflows/fetcher.yml/badge.svg)](https://github.com/iqfareez/mpt-backup-api/actions/workflows/fetcher.yml)

## References

1. [The idea behind automatic fetching and deploy using Python and GitHub](https://canovasjm.netlify.app/2020/11/29/github-actions-run-a-python-script-on-schedule-and-commit-changes/)
2. [The idea of this simple API architecture](https://youtu.be/FLnxgSZ0DG4)
3. [Website template](https://getbootstrap.com/docs/5.1/examples/starter-template)

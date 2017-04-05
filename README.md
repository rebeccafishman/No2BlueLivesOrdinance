App to Contact Chicago City Council Alderman Via Email or Phone against Blue Lives Ordinance

# Getting Started

This project is designed to be hosted as follows:

* **Node backend:** `master` branch hosted on Heroku
* **HTML/CSS/JS frontend:** `gh-pages, hosted on Github pages

And it will require the following resources:

* **Geocodio** for reverse geocoding of addresses. Free up to ~25k hits per day.
* **MongoLab** for storing searches. A free sandbox account should be sufficient for this; if not, it's still kind of cheap.
* **Heroku and Github** accounts for hosting. Should run just fine (but a little slow) on a free Heroku account.
* **Heroku Toolbelt** is the easiest way to install locally. [installation instructions](https://devcenter.heroku.com/articles/heroku-cli)

## Local Installation

1. Clone the repo locally (you've probably already done this).
2. Get accounts at all the above services.
3. Make a copy of the `sample.env` file called just `env`. This file will _never_ get pushed to Github, but you will use it to run locally with environment variables that would otherwise only be stored on Heroku.
4. Inside that file, paste your Geocodio and MongoLab environment variables.
# Into Rust

A website containing Rust tutorials. This repo contains the source
materials. It is divided into two main parts:

- `src` -- contains the jekyll sources for the website itself
- `docs` -- contains the **rendered jekyll sources** used for the GH Pages integration
- `keynote` -- contains the keynote sources for the slides

# Building the site

To preview the changes, do the following:

```
cd src
jekyll preview
```

To build the source, do the following steps:

```
cd src
jekyll build -d ../docs
```

To put the source live on `intorust.com`, commit your changes and push
to GH.

# License

All content is dual licensed under MIT and Apache. Please feel free to
give these presentations independently and spread the love of Rust. =)
All contributions imply consent to these licensing terms.

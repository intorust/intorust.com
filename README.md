# Into Rust

A website containing Rust tutorials. This repo contains the source
materials. It is divided into two main parts:

- `src` -- contains the jekyll sources for the website itself
- `docs` -- contains the **rendered jekyll sources** used for the GH Pages integration
- `keynote` -- contains the keynote sources for the slides

# Building the site

### Install jekyll, if you haven't already

To do anything, you will need jekyll installed. I am using
[rbenv](https://github.com/rbenv/rbenv). The Ruby version is commited
in `.ruby-version`. If you also use rbenv, you should be able to just
checkout the repository, change into the directory, and do something
like this (caveat: I am no expert on Ruby, gems, or bundler):

```
cd src
bundle install
```

### Previewing

To preview changes you are hacking on, do the following:

```
cd src
bundle exec jekyll serve
```

Then connect to `http://127.0.0.1:4000`. This will stay updated as you
tweak things, for the most part.

### Building and putting the sources live

`intorust.com` mirrors what is present in the `docs` directory using
GH Pages. So, to build the source, do the following steps:

```
cd src
jekyll build -d ../docs
```

This will update the `docs` directlry. Then you need to commit your
changes and push to GH.

# License

All content is dual licensed under MIT and Apache. Please feel free to
give these presentations independently and spread the love of Rust. =)
All contributions imply consent to these licensing terms.

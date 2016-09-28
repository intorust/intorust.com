---
layout: tutorial
title: Shared borrows
slug: shared borrows
description: Shared borrows
img: /assets/images/and.png
movie: https://www.youtube.com/embed/r6OXZh3SP2c
date: 2016.09.25
author: Nicholas D. Matsakis
exercises:
  - name: Shared borrows
    rust: _rust/20_sharing.rs
predecessors:
  - name: Ownership
    link: /tutorial/ownership
successors:
  - name: Mutable Borrows
    link: /tutorial/mutable-borrows
---

Continue from where the [ownership tutorial] left off. Learn how to
give temporary access to data with the `&` operator and `&T` types.

[ownership tutorial]: {% link _tutorials/10_Ownership.markdown %}

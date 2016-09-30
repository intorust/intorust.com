---
layout: tutorial
title: Mutable borrows
slug: mutable borrows
description: Mutable borrows
img: /assets/images/mut_and.png
youtube_id: pd7PJ6q4I3M
date: 2016.09.25
author: Nicholas D. Matsakis
time: 25min
exercises:
  - name: Mutable borrows
    rust: _rust/30_mutable_borrow.rs
    hint: |
      The syntax can be a bit tricky. If you like, [click here for a hint](/hint/mutable_borrow_1/).
predecessors:
  - name: Shared borrows
    link: /tutorial/shared-borrows
---

In the [shared borrows] tutorial, we learned that how to use shared
references (`&T`) to give temporary, read-only access to data. This
tuturial covers mutable references (`&mut T`), which allow the data to
be mutated while it is borrowed. This tutorial completes the tour of
Rust's ownership model.

[shared borrows]: {% link _tutorials/20_Shared_Borrows.markdown %}

# Intro slide

Hello and welcome to the "Into Rust" tutorial series. My name is
Nicholas Matsakis and I'll be your humble narrator today. I'm a member
of the core team and I've been working on Rust since around 2011.

"Into Rust" takes an *Ownership First* appraoch. Ownership is the core
idea that really makes Rust into *Rust*. It is also the part of Rust
that is most different from other languages, so it can take a little
getting used to.

This tutorial serves as a brief overview of Rust's syntax. It starts
with the traditional "Hello, World!" example and proceeds from there.
Before we do that, though, I'd like to take just a few minutes to give
you the "elevator pitch" for Rust. What makes Rust interesting?

# "Systems programming before Rust..."

Systems programming has long been one of those "great power, great
responsibility" tradeoffs. C and C++ give you the control you need to
get the most out of your computer, but they are very unforgiving.
Small mistakes can easily lead to catastrophic consequences: at best,
a crash, at worst, unexpeted behavior or a security
vulnerability. This is why systems program has come to have this aura
of being a superhero endeavor. This is where Rust comes in.

# "Hack without fear" slide

When you use Rust, you get access to those same capabilities that you
used to get with C or C++. But now, the compiler and language have got
your back. Those same kinds of smsall mistakes that once led to
segmentation faults now typically lead to compilation errors, so that
you can fix them up front.

If you're new to systems programming, that means Rust lets you get
things done without having to worry about small mistakes that will
come to bite you down the line.

But Rust is not just a beginner's tool. If you're an experienced
systems programmer, Rust serves as an enabler. Rust is making sure
you've got the mundane details right, so you can build cooler, more
powerful programs than ever before. Want to parallelize that inner
loop? No problem! Even better, if you -- or that new person you hired
who is still coming up to speed -- accidentally introduces a data-race
six months down the line, no problem. Rust will catch it for you.

I'm going to get to the main tutorial now. If'd you'd like to hear
more details about Why Rust Is Awesome, check out the Why Rust?
screencast on this same site.

# Hello World

All right, so let's get started! I'm going to start out with Hello
World and we'll see that just from this simple example we can branch
off into a lot of interesting questions about how Rust handles
memory management, safety, and so forth.

# In Rust...

Here is "Hello, World" in Rust. Now, rather than talk about this
program here on the slide, I want to take you over to this website.

# Exercises

We'll be going here throughout the tutorials to do exercises and so
forth. Go ahead and enter that URL into your browser and it should
take you over to this website.

# Rust tutorials website

Each of these headings corresponds to one of the exercises we are
going to do in this tutorial. So let's click on the first one.

# play

This takes me over to a website called `play`. `play` lets you edit
code and then execute it right away, in your browser. So here I have
hello world, and I can click and you see it prints "Hello,
world". Great!

So now let's take a look at the program itself. Rust, like C, begins
execution at a global function called `main`, which takes no
arguments. Inside there, it has some statements. This one is a call to
`println`. `println` is not a regular function. It's a *macro*. It
acts a lot like `printf` in C -- it composes and creates a string. I
say *composes* because you don't have to call it with a constant
string, you can actually give it placeholders.

So, for example, I might modify this to take a placeholder here.

```
edit to: "Hello, {}", "world"
```

and then I get the same output, but it was dynamically substituted.

Of course usually these values aren't all constants, we'd probably use
variables. So for example I can modify it to greet me by name by introducing
a variable called `name`:

```
let name = "Niko";
```

You see that in Rust you usually don't have to add type annotations
for variables yourself, the compiler can figure it out. Then I can
supply it and change `println` to print the value of the variable in
that spot:

```
println!("Hello, {}!", name);
```

OK, cool. What I'd like you all to do now is to take 5 minutes and go
through this exercise yourself, just to get your feet wet. Go to the
URL you see on your screen, select the "Hello, World" example, and
then edit it so that it greets *you* by name. Go ahead and come back
when you are done.

# play

OK, great, I'm going to guess you've done that by now, or decided that
you just can't wait to hear what else I have to say. Either way is
fine, let's keep going. I will say though I really recommend you do
the later exercises for sure, since I think it is very helpful for
really understanding what is happening.

Let's go a little future. We've declared some local variables, but
now I'd like to make a helper function called `greet` that can greet people
by name:

```rust
fn greet(name: String) {
    println("Hello, {}!", name);
}
```

Remember I told you that Rust can infer the types for local variables.
But we don't infer the types for function arguments and return types.
So at function boundary, type definitions and so forth, those are the
places where you find explicit type annotations. This helps not only
to make compilation more tractable, but also to make your code more
readable later.

So here I am saying I take one argument, it's a string, and I am
implicitly saying that I return nothing. If I wanted to return
something, I would type it like this:

```
fn greet(name: String) -> i32 {
```

Arrow then the type I want to return. This would mean I return a
32-bit integer. But I don't have anything to return right now, so we
can just leave that off.

OK, so this looks great -- but what happens when we run it. Huh! You
see we get a compilation error. As an aside, these little E0308
messages are called error codes -- often you can click on them and get
taken to a detailed message explaining how to fix a particular error.

But what's happening here anyway? Why are we getting a type mismatch
error? After all, we're supplying a string constant, and we said we're
expecting a string. The thing is, Rust takes allocation very
seriously.  What's happening here is that a constant string doesn't
require any allocation: it's a statically allocated value that's in
our executable automatically when we link it in, and hence it also
never needs to get freed. So to get a constant string, we just need to
have a pointer into that memory. But the capital `String` type is
actually a heap allocator buffer, kind of like `StringBuffer` in
Java. So we need to convert between the two by allocating some heap
memory and copying the string constant into it. One way to do that is
to call `String::from("Niko")`. But I often prefer to use this
`format!("Niko")` macro. It works exactly like `println!` -- so it can
take placeholders and so forth -- but it writes the result into a
memory buffer and returns it to you, rather than printing it to the
screen. So once we make this change, we can call `greet`, and things
will work.

> Click play. It works!

Now the type of this variable `name` is actually going to be a
heap-allocated string, like `String`. This has some advantages. For
example, we can now grow the string by calling `push_str`, which
pushes some more information on the end, such as my last name:

```
let mut name: String = format("Niko");
name.push_str(" Matsakis");
```

You'll notice I also declared the variable as `mut`. That's because in
Rust, local variables are immutable unless you declare otherwise. When
you say that a variable is `mut` then all the data in that variable
becomes mutable.

So let's go back to what we had before:

> delete the `name.push_str` call, but leave the `mut` keyword, click play

Ah, that's an interesting point. Note that if you declare something as
mutable, but you don't actually *mutate* it, Rust will warn you. We've
found that these sort of lints that detect small inconsistencies in
your program -- such as unused mutability, or unread variables, etc --
are often good indicators of bugs. For example, I commonly forget to
increment a counter when I am iterating, and that generally results in
a warning, since I declare the counter variable as being mutable, but
never modify it. So Rust tends to be a bit heavy on the warnings, but
over time I think you will find they prevent a lot of bugs. You can
actually turn these off by annotating your program.

OK, so, now that we have this heap-allocated string buffer, what would
happen if we wanted to greet ourselves twice? That's kind of the point
of making a helper method, right? So we can call it more than once?

If we execute this, now we get another compilation failure: "use of
moved value `name`". So what's going on here? Well this, it turns out,
has to do with the concept of **ownership**, which is really the
secret sauce that sets Rust apart from other languages. It is also the
topic of the next tutorial, so I encourage you to give that a listen!


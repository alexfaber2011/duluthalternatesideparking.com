# duluthalternsideparking.com

The repository for [duluthalternatesideparking.com](https://duluthalternatesideparking.com)

## What

Duluth's alternate side parking program is in effect all year and, from my understanding, there's no easy way to remember which side to park on.  I found myself constantly looking it up.  This website will tell you on which side of the street (even or odd house numbers) to park.

## Why?

I'm a software engineer living in Duluth, MN who needed a tiny pet project to work to overcome burnout.  I spend all day wrapped up in the [cruft](https://en.wikipedia.org/wiki/Cruft) of mobile, frontend, and backend web development and craved a project that was without superflous code (especially build code).  **My goal was to present alternate side parking information without anything extraneous.** The best machine is the one that completes the task with the fewest parts.

## Contributing

Perhaps this is too presumptious, but, in the event that someone is inspired to extend this project, please submit a pull request with a few things in mind...

1. No additional tooling
2. Nothing overly fancy that old-ish browsers can't handle
3. Have fun
  4. Be nice

### TODO

- [x] Fix Sunday logic
- [x] Add favicon so that, if folks save this to their mobile home screen, it looks nice
- [x] Add more information about the transition period between 4:00pm and 8:00pm on Sundays
- [x] Add schedule beyond October 2021
- [ ] (optional) Style a little more (_remember that thing about the "the best machine..." above in the "Why?" section?_) 

## Development & Preview

You can run the site locally without any build step:

```bash
# Python’s simple HTTP server (default, works everywhere)
python -m http.server 8000

# Or, if you have Node /npm installed, use `serve` for live‑reload
npx serve .
```

Open <http://localhost:8000> (or the port shown by `serve`) in your browser to see the page.

The project follows the conventions outlined in **AGENTS.md** – assets are snake_case, JavaScript uses modern ES6+ syntax, and the Service Worker now pre‑caches static assets for offline use.

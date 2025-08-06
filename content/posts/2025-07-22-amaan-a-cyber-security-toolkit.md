---
title: "Project Amaan, A Cyber Security Toolkit"
date: 2025-07-22
draft: false
---

# Project Amaan: A hub for Cyber Security Tools

![Project Amaan Shield Logo](/Kblog/images/project-amaan-shield.png)

The target was to locally host several cybersecurity tools in a single hub. Making everything Open Sourced, and Free to Use, it was not the easiest but I got there in the end.

## What It Actually Does

Project Amaan is a web-based cybersecurity toolkit that puts the essential tools you need in one clean interface. No more command-line gymnastics for basic tasks.

## The Technical Bits (For the Curious)

Built with React and TypeScript because I like my code to not break when I look at it sideways. Vite for building because life's too short for slow build tools. Tailwind for styling because utility classes just make sense.

The UI switches between dark and light themes because apparently that's important to people (dark mode gang, where you at?).

## Security Stuff (Obviously)

No sensitive data gets stored. API keys go in environment variables like civilized human beings. Built-in CORS protection and input validation because we're not animals.

The whole thing's stateless - spin up a container, use it, tear it down. Clean.

## Use Case

Look, this isn't going to replace your entire toolkit. It's not meant to. It's for when you need quick answers without the overhead. When you're in a meeting and someone asks "hey, has our domain been in any breaches?" and you can have an answer in thirty seconds instead of five minutes.

## What's Next?

I've got ideas. More encoding formats, additional network tools, maybe some basic vulnerability scanning. But the core principle stays the same: useful tools, clean interface, minimal friction. There is an idea to adapt more to be used for up and coming CTF's.

If you're doing security research, pen testing, or just curious about this stuff, give it a spin. It's open source, so if something's missing or broken, you know what to do.

## Links:

* [GitHub Repository](https://github.com/kbinkenaid/project-amaan-webapp)
* [DockerHub](https://hub.docker.com/r/kbinkenaid/project-amaan-webapp)
* [Issues & Feedback](https://github.com/kbinkenaid/project-amaan-webapp/issues)

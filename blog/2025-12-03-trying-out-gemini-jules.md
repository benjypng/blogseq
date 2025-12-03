---
title: Trying out Gemini Jules
authors: [benjypng]
---

My OpenAI subscription was ending, and given the recent hype around Nano Banana Pro, I decided to switch over to Gemini. I've never heard of [Jules](https://jules.google.com) but since I am in the midst of documenting my plugins better, I decided to give it a try.

### Aim

See if it is any good at doing up `README`s for my plguins.

### Setting Up

1. Sign up for a paid Gemini account
2. Navigate to https://jules.google.com
3. Connect GitHub account
4. Select plugin repository
5. Prompt Jules to create a `README`

### Results

It started off by trying to run `npm run build`, which failed for some reason. It then tried `npm run install` and then `npm run build`. But since it has no Logseq instance to attach to, I doubt that it will have been any useful. But it then started suggesting changes to the existing `README`, and proposed a [PR](https://github.com/benjypng/logseq-mediatimestamp-plugin/pull/1). I okay-ed and it proceeded to create a branch for the PR and inserted a comment:

```
👋 Jules, reporting for duty! I'm here to lend a hand with this pull request.

When you start a review, I'll add a 👀 emoji to each comment to let you know I've read it. I'll focus on feedback directed at me and will do my best to stay out of conversations between you and other bots or reviewers to keep the noise down.

I'll push a commit with your requested changes shortly after. Please note there might be a delay between these steps, but rest assured I'm on the job!

For more direct control, you can switch me to Reactive Mode. When this mode is on, I will only act on comments where you specifically mention me with @jules. You can find this option in the Pull Request section of your global Jules UI settings. You can always switch back!

For security, I will only act on instructions from the user who triggered this task.

New to Jules? Learn more at jules.google/docs.
```

Since it is just a `README`, I went ahead to merge the PR and the final result is as per below. Interestingly, it even generated shields for the README. Some parts are not entirely accurate, but I would say it did a pretty good job. Will definitely continue to try it out.

*You can compare the [current version](https://github.com/benjypng/logseq-mediatimestamp-plugin/blob/main/README.md) with the previous commit [here](https://github.com/benjypng/logseq-mediatimestamp-plugin/blob/cd75b7b1a915857d11be6a214d32e88d7fb2e1ea/README.md).*

---
title: Logseq updates
date: Sat Dec 06 2025 00:00:00 GMT+0800 (Singapore Standard Time)
---


Across the different platforms (Discord, Reddit, X, Discourse), Discord appears to be the most active. It is also where the team engages most frequently with users. Because activity on the other platforms is comparatively low, it can give the impression that there is limited communication from the developers. However, Logseq remains active as an open-source project, and recent commits on the [master branch](https://github.com/logseq/logseq/commits/master/) continue at a steady pace.

Below are a few updates shared on Discord over the past week that I found noteworthy.

RTC and iOS updates

ZhiYuan mentioned that an [update](https://discord.com/channels/725182569297215569/725182570131751005/1446517435103449260) for RTC and the iOS app is expected soon. At this point, only early testers are using RTC and the rewritten iOS app, and they are aware of the associated instability and data-loss risks. Based on the discussion, it appears that broader availability may be under consideration, though the details are not yet confirmed.

Assets-related improvements

My [Zotero plugin](https://github.com/benjypng/logseq-zoterolocal-plugin) currently cannot open PDFs outside the graph within Logseq; they default to the system viewer. Charlie is working on an [existing PR](https://github.com/logseq/logseq/pull/12244) that addresses this limitation. If merged, this may improve how external assets are handled.

Notes on development approach

There was a brief discussion between futurized (a former team member) and Tienson regarding architectural direction. It offered some insight into how the team may be thinking about Logseq beyond a conventional note-taking workflow. Tienson commented:

> Yes, the core components will help a lot. I believe Logseq db has the most flexible data model so that users can build any frontend on top of it. It's just that there're still a lot work to do, we need to separate logic from ui, remove outdated code, but still, it's the most exciting time for personal software.

From my own experience building plugins, the development environment does feel more stable than before, and the data layer is becoming more accessible.

I plan to continue posting periodic updates here for readers who are not active on Discord but want visibility into ongoing developments.
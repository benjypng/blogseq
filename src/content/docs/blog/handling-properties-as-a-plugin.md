---
title: Handling properties as a plugin
date: Thu Dec 11 2025 00:00:00 GMT+0800 (Singapore Standard Time)
---


A Zotero-local plugin user was facing issues with the plugin on an existing graph, and when the plugin was still in active development. After some patient rounds of troubleshooting by the user, I suspected that it may be due to properties created by the plugin previously.

One of the good things introduced by Logseq DB are properties where the type  can be pre-defined. This doesn’t need to be used together with tags, but you can if you want to. The benefit of having fixed types is  a more structured graph for the user.

The zoterolocal plugin uses properties heavily and part of setting up the plugin is to pre-define the types for the properties. Hence, as part of the troubleshooting, I was trying to find a way to isolate the created properties so that I could remove them.

When a plugin creates a property, it associates the property with the plugin through the `ident` property of the object. You can see this when you use:

```TypeScript
await logseq.Editor.getAllProperties()
```

It appears that the `ident` property follows this structure: `:plugin.property..<plugin-name>`. By filtering out the properties with this `ident`, you can isolate the properties created by the specified plugin.

Next, is to remove these properties. I tried:

```TypeScript
await logseq.Editor.removeProperty()
```

But it doesn’t appear to apply to DB properties. And I realised that since each property is actually its own page, removing the page should work. Hence, using the below API does work in removing them.

```TypeScript
await logseq.Editor.deletePage()
```

Interestingly, Logseq automatically blocks the deletion of built-in properties so when trying to do so, there will be an error `Built-in page cannot be deleted`. This is when I realised that Logseq and Zotero both use the `code` and `‘tags` properties, and they must be handled differently. For the plugin, I have mapped `‘code` to `zotero-code`. The use of tags are the same for both Logseq and the plugin so I didn’t remap it.
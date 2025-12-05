---
title: Creating the logseq-mediaplayer-plugin
authors: [benjypng]
---

A user on Discord asked about an older plugin that allows a user to insert timestamps for their own uploaded videos. This is natively available for embedded YouTube videos, but not uploaded files.

I can't recall what was the older plugin, but given that locally uploaded media files are rendered in HTML, it should be relatively straightforward to derive and set the `currentTime` through the DOM.

### Scaffolding

The plugin SDK has been updated to `v0.2.8`. I've also decided to use `npm` instead of `pnpm` for development due to stability purposes.

<!--truncate-->

### Approach

There should be 2 main features for the plugin:

1. Inserting timestamps
2. Retrieving timestamps

The most straightforward way (in my mind), is to access the DOM, and manipulate the `<video>` element directly. For simplicity, the plugin will have to be opinionated in how it inserts timestamps. **Timestamps must be created as child blocks of the parent block where the video was inserted**. The plugin can then simply query the parent block when the user triggers a slach command to insert the timestamp.

After getting the `uuid` of the parent block, the plugin can use a `querySelector` to query the element since all blocks in logseq have a `div id` in the pattern `ls-block-<uuid>`. From here, it was relatively straightforward to obtain the `currentTime`.

In order for the user to navigate to a specific time in the video, the user will need to either click on a link or a button. In this case, a link will not be suitable since it is not trivial to use the link to manipulate a DOM element. Hence, I decided to use a button instead. This necessitated the use of `onMacroRendererSlotted` to render the button and assign a function to it. Once again, this is relatively straightforward with the API, since it allows user-defined values to be passed as function arguments.

### Conclusion

The plugin was created quite quickly since the features are straightforward. To try it out, you may download the [release](https://github.com/benjypng/logseq-mediatimestamp-plugin/releases) and manually load it in Logseq.

### Caveat

Publishing plugins to the Logseq marketplace requires defining a `manifest.json`. For plugins that access the Logseq DOM, instead of just the sandbox iframe, it requires adding `effect: true`. I am not sure if this is the case still as I have not tried publishing this plugin to the marketplace yet. 

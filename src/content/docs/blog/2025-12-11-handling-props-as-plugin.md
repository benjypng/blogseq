---
title: Handling properties as a plugin  
date: 2025-12-11
---

A zoterolocal plugin user encountered issues when using the plugin on an existing graph, at a time when the plugin was still under active development. After several rounds of patient troubleshooting by the user, I suspected the issue might be related to properties that had been created by earlier versions of the plugin.

<!--truncate-->

One of the improvements introduced with Logseq DB is typed properties, where a property’s type can be pre-defined. These do not need to be used together with tags, though they can be. The main benefit is a more structured and predictable graph.

The zoterolocal plugin relies heavily on properties, and part of its setup involves pre-defining property types. As part of the troubleshooting process, I needed a way to isolate the properties created by the plugin so that they could be safely removed.

When a plugin creates a property, Logseq associates that property with the plugin via the `ident` field on the property object. This can be inspected by calling `await logseq.Editor.getAllProperties()`.

From inspection, the `ident` field appears to follow the structure `:plugin.property..<plugin-name>`. By filtering properties using this pattern, it is possible to isolate those created by a specific plugin.

The next step was to remove these properties. I initially tried `await logseq.Editor.removeProperty()`, but this does not appear to apply to DB properties.

Since each property is represented internally as its own page, deleting the corresponding page works as expected. Using `await logseq.Editor.deletePage()` successfully removes these properties.

Logseq automatically prevents deletion of built-in properties. Attempting to do so results in the error `Built-in page cannot be deleted`. This surfaced an overlap between Logseq and Zotero, as both use the `code` and `tags` properties.

For the plugin, I remapped `code` to `zotero-code` to avoid conflicts. The `tags` property is shared between Logseq and the plugin, so it was left unchanged.

Managing typed properties in Logseq DB requires plugin authors to account for how properties are created, identified, and removed over time. Clear namespacing and an understanding of built-in property constraints help reduce unintended conflicts when plugins evolve or are used on existing graphs.

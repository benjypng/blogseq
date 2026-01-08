---
title: Simulating the mutation observer
date: Mon Dec 15 2025 00:00:00 GMT+0800 (Singapore Standard Time)
---


The `logseq-datenlp-plugin` makes use of a `MutationObserver` in order to detect when to start parsing a block for any date related phrases using natural language processing (NLP). With the observer, the plugin is able to only parse when the user creates a new block, by pressing `Enter`. However, this requires monitoring the DOM, and within the plugin sandbox, this is not ideal.

I was fiddling around with other approaches during the holidays, and found an approach that I am sufficiently pleased with.

Logseq's API provides many ways to monitor changes in the app, whether it is at the DB level or user interaction level. The closest API to an observer will be the `DB.onChanged` hook. It allows the plugin to hook into any DB level changes.

By using `txMeta.outlinerOp`, the plugin can monitor for specific changes, such as when a block is saved or when a block is added; with the latter being the closest to what we need.

My initial implementation (below) involved parsing the block each time it is saved, and then only update the block when the user inserts new blocks. While this approach worked, if the user presses `Enter` too quickly after typing the content in the block, the parsing does not fire because transactions are batched.

```typescript
let content = ''
let targetBlkUuid = ''
switch (txMeta.outlinerOp) {
  case 'save-block': {
    const newContent = await parse.inlineParsing(blocks[0])
    if (newContent) {
      content = newContent
      targetBlkUuid = blocks[0].uuid
    }
    break
  }
  case 'insert-blocks':
    await logseq.Editor.updateBlock(targetBlkUuid, content)
    break
}
```

I tried other approaches, but could not get them to work. Strangely, when I got up in the middle of the night to go to the bathroom, I suddenly thought of a much simpler approach. What if I grab the UUID of the block **when** it is inserted, and then immediately grab the previous sibling. So I landed on the implementation below:

```typescript
switch (txMeta.outlinerOp) {
case 'insert-blocks': {
  const currBlkUuid = await logseq.Editor.checkEditing()
  if (!currBlkUuid) return
- const prevSiblingBlk = await logseq.Editor.getPreviousSiblingBlock(
    currBlkUuid as string,
  )
  if (!prevSiblingBlk) return
- const newContent = await parse.inlineParsing(prevSiblingBlk)
  if (newContent) {
    await logseq.Editor.updateBlock(prevSiblingBlk.uuid, newContent)
  }
  break
}
}
```

With the above, I am able to simulate the `MutationObserver` without any lag. I have since migrated the `logseq-datenlp-plugin` to the above approach and removed the need to monitor the DOM.
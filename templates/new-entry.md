<%*
const input = await tp.system.prompt("Enter slug (e.g. my-first-post)");
if (!input) {
  new Notice("Canceled: slug is empty");
  tR += "Canceled.";
  return;
}
const slug = input.trim();

const folderPath = `content/blog/${slug}`;

try {
  if (!app.vault.getAbstractFileByPath(folderPath)) {
    await app.vault.createFolder(folderPath);
  }
} catch (e) {
}

const targetPath = `${folderPath}/index`;

// 現在のノートを移動（＝このテンプレートを適用したノートが移動されます）
await tp.file.move(targetPath);

// この後のテンプレート内で使えるように slug を残す
tR += "";
_%>
---
date: <% tp.date.now("YYYY-MM-DD") %>
---

# <% slug %>

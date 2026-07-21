const fields = ['token', 'owner', 'repo', 'path', 'branch'];
const $ = id => document.getElementById(id);
const webext = globalThis.browser ?? globalThis.chrome;

webext.storage.sync.get(fields).then(cfg => {
  fields.forEach(f => { if (cfg[f]) $(f).value = cfg[f]; });
  if (!$('path').value) $('path').value = 'links.json';
  if (!$('branch').value) $('branch').value = 'main';
});

$('save').onclick = async () => {
  const cfg = {};
  fields.forEach(f => cfg[f] = $(f).value.trim());
  await webext.storage.sync.set(cfg);
  $('status').textContent = 'Saved ✓';
  setTimeout(() => $('status').textContent = '', 1500);
};

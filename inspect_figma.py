import re
import json

html_path = r'C:\Users\Asus\.gemini\antigravity\brain\c4a4778e-892c-4e07-b246-bcf009750687\.system_generated\steps\249\content.md'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Search for initial options or node data in JSON
json_starts = [m.start() for m in re.finditer(r'data-initial', content)]
print(f"Found {len(json_starts)} initial JSON tags")

for idx, start in enumerate(json_starts):
    sub = content[start:start+5000]
    # find json substring
    m = re.search(r'\{.*\}', sub)
    if m:
        print(f"--- JSON {idx} ---")
        print(m.group(0)[:500])

# Search for any occurrences of Task, Board, Theme, Light, Dark, Sidebar, Column, Priority, Due Date, Guest, etc.
keywords = ['Theme', 'theme', 'Light', 'Dark', 'Task', 'Board', 'List', 'Kanban', 'Guest', 'Caseload', 'Take Data']
for kw in keywords:
    count = content.count(kw)
    print(f"Keyword '{kw}': {count} occurrences")

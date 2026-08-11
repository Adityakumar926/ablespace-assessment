import urllib.request
import json

# Try different node IDs or embed parameters
node_ids = ['0-1', '0:1', '1:2', '1:3', '1:4', '1:5', '1:10', '1:20', '1:50', '1:100', '2:2']

for nid in node_ids:
    url = f'https://www.figma.com/api/oembed?url=https://www.figma.com/design/obONCFmoTFN27V5H9PHS2X/Assessment-Task?node-id={nid}'
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            title = data.get('title')
            thumb = data.get('thumbnail_url')
            print(f"Node {nid}: Title='{title}' Thumb={thumb[:80] if thumb else None}")
    except Exception as e:
        print(f"Node {nid}: Failed - {e}")

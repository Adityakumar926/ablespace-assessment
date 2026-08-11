import urllib.request
import json

# Try requesting oembed without node-id or with different node formats
urls_to_test = [
    'https://www.figma.com/design/obONCFmoTFN27V5H9PHS2X/Assessment-Task',
    'https://www.figma.com/file/obONCFmoTFN27V5H9PHS2X/Assessment-Task',
    'https://www.figma.com/design/obONCFmoTFN27V5H9PHS2X',
]

for url in urls_to_test:
    api_url = f'https://www.figma.com/api/oembed?url={url}'
    try:
        req = urllib.request.Request(api_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            print('URL:', url)
            print('Title:', data.get('title'))
            print('Thumbnail:', data.get('thumbnail_url'))
            print('Folder:', data.get('folder_name'))
            print('-'*40)
    except Exception as e:
        print('Error for', url, ':', e)

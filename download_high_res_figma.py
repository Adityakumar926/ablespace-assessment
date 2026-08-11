import urllib.request

thumb_url = "https://api-cdn.figma.com/resize/thumbnails/58b4e183-193f-4c4c-ba8c-fc97ea5645d3?expiration=1786924800&signature=cd5a6aabd1dc3e3b33a4bdfe72a8df09b58f492904a1f51af478e0fcf3e9fc5b&height=2000&bucket=figma-alpha"

req = urllib.request.Request(thumb_url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as resp:
        with open(r'C:\Users\Asus\Desktop\job_aiml\AbleSpace\figma_canvas_highres.png', 'wb') as f:
            f.write(resp.read())
    print("DOWNLOADED HIGH-RES CANVAS SUCCESSFULLY!")
except Exception as e:
    print("Failed highres download:", e)

import os, json

folders = [
    "assets/images/kente",
    "assets/images/general",
    "assets/images/clothing"
]

out = {}

for folder in folders:
    cat = os.path.basename(folder)
    if not os.path.exists(folder):
        print(f"⚠️ Folder not found: {folder}")
        continue
    files = sorted([
        os.path.join(cat, f)
        for f in os.listdir(folder)
        if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))
    ])
    out[cat] = files

with open('images-list.json', 'w') as f:
    json.dump(out, f, indent=2)

print("✅ images-list.json created successfully!")

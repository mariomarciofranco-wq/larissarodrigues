from PIL import Image
import os

img_dir = r'E:\apps\Sites-Clientes\larissa-rodrigues\imagens'

# 1. Convert larissa.png to webp
larissa = os.path.join(img_dir, 'larissa.png')
if os.path.exists(larissa):
    img = Image.open(larissa)
    out = os.path.join(img_dir, 'larissa.webp')
    img.save(out, 'WEBP', quality=85)
    print(f'larissa.webp: {os.path.getsize(out)} bytes')

# 2. Convert endolaser files
for fname in ['endolaser01.heic', 'endolaser02.heic', 'endolaser03.heic']:
    src = os.path.join(img_dir, fname)
    dst = os.path.join(img_dir, fname.replace('.heic', '.webp'))
    if os.path.exists(src):
        img = Image.open(src)
        img.save(dst, 'WEBP', quality=90)
        print(f'{fname} -> {os.path.basename(dst)}: {os.path.getsize(dst)} bytes')

# 3. Handle the long-named file
for f in os.listdir(img_dir):
    if f.startswith('O Endolaser'):
        src = os.path.join(img_dir, f)
        dst = os.path.join(img_dir, 'endolaser-procedure.webp')
        img = Image.open(src)
        img.save(dst, 'WEBP', quality=90)
        print(f'long-name -> endolaser-procedure.webp: {os.path.getsize(dst)} bytes')

print('\nAll files:')
for f in sorted(os.listdir(img_dir)):
    if f == 'convert.py': continue
    fp = os.path.join(img_dir, f)
    print(f'{f:40s} {os.path.getsize(fp):>8,} bytes')

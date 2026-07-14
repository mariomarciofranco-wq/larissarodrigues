from PIL import Image
import os
d = r'E:\apps\Sites-Clientes\larissa-rodrigues\imagens'

src_hero = os.path.join(d, 'hero.png')
if os.path.exists(src_hero):
    img = Image.open(src_hero)
    out = os.path.join(d, 'hero.webp')
    img.save(out, 'WEBP', quality=85)
    print(f'hero.webp: {os.path.getsize(out)} bytes')

src_og = os.path.join(d, 'og.png')
if os.path.exists(src_og):
    img = Image.open(src_og)
    out = os.path.join(d, 'og.jpg')
    img = img.convert('RGB')
    img.save(out, 'JPEG', quality=85)
    print(f'og.jpg: {os.path.getsize(out)} bytes')

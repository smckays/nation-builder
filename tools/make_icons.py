# Draws the Nation Builder app icon: a cream card (red band, little house) and a gold meeple on green felt.
# Rendered at 2048px and downscaled for smooth edges.
import math, sys, os
from PIL import Image, ImageDraw, ImageFilter, ImageOps, ImageChops

OUT = sys.argv[1]
N = 2048                      # working size; all design units below are on a 512 grid
K = N / 512
CREAM=(251,246,236); INK=(34,32,28); RED=(200,72,58); GOLD=(224,166,58); GOLD_D=(176,124,36)

def felt():
    # radial gradient centred a little above the middle: light felt to dark edges
    g = Image.radial_gradient('L').resize((int(N*1.6), int(N*1.6)), Image.BICUBIC)
    off = (int(N*.8 - N*.5), int(N*.8 - N*.38))
    g = g.crop((off[0], off[1], off[0]+N, off[1]+N))
    return ImageOps.colorize(g, black=(63,117,96), mid=(47,90,70), white=(22,46,35), midpoint=90).convert('RGBA')

def s(v): return v*K
def box(x0,y0,x1,y1): return [s(x0),s(y0),s(x1),s(y1)]

def card_layer():
    L = Image.new('RGBA', (N,N), (0,0,0,0)); d = ImageDraw.Draw(L)
    d.rounded_rectangle(box(118,92,342,396), radius=s(26), fill=CREAM)
    d.rounded_rectangle(box(136,110,324,378), radius=s(14), outline=INK, width=int(s(8)))
    # red band across the top of the inner frame
    band = Image.new('L', (N,N), 0); bd = ImageDraw.Draw(band)
    bd.rounded_rectangle(box(140,114,320,374), radius=s(11), fill=255)
    cut = Image.new('L', (N,N), 0); ImageDraw.Draw(cut).rectangle(box(0,0,512,172), fill=255)
    band = ImageChops.darker(band, cut)
    L.paste(Image.new('RGBA',(N,N),RED+(255,)), (0,0), band)
    d.line([*map(s,(136,172)),*map(s,(324,172))], fill=INK, width=int(s(7)))
    # little house
    d.polygon([tuple(map(s,p)) for p in [(186,330),(186,272),(230,238),(274,272),(274,330)]], fill=CREAM, outline=INK, width=int(s(7)))
    d.line([tuple(map(s,p)) for p in [(170,276),(230,228),(290,276)]], fill=RED, width=int(s(14)), joint='curve')
    for p in [(170,276),(290,276)]: d.ellipse(box(p[0]-7,p[1]-7,p[0]+7,p[1]+7), fill=RED)
    d.rectangle(box(220,296,240,330), fill=INK)
    d.line([*map(s,(166,330)),*map(s,(294,330))], fill=INK, width=int(s(7)))
    return L

def card_shadow():
    L = Image.new('RGBA', (N,N), (0,0,0,0))
    ImageDraw.Draw(L).rounded_rectangle(box(128,108,352,412), radius=s(26), fill=(0,0,0,110))
    return L.filter(ImageFilter.GaussianBlur(s(9)))

def meeple_points(ox, oy, sc):
    # tabletop meeple body: M6 38 L8 22 Q18 16 28 22 L30 38 Z (36x40 box)
    pts=[(6,38),(8,22)]
    for i in range(1,16):
        t=i/16; x=(1-t)**2*8+2*(1-t)*t*18+t*t*28; y=(1-t)**2*22+2*(1-t)*t*16+t*t*22; pts.append((x,y))
    pts += [(28,22),(30,38)]
    return [(s(ox+x*sc), s(oy+y*sc)) for x,y in pts], (s(ox+18*sc), s(oy+9*sc), s(7*sc))

def meeple_layer(color, ox=268, oy=226, sc=5.2):
    L = Image.new('RGBA', (N,N), (0,0,0,0)); d = ImageDraw.Draw(L)
    body, (cx,cy,r) = meeple_points(ox, oy, sc)
    d.polygon(body, fill=color); d.ellipse([cx-r,cy-r,cx+r,cy+r], fill=color)
    return L

def compose(scale, rounded):
    art = Image.new('RGBA', (N,N), (0,0,0,0))
    sh = card_shadow().rotate(9, center=(s(240),s(250)), resample=Image.BICUBIC)
    art.alpha_composite(sh)
    art.alpha_composite(card_layer().rotate(9, center=(s(240),s(250)), resample=Image.BICUBIC))
    msh = meeple_layer((0,0,0,120), ox=276, oy=236).filter(ImageFilter.GaussianBlur(s(8)))
    art.alpha_composite(msh)
    art.alpha_composite(meeple_layer(GOLD_D+(255,), ox=270, oy=230))
    art.alpha_composite(meeple_layer(GOLD+(255,)))
    if scale != 1:
        sz = int(N*scale); small = art.resize((sz,sz), Image.LANCZOS)
        art = Image.new('RGBA', (N,N), (0,0,0,0)); art.alpha_composite(small, ((N-sz)//2, (N-sz)//2))
    img = felt(); img.alpha_composite(art)
    if rounded:
        m = Image.new('L', (N,N), 0); ImageDraw.Draw(m).rounded_rectangle([0,0,N-1,N-1], radius=int(N*.22), fill=255)
        img.putalpha(m)
    return img

variants = {
  'icon-512.png':          (compose(0.92, True), 512),
  'icon-192.png':          (compose(0.92, True), 192),
  'favicon-32.png':        (compose(0.98, True), 32),
  'icon-maskable-512.png': (compose(0.74, False), 512),
  'apple-touch-icon.png':  (compose(0.84, False), 180),
}
for name,(img,size) in variants.items():
    out = img.resize((size,size), Image.LANCZOS)
    if name=='apple-touch-icon.png': out = out.convert('RGB')   # iOS wants no transparency
    out.save(os.path.join(OUT,name), optimize=True)
    print(name, size, os.path.getsize(os.path.join(OUT,name)), 'bytes')

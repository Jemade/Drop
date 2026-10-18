"""Render Drop's labelled guided walkthrough. Requires Pillow and FFmpeg.
This is an illustrated product explainer, not a screen recording.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
import subprocess, math
ROOT=Path(__file__).resolve().parents[1];ASSETS=ROOT/'public/assets'
W,H,FPS,DURATION=1280,720,24,30
INK='#18191d';BLUE='#2348e8';CORAL='#ff765d';PAPER='#f7f5ef';MUTED='#858b9c';LINE='#e5e8f0'
fonts={}
def font(size,bold=False):
 key=(size,bold)
 if key not in fonts:fonts[key]=ImageFont.truetype(str(ASSETS/('space-bold.ttf' if bold else 'dm-regular.ttf')),size)
 return fonts[key]
def text(d,xy,s,size=18,color=INK,bold=False):d.text(xy,s,font=font(size,bold),fill=color)
def box(d,xy,fill='white',outline=None,r=8):d.rounded_rectangle(xy,radius=r,fill=fill,outline=outline,width=1)
def logo(d,x,y,scale=.5):
 # Same geometry as the original SVG wordmark.
 def rect(a):return tuple(round((x if i%2==0 else y)+v*scale) for i,v in enumerate(a))
 d.rectangle(rect((43,0,59,76)),fill=BLUE);d.ellipse(rect((4,24,58,78)),fill=BLUE);d.ellipse(rect((19,39,43,63)),fill='white')
 d.rectangle(rect((72,25,88,76)),fill=BLUE);d.arc(rect((74,24,118,68)),185,290,fill=BLUE,width=max(1,round(16*scale)))
 d.ellipse(rect((116,24,170,78)),fill=BLUE);d.polygon([(x+137*scale,y+38*scale),(x+137*scale,y+63*scale),(x+157*scale,y+50.5*scale)],fill='white')
 d.rectangle(rect((182,26,198,102)),fill=BLUE);d.ellipse(rect((180,24,234,78)),fill=BLUE);d.ellipse(rect((195,39,219,63)),fill='white');d.ellipse(rect((241,61,257,77)),fill=CORAL)
photo=Image.open(ASSETS/'camera.jpg').convert('RGB')
steps=[('Upload your content.','Choose a file from your device. It stays in this browser.'),('Give it a new format.','Choose a crop. Add your brand and your own captions.'),('Take a second look.','Save a draft and use your personal review checklist.'),('Export. Then make a plan.','Download the file and add a reminder for manual publication.')]
def photo_at(im,rect):
 x,y,x2,y2=rect;im.paste(ImageOps.fit(photo,(x2-x,y2-y),centering=(.5,.5)),(x,y))
def cursor(d,x,y):
 d.polygon([(x,y),(x+5,y+22),(x+10,y+15),(x+20,y+16)],fill='white',outline=INK,width=2)
 d.ellipse((x-12,y-12,x+24,y+24),outline=CORAL,width=2)
def workspace(im,scene,t):
 d=ImageDraw.Draw(im);box(d,(38,135,1242,645),'#f7f8fc',LINE,10);d.rectangle((39,146,223,634),fill='white');d.line((223,145,223,635),fill=LINE);logo(d,62,156,.42)
 text(d,(64,224),'COREBRIDGE',11,MUTED,True)
 nav=['Media library','Studio','Calendar','Research','Workflows','Approvals','Connections'];active=[0,1,5,2][scene]
 for i,n in enumerate(nav):
  yy=253+i*40
  if i==active:box(d,(53,yy-4,208,yy+28),'#edf1ff',None,4)
  d.rectangle((66,yy+6,74,yy+14),outline=BLUE if i==active else '#a6adbe',width=1);text(d,(87,yy),n,13,BLUE if i==active else MUTED)
 d.line((224,191,1230,191),fill=LINE);text(d,(250,158),'Your workspace   /   '+nav[active],12,MUTED);text(d,(1035,158),'Saved on this device',11,MUTED)
 if scene==0:
  text(d,(252,211),'Your library',27,INK,True);text(d,(253,250),'The raw material for your next good idea.',12,MUTED)
  box(d,(1061,214,1207,250),BLUE);text(d,(1076,222),'+ Upload content',12,'white')
  photo_at(im,(252,287,536,474));d=ImageDraw.Draw(im);box(d,(252,474,536,560),'white',LINE,0);text(d,(267,491),'Drop example — camera.jpg',13,INK,True);text(d,(267,515),'IMAGE  ·  Example content',11,MUTED);box(d,(267,536,344,560),'white',LINE,4);text(d,(278,540),'Prepare',11,BLUE)
  box(d,(565,287,1205,560),'white',LINE,6);text(d,(604,340),'Your next creation starts here.',25,INK,True);text(d,(605,387),'Images, video and audio in one personal library.',13,MUTED);text(d,(605,423),'Choose Prepare to open a file in the studio.',13,BLUE)
  pos=(1100,231) if t<2 else (313,545);cursor(d,*pos)
 elif scene==1:
  text(d,(252,208),'Prepare your content',26,INK,True);box(d,(252,255,792,604),'#edf0f8',LINE,5);photo_at(im,(424,272,599,582));d=ImageDraw.Draw(im);d.rectangle((438,286,563,310),fill=BLUE);text(d,(447,291),'COREBRIDGE',10,'white',True);box(d,(434,505,589,553),'#18191d',None,3);text(d,(447,514),'Make something',13,'white');text(d,(446,532),'worth sharing.',13,'white')
  text(d,(821,260),'Make it fit.',20,INK,True)
  for i,r in enumerate(['9:16','1:1','16:9']):
   xx=823+i*123;box(d,(xx,305,xx+107,361),'#f0f3ff' if i==0 else 'white',BLUE if i==0 else LINE,4);text(d,(xx+33,323),r,14,BLUE if i==0 else MUTED)
  text(d,(823,385),'YOUR BRAND',10,MUTED,True);box(d,(823,411,1176,448),'white',LINE,4);text(d,(835,421),'Corebridge',13)
  text(d,(823,470),'CAPTION · 0 TO 10 SECONDS',10,MUTED,True);box(d,(823,495,1176,547),'white',LINE,4);text(d,(835,510),'Make something worth sharing.',12)
  box(d,(823,567,1176,602),BLUE);text(d,(959,576),'Save draft',12,'white');cursor(d,862+min(t,3)*80,331 if t<3 else 517)
 elif scene==2:
  text(d,(252,211),'Approvals',27,INK,True);text(d,(253,251),'Your personal review checklist.',13,MUTED)
  box(d,(252,294,1205,389),'white',LINE,5);text(d,(276,314),'Camera / portrait preparation',17,INK,True);text(d,(276,348),'9:16 · Brand and captions checked',12,MUTED)
  approved=t>2.7;box(d,(1001,317,1177,359),'#eaf3f0' if approved else BLUE,None,5);text(d,(1020,329),'Approved locally' if approved else 'Approve draft',12,'#477d68' if approved else 'white')
  text(d,(277,431),'A moment to check the details.',25,INK,True);text(d,(277,481),'Review the crop, caption timing and brand before you export.',14,MUTED);text(d,(277,520),'Team invitations are not connected in this preview.',12,MUTED);cursor(d,1100,341)
 else:
  text(d,(252,211),'Calendar',27,INK,True);text(d,(253,251),'A publication plan. Not an automatic publishing queue.',12,MUTED)
  box(d,(252,294,1205,401),'white',LINE,5);d.rectangle((252,302,255,393),fill=BLUE);text(d,(277,311),'20',31,BLUE,True);text(d,(279,352),'OCT',10,MUTED);text(d,(353,315),'Give your idea a new perspective',18,INK,True);text(d,(354,351),'Instagram · Publishing reminder · Manual publication',12,MUTED);box(d,(1074,321,1177,361),'white',LINE,4);text(d,(1093,333),'.ics',13,BLUE)
  box(d,(252,440,713,585),'#edf1ff',None,5);text(d,(274,462),'Prepared file downloaded.',21,BLUE,True);text(d,(274,503),'PNG for an image. Browser video format for a clip.',12,MUTED);text(d,(274,535),'Publish it through your chosen platform.',12,INK)
  box(d,(738,440,1205,585),'#fff0e8',None,5);text(d,(760,462),'Keep your next step clear.',21,'#aa5e43',True);text(d,(760,503),'Export a reminder to your own calendar.',12,MUTED);text(d,(760,535),'Direct social publishing is still in development.',12,INK);cursor(d,1115,345)
 d=ImageDraw.Draw(im);text(d,(64,617),'Powered by corebridge.co.zw',9,MUTED)

def frame(t):
 im=Image.new('RGB',(W,H),PAPER);d=ImageDraw.Draw(im)
 if t<3 or t>=27:
  logo(d,519,96,.95);text(d,(236,286),'Good content. Another life.',56,INK,True)
  text(d,(321,379),'Research. Prepare. Review. Plan.',29,BLUE)
  text(d,(423,464),'Try it with your own content.' if t>=27 else 'A quick look at the Drop workspace.',22,MUTED)
  text(d,(436,608),'Powered by corebridge.co.zw',20,INK)
 else:
  n=min(3,int((t-3)//6));local=(t-3)%6;text(d,(39,32),f'0{n+1} / {steps[n][0]}',35,INK,True);text(d,(40,86),steps[n][1],18,MUTED);workspace(im,n,local)
 d=ImageDraw.Draw(im);d.rectangle((0,703,W,720),fill='#e8e6dd');d.rectangle((0,703,int(W*t/DURATION),720),fill=BLUE);text(d,(40,669),'GUIDED WALKTHROUGH  /  ILLUSTRATIVE EXAMPLE CONTENT',10,MUTED)
 return im
out=ASSETS/'drop-demo.mp4'
cmd=['ffmpeg','-y','-f','rawvideo','-pixel_format','rgb24','-video_size',f'{W}x{H}','-framerate',str(FPS),'-i','-','-an','-c:v','libx264','-preset','veryfast','-crf','22','-pix_fmt','yuv420p','-movflags','+faststart',str(out)]
proc=subprocess.Popen(cmd,stdin=subprocess.PIPE,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
try:
 for i in range(DURATION*FPS):proc.stdin.write(frame(i/FPS).tobytes())
finally:proc.stdin.close()
if proc.wait()!=0:raise RuntimeError('FFmpeg failed')
frame(10).save(ASSETS/'demo-poster.jpg',quality=88)
(ASSETS/'drop-demo.vtt').write_text('''WEBVTT

00:00.000 --> 00:03.000
Drop: research, prepare, review and plan.

00:03.000 --> 00:09.000
Upload a file from your device. The example stays in this browser.

00:09.000 --> 00:15.000
Choose a crop, add your brand and enter your own timed captions.

00:15.000 --> 00:21.000
Save a draft and check it in your personal review checklist.

00:21.000 --> 00:27.000
Export your file and a calendar reminder. Publish manually through your chosen platform.

00:27.000 --> 00:30.000
Try Drop with your own content. Powered by Corebridge.
''')
print(f'Generated {out.name}: {out.stat().st_size} bytes, {DURATION} seconds')

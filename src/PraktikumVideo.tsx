import React from 'react';
import {
  AbsoluteFill, Audio, Img, Sequence, staticFile, interpolate,
  useCurrentFrame, Easing,
} from 'remotion';

const C = {
  navy: '#061321', blue: '#76D5FF', cyan: '#B8EEFF',
  white: '#F4FAFF', muted: '#A9C2D2', line: 'rgba(205,239,255,.28)',
};

const scenes = [
  {
    image: 'foto-1.jpg', no: '01', tag: 'PERSIAPAN ALAT',
    title: 'Menyiapkan\\nperalatan',
    body: 'Peralatan gelas disusun untuk mendukung proses pengamatan dan pemisahan.',
    note: 'PENGAMATAN LABORATORIUM', layout: 'right',
  },
  {
    image: 'foto-2.jpg', no: '02', tag: 'PENANGANAN SAMPEL',
    title: 'Mengamati\\nbahan',
    body: 'Sampel dan perlengkapan praktikum diamati sebelum tahapan pemisahan dilakukan.',
    note: 'SAMPEL & PERLENGKAPAN', layout: 'center',
  },
  {
    image: 'foto-3.jpg', no: '03', tag: 'PROSES PENYARINGAN',
    title: 'Penyaringan',
    body: 'Corong dan kertas saring digunakan untuk memisahkan bagian padat dari campuran.',
    note: 'FILTRASI', layout: 'left',
  },
  {
    image: 'foto-4.jpg', no: '04', tag: 'PROSES PEMANASAN',
    title: 'Pemanasan\\nSampel',
    body: 'Sampel dipanaskan menggunakan rangkaian alat laboratorium untuk mengamati prosesnya.',
    note: 'PENGAMATAN PEMANASAN', layout: 'centerCard',
  },
] as const;

const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };
const ease = Easing.bezier(.22, .8, .2, 1);

const Glass: React.FC<{children?: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div style={{
    position: 'relative',
    background: 'linear-gradient(135deg, rgba(231,248,255,.17), rgba(142,205,237,.055) 48%, rgba(255,255,255,.09))',
    border: '1px solid rgba(222,246,255,.3)',
    boxShadow: '0 30px 90px rgba(0,0,0,.34), inset 0 1px 0 rgba(255,255,255,.32), inset 0 -1px 0 rgba(160,220,255,.12)',
    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
    borderRadius: 32, ...style,
  }}>{children}</div>
);

const Ambient: React.FC<{variant?: number}> = ({variant=0}) => {
  const f = useCurrentFrame();
  const drift = f * .7;
  const rotate = f * .16 + variant * 24;
  return (
    <AbsoluteFill style={{overflow:'hidden', background:
      'radial-gradient(ellipse at 16% 18%, rgba(27,91,133,.55), transparent 38%), radial-gradient(ellipse at 86% 76%, rgba(12,69,101,.5), transparent 42%), linear-gradient(145deg,#040D18 0%,#0A2032 52%,#061522 100%)'}}>
      <div style={{position:'absolute',inset:0,opacity:.2,backgroundImage:'radial-gradient(rgba(190,230,255,.8) .7px, transparent .7px)',backgroundSize:'48px 48px',transform:`translate3d(${Math.sin(f/80)*12}px,${drift*.12}px,0)`}}/>
      <div style={{position:'absolute',width:720,height:720,borderRadius:'50%',border:'1px solid rgba(151,222,255,.19)',left:-310+Math.sin(f/90)*35,top:-280,transform:`rotate(${rotate}deg)`,boxShadow:'inset 0 0 80px rgba(100,190,245,.06),0 0 80px rgba(80,180,240,.05)'}}/>
      <div style={{position:'absolute',width:490,height:490,borderRadius:'50%',border:'1px solid rgba(151,222,255,.15)',right:-220+Math.cos(f/100)*28,top:520,transform:`rotate(${-rotate*1.4}deg)`}}/>
      <div style={{position:'absolute',width:300,height:300,borderRadius:'50%',border:'1px solid rgba(220,247,255,.2)',right:80,top:220,transform:`translateY(${Math.sin(f/36)*20}px) rotate(${rotate*2}deg)`,boxShadow:'0 0 65px rgba(106,205,255,.1),inset 0 0 45px rgba(150,220,255,.09)'}}/>
      <div style={{position:'absolute',width:240,height:240,borderRadius:'50%',background:'rgba(65,173,225,.11)',filter:'blur(70px)',left:440+Math.sin(f/65)*70,bottom:160}}/>
      <div style={{position:'absolute',width:3,height:600,left:'72%',top:180,background:'linear-gradient(transparent,rgba(160,224,255,.14),transparent)',transform:`rotate(24deg) translateY(${Math.sin(f/70)*18}px)`,filter:'blur(12px)'}}/>
    </AbsoluteFill>
  );
};

const KText: React.FC<{children: React.ReactNode; delay?: number; style?: React.CSSProperties}> = ({children,delay=0,style}) => {
  const f=useCurrentFrame();
  const p=interpolate(f,[delay,delay+24],[0,1],{...clamp,easing:ease});
  const blur=interpolate(f,[delay,delay+18],[9,0],clamp);
  return <div style={{opacity:p,filter:`blur(${blur}px)`,transform:`translate3d(0,${(1-p)*26}px,0)`,...style}}>{children}</div>;
};

const Orb: React.FC<{size:number; left:number; top:number; delay?:number}> = ({size,left,top,delay=0}) => {
  const f=useCurrentFrame();
  return <div style={{position:'absolute',left,top,width:size,height:size,borderRadius:'50%',
    background:'radial-gradient(circle at 30% 25%,rgba(255,255,255,.32),rgba(117,204,244,.12) 24%,rgba(69,145,190,.04) 62%,rgba(255,255,255,.12))',
    border:'1px solid rgba(219,246,255,.25)',boxShadow:'inset -12px -18px 35px rgba(68,157,205,.1),0 18px 45px rgba(0,0,0,.2)',
    transform:`translate3d(0,${Math.sin((f+delay)/30)*18}px,0) rotate(${f*.12}deg)`}}/>;
};

const Intro: React.FC = () => {
  const f=useCurrentFrame();
  const fade=interpolate(f,[0,12,132,150],[0,1,1,0],clamp);
  const scale=interpolate(f,[0,150],[.96,1.035],clamp);
  return <AbsoluteFill style={{opacity:fade,overflow:'hidden'}}>
    <Ambient/>
    <Orb size={250} left={650} top={800} delay={12}/>
    <Orb size={92} left={820} top={530} delay={45}/>
    <div style={{position:'absolute',left:68,right:68,top:290,transform:`scale(${scale})`,transformOrigin:'left center'}}>
      <KText delay={8} style={{fontFamily:'Arial',fontWeight:700,fontSize:22,letterSpacing:7,color:C.blue}}>SCIENCE MOTION / 01</KText>
      <KText delay={20} style={{marginTop:42,fontFamily:'Arial',fontWeight:800,fontSize:88,lineHeight:1.02,letterSpacing:-3,color:C.white}}>
        METODE<br/><span style={{color:C.blue}}>PEMISAHAN</span><br/>CAMPURAN
      </KText>
      <KText delay={43} style={{marginTop:34,fontFamily:'Arial',fontSize:29,color:C.muted,letterSpacing:1.2}}>Eksplorasi Proses Pemisahan Zat</KText>
      <KText delay={55} style={{marginTop:48,width:118,height:4,borderRadius:8,background:C.blue,boxShadow:'0 0 30px rgba(104,207,255,.75)'}}/>
    </div>
    <Glass style={{position:'absolute',left:68,right:68,bottom:185,padding:'26px 30px',borderRadius:26}}>
      <div style={{fontFamily:'Arial',fontSize:18,letterSpacing:4,color:C.cyan}}>LABORATORY STUDY</div>
      <div style={{fontFamily:'Arial',fontSize:24,color:C.white,marginTop:12}}>Mengamati · Memisahkan · Memahami</div>
    </Glass>
    <div style={{position:'absolute',right:100,top:1020,width:4,height:270,background:'linear-gradient(transparent,rgba(137,218,255,.55),transparent)',transform:`rotate(34deg) translateY(${Math.sin(f/25)*12}px)`}}/>
  </AbsoluteFill>;
};

const PhotoFrame: React.FC<{src:string; style?:React.CSSProperties; tilt?:number; delay?:number}> = ({src,style,tilt=0,delay=0}) => {
  const f=useCurrentFrame();
  const enter=interpolate(f,[delay,delay+25],[55,0],{...clamp,easing:ease});
  const zoom=interpolate(f,[0,150],[1,1.045],clamp);
  return <div style={{position:'absolute',...style,transform:`perspective(1500px) rotateY(${tilt}deg) rotateZ(${Math.sin(f/75)*.5}deg) translate3d(0,${enter}px,0)`,transformOrigin:'center',filter:'drop-shadow(0 34px 48px rgba(0,0,0,.38))'}}>
    <Glass style={{padding:13,borderRadius:34,overflow:'hidden'}}>
      <div style={{position:'absolute',inset:7,borderRadius:27,border:'1px solid rgba(255,255,255,.22)',zIndex:2,pointerEvents:'none'}}/>
      <div style={{position:'relative',height:'100%',width:'100%',borderRadius:23,overflow:'hidden',background:'#0A1A27'}}>
        <Img src={staticFile(`images/${src}`)} style={{width:'100%',height:'100%',objectFit:'contain',transform:`scale(${zoom})`,display:'block'}}/>
        <div style={{position:'absolute',inset:0,pointerEvents:'none',background:'linear-gradient(135deg,rgba(230,250,255,.12),transparent 32%,transparent 72%,rgba(30,120,170,.12))'}}/>
      </div>
    </Glass>
  </div>;
};

const Chapter: React.FC<{data: typeof scenes[number]; index:number}> = ({data,index}) => {
  const f=useCurrentFrame();
  const fade=interpolate(f,[0,12,125,146],[0,1,1,0],clamp);
  const image=data.image;
  const isCenter=data.layout==='center';
  const isLeft=data.layout==='left';
  const isCard=data.layout==='centerCard';
  const titleStyle:React.CSSProperties={
    position:'absolute',fontFamily:'Arial',fontWeight:800,fontSize:isCenter?62:58,
    lineHeight:1.08,letterSpacing:-1.8,color:C.white,whiteSpace:'pre-line',
    width:isCenter?850:430,
    left:isCenter?115:(isLeft?590:65),
    top:isCenter?220:(isCard?1160:650),
    textAlign:isCenter?'center':'left',
  };
  return <AbsoluteFill style={{opacity:fade,overflow:'hidden'}}>
    <Ambient variant={index+1}/>
    <div style={{position:'absolute',left:64,right:64,top:72,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div style={{fontFamily:'Arial',fontSize:18,letterSpacing:5,color:C.cyan,fontWeight:700}}>FIELD NOTES / SCIENCE</div>
      <Glass style={{padding:'12px 20px',borderRadius:30,fontFamily:'Arial',fontSize:18,color:C.white}}>{data.no} / 04</Glass>
    </div>
    {isCenter ? <PhotoFrame src={image} delay={5} tilt={-3} style={{left:225,top:490,width:630,height:850}}/> :
      isLeft ? <PhotoFrame src={image} delay={5} tilt={4} style={{left:55,top:360,width:495,height:880}}/> :
      isCard ? <PhotoFrame src={image} delay={5} tilt={-2} style={{left:235,top:235,width:610,height:850}}/> :
      <PhotoFrame src={image} delay={5} tilt={-5} style={{left:495,top:420,width:520,height:920}}/>}
    <div style={{position:'absolute',left:isCenter?120:(isLeft?590:65),right:isCenter?120:(isLeft?65:500),top:isCenter?390:(isCard?1330:470)}}>
      <KText delay={18} style={{fontFamily:'Arial',fontWeight:700,fontSize:18,letterSpacing:5,color:C.blue}}>{data.tag}</KText>
    </div>
    {!isCenter && !isCard && <KText delay={27} style={titleStyle}>{data.title.replace('\\n','\n')}</KText>}
    {isCenter && <KText delay={30} style={titleStyle}>{data.title.replace('\\n','\n')}</KText>}
    {isCard && <KText delay={25} style={{...titleStyle,top:1190,left:80,width:920,textAlign:'center',fontSize:56}}>{data.title.replace('\\n','\n')}</KText>}
    <Glass style={{position:'absolute',left:64,right:64,bottom:120,padding:'24px 28px',borderRadius:25}}>
      <KText delay={38} style={{fontFamily:'Arial',fontSize:25,lineHeight:1.38,color:'#E2F1FA',textAlign:isCenter?'center':'left'}}>{data.body}</KText>
      <div style={{marginTop:18,paddingTop:16,borderTop:'1px solid rgba(220,245,255,.18)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontFamily:'Arial',fontSize:15,letterSpacing:3,color:C.blue}}>{data.note}</div>
        <div style={{width:54,height:3,background:C.blue,borderRadius:4,boxShadow:'0 0 14px rgba(118,213,255,.65)'}}/>
      </div>
    </Glass>
  </AbsoluteFill>;
};

const Outro: React.FC = () => {
  const f=useCurrentFrame();
  const p=interpolate(f,[0,15,155,180],[0,1,1,0],clamp);
  return <AbsoluteFill style={{opacity:p,overflow:'hidden'}}>
    <Ambient variant={7}/>
    <Orb size={310} left={380} top={380} delay={10}/>
    <Orb size={110} left={720} top={760} delay={40}/>
    <div style={{position:'absolute',left:70,right:70,top:700,textAlign:'center'}}>
      <KText delay={14} style={{fontFamily:'Arial',fontWeight:700,fontSize:19,letterSpacing:6,color:C.blue}}>END OF EXPERIMENT</KText>
      <KText delay={28} style={{fontFamily:'Arial',fontWeight:800,fontSize:72,lineHeight:1.12,color:C.white,marginTop:38}}>
        BELAJAR MELALUI<br/><span style={{color:C.blue}}>EKSPERIMEN</span>
      </KText>
      <KText delay={53} style={{fontFamily:'Arial',fontSize:27,color:C.muted,letterSpacing:1.2,marginTop:35}}>Memahami proses, mengamati hasil.</KText>
      <KText delay={72} style={{width:110,height:4,background:C.blue,margin:'48px auto 0',borderRadius:6,boxShadow:'0 0 26px rgba(118,213,255,.7)'}}/>
    </div>
  </AbsoluteFill>;
};

export const PraktikumVideo: React.FC = () => {
  const f=useCurrentFrame();
  const musicVolume=interpolate(f,[0,45,780,899],[0,.48,.42,0],clamp);
  return <AbsoluteFill style={{background:C.navy}}>
    <Audio src={staticFile('music.wav')} volume={musicVolume}/>
    <Sequence from={0} durationInFrames={165}><Intro/></Sequence>
    {scenes.map((scene,i)=><Sequence key={scene.no} from={145+i*144} durationInFrames={150}>
      <Chapter data={scene} index={i}/>
    </Sequence>)}
    <Sequence from={720} durationInFrames={180}><Outro/></Sequence>
  </AbsoluteFill>;
};

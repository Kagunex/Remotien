import React from 'react';
import {
  AbsoluteFill, Audio, Img, Sequence, staticFile, interpolate,
  useCurrentFrame, Easing, spring,
} from 'remotion';

const C = {
  navy: '#04101D', deep: '#071B2C', blue: '#65CFFF', cyan: '#B9F0FF',
  ice: '#EAF8FF', white: '#F5FBFF', muted: '#A9C4D5', silver: '#D6EAF4',
};
const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const ease = Easing.bezier(0.22, 0.82, 0.2, 1);

const Glass: React.FC<{children?: React.ReactNode; style?: React.CSSProperties; radius?: number}> = ({children, style, radius=26}) => (
  <div style={{position:'relative', background:'linear-gradient(135deg, rgba(231,249,255,.16), rgba(115,184,218,.055) 48%, rgba(255,255,255,.09))', border:'1px solid rgba(218,245,255,.27)', boxShadow:'0 26px 70px rgba(0,0,0,.34), inset 0 1px 0 rgba(255,255,255,.32), inset 0 -1px 0 rgba(150,220,255,.12)', backdropFilter:'blur(22px)', WebkitBackdropFilter:'blur(22px)', borderRadius:radius, ...style}}>{children}</div>
);

const Ambient: React.FC<{variant?:number}> = ({variant=0}) => {
  const f = useCurrentFrame();
  const drift = Math.sin((f+variant*31)/74);
  const turn = f*.12 + variant*29;
  const dots = Array.from({length:34},(_,i)=>({x:(i*173+variant*71)%1900,y:(i*97+variant*43)%1040,s:2+(i%3),d:i*7}));
  return <AbsoluteFill style={{overflow:'hidden',background:'radial-gradient(ellipse at 18% 20%, rgba(21,91,133,.42), transparent 37%), radial-gradient(ellipse at 84% 82%, rgba(10,69,104,.38), transparent 42%), linear-gradient(132deg,#030B15 0%,#0A2032 52%,#041321 100%)'}}>
    <div style={{position:'absolute',inset:-80,opacity:.22,backgroundImage:'linear-gradient(rgba(172,225,250,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(172,225,250,.06) 1px,transparent 1px)',backgroundSize:'110px 110px',transform:`perspective(900px) rotateX(62deg) translateY(${drift*16}px) scale(1.25)`,transformOrigin:'center bottom'}}/>
    <div style={{position:'absolute',width:940,height:940,borderRadius:'50%',border:'1px solid rgba(151,222,255,.17)',left:-490+drift*24,top:-530,transform:`rotate(${turn}deg)`,boxShadow:'inset 0 0 100px rgba(100,190,245,.05),0 0 90px rgba(80,180,240,.05)'}}/>
    <div style={{position:'absolute',width:650,height:650,borderRadius:'50%',border:'1px solid rgba(151,222,255,.14)',right:-310+Math.cos(f/100)*24,top:330,transform:`rotate(${-turn*1.4}deg)`}}/>
    <div style={{position:'absolute',width:390,height:390,borderRadius:'50%',border:'1px solid rgba(220,247,255,.18)',right:180,top:110,transform:`translateY(${Math.sin(f/34)*17}px) rotate(${turn*2}deg)`,boxShadow:'0 0 85px rgba(106,205,255,.08),inset 0 0 65px rgba(150,220,255,.08)'}}/>
    <div style={{position:'absolute',width:520,height:520,borderRadius:'50%',background:'rgba(55,160,218,.10)',filter:'blur(100px)',left:650+Math.sin(f/68)*70,bottom:-230}}/>
    <div style={{position:'absolute',width:4,height:760,left:'72%',top:90,background:'linear-gradient(transparent,rgba(160,224,255,.15),transparent)',transform:`rotate(24deg) translateY(${Math.sin(f/62)*20}px)`,filter:'blur(13px)'}}/>
    {dots.map((d,i)=><div key={i} style={{position:'absolute',left:d.x,top:d.y,width:d.s,height:d.s,borderRadius:'50%',background:'rgba(205,239,255,.62)',opacity:.18+((Math.sin((f+d.d)/19)+1)*.13),transform:`translate3d(${Math.sin((f+d.d)/43)*10}px,${Math.cos((f+d.d)/37)*13}px,0)`,boxShadow:'0 0 9px rgba(130,215,255,.35)'}}/>)}
  </AbsoluteFill>;
};

const Orb: React.FC<{size:number;left:number;top:number;delay?:number}> = ({size,left,top,delay=0}) => {
  const f=useCurrentFrame();
  return <div style={{position:'absolute',left,top,width:size,height:size,borderRadius:'50%',background:'radial-gradient(circle at 29% 24%,rgba(255,255,255,.42),rgba(117,204,244,.13) 25%,rgba(69,145,190,.035) 64%,rgba(255,255,255,.12))',border:'1px solid rgba(219,246,255,.28)',boxShadow:'inset -14px -18px 38px rgba(68,157,205,.12),0 20px 50px rgba(0,0,0,.23)',transform:`translate3d(0,${Math.sin((f+delay)/31)*18}px,0) rotate(${f*.14}deg)`}}/>;
};

const KText: React.FC<{children:React.ReactNode;delay?:number;style?:React.CSSProperties}> = ({children,delay=0,style}) => {
  const f=useCurrentFrame();
  const p=interpolate(f,[delay,delay+23],[0,1],{...clamp,easing:ease});
  const blur=interpolate(f,[delay,delay+17],[10,0],clamp);
  return <div style={{opacity:p,filter:`blur(${blur}px)`,transform:`translate3d(0,${(1-p)*22}px,0)`,...style}}>{children}</div>;
};

const Eyebrow: React.FC<{children:string}> = ({children}) => <div style={{fontFamily:'Arial, sans-serif',fontSize:16,fontWeight:700,letterSpacing:5,color:C.blue}}>{children}</div>;

const PhotoFrame: React.FC<{src:string;style?:React.CSSProperties;tilt?:number;delay?:number}> = ({src,style,tilt=0,delay=5}) => {
  const f=useCurrentFrame();
  const enter=spring({frame:f-delay,fps:30,config:{damping:18,stiffness:75,mass:.9}});
  const zoom=interpolate(f,[0,360],[1,1.045],clamp);
  const float=Math.sin(f/42)*5;
  return <div style={{position:'absolute',...style,transform:`perspective(1500px) rotateY(${tilt}deg) rotateZ(${Math.sin(f/78)*.45}deg) translate3d(0,${(1-enter)*70+float}px,0) scale(${.96+enter*.04})`,transformOrigin:'center',filter:'drop-shadow(0 30px 44px rgba(0,0,0,.4))'}}>
    <Glass radius={28} style={{height:'100%',width:'100%',padding:12,overflow:'hidden'}}>
      <div style={{position:'absolute',inset:7,borderRadius:22,border:'1px solid rgba(255,255,255,.23)',zIndex:2,pointerEvents:'none'}}/>
      <div style={{position:'relative',height:'100%',width:'100%',borderRadius:18,overflow:'hidden',background:'#071725'}}>
        <Img src={staticFile(`images/${src}`)} style={{width:'100%',height:'100%',objectFit:'contain',transform:`scale(${zoom})`,display:'block'}}/>
        <div style={{position:'absolute',inset:0,pointerEvents:'none',background:'linear-gradient(135deg,rgba(230,250,255,.14),transparent 32%,transparent 72%,rgba(30,120,170,.12))'}}/>
      </div>
      <div style={{position:'absolute',left:22,top:18,width:80,height:2,background:'rgba(255,255,255,.45)',filter:'blur(.4px)'}}/>
    </Glass>
  </div>;
};

const MolecularArt: React.FC<{variant:number}> = ({variant}) => {
  const f=useCurrentFrame();
  const pts=Array.from({length:12},(_,i)=>({x:35+(i*67+variant*31)%390,y:30+(i*43+variant*19)%190,r:3+(i%3)}));
  return <svg width="470" height="245" viewBox="0 0 470 245" style={{display:'block',overflow:'visible'}}>
    <defs><radialGradient id={`m${variant}`}><stop stopColor="#DDF8FF" stopOpacity=".9"/><stop offset="1" stopColor="#55C9FF" stopOpacity=".12"/></radialGradient></defs>
    {pts.map((p,i)=>{const q=pts[(i+3)%pts.length];return <line key={`l${i}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="rgba(128,218,255,.23)" strokeWidth="1.5"/>;})}
    {pts.map((p,i)=><circle key={i} cx={p.x+Math.sin((f+i*9)/22)*9} cy={p.y+Math.cos((f+i*7)/26)*8} r={p.r} fill={`url(#m${variant})`} stroke="rgba(210,245,255,.55)" strokeWidth="1"/>)}
  </svg>;
};

const Diagram: React.FC<{type:'chrom'|'sublime'|'evap'}> = ({type}) => {
  const f=useCurrentFrame();
  const labelStyle:React.CSSProperties={fontFamily:'Arial',fontSize:15,letterSpacing:2,color:C.muted};
  if(type==='chrom') return <Glass style={{padding:'16px 20px',marginTop:18,borderRadius:18}}><Eyebrow>ILUSTRASI PRINSIP</Eyebrow><div style={{display:'flex',alignItems:'center',gap:18,marginTop:12}}><div style={{width:54,height:92,border:'1px solid rgba(200,238,255,.55)',borderRadius:7,position:'relative',background:'linear-gradient(180deg,rgba(80,180,225,.04),rgba(80,180,225,.12))'}}><div style={{position:'absolute',bottom:10,left:8,right:8,height:3,background:C.cyan}}/><div style={{position:'absolute',left:11,top:25,width:7,height:7,borderRadius:'50%',background:'#72D6FF',transform:`translateY(${Math.sin(f/9)*9}px)`}}/><div style={{position:'absolute',right:11,top:42,width:7,height:7,borderRadius:'50%',background:'#E6F7FF',transform:`translateY(${Math.cos(f/10)*8}px)`}}/></div><div style={{flex:1}}><div style={{...labelStyle,marginBottom:7}}>FASE GERAK BERINTERAKSI DENGAN FASE DIAM</div><div style={{height:2,background:'linear-gradient(90deg,rgba(95,206,255,.1),rgba(95,206,255,.8))'}}/></div><MolecularArt variant={1}/></div></Glass>;
  const steps=type==='sublime'?['PADAT','GAS','PADAT']:['LARUTAN','PENGUAPAN','PELARUT MENGUAP'];
  return <Glass style={{padding:'17px 20px',marginTop:18,borderRadius:18}}><Eyebrow>ILUSTRASI PRINSIP</Eyebrow><div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:15,gap:8}}>{steps.map((s,i)=><React.Fragment key={s}><div style={{flex:1,textAlign:'center'}}><div style={{height:42,display:'flex',alignItems:'center',justifyContent:'center',gap:3}}>{Array.from({length:type==='sublime'&&i===1?5:3},(_,j)=><div key={j} style={{width:7,height:7,borderRadius:'50%',background:i===1?'rgba(178,236,255,.85)':'rgba(102,205,255,.8)',transform:`translateY(${Math.sin((f+j*8+i*12)/10)*5}px)`,boxShadow:'0 0 12px rgba(100,205,255,.45)'}}/>)}</div><div style={{fontFamily:'Arial',fontSize:13,fontWeight:700,letterSpacing:1.2,color:C.ice}}>{s}</div></div>{i<2&&<div style={{color:C.blue,fontSize:25,opacity:.8}}>›</div>}</React.Fragment>)}</div></Glass>;
};

const chapterData = [
  {image:'foto-1.jpg',no:'01',title:'KROMATOGRAFI',tag:'SEPARATION BY DIFFERENT MOVEMENT',body:'Kromatografi memisahkan komponen campuran berdasarkan perbedaan interaksi dengan fase diam dan fase gerak.',principle:'Setiap komponen bergerak dengan kecepatan berbeda sehingga dapat terpisah.',layout:'right',diagram:'chrom'},
  {image:'foto-2.jpg',no:'02',title:'SUBLIMASI',tag:'PADAT  →  GAS  →  PADAT',body:'Sublimasi memanfaatkan kemampuan zat tertentu untuk berubah langsung dari padat menjadi gas.',principle:'Uap didinginkan hingga kembali membentuk padatan.',layout:'right',diagram:'sublime'},
  {image:'foto-3.jpg',no:'03',title:'EVAPORASI',tag:'SEPARATION BY EVAPORATION',body:'Foto memperlihatkan corong kaca dan labu berisi cairan. Evaporasi memisahkan campuran dengan menguapkan pelarut sehingga zat terlarut tertinggal.',principle:'Penjelasan mengikuti prinsip umum evaporasi; hasil pengamatan spesifik tidak disimpulkan dari foto.',layout:'left',diagram:'evap'},
  {image:'foto-4.jpg',no:'04',title:'SUBLIMASI',tag:'DOKUMENTASI PRAKTIKUM KEDUA',body:'Dokumentasi kedua untuk sublimasi. Foto memperlihatkan wadah logam di atas rangka pemanas dan material padat di dalamnya.',principle:'Prinsip umum: zat yang dapat menyublim berubah dari padat menjadi gas, lalu mengendap kembali saat didinginkan.',layout:'left',diagram:'sublime'},
] as const;

const Chapter: React.FC<{data:typeof chapterData[number];index:number}> = ({data,index}) => {
  const f=useCurrentFrame();
  const fade=interpolate(f,[0,14,320,360],[0,1,1,0],clamp);
  const photoLeft=data.layout==='left';
  return <AbsoluteFill style={{opacity:fade,overflow:'hidden'}}><Ambient variant={index+1}/>
    <div style={{position:'absolute',left:100,right:100,top:54,display:'flex',justifyContent:'space-between',alignItems:'center'}}><Eyebrow>FIELD NOTES  /  SCIENCE DOCUMENTARY</Eyebrow><Glass style={{padding:'10px 18px',borderRadius:22,color:C.white,fontFamily:'Arial',fontSize:15,letterSpacing:2}}>EXPERIMENT {data.no} / 04</Glass></div>
    <Orb size={150} left={photoLeft?1580:300} top={120} delay={index*17}/>
    <div style={{position:'absolute',left:photoLeft?700:105,top:205,width:photoLeft?1100:770,zIndex:3}}>
      <KText delay={15}><Eyebrow>{data.tag}</Eyebrow></KText>
      <KText delay={24} style={{fontFamily:'Arial, sans-serif',fontWeight:800,fontSize:65,letterSpacing:-2.5,lineHeight:1.02,color:C.white,marginTop:22}}>{data.no} — {data.title}</KText>
      <Glass style={{padding:'23px 26px',marginTop:27,borderRadius:22}}>
        <KText delay={37} style={{fontFamily:'Arial',fontSize:25,lineHeight:1.38,color:'#E5F4FC'}}>{data.body}</KText>
        <div style={{height:1,background:'rgba(215,244,255,.18)',margin:'18px 0 15px'}}/>
        <KText delay={49}><div style={{fontFamily:'Arial',fontSize:14,fontWeight:700,letterSpacing:3,color:C.blue,marginBottom:8}}>PRINSIP KERJA</div><div style={{fontFamily:'Arial',fontSize:20,lineHeight:1.35,color:C.muted}}>{data.principle}</div></KText>
      </Glass>
      <KText delay={60}><Diagram type={data.diagram}/></KText>
    </div>
    <PhotoFrame src={data.image} delay={8} tilt={photoLeft?5:-5} style={{left:photoLeft?105:1260,top:175,width:500,height:760}}/>
    <div style={{position:'absolute',left:photoLeft?105:1260,top:955,width:500,display:'flex',justifyContent:'space-between',fontFamily:'Arial',fontSize:13,letterSpacing:3,color:C.muted}}><span>ORIGINAL PRACTICAL PHOTO</span><span>0{index+1}</span></div>
    <div style={{position:'absolute',right:90,bottom:48,width:160,height:2,background:'linear-gradient(90deg,transparent,rgba(112,214,255,.7))'}}/>
  </AbsoluteFill>;
};

const Intro: React.FC = () => {
  const f=useCurrentFrame();
  const fade=interpolate(f,[0,18,185,210],[0,1,1,0],clamp);
  const ring=f*.18;
  return <AbsoluteFill style={{opacity:fade,overflow:'hidden'}}><Ambient/><Orb size={370} left={1280} top={350} delay={12}/><Orb size={115} left={1550} top={210} delay={40}/><div style={{position:'absolute',right:340,top:190,width:560,height:560,borderRadius:'50%',border:'2px solid rgba(181,237,255,.25)',boxShadow:'inset 0 0 70px rgba(100,210,255,.08),0 0 85px rgba(100,210,255,.13)',transform:`rotate(${ring}deg)`,background:'radial-gradient(circle,transparent 58%,rgba(155,224,255,.05) 60%,transparent 68%)'}}/><div style={{position:'absolute',left:145,top:245,width:1030}}>
    <KText delay={18}><Eyebrow>SCIENCE DOCUMENTARY  /  01</Eyebrow></KText>
    <KText delay={31} style={{fontFamily:'Arial',fontSize:92,fontWeight:800,letterSpacing:-4,lineHeight:1.02,color:C.white,marginTop:34}}>METODE<br/><span style={{color:C.blue}}>PEMISAHAN</span><br/>CAMPURAN</KText>
    <KText delay={65} style={{fontFamily:'Arial',fontSize:29,letterSpacing:.5,color:C.muted,marginTop:32}}>Memahami Teknik Pemisahan Zat Melalui Eksperimen</KText>
    <KText delay={80}><div style={{width:130,height:4,background:C.blue,marginTop:42,boxShadow:'0 0 24px rgba(100,210,255,.7)'}}/></KText>
  </div><Glass style={{position:'absolute',left:145,bottom:130,padding:'19px 26px',borderRadius:20}}><div style={{fontFamily:'Arial',fontSize:14,letterSpacing:4,color:C.cyan}}>OBSERVE  ·  SEPARATE  ·  UNDERSTAND</div></Glass><div style={{position:'absolute',left:1200,top:830,width:520,height:2,background:'linear-gradient(90deg,transparent,rgba(140,220,255,.35),transparent)',transform:`rotate(-24deg) translateX(${Math.sin(f/17)*15}px)`}}/></AbsoluteFill>;
};

const Summary: React.FC = () => {
  const f=useCurrentFrame();
  const fade=interpolate(f,[0,15,245,270],[0,1,1,0],clamp);
  const cards=[['KROMATOGRAFI','Perbedaan interaksi komponen'],['SUBLIMASI','Perubahan padat menjadi gas'],['EVAPORASI','Penguapan pelarut'],['FILTRASI','Padatan tak larut dipisahkan dari cairan']];
  return <AbsoluteFill style={{opacity:fade,overflow:'hidden'}}><Ambient variant={8}/><div style={{position:'absolute',left:120,right:120,top:74,textAlign:'center'}}><KText delay={10}><Eyebrow>SCIENCE SUMMARY</Eyebrow></KText><KText delay={22} style={{fontFamily:'Arial',fontSize:57,fontWeight:800,letterSpacing:-1.5,color:C.white,marginTop:18}}>EMPAT PRINSIP PEMISAHAN</KText></div>
    <div style={{position:'absolute',left:180,right:180,top:270,display:'grid',gridTemplateColumns:'1fr 1fr',gap:22}}>{cards.map((c,i)=><Glass key={c[0]} style={{padding:'25px 30px',minHeight:145,borderRadius:24,transform:`translateY(${Math.sin((f+i*15)/26)*5}px)`}}><div style={{display:'flex',gap:18,alignItems:'center'}}><div style={{fontFamily:'Arial',fontSize:32,fontWeight:800,color:C.blue}}>0{i+1}</div><div><div style={{fontFamily:'Arial',fontSize:22,fontWeight:800,letterSpacing:1,color:C.white}}>{c[0]}</div><div style={{fontFamily:'Arial',fontSize:18,color:C.muted,marginTop:9}}>{c[1]}</div></div></div></Glass>)}</div>
    <div style={{position:'absolute',left:150,right:150,bottom:92,textAlign:'center'}}><KText delay={90} style={{fontFamily:'Arial',fontSize:37,fontWeight:800,color:C.white,letterSpacing:.3}}>SETIAP CAMPURAN MEMILIKI CARA PEMISAHANNYA</KText><KText delay={110} style={{fontFamily:'Arial',fontSize:23,color:C.blue,marginTop:16,letterSpacing:1}}>Science begins with observation.</KText></div>
  </AbsoluteFill>;
};

export const PraktikumVideo: React.FC = () => {
  const f=useCurrentFrame();
  const volume=interpolate(f,[0,55,1550,1799],[0,.68,.62,0],clamp);
  return <AbsoluteFill style={{background:C.navy}}>
    <Audio src={staticFile('music.wav')} volume={volume}/>
    <Sequence from={0} durationInFrames={210}><Intro/></Sequence>
    <Sequence from={210} durationInFrames={360}><Chapter data={chapterData[0]} index={0}/></Sequence>
    <Sequence from={570} durationInFrames={330}><Chapter data={chapterData[1]} index={1}/></Sequence>
    <Sequence from={900} durationInFrames={360}><Chapter data={chapterData[2]} index={2}/></Sequence>
    <Sequence from={1260} durationInFrames={270}><Chapter data={chapterData[3]} index={3}/></Sequence>
    <Sequence from={1530} durationInFrames={270}><Summary/></Sequence>
  </AbsoluteFill>;
};

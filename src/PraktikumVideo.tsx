import React from 'react';
import {
  AbsoluteFill, Audio, Img, Sequence, staticFile, interpolate,
  useCurrentFrame, useVideoConfig,
} from 'remotion';

const T = {
  bg: '#071522', blue: '#8BD8FF', ice: '#DDF5FF',
  white: '#F7FCFF', muted: '#B6C9D8', glass: 'rgba(235,248,255,0.13)',
};

const chapters = [
  {
    image: 'foto-1.jpg', no: '01', tag: 'PENGANTAR',
    title: 'Metode Pemisahan\\nCampuran',
    body: 'Memisahkan komponen penyusun campuran berdasarkan perbedaan sifat fisiknya.',
    method: 'KONSEP DASAR',
  },
  {
    image: 'foto-2.jpg', no: '02', tag: 'PENGAMATAN',
    title: 'Kenali Sifat\\nKomponennya',
    body: 'Pemilihan metode bergantung pada sifat bahan, seperti ukuran partikel, kelarutan, dan titik didih.',
    method: 'DASAR PEMILIHAN METODE',
  },
  {
    image: 'foto-3.jpg', no: '03', tag: 'FILTRASI',
    title: 'Penyaringan',
    body: 'Filtrasi memisahkan padatan yang tidak larut dari cairan menggunakan media berpori.',
    method: 'PADATAN + CAIRAN',
  },
  {
    image: 'foto-4.jpg', no: '04', tag: 'PEMANASAN',
    title: 'Pemisahan\\nDengan Panas',
    body: 'Pemanasan dapat membantu menguapkan pelarut atau memisahkan komponen berdasarkan perbedaan titik didih.',
    method: 'PENGUAPAN / DISTILASI',
  },
];

const GlassPanel: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div style={{
    background: 'linear-gradient(135deg, rgba(235,248,255,0.22), rgba(160,215,245,0.07))',
    border: '1px solid rgba(230,248,255,0.34)',
    boxShadow: '0 22px 70px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.35)',
    backdropFilter: 'blur(22px)', WebkitBackdropFilter: 'blur(22px)',
    borderRadius: 34, ...style,
  }}>{children}</div>
);

const Ambient: React.FC = () => {
  const f = useCurrentFrame();
  const drift = interpolate(f, [0, 900], [0, 180]);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 18% 18%, #17466A 0%, transparent 42%), radial-gradient(ellipse at 82% 72%, #123B56 0%, transparent 45%), linear-gradient(145deg,#06111E,#0A2031 55%,#071522)', overflow: 'hidden'}}>
      <div style={{position:'absolute',width:760,height:760,borderRadius:'50%',border:'1px solid rgba(139,216,255,.16)',left:-300+drift*.25,top:-300}}/>
      <div style={{position:'absolute',width:560,height:560,borderRadius:'50%',border:'1px solid rgba(139,216,255,.13)',right:-190,top:500-drift*.2}}/>
      <div style={{position:'absolute',width:340,height:340,borderRadius:'50%',background:'rgba(77,173,225,.08)',filter:'blur(70px)',left:520-drift*.35,top:900}}/>
    </AbsoluteFill>
  );
};

const AnimatedText: React.FC<{children: React.ReactNode; delay?: number; style?: React.CSSProperties}> = ({children, delay=0, style}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [delay, delay+22], [0,1], {extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  return <div style={{opacity:p,transform:`translateY(${(1-p)*28}px)`,...style}}>{children}</div>;
};

const Intro: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f,[0,20,105,125],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  return (
    <AbsoluteFill style={{opacity:p}}>
      <Ambient/>
      <div style={{position:'absolute',left:66,right:66,top:210}}>
        <AnimatedText delay={8} style={{fontFamily:'Arial',fontSize:23,letterSpacing:8,color:T.blue,fontWeight:700}}>VIDEO PEMBELAJARAN • IPA</AnimatedText>
        <AnimatedText delay={18} style={{marginTop:38}}>
          <div style={{fontFamily:'Arial',fontWeight:800,fontSize:88,lineHeight:1.02,letterSpacing:-3,color:T.white}}>
            Metode<br/><span style={{color:T.blue}}>Pemisahan</span><br/>Campuran
          </div>
        </AnimatedText>
        <AnimatedText delay={35}>
          <div style={{marginTop:34,width:140,height:5,borderRadius:8,background:T.blue,boxShadow:'0 0 26px #65C8FF'}}/>
          <div style={{fontFamily:'Arial',fontSize:28,color:T.muted,lineHeight:1.5,marginTop:26,maxWidth:800}}>Mengenal prinsip dan teknik pemisahan komponen campuran.</div>
        </AnimatedText>
      </div>
      <GlassPanel style={{position:'absolute',left:66,right:66,bottom:190,padding:30}}>
        <div style={{fontFamily:'Arial',fontSize:20,color:T.ice,letterSpacing:4}}>RANGKAIAN PRAKTIKUM</div>
        <div style={{fontFamily:'Arial',fontSize:25,color:T.white,marginTop:14}}>Pengamatan • Filtrasi • Pemanasan</div>
      </GlassPanel>
    </AbsoluteFill>
  );
};

const Chapter: React.FC<{data: typeof chapters[number]; index:number}> = ({data,index}) => {
  const f = useCurrentFrame();
  const zoom = interpolate(f,[0,180],[1.05,1.17],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const fade = interpolate(f,[0,12,165,180],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const move = interpolate(f,[0,180],[12,-12]);
  return (
    <AbsoluteFill style={{opacity:fade,overflow:'hidden'}}>
      <Img src={staticFile(`images/${data.image}`)} style={{width:'100%',height:'100%',objectFit:'cover',transform:`scale(${zoom}) translateY(${move}px)`,filter:'brightness(.48) saturate(.82)'}}/>
      <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(3,14,25,.12),rgba(4,17,29,.28) 34%,rgba(4,15,26,.94) 100%)'}}/>
      <div style={{position:'absolute',width:560,height:560,borderRadius:'50%',background:'rgba(80,180,235,.13)',filter:'blur(90px)',right:-260,top:360}}/>
      <div style={{position:'absolute',width:430,height:430,borderRadius:'50%',background:'rgba(80,180,235,.10)',filter:'blur(80px)',left:-250,bottom:380}}/>
      <div style={{position:'absolute',left:52,right:52,top:76,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontFamily:'Arial',fontSize:21,letterSpacing:5,color:T.ice,fontWeight:700}}>SCIENCE / LAB</div>
        <GlassPanel style={{padding:'12px 22px',borderRadius:40,fontFamily:'Arial',fontSize:20,color:T.white}}>{data.no} / 04</GlassPanel>
      </div>
      <GlassPanel style={{position:'absolute',left:48,right:48,bottom:150,padding:'38px 34px 42px'}}>
        <AnimatedText delay={8} style={{fontFamily:'Arial',fontSize:21,letterSpacing:5,color:T.blue,fontWeight:700}}>{data.tag}</AnimatedText>
        <AnimatedText delay={15} style={{fontFamily:'Arial',fontSize:61,lineHeight:1.06,fontWeight:800,color:T.white,whiteSpace:'pre-line',letterSpacing:-2,marginTop:20}}>{data.title.replace('\\n','\n')}</AnimatedText>
        <AnimatedText delay={28}>
          <div style={{height:4,width:105,background:T.blue,borderRadius:8,margin:'24px 0'}}/>
          <div style={{fontFamily:'Arial',fontSize:27,lineHeight:1.42,color:'#D9E9F4'}}>{data.body}</div>
        </AnimatedText>
        <div style={{marginTop:28,paddingTop:20,borderTop:'1px solid rgba(230,248,255,.2)',fontFamily:'Arial',fontSize:18,letterSpacing:3,color:T.blue}}>{data.method}</div>
      </GlassPanel>
      <div style={{position:'absolute',bottom:75,left:70,right:70,display:'flex',gap:10}}>
        {chapters.map((_,i)=><div key={i} style={{height:5,flex:1,borderRadius:8,background:i<=index?T.blue:'rgba(255,255,255,.35)'}}/>)}
      </div>
    </AbsoluteFill>
  );
};

const Outro: React.FC = () => {
  const f=useCurrentFrame();
  const p=interpolate(f,[0,15,120,145],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  return <AbsoluteFill style={{opacity:p}}><Ambient/><div style={{position:'absolute',top:'35%',left:65,right:65,textAlign:'center'}}>
    <AnimatedText delay={8}><div style={{fontFamily:'Arial',fontSize:76,fontWeight:800,color:T.white,lineHeight:1.1}}>Ilmu dimulai<br/><span style={{color:T.blue}}>dari pengamatan.</span></div></AnimatedText>
    <div style={{fontFamily:'Arial',fontSize:25,color:T.muted,letterSpacing:4,marginTop:35}}>METODE PEMISAHAN CAMPURAN</div>
  </div></AbsoluteFill>;
};

export const PraktikumVideo: React.FC = () => (
  <AbsoluteFill style={{background:T.bg}}>
    <Audio src={staticFile('music.wav')} volume={0.55}/>
    <Sequence from={0} durationInFrames={125}><Intro/></Sequence>
    {chapters.map((c,i)=><Sequence key={c.no} from={110+i*180} durationInFrames={180}><Chapter data={c} index={i}/></Sequence>)}
    <Sequence from={830} durationInFrames={70}><Outro/></Sequence>
  </AbsoluteFill>
);

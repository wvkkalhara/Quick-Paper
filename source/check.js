const fs=require('fs');
let src=fs.readFileSync('q1.js','utf8')+fs.readFileSync('q2.js','utf8')+fs.readFileSync('q3.js','utf8');
const fn = new Function(src + '\nreturn {QS1,QS2,QS3};');
const {QS1,QS2,QS3} = fn();
const ALL=[...QS1,...QS2,...QS3].sort((a,b)=>a.n-b.n);
const official={1:5,2:1,3:5,4:1,5:5,6:3,7:3,8:2,9:3,10:5,11:2,12:4,13:5,14:4,15:4,16:1,17:5,18:2,19:4,20:3,21:4,22:2,23:2,24:3,25:2,26:1,27:1,28:3,29:2,30:5,31:4,32:2,33:2,34:3,35:3,36:4,37:2,38:3,39:5,40:1,41:3,42:1,43:1,44:1,45:4,46:1,47:4,48:2,49:4,50:5};
const UNITS={m:1,y:1,p:1,t:1,th:1,v:1,e:1,n:1};
let err=0, dist={}, expl={};
for(const q of ALL){
  if(q.o.length!==5){console.log('BAD OPTS',q.n,q.o.length);err++;}
  if(!(q.a>=1&&q.a<=5)){console.log('BAD ANS',q.n);err++;}
  if(q.o.some(o=>!o||!String(o).trim())){console.log('EMPTY OPT',q.n);err++;}
  if(!q.e||q.e.length<40){console.log('SHORT EXPL',q.n);err++;}
  if(!q.k||q.k.length<15){console.log('SHORT KEY',q.n);err++;}
  if(official[q.n]!==q.a){console.log('KEY MISMATCH',q.n,'mine',q.a,'official',official[q.n]);err++;}
  if(!UNITS[q.t]){console.log('BAD UNIT',q.n,q.t);err++;}
  dist[q.a]=(dist[q.a]||0)+1;
}
for(let i=1;i<=50;i++){ if(!ALL.find(q=>q.n===i)){console.log('MISSING',i);err++;} }
console.log('total',ALL.length,'| errors',err);
console.log('answer dist',dist);
const units={}; ALL.forEach(q=>units[q.t]=(units[q.t]||0)+1); console.log('units',units);
const dup=ALL.map(q=>q.q).filter((v,i,a)=>a.indexOf(v)!==i); console.log('dup questions',dup.length);

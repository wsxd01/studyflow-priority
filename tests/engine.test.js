import test from 'node:test';import assert from 'node:assert/strict';import {analyze,allocate,sampleForToday,daysUntil} from '../src/engine.js';
test('샘플 4과목 분석',()=>assert.equal(analyze(sampleForToday()).length,4));
test('과거 시험 제외',()=>assert.equal(analyze([{id:'a',name:'A',date:'2020-01-01',hours:2,readiness:30,importance:3}]).length,0));
test('우선순위 내림차순',()=>{const x=analyze(sampleForToday());assert.ok(x.every((v,i)=>i===0||x[i-1].score>=v.score));});
test('시간 예산 초과 없음',()=>{const x=allocate(analyze(sampleForToday()),90);const dates=[...new Set(x.sessions.map(s=>s.date))];for(const d of dates)assert.ok(x.sessions.filter(s=>s.date===d).reduce((a,s)=>a+s.minutes,0)<=90);});
test('음수 분량 없음',()=>{const x=allocate(analyze(sampleForToday()),180);assert.ok(Object.values(x.unallocated).every(v=>v>=0));});
test('날짜 계산',()=>assert.equal(daysUntil('2026-11-16',new Date(2026,10,14)),2));

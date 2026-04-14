import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────── GLOBAL CSS ─────────────────────────── */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #06060f;
  --surface: #0d0d1f;
  --surface2: #13132a;
  --surface3: #1a1a35;
  --border: rgba(255,255,255,0.06);
  --border2: rgba(255,255,255,0.12);
  --text: #f0efff;
  --text2: #8b8aad;
  --text3: #5a5980;
  --purple: #7c6df8;
  --purple-glow: rgba(124,109,248,0.25);
  --blue: #4da6ff;
  --blue-glow: rgba(77,166,255,0.2);
  --teal: #2de8b0;
  --teal-glow: rgba(45,232,176,0.2);
  --coral: #ff6b6b;
  --coral-glow: rgba(255,107,107,0.2);
  --amber: #ffbe5c;
  --amber-glow: rgba(255,190,92,0.2);
  --green: #6be88a;
  --green-glow: rgba(107,232,138,0.2);
  --r: 0.866;
}

body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; }

@keyframes float { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-18px) rotate(3deg); } }
@keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(2.2); opacity: 0; } }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
@keyframes slideRight { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes glow-pulse { 0%,100% { box-shadow: 0 0 20px var(--purple-glow), 0 0 40px var(--purple-glow); } 50% { box-shadow: 0 0 40px var(--purple-glow), 0 0 80px var(--purple-glow); } }
@keyframes orbit { from { transform: rotate(0deg) translateX(120px) rotate(0deg); } to { transform: rotate(360deg) translateX(120px) rotate(-360deg); } }
@keyframes matrix-rain { 0% { transform: translateY(-100%); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 0.3; } 100% { transform: translateY(100vh); opacity: 0; } }
@keyframes spin3d { from { transform: perspective(600px) rotateY(0deg); } to { transform: perspective(600px) rotateY(360deg); } }
@keyframes tilt { 0%,100% { transform: perspective(400px) rotateX(0deg) rotateY(0deg); } 25% { transform: perspective(400px) rotateX(2deg) rotateY(3deg); } 75% { transform: perspective(400px) rotateX(-2deg) rotateY(-3deg); } }
@keyframes ping { 0% { transform: scale(1); opacity: 1; } 75%,100% { transform: scale(2); opacity: 0; } }
@keyframes bounce-dot { 0%,80%,100% { transform: scale(0); } 40% { transform: scale(1); } }
@keyframes xp-fill { from { width: 0; } to { width: var(--target-w); } }

.btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px; border-radius: 14px;
  background: linear-gradient(135deg, var(--purple), #5c4fe0);
  border: 1px solid rgba(124,109,248,0.5);
  color: #fff; font-family: 'Syne', sans-serif; font-weight: 600;
  font-size: 15px; cursor: pointer; letter-spacing: 0.3px;
  box-shadow: 0 4px 24px var(--purple-glow), 0 1px 0 rgba(255,255,255,0.1) inset;
  transition: all 0.3s cubic-bezier(.34,1.56,.64,1);
  position: relative; overflow: hidden;
}
.btn-primary::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
  opacity: 0; transition: opacity 0.3s;
}
.btn-primary:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 8px 32px var(--purple-glow); }
.btn-primary:hover::before { opacity: 1; }
.btn-primary:active { transform: translateY(0) scale(0.98); }

.btn-ghost {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 10px 18px; border-radius: 10px;
  background: var(--surface2); border: 1px solid var(--border2);
  color: var(--text2); font-family: 'DM Sans', sans-serif; font-size: 14px;
  cursor: pointer; transition: all 0.2s;
}
.btn-ghost:hover { background: var(--surface3); color: var(--text); border-color: var(--border2); transform: translateY(-1px); }
.btn-ghost:disabled { opacity: 0.3; cursor: not-allowed; transform: none; }

.card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 18px; overflow: hidden;
  transition: all 0.4s cubic-bezier(.34,1.2,.64,1);
}
.card:hover { border-color: var(--border2); transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }

.chip {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 4px 10px; border-radius: 20px;
  font-size: 11px; font-weight: 500; letter-spacing: 0.3px;
}

.section-tab {
  padding: 8px 16px; border-radius: 30px; border: 1px solid var(--border2);
  background: transparent; color: var(--text2); font-family: 'DM Sans', sans-serif;
  font-size: 12px; cursor: pointer; transition: all 0.2s; white-space: nowrap;
}
.section-tab.active { background: var(--purple); border-color: var(--purple); color: #fff; }
.section-tab.done { background: rgba(107,232,138,0.1); border-color: rgba(107,232,138,0.3); color: var(--green); }

.matrix-cell {
  width: 46px; height: 46px; border: 1px solid var(--border2); border-radius: 8px;
  background: var(--surface2); color: var(--text); font-size: 16px; font-weight: 600;
  cursor: pointer; transition: all 0.2s; font-family: 'Syne', sans-serif;
  display: flex; align-items: center; justify-content: center;
}
.matrix-cell:hover { background: var(--surface3); border-color: var(--purple); }
.matrix-cell.val-1 { background: rgba(124,109,248,0.15); border-color: var(--purple); color: var(--purple); }
.matrix-cell.val-0 { background: rgba(255,255,255,0.03); color: var(--text3); }
.matrix-cell.correct { background: rgba(107,232,138,0.15); border-color: var(--green); color: var(--green); }
.matrix-cell.wrong { background: rgba(255,107,107,0.15); border-color: var(--coral); color: var(--coral); }

.quiz-answer {
  padding: 14px 18px; border-radius: 12px; border: 1.5px solid var(--border2);
  background: var(--surface2); color: var(--text); font-family: 'DM Sans', sans-serif;
  font-size: 14px; text-align: left; cursor: pointer; transition: all 0.2s; width: 100%;
}
.quiz-answer:hover:not(:disabled) { border-color: var(--purple); background: rgba(124,109,248,0.08); transform: translateX(4px); }
.quiz-answer.correct { background: rgba(107,232,138,0.12); border-color: var(--green); color: var(--green); }
.quiz-answer.wrong { background: rgba(255,107,107,0.12); border-color: var(--coral); color: var(--coral); }
.quiz-answer:disabled { cursor: default; }

.def-card {
  padding: 16px 18px; border-radius: 14px; border: 1px solid var(--border);
  background: var(--surface); transition: all 0.3s; cursor: default;
  animation: fadeUp 0.4s ease both;
}
.def-card:hover { border-color: var(--border2); transform: translateY(-2px) scale(1.01); }

.progress-bar-track {
  height: 4px; background: var(--surface3); border-radius: 4px; overflow: hidden;
}
.progress-bar-fill {
  height: 100%; border-radius: 4px;
  background: linear-gradient(90deg, var(--purple), var(--blue));
  transition: width 0.6s cubic-bezier(.34,1.2,.64,1);
}

::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--surface3); border-radius: 4px; }
`;

/* ─────────────────────────── COLORS ─────────────────────────── */
const C = {
  purple: { color: "var(--purple)", glow: "var(--purple-glow)", rgb: "124,109,248", icon: "◎" },
  blue:   { color: "var(--blue)",   glow: "var(--blue-glow)",   rgb: "77,166,255",  icon: "⊞" },
  teal:   { color: "var(--teal)",   glow: "var(--teal-glow)",   rgb: "45,232,176",  icon: "↺" },
  coral:  { color: "var(--coral)",  glow: "var(--coral-glow)",  rgb: "255,107,107", icon: "▶" },
  amber:  { color: "var(--amber)",  glow: "var(--amber-glow)",  rgb: "255,190,92",  icon: "★" },
  green:  { color: "var(--green)",  glow: "var(--green-glow)",  rgb: "107,232,138", icon: "✓" },
};

/* ─────────────────────────── CHAPTERS ─────────────────────────── */
const CHAPTERS = [
  { id: "graphes-bases", title: "Graphes orientés",      subtitle: "Sommets, arcs & représentations",      icon: "◎", color: "purple", xp: 100, difficulty: "Débutant",       sections: 6 },
  { id: "matrices",      title: "Matrices adjacentes",   subtitle: "Opérations booléennes & puissances",   icon: "⊞", color: "blue",   xp: 150, difficulty: "Intermédiaire",  sections: 5 },
  { id: "fermeture",     title: "Fermeture transitive",  subtitle: "Chemins indirects & accessibilité",    icon: "↺", color: "teal",   xp: 150, difficulty: "Intermédiaire",  sections: 4 },
  { id: "pert",          title: "Méthode PERT / MPM",    subtitle: "Ordonnancement & chemin critique",      icon: "▶", color: "coral",  xp: 200, difficulty: "Avancé",         sections: 7 },
];

/* ─────────────────────────── LESSON DATA ─────────────────────────── */
const LESSON_GRAPHES = {
  title: "Graphes orientés", color: "purple",
  sections: [
    {
      id: "accroche", label: "Mise en situation", type: "hook",
      content: {
        question: "Comment planifier 7 villes reliées par des routes à sens unique ?",
        context: "Un réseau de villes, des routes, des directions… C'est exactement un graphe orienté !",
        nodes: [
          { id: "A", x: 120, y: 80,  label: "Paris" },
          { id: "B", x: 280, y: 60,  label: "Lyon" },
          { id: "C", x: 400, y: 130, label: "Nice" },
          { id: "D", x: 200, y: 200, label: "Dijon" },
          { id: "E", x: 350, y: 230, label: "Marseille" },
        ],
        edges: [
          { from: "A", to: "B" }, { from: "A", to: "D" },
          { from: "B", to: "C" }, { from: "B", to: "D" },
          { from: "D", to: "E" }, { from: "C", to: "E" }, { from: "A", to: "A" },
        ],
      },
    },
    {
      id: "definitions", label: "Définitions clés", type: "learn",
      cards: [
        { term: "Sommet", symbol: "•", def: "Un point (nœud) du graphe. Ex : une ville, une étape, une tâche.", color: "purple" },
        { term: "Arc", symbol: "→", def: "Une flèche orientée reliant deux sommets. Ex : route à sens unique.", color: "blue" },
        { term: "Chemin", symbol: "⤳", def: "Suite ordonnée de sommets reliés par des arcs. Ex : (A, B, C).", color: "teal" },
        { term: "Circuit", symbol: "↺", def: "Chemin dont le premier et dernier sommet sont identiques. Ex : (B, D, C, B).", color: "coral" },
        { term: "Boucle", symbol: "⊙", def: "Arc qui repart du même sommet. Ex : (A, A).", color: "amber" },
        { term: "Chemin hamiltonien", symbol: "★", def: "Chemin passant une seule fois par TOUS les sommets.", color: "green" },
      ],
    },
    {
      id: "predecesseurs", label: "Prédécesseurs & successeurs", type: "interactive-graph",
      graph: {
        nodes: [
          { id: "A", x: 80,  y: 120 }, { id: "B", x: 220, y: 60  },
          { id: "C", x: 220, y: 180 }, { id: "D", x: 360, y: 120 },
        ],
        edges: [
          { from: "A", to: "A" }, { from: "A", to: "B" }, { from: "A", to: "C" },
          { from: "A", to: "D" }, { from: "B", to: "D" }, { from: "D", to: "C" }, { from: "C", to: "B" },
        ],
        table: {
          A: { succ: ["A","B","C","D"], pred: ["A"] },
          B: { succ: ["D"],            pred: ["A","C"] },
          C: { succ: ["B"],            pred: ["A","D"] },
          D: { succ: ["C"],            pred: ["A","B"] },
        },
      },
    },
    {
      id: "matrice", label: "Matrice adjacente", type: "matrix",
      nodes: ["A","B","C","D"],
      solution: [[1,1,1,1],[0,0,0,1],[0,1,0,0],[0,0,1,0]],
      explanation: "La case (i,j) vaut 1 s'il existe un arc du sommet i vers le sommet j, 0 sinon.",
    },
    {
      id: "quiz", label: "Mini quiz", type: "quiz",
      questions: [
        { q: "Dans un graphe, qu'est-ce qu'un circuit ?", answers: ["Un chemin passant par tous les sommets","Un chemin dont le point de départ = point d'arrivée","Un arc allant dans les deux sens","Une boucle sur un sommet"], correct: 1, explanation: "Un circuit part d'un sommet et revient au même. Ex : (B, D, C, B)." },
        { q: "Que représente un '1' dans une matrice adjacente ?", answers: ["La longueur de l'arc","L'existence d'un chemin de longueur n","L'existence d'un arc direct entre deux sommets","La valeur du sommet"], correct: 2, explanation: "Un 1 en position (i,j) signifie qu'il existe un arc direct de i vers j." },
        { q: "Un graphe simple orienté...", answers: ["Ne contient pas de circuits","N'a que des boucles","A des arcs dans les deux sens","A toujours n² arcs"], correct: 0, explanation: "Un graphe simple orienté est sans circuit (ni boucle), ce qui permet de l'ordonner par niveaux." },
        { q: "Combien d'arcs a le graphe G = {(A,B),(B,C),(C,A),(A,A)} ?", answers: ["3","4","5","6"], correct: 1, explanation: "4 couples = 4 arcs : (A,B), (B,C), (C,A) et la boucle (A,A)." },
        { q: "Le chemin (A, B, D, C) est hamiltonien si le graphe a pour sommets {A,B,C,D} ?", answers: ["Oui, car il passe par tous les sommets exactement une fois","Non, car il revient au départ","Non, car il contient une boucle","Oui, seulement si c'est un circuit"], correct: 0, explanation: "Il passe une seule fois par A, B, D et C → hamiltonien ✓" },
      ],
    },
    {
      id: "dst", label: "Mode avant DST", type: "dst",
      points: [
        { icon: "•", text: "Sommets = points / Arcs = flèches orientées", color: "purple" },
        { icon: "→", text: "Chemin : suite de sommets reliés par des arcs", color: "blue" },
        { icon: "↺", text: "Circuit = chemin qui revient au point de départ", color: "teal" },
        { icon: "⊙", text: "Boucle = arc (A,A) qui repart du même sommet", color: "coral" },
        { icon: "⊞", text: "Matrice M : mij = 1 si arc de i→j, 0 sinon", color: "amber" },
        { icon: "★", text: "Chemin hamiltonien = passe une fois par TOUS les sommets", color: "green" },
      ],
    },
  ],
};

const LESSON_MATRICES = {
  title: "Matrices adjacentes", color: "blue",
  sections: [
    {
      id: "accroche-mat", label: "Mise en situation", type: "hook",
      content: {
        question: "Peut-on aller de A à C en exactement 2 étapes ?",
        context: "La matrice adjacente au carré (M²) répond directement : multiplier des matrices avec l'algèbre booléenne !",
        nodes: [
          { id: "A", x: 80,  y: 120 },
          { id: "B", x: 240, y: 50  },
          { id: "C", x: 380, y: 120 },
          { id: "D", x: 240, y: 200 },
        ],
        edges: [
          { from: "A", to: "B" }, { from: "A", to: "D" },
          { from: "B", to: "C" }, { from: "D", to: "C" },
          { from: "C", to: "A" },
        ],
      },
    },
    {
      id: "bool-ops", label: "Algèbre booléenne", type: "learn",
      cards: [
        { term: "Addition booléenne", symbol: "∨", def: "0∨0=0, 0∨1=1, 1∨0=1, 1∨1=1. C'est le OU logique : vrai dès qu'un opérande est 1.", color: "blue" },
        { term: "Multiplication booléenne", symbol: "∧", def: "0∧0=0, 0∧1=0, 1∧0=0, 1∧1=1. C'est le ET logique : vrai seulement si les deux sont 1.", color: "purple" },
        { term: "Matrice M¹", symbol: "M", def: "Matrice adjacente de base : M[i][j]=1 s'il existe un arc direct de i vers j.", color: "teal" },
        { term: "Matrice M²", symbol: "M²", def: "Chemins de longueur exactement 2 entre i et j. M²[i][j] = ∨ₖ (M[i][k] ∧ M[k][j]).", color: "coral" },
        { term: "Matrice Mⁿ", symbol: "Mⁿ", def: "Chemins de longueur exactement n. On élève M à la puissance n en booléen.", color: "amber" },
        { term: "Interprétation", symbol: "?", def: "Mⁿ[i][j]=1 signifie qu'il existe au moins un chemin de longueur n de i vers j.", color: "green" },
      ],
    },
    {
      id: "calcul-m2", label: "Calculer M²", type: "matrix-power",
      nodes: ["A","B","C","D"],
      M1: [[0,1,0,1],[0,0,1,0],[1,0,0,0],[0,0,1,0]],
      M2: [[0,0,1,0],[1,0,0,0],[0,1,0,1],[1,0,0,0]],
      explanation: "Pour M²[i][j] : on fait le OU de tous les (M[i][k] ET M[k][j]) pour k=A,B,C,D.",
    },
    {
      id: "quiz-mat", label: "Mini quiz", type: "quiz",
      questions: [
        { q: "En algèbre booléenne, que vaut 1 ∨ 1 ?", answers: ["0","1","2","Indéfini"], correct: 1, explanation: "En booléen, 1∨1=1. On ne dépasse jamais 1, contrairement à l'arithmétique classique." },
        { q: "Que représente M²[i][j] = 1 ?", answers: ["Un arc direct de i vers j","Un chemin de longueur 2 de i vers j","La somme des chemins","Un circuit de longueur 2"], correct: 1, explanation: "M² encode les chemins de longueur exactement 2 : il faut passer par exactement un intermédiaire k." },
        { q: "Pour calculer M²[A][C], on calcule :", answers: ["M[A][C]","∨ₖ (M[A][k] ∧ M[k][C]) pour tout k","M[A][C] + M[C][A]","M[A][A] × M[A][C]"], correct: 1, explanation: "On parcourt tous les sommets k intermédiaires : si M[A][k]=1 ET M[k][C]=1, alors M²[A][C]=1." },
        { q: "Si M³[i][j] = 1, cela signifie :", answers: ["3 arcs directs de i vers j","Un chemin passant par exactement 2 intermédiaires","Un circuit de longueur 3","La matrice identité"], correct: 1, explanation: "M³ capture les chemins de longueur 3, passant par exactement 2 sommets intermédiaires." },
      ],
    },
    {
      id: "dst-mat", label: "Mode avant DST", type: "dst",
      points: [
        { icon: "∨", text: "Booléen : 1∨1=1, 1∧0=0 — jamais de 2 !", color: "blue" },
        { icon: "M", text: "M[i][j]=1 → arc direct i→j (longueur 1)", color: "purple" },
        { icon: "M²", text: "M²[i][j] = ∨ₖ (M[i][k] ∧ M[k][j]) — chemins de longueur 2", color: "teal" },
        { icon: "Mⁿ", text: "Mⁿ encode tous les chemins de longueur exactement n", color: "coral" },
        { icon: "?", text: "Mⁿ[i][j]=1 ⟺ il existe un chemin de longueur n de i vers j", color: "amber" },
      ],
    },
  ],
};

const LESSON_FERMETURE = {
  title: "Fermeture transitive", color: "teal",
  sections: [
    {
      id: "accroche-fer", label: "Mise en situation", type: "hook",
      content: {
        question: "Peut-on atteindre C depuis A en passant par n'importe quel nombre d'étapes ?",
        context: "La fermeture transitive T+ regroupe TOUS les chemins possibles (de longueur 1 à n). Si T+[A][C]=1, c'est atteignable !",
        nodes: [
          { id: "A", x: 60,  y: 130 },
          { id: "B", x: 200, y: 60  },
          { id: "C", x: 350, y: 130 },
          { id: "D", x: 200, y: 210 },
        ],
        edges: [
          { from: "A", to: "B" }, { from: "B", to: "C" },
          { from: "C", to: "D" }, { from: "D", to: "A" },
        ],
      },
    },
    {
      id: "def-fermeture", label: "Définitions", type: "learn",
      cards: [
        { term: "Accessibilité", symbol: "→*", def: "j est accessible depuis i s'il existe un chemin de i vers j (quelle que soit sa longueur).", color: "teal" },
        { term: "Fermeture transitive T+", symbol: "T+", def: "T+ = M¹ ∨ M² ∨ M³ ∨ … ∨ Mⁿ. On fait le OU booléen de toutes les puissances jusqu'à n.", color: "blue" },
        { term: "Algorithme de Roy-Warshall", symbol: "⊕", def: "Méthode efficace en O(n³) : pour chaque sommet intermédiaire k, on met à jour la matrice.", color: "purple" },
        { term: "Matrice T+ finale", symbol: "✓", def: "T+[i][j]=1 ⟺ j est accessible depuis i par au moins un chemin de longueur ≥1.", color: "green" },
        { term: "Composante fortement connexe", symbol: "↔", def: "Si T+[i][j]=1 ET T+[j][i]=1, alors i et j sont dans la même composante fortement connexe.", color: "coral" },
      ],
    },
    {
      id: "roy-warshall", label: "Algorithme Roy-Warshall", type: "warshall",
      nodes: ["A","B","C","D"],
      M1: [[0,1,0,0],[0,0,1,0],[0,0,0,1],[1,0,0,0]],
      T_final: [[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1]],
      explanation: "Pour chaque k intermédiaire : T[i][j] = T[i][j] ∨ (T[i][k] ∧ T[k][j])",
    },
    {
      id: "quiz-fer", label: "Mini quiz", type: "quiz",
      questions: [
        { q: "Que signifie T+[A][D] = 1 ?", answers: ["Il y a un arc direct de A vers D","D est accessible depuis A en au moins une étape","A et D sont le même sommet","Il y a exactement un chemin de A vers D"], correct: 1, explanation: "T+[A][D]=1 signifie qu'il existe au moins un chemin (de n'importe quelle longueur) de A vers D." },
        { q: "Comment calcule-t-on T+ ?", answers: ["T+ = M seulement","T+ = M ∨ M² ∨ … ∨ Mⁿ","T+ = M × n","T+ = Mⁿ uniquement"], correct: 1, explanation: "On fait le OU booléen de toutes les puissances M¹ jusqu'à Mⁿ pour capturer tous les chemins possibles." },
        { q: "L'algorithme de Roy-Warshall a une complexité de :", answers: ["O(n)","O(n²)","O(n³)","O(2ⁿ)"], correct: 2, explanation: "Roy-Warshall est en O(n³) : trois boucles imbriquées sur les n sommets." },
        { q: "Si T+[i][j]=1 ET T+[j][i]=1, alors :", answers: ["i = j","Il y a une boucle","i et j sont fortement connexes","Le graphe est hamiltonien"], correct: 2, explanation: "Accessibilité mutuelle = composante fortement connexe. On peut aller de i vers j ET de j vers i." },
      ],
    },
  ],
};

const LESSON_PERT = {
  title: "Méthode PERT / MPM", color: "coral",
  sections: [
    {
      id: "intro-pert", label: "C'est quoi PERT ?", type: "hook",
      content: {
        question: "Comment construire un immeuble en un minimum de temps avec 10 tâches dépendantes ?",
        context: "La méthode PERT (1958) ordonne des tâches pour minimiser la durée d'un projet. C'est un graphe pondéré !",
        nodes: [
          { id: "Début", x: 60, y: 130, label: "Début" },
          { id: "A", x: 180, y: 60, label: "A:1j" },
          { id: "B", x: 180, y: 200, label: "B:2j" },
          { id: "D", x: 180, y: 330, label: "D:3j" },
          { id: "E", x: 310, y: 60, label: "E:4j" },
          { id: "F", x: 310, y: 200, label: "F:1j" },
          { id: "C", x: 310, y: 330, label: "C:6j" },
          { id: "Fin", x: 460, y: 130, label: "Fin" },
        ],
        edges: [
          { from: "Début", to: "A" }, { from: "Début", to: "B" }, { from: "Début", to: "D" },
          { from: "A", to: "E" }, { from: "B", to: "F" }, { from: "D", to: "C" },
          { from: "E", to: "Fin" }, { from: "F", to: "Fin" }, { from: "C", to: "Fin" },
        ],
      },
    },
    {
      id: "methode-pert", label: "Les 4 étapes", type: "learn",
      cards: [
        { term: "Étape 1", symbol: "①", def: "Ordonner les tâches par niveaux (tableau d'antériorité)", color: "coral" },
        { term: "Étape 2", symbol: "②", def: "Tracer le graphe MPM avec cases Nom:Durée + dates", color: "blue" },
        { term: "Étape 3", symbol: "③", def: "Calculer dates au plus tôt (gauche→droite) et au plus tard (droite→gauche)", color: "teal" },
        { term: "Étape 4", symbol: "④", def: "Identifier le chemin critique = tâches où date tôt = date tard", color: "amber" },
        { term: "Marge totale", symbol: "MT", def: "MT = date tard − date tôt. Retard max sans retarder le projet.", color: "purple" },
        { term: "Marge libre", symbol: "ML", def: "ML = min(date tôt suivant) − date tôt − durée. Retard sans retarder la tâche suivante.", color: "green" },
      ],
    },
    {
      id: "pert-table", label: "Tableau d'antériorité", type: "pert-table",
    },
    {
      id: "quiz-pert", label: "Mini quiz PERT", type: "quiz",
      questions: [
        { q: "Qu'est-ce que le chemin critique ?", answers: ["Le chemin le plus court du graphe","Le chemin où toutes les marges totales sont nulles","La première tâche à réaliser","Les tâches en parallèle"], correct: 1, explanation: "Le chemin critique regroupe les tâches avec MT = 0. Tout retard dessus retarde le projet." },
        { q: "Comment calcule-t-on la date au plus tôt d'une tâche J ?", answers: ["Durée de J × nombre de tâches","Max(date tôt du prédécesseur + durée du prédécesseur)","Min(date tard du successeur − durée de J)","Somme de toutes les durées précédentes"], correct: 1, explanation: "Date tôt(J) = max des (date tôt(L) + durée(L)) pour chaque prédécesseur L." },
        { q: "La tâche A a : date tôt = 3, date tard = 7. Sa marge totale est ?", answers: ["3","4","7","10"], correct: 1, explanation: "MT = date tard − date tôt = 7 − 3 = 4 jours." },
        { q: "Une tâche sur le chemin critique a une marge totale de ?", answers: ["1","0","−1","Variable"], correct: 1, explanation: "MT = 0 sur le chemin critique : tout retard se répercute directement sur la fin du projet." },
      ],
    },
    {
      id: "dst-pert", label: "Mode avant DST", type: "dst",
      points: [
        { icon: "①", text: "Niveaux : sommets sans prédécesseurs = niveau 0, puis itérer", color: "coral" },
        { icon: "②", text: "Graphe MPM : cases [Tâche:durée | tôt | tard]", color: "blue" },
        { icon: "③", text: "Date tôt = max(tôt prédécesseur + durée prédécesseur)", color: "teal" },
        { icon: "④", text: "Date tard = min(tard successeur − durée tâche)", color: "amber" },
        { icon: "MT", text: "Marge totale = tard − tôt (retard max sans retarder projet)", color: "purple" },
        { icon: "★", text: "Chemin critique = succession de tâches avec MT = 0", color: "green" },
      ],
    },
  ],
};

/* ─────────────────────────── HOOK XP ─────────────────────────── */
function useXP() {
  const [xp, setXP] = useState(() => parseInt(localStorage.getItem("xp") || "0"));
  const [level, setLevel] = useState(1);
  const [badges, setBadges] = useState(() => JSON.parse(localStorage.getItem("badges") || "[]"));
  const [streak] = useState(() => parseInt(localStorage.getItem("streak") || "1"));
  const [floatingXP, setFloatingXP] = useState(null);

  useEffect(() => { setLevel(Math.floor(xp / 100) + 1); localStorage.setItem("xp", xp); }, [xp]);

  const addXP = useCallback((amount, badgeName) => {
    setXP(prev => prev + amount);
    setFloatingXP({ amount, id: Date.now() });
    setTimeout(() => setFloatingXP(null), 1500);
    if (badgeName && !badges.includes(badgeName)) {
      setBadges(prev => {
        const next = [...prev, badgeName];
        localStorage.setItem("badges", JSON.stringify(next));
        return next;
      });
    }
  }, [badges]);

  return { xp, level, badges, streak, addXP, floatingXP };
}

/* ─────────────────────────── GRAPH SVG ─────────────────────────── */
function GraphSVG({ nodes, edges, interactive = false, highlightNode = null, onNodeClick, accentColor = "purple" }) {
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));
  const w = Math.max(...nodes.map(n => n.x)) + 80;
  const h = Math.max(...nodes.map(n => n.y)) + 60;
  const col = C[accentColor]?.color || "var(--purple)";

  function arrowPath(from, to, selfLoop = false) {
    if (selfLoop) {
      return `M${from.x - 12},${from.y - 18} C${from.x - 30},${from.y - 55} ${from.x + 30},${from.y - 55} ${from.x + 12},${from.y - 18}`;
    }
    const dx = to.x - from.x, dy = to.y - from.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / len, uy = dy / len;
    const r = 22;
    const sx = from.x + ux * r, sy = from.y + uy * r;
    const ex = to.x - ux * (r + 6), ey = to.y - uy * (r + 6);
    const mx = (sx + ex) / 2 - uy * 15, my = (sy + ey) / 2 + ux * 15;
    return `M${sx},${sy} Q${mx},${my} ${ex},${ey}`;
  }

  const rgb = C[accentColor]?.rgb || "124,109,248";

  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", maxHeight: 280, overflow: "visible" }}>
      <defs>
        <marker id={`arr-${accentColor}`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill={col} />
        </marker>
        <marker id={`arr-hi-${accentColor}`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="var(--coral)" />
        </marker>
        <filter id="glow-node">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {edges.map((e, i) => {
        const self = e.from === e.to;
        const fromNode = nodeMap[e.from], toNode = nodeMap[e.to];
        if (!fromNode || !toNode) return null;
        const hi = highlightNode && (e.from === highlightNode || e.to === highlightNode);
        return (
          <path key={i} d={arrowPath(fromNode, toNode, self)}
            fill="none"
            stroke={hi ? "var(--coral)" : col}
            strokeWidth={hi ? 2.5 : 1.5}
            markerEnd={`url(#${hi ? `arr-hi-${accentColor}` : `arr-${accentColor}`})`}
            opacity={hi ? 1 : 0.5}
            style={{ transition: "all 0.3s" }}
          />
        );
      })}
      {nodes.map((n, idx) => {
        const hi = highlightNode === n.id;
        return (
          <g key={n.id} onClick={() => onNodeClick && onNodeClick(n.id)}
            style={{ cursor: interactive ? "pointer" : "default", animation: `fadeIn 0.4s ${idx * 0.08}s ease both` }}>
            {hi && <circle cx={n.x} cy={n.y} r={30} fill={`rgba(${rgb},0.08)`} style={{ animation: "pulse-ring 1.5s infinite" }} />}
            <circle cx={n.x} cy={n.y} r={22}
              fill={hi ? `rgba(${rgb},0.15)` : "rgba(255,255,255,0.04)"}
              stroke={hi ? col : `rgba(${rgb},0.4)`}
              strokeWidth={hi ? 2.5 : 1.5}
              filter={hi ? "url(#glow-node)" : ""}
              style={{ transition: "all 0.3s" }}
            />
            <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="central"
              fontSize="13" fontWeight="600" fill={hi ? col : "var(--text)"} fontFamily="Syne, sans-serif"
              style={{ transition: "fill 0.3s" }}>{n.id}</text>
            {n.label && (
              <text x={n.x} y={n.y + 34} textAnchor="middle" fontSize="9" fill="var(--text3)">{n.label}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ─────────────────────────── MATRIX BUILDER ─────────────────────────── */
function MatrixBuilder({ nodes, solution, onComplete }) {
  const n = nodes.length;
  const [matrix, setMatrix] = useState(() => Array(n).fill(null).map(() => Array(n).fill(null)));
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(0);

  function toggle(r, c) {
    if (revealed) return;
    setMatrix(prev => {
      const next = prev.map(row => [...row]);
      next[r][c] = next[r][c] === 1 ? 0 : next[r][c] === 0 ? null : 1;
      return next;
    });
  }

  function check() {
    let c = 0;
    for (let r = 0; r < n; r++)
      for (let cc = 0; cc < n; cc++)
        if (matrix[r][cc] === solution[r][cc]) c++;
    setCorrect(c);
    setRevealed(true);
    if (c === n * n) onComplete && onComplete();
  }

  return (
    <div>
      <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 16 }}>
        Cliquez sur chaque case : <span style={{ color: "var(--purple)", fontWeight: 500 }}>vide → 1 → 0 → vide</span>
      </p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "separate", borderSpacing: 4, margin: "0 auto" }}>
          <thead>
            <tr>
              <th style={{ width: 36 }}></th>
              {nodes.map(nd => (
                <th key={nd} style={{ width: 46, textAlign: "center", fontSize: 13, fontWeight: 600, color: "var(--blue)", fontFamily: "Syne, sans-serif" }}>{nd}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {nodes.map((row, r) => (
              <tr key={row}>
                <td style={{ fontSize: 13, fontWeight: 600, color: "var(--blue)", textAlign: "right", paddingRight: 8, fontFamily: "Syne, sans-serif" }}>{row}</td>
                {nodes.map((col, c) => {
                  const val = matrix[r][c];
                  const sol = solution[r][c];
                  let cls = "matrix-cell";
                  if (revealed) cls += val === sol ? " correct" : " wrong";
                  else if (val === 1) cls += " val-1";
                  else if (val === 0) cls += " val-0";
                  return (
                    <td key={col}>
                      <div className={cls} onClick={() => toggle(r, c)}>
                        {val === null ? "" : val}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!revealed ? (
        <button className="btn-primary" onClick={check} style={{ marginTop: 20, fontSize: 14, padding: "10px 22px" }}>
          Vérifier ↗
        </button>
      ) : (
        <div style={{ marginTop: 16, padding: "14px 18px", borderRadius: 12,
          background: correct === n*n ? "rgba(107,232,138,0.1)" : "rgba(255,190,92,0.1)",
          border: `1px solid ${correct === n*n ? "rgba(107,232,138,0.3)" : "rgba(255,190,92,0.3)"}`,
          color: correct === n*n ? "var(--green)" : "var(--amber)", fontSize: 14 }}>
          {correct === n*n ? "✓ Parfait ! Matrice complète et correcte." : `${correct}/${n*n} cases correctes. Comparez avec la solution.`}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────── MATRIX POWER SECTION ─────────────────────────── */
function MatrixPowerSection({ nodes, M1, M2, explanation, onComplete }) {
  const n = nodes.length;
  const [step, setStep] = useState(0); // 0=show M1, 1=compute, 2=show M2
  const [userM2, setUserM2] = useState(() => Array(n).fill(null).map(() => Array(n).fill(null)));
  const [revealed, setRevealed] = useState(false);

  function toggle(r, c) {
    if (revealed || step !== 1) return;
    setUserM2(prev => {
      const next = prev.map(row => [...row]);
      next[r][c] = next[r][c] === 1 ? 0 : next[r][c] === 0 ? null : 1;
      return next;
    });
  }

  function check() {
    let correct = 0;
    for (let r = 0; r < n; r++)
      for (let c = 0; c < n; c++)
        if (userM2[r][c] === M2[r][c]) correct++;
    setRevealed(true);
    if (correct === n*n) setTimeout(() => onComplete && onComplete(), 500);
  }

  const MatrixDisplay = ({ data, label, highlight, accentColor = "blue" }) => (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 12, color: `var(--${accentColor})`, fontFamily: "Syne, sans-serif", fontWeight: 600, marginBottom: 8 }}>{label}</div>
      <table style={{ borderCollapse: "separate", borderSpacing: 3, margin: "0 auto" }}>
        <thead><tr><th style={{ width: 30 }}></th>{nodes.map(nd => <th key={nd} style={{ width: 38, fontSize: 11, color: `var(--${accentColor})`, fontFamily: "Syne, sans-serif" }}>{nd}</th>)}</tr></thead>
        <tbody>
          {nodes.map((row, r) => (
            <tr key={row}>
              <td style={{ fontSize: 11, color: `var(--${accentColor})`, fontFamily: "Syne, sans-serif", paddingRight: 6, fontWeight: 600 }}>{row}</td>
              {data[r].map((val, c) => (
                <td key={c}>
                  <div style={{ width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center",
                    borderRadius: 6, border: `1px solid ${val ? `rgba(${C[accentColor]?.rgb || "77,166,255"},0.4)` : "var(--border)"}`,
                    background: val ? `rgba(${C[accentColor]?.rgb || "77,166,255"},0.12)` : "var(--surface2)",
                    color: val ? `var(--${accentColor})` : "var(--text3)",
                    fontSize: 14, fontWeight: 600, fontFamily: "Syne, sans-serif" }}>
                    {val}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(77,166,255,0.08)",
        border: "1px solid rgba(77,166,255,0.2)", fontSize: 13, color: "var(--text2)", marginBottom: 20 }}>
        {explanation}
      </div>

      {step === 0 && (
        <div style={{ animation: "fadeUp 0.4s ease both" }}>
          <MatrixDisplay data={M1} label="M¹ (matrice initiale)" accentColor="blue" />
          <button className="btn-primary" onClick={() => setStep(1)} style={{ marginTop: 20, fontSize: 14, padding: "10px 22px" }}>
            Calculer M² →
          </button>
        </div>
      )}

      {step === 1 && (
        <div style={{ animation: "fadeUp 0.4s ease both" }}>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center", marginBottom: 20 }}>
            <MatrixDisplay data={M1} label="M¹ (donnée)" accentColor="blue" />
            <div style={{ display: "flex", alignItems: "center", fontSize: 24, color: "var(--text3)" }}>×</div>
            <MatrixDisplay data={M1} label="M¹ (idem)" accentColor="blue" />
            <div style={{ display: "flex", alignItems: "center", fontSize: 24, color: "var(--text3)" }}>=</div>
            <div>
              <div style={{ fontSize: 12, color: "var(--purple)", fontFamily: "Syne, sans-serif", fontWeight: 600, marginBottom: 8, textAlign: "center" }}>
                M² (à calculer)
              </div>
              <table style={{ borderCollapse: "separate", borderSpacing: 3, margin: "0 auto" }}>
                <thead><tr><th style={{ width: 30 }}></th>{nodes.map(nd => <th key={nd} style={{ width: 46, fontSize: 11, color: "var(--purple)", fontFamily: "Syne, sans-serif" }}>{nd}</th>)}</tr></thead>
                <tbody>
                  {nodes.map((row, r) => (
                    <tr key={row}>
                      <td style={{ fontSize: 11, color: "var(--purple)", fontFamily: "Syne, sans-serif", paddingRight: 6, fontWeight: 600 }}>{row}</td>
                      {userM2[r].map((val, c) => {
                        let cls = "matrix-cell";
                        if (revealed) cls += userM2[r][c] === M2[r][c] ? " correct" : " wrong";
                        else if (val === 1) cls += " val-1";
                        else if (val === 0) cls += " val-0";
                        return <td key={c}><div className={cls} onClick={() => toggle(r, c)}>{val === null ? "" : val}</div></td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {!revealed ? (
            <button className="btn-primary" onClick={check} style={{ fontSize: 14, padding: "10px 22px" }}>Vérifier M² ↗</button>
          ) : (
            <div>
              <div style={{ marginBottom: 12, padding: "12px 16px", borderRadius: 10,
                background: "rgba(107,232,138,0.1)", border: "1px solid rgba(107,232,138,0.3)",
                color: "var(--green)", fontSize: 14 }}>
                ✓ Voici la M² correcte ! Chaque 1 = chemin de longueur 2.
              </div>
              <button className="btn-ghost" onClick={() => setStep(2)}>Voir les deux matrices →</button>
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div style={{ animation: "fadeUp 0.4s ease both" }}>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
            <MatrixDisplay data={M1} label="M¹ — arcs directs" accentColor="blue" />
            <MatrixDisplay data={M2} label="M² — chemins de longueur 2" accentColor="purple" />
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────── WARSHALL SECTION ─────────────────────────── */
function WarshallSection({ nodes, M1, T_final, explanation, onComplete }) {
  const n = nodes.length;
  const [step, setStep] = useState(0);
  const steps = [
    { label: "Matrice initiale M¹", matrix: M1, desc: "On commence avec la matrice adjacente de base." },
    { label: "Itération k = A", matrix: [[0,1,0,0],[0,0,1,0],[0,0,0,1],[1,1,0,0]], desc: "Pour k=A : T[D][B] = T[D][B] ∨ (T[D][A] ∧ T[A][B]) = 0 ∨ (1 ∧ 1) = 1" },
    { label: "Itération k = B", matrix: [[0,1,1,0],[0,0,1,0],[0,0,0,1],[1,1,1,0]], desc: "Pour k=B : T[A][C] = 0 ∨ (T[A][B] ∧ T[B][C]) = 0 ∨ (1 ∧ 1) = 1" },
    { label: "Itération k = C", matrix: [[0,1,1,1],[0,0,1,1],[0,0,0,1],[1,1,1,1]], desc: "Pour k=C : T[A][D] = 0 ∨ (T[A][C] ∧ T[C][D]) = 0 ∨ (1 ∧ 1) = 1" },
    { label: "T+ finale (k = D)", matrix: T_final, desc: "Pour k=D : toutes les cases restantes se remplissent. Tous les sommets s'atteignent mutuellement !" },
  ];
  const current = steps[step];

  return (
    <div>
      <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(45,232,176,0.08)",
        border: "1px solid rgba(45,232,176,0.2)", fontSize: 13, color: "var(--text2)", marginBottom: 20 }}>
        {explanation}
      </div>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 20, paddingBottom: 4 }}>
        {steps.map((s, i) => (
          <button key={i} className={`section-tab ${i === step ? "active" : i < step ? "done" : ""}`}
            style={i === step ? { background: "var(--teal)", borderColor: "var(--teal)" } : i < step ? { background: "rgba(45,232,176,0.1)", borderColor: "rgba(45,232,176,0.3)", color: "var(--teal)" } : {}}
            onClick={() => setStep(i)}>
            {i < step ? "✓ " : ""}{s.label}
          </button>
        ))}
      </div>
      <div style={{ animation: "fadeUp 0.3s ease both" }} key={step}>
        <div style={{ marginBottom: 16, padding: "12px 16px", borderRadius: 10, background: "var(--surface2)",
          border: "1px solid var(--border2)", fontSize: 13, color: "var(--teal)", fontFamily: "monospace" }}>
          {current.desc}
        </div>
        <table style={{ borderCollapse: "separate", borderSpacing: 4, margin: "0 auto 20px" }}>
          <thead><tr><th style={{ width: 36 }}></th>{nodes.map(nd => <th key={nd} style={{ width: 46, fontSize: 13, color: "var(--teal)", fontFamily: "Syne, sans-serif", fontWeight: 600 }}>{nd}</th>)}</tr></thead>
          <tbody>
            {nodes.map((row, r) => (
              <tr key={row}>
                <td style={{ fontSize: 13, color: "var(--teal)", fontFamily: "Syne, sans-serif", fontWeight: 600, paddingRight: 8 }}>{row}</td>
                {current.matrix[r].map((val, c) => (
                  <td key={c}>
                    <div style={{ width: 46, height: 46, display: "flex", alignItems: "center", justifyContent: "center",
                      borderRadius: 8, border: `1px solid ${val ? "rgba(45,232,176,0.4)" : "var(--border)"}`,
                      background: val ? "rgba(45,232,176,0.12)" : "var(--surface2)",
                      color: val ? "var(--teal)" : "var(--text3)",
                      fontSize: 15, fontWeight: 600, fontFamily: "Syne, sans-serif",
                      transition: "all 0.3s" }}>
                      {val}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {step < steps.length - 1 ? (
            <button className="btn-primary" onClick={() => setStep(s => s + 1)}
              style={{ background: "linear-gradient(135deg, var(--teal), #1fb890)", borderColor: "rgba(45,232,176,0.4)", fontSize: 14, padding: "10px 22px" }}>
              Étape suivante →
            </button>
          ) : (
            <button className="btn-primary" onClick={onComplete}
              style={{ background: "linear-gradient(135deg, var(--teal), #1fb890)", borderColor: "rgba(45,232,176,0.4)", fontSize: 14, padding: "10px 22px" }}>
              ✓ J'ai compris Roy-Warshall
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── PERT TABLE ─────────────────────────── */
function PertTableSection({ onComplete }) {
  const tasks = [
    { id: "A", dur: 3, pred: "—", tot: 0, tard: 0 },
    { id: "B", dur: 5, pred: "A", tot: 3, tard: 4 },
    { id: "C", dur: 2, pred: "A", tot: 3, tard: 7 },
    { id: "D", dur: 4, pred: "B", tot: 8, tard: 8 },
    { id: "E", dur: 3, pred: "B,C", tot: 9, tard: 9 },
    { id: "F", dur: 2, pred: "D,E", tot: 12, tard: 12 },
  ];
  const critiques = ["A","B","D","E","F"];

  return (
    <div>
      <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(255,107,107,0.08)",
        border: "1px solid rgba(255,107,107,0.2)", fontSize: 13, color: "var(--text2)", marginBottom: 20 }}>
        Exemple complet : 6 tâches. Le chemin critique est en <span style={{ color: "var(--coral)", fontWeight: 600 }}>rouge</span>.
      </div>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ borderCollapse: "separate", borderSpacing: "0 4px", minWidth: 480, width: "100%" }}>
          <thead>
            <tr>
              {["Tâche","Durée","Prédécesseurs","Date tôt","Date tard","Marge (MT)"].map((h, i) => (
                <th key={i} style={{ padding: "8px 14px", background: "var(--surface2)", color: "var(--text2)",
                  fontSize: 12, fontWeight: 500, textAlign: "left",
                  borderRadius: i === 0 ? "8px 0 0 8px" : i === 5 ? "0 8px 8px 0" : 0 }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.map((t, i) => {
              const mt = t.tard - t.tot;
              const isCrit = critiques.includes(t.id);
              return (
                <tr key={t.id} style={{ animation: `fadeUp 0.4s ${i * 0.07}s ease both` }}>
                  {[
                    <td key="id" style={{ padding: "10px 14px", borderRadius: "8px 0 0 8px",
                      background: isCrit ? "rgba(255,107,107,0.08)" : "var(--surface)",
                      border: `1px solid ${isCrit ? "rgba(255,107,107,0.25)" : "var(--border)"}`,
                      borderRight: "none" }}>
                      <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15,
                        color: isCrit ? "var(--coral)" : "var(--text)" }}>{t.id}</span>
                      {isCrit && <span style={{ marginLeft: 6, fontSize: 10, color: "var(--coral)" }}>★</span>}
                    </td>,
                    <td key="dur" style={{ padding: "10px 14px", background: isCrit ? "rgba(255,107,107,0.08)" : "var(--surface)",
                      border: `1px solid ${isCrit ? "rgba(255,107,107,0.25)" : "var(--border)"}`,
                      borderLeft: "none", borderRight: "none", color: "var(--text2)", fontSize: 14 }}>{t.dur}j</td>,
                    <td key="pred" style={{ padding: "10px 14px", background: isCrit ? "rgba(255,107,107,0.08)" : "var(--surface)",
                      border: `1px solid ${isCrit ? "rgba(255,107,107,0.25)" : "var(--border)"}`,
                      borderLeft: "none", borderRight: "none", color: "var(--text3)", fontSize: 13, fontFamily: "monospace" }}>{t.pred}</td>,
                    <td key="tot" style={{ padding: "10px 14px", background: isCrit ? "rgba(255,107,107,0.08)" : "var(--surface)",
                      border: `1px solid ${isCrit ? "rgba(255,107,107,0.25)" : "var(--border)"}`,
                      borderLeft: "none", borderRight: "none", color: "var(--blue)", fontSize: 14, fontWeight: 600 }}>{t.tot}</td>,
                    <td key="tard" style={{ padding: "10px 14px", background: isCrit ? "rgba(255,107,107,0.08)" : "var(--surface)",
                      border: `1px solid ${isCrit ? "rgba(255,107,107,0.25)" : "var(--border)"}`,
                      borderLeft: "none", borderRight: "none", color: "var(--amber)", fontSize: 14, fontWeight: 600 }}>{t.tard}</td>,
                    <td key="mt" style={{ padding: "10px 14px", borderRadius: "0 8px 8px 0",
                      background: isCrit ? "rgba(255,107,107,0.08)" : "var(--surface)",
                      border: `1px solid ${isCrit ? "rgba(255,107,107,0.25)" : "var(--border)"}`,
                      borderLeft: "none" }}>
                      <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14,
                        color: mt === 0 ? "var(--coral)" : "var(--green)" }}>{mt}</span>
                    </td>,
                  ]}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ padding: "14px 18px", borderRadius: 12, background: "rgba(255,107,107,0.08)",
        border: "1px solid rgba(255,107,107,0.3)", marginBottom: 16, fontSize: 13, color: "var(--text2)" }}>
        <span style={{ color: "var(--coral)", fontWeight: 600 }}>Chemin critique :</span> A → B → D → F (et A → B → E → F) — Durée totale : <strong style={{ color: "var(--coral)" }}>14 jours</strong>
      </div>
      <button className="btn-primary" onClick={onComplete}
        style={{ background: "linear-gradient(135deg, var(--coral), #e04040)", borderColor: "rgba(255,107,107,0.4)", fontSize: 14, padding: "10px 22px" }}>
        Compris ✓
      </button>
    </div>
  );
}

/* ─────────────────────────── QUIZ SECTION ─────────────────────────── */
function QuizSection({ questions, onComplete, accentColor = "purple" }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [timer, setTimer] = useState(30);
  const timerRef = useRef(null);
  const col = C[accentColor]?.color || "var(--purple)";
  const rgb = C[accentColor]?.rgb || "124,109,248";

  useEffect(() => {
    if (answered || done) return;
    timerRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) { clearInterval(timerRef.current); handleAnswer(null); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [idx, answered, done]);

  function handleAnswer(i) {
    clearInterval(timerRef.current);
    setSelected(i);
    setAnswered(true);
    if (i === questions[idx].correct) setScore(s => s + 1);
  }

  function next() {
    if (idx + 1 >= questions.length) {
      setDone(true);
      const finalScore = score + (selected === questions[idx].correct ? 1 : 0);
      onComplete && onComplete(finalScore === questions.length ? "perfect" : "done");
    } else {
      setIdx(i => i + 1); setSelected(null); setAnswered(false); setTimer(30);
    }
  }

  if (done) {
    const final = score;
    return (
      <div style={{ textAlign: "center", padding: "32px 0", animation: "scaleIn 0.4s ease both" }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>
          {final === questions.length ? "🏆" : final >= questions.length / 2 ? "👍" : "📚"}
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "Syne, sans-serif", color: "var(--text)", marginBottom: 8 }}>
          {final}/{questions.length}
        </div>
        <div style={{ fontSize: 14, color: "var(--text2)", marginBottom: 28 }}>
          {final === questions.length ? "Score parfait ! +50 XP bonus 🎉" : final >= questions.length / 2 ? "Bon travail ! Continue comme ça." : "Relis les définitions et réessaie !"}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          {questions.map((_, i) => (
            <div key={i} style={{ width: 36, height: 36, borderRadius: "50%",
              background: i < final ? `rgba(${rgb},0.15)` : "var(--surface3)",
              border: `2px solid ${i < final ? col : "var(--border2)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, color: i < final ? col : "var(--text3)",
              animation: `scaleIn 0.3s ${i * 0.06}s ease both` }}>
              {i < final ? "✓" : "✗"}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const q = questions[idx];
  const timerPct = (timer / 30) * 100;

  return (
    <div style={{ animation: "fadeUp 0.3s ease both" }} key={idx}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <span style={{ fontSize: 13, color: "var(--text3)", fontFamily: "Syne, sans-serif" }}>
          {idx + 1} / {questions.length}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 100, height: 5, background: "var(--surface3)", borderRadius: 4 }}>
            <div style={{ width: `${timerPct}%`, height: "100%", borderRadius: 4,
              background: timer <= 10 ? "var(--coral)" : col,
              transition: "width 1s linear, background 0.3s" }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "Syne, sans-serif",
            color: timer <= 10 ? "var(--coral)" : "var(--text2)", minWidth: 24 }}>{timer}s</span>
        </div>
      </div>

      <div style={{ marginBottom: 20, padding: "18px 20px", borderRadius: 14,
        background: `rgba(${rgb},0.08)`, border: `1px solid rgba(${rgb},0.25)`,
        fontSize: 15, fontWeight: 500, color: "var(--text)", lineHeight: 1.6 }}>
        {q.q}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {q.answers.map((a, i) => {
          let cls = "quiz-answer";
          if (answered) {
            if (i === q.correct) cls += " correct";
            else if (i === selected) cls += " wrong";
          }
          return (
            <button key={i} className={cls} disabled={answered} onClick={() => handleAnswer(i)}>
              <span style={{ fontWeight: 600, marginRight: 10, fontFamily: "Syne, sans-serif",
                color: answered ? "inherit" : col }}>
                {["A","B","C","D"][i]}.
              </span>
              {a}
            </button>
          );
        })}
      </div>

      {answered && (
        <div style={{ marginTop: 18, animation: "fadeUp 0.3s ease both" }}>
          <div style={{ padding: "12px 16px", borderRadius: 10, marginBottom: 14,
            background: selected === q.correct ? "rgba(107,232,138,0.1)" : "rgba(255,107,107,0.1)",
            border: `1px solid ${selected === q.correct ? "rgba(107,232,138,0.3)" : "rgba(255,107,107,0.3)"}`,
            fontSize: 13, color: selected === q.correct ? "var(--green)" : "var(--coral)" }}>
            {selected === q.correct ? "✓ Correct ! " : "✗ Incorrect. "}{q.explanation}
          </div>
          <button className="btn-primary" onClick={next}
            style={{ background: `linear-gradient(135deg, ${col}, ${col})`, borderColor: `rgba(${rgb},0.4)`, fontSize: 14, padding: "10px 22px" }}>
            {idx + 1 < questions.length ? "Question suivante →" : "Voir résultats →"}
          </button>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────── INTERACTIVE GRAPH SECTION ─────────────────────────── */
function InteractiveGraphSection({ graph, accentColor = "purple" }) {
  const [selected, setSelected] = useState(null);
  const info = selected ? graph.table[selected] : null;
  const rgb = C[accentColor]?.rgb || "124,109,248";
  const col = C[accentColor]?.color || "var(--purple)";

  return (
    <div>
      <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 16 }}>
        Cliquez sur un sommet pour voir ses <span style={{ color: col }}>prédécesseurs</span> et <span style={{ color: "var(--teal)" }}>successeurs</span>.
      </p>
      <GraphSVG nodes={graph.nodes} edges={graph.edges} interactive highlightNode={selected}
        onNodeClick={setSelected} accentColor={accentColor} />
      {info && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16, animation: "fadeUp 0.3s ease both" }}>
          <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(45,232,176,0.08)", border: "1px solid rgba(45,232,176,0.25)" }}>
            <div style={{ fontSize: 11, color: "var(--teal)", fontWeight: 600, marginBottom: 6, letterSpacing: "0.5px", textTransform: "uppercase" }}>
              Successeurs Γ⁺({selected})
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", fontFamily: "Syne, sans-serif" }}>
              {"{" + info.succ.join(", ") + "}"}
            </div>
          </div>
          <div style={{ padding: "14px 16px", borderRadius: 12, background: `rgba(${rgb},0.08)`, border: `1px solid rgba(${rgb},0.25)` }}>
            <div style={{ fontSize: 11, color: col, fontWeight: 600, marginBottom: 6, letterSpacing: "0.5px", textTransform: "uppercase" }}>
              Prédécesseurs Γ⁻({selected})
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", fontFamily: "Syne, sans-serif" }}>
              {"{" + info.pred.join(", ") + "}"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────── DST MODE ─────────────────────────── */
function DSTMode({ points }) {
  return (
    <div>
      <div style={{ padding: "14px 18px", borderRadius: 12, background: "rgba(255,190,92,0.08)",
        border: "1px solid rgba(255,190,92,0.3)", fontSize: 13, color: "var(--amber)", marginBottom: 20, fontWeight: 500,
        display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 20 }}>⚡</span>
        Mode avant DST — l'essentiel en 30 secondes
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {points.map((p, i) => {
          const col = C[p.color]?.color || "var(--purple)";
          const rgb = C[p.color]?.rgb || "124,109,248";
          return (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "13px 18px",
              background: `rgba(${rgb},0.06)`, borderRadius: 12, border: `1px solid rgba(${rgb},0.2)`,
              animation: `fadeUp 0.4s ${i * 0.07}s ease both` }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: col, minWidth: 30, textAlign: "center",
                fontFamily: "Syne, sans-serif" }}>{p.icon}</span>
              <span style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.6 }}>{p.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────── LEARN CARDS ─────────────────────────── */
function LearnSection({ cards }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
      {cards.map((card, i) => {
        const col = C[card.color]?.color || "var(--purple)";
        const rgb = C[card.color]?.rgb || "124,109,248";
        return (
          <div key={i} className="def-card" style={{ animationDelay: `${i * 0.06}s`,
            background: `rgba(${rgb},0.05)`, border: `1px solid rgba(${rgb},0.2)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                background: `rgba(${rgb},0.15)`, fontSize: 18, color: col, fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
                {card.symbol}
              </div>
              <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", fontFamily: "Syne, sans-serif" }}>{card.term}</span>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: "var(--text2)", lineHeight: 1.7 }}>{card.def}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────── LESSON VIEW ─────────────────────────── */
function LessonView({ lesson, onBack, addXP }) {
  const [sectionIdx, setSectionIdx] = useState(0);
  const [completed, setCompleted] = useState(new Set());
  const col = C[lesson.color];
  const section = lesson.sections[sectionIdx];

  function markDone(extra) {
    if (!completed.has(section.id)) {
      setCompleted(prev => new Set([...prev, section.id]));
      addXP(20, section.type === "quiz" ? "Quiz Master 🎯" : null);
      if (extra === "perfect") addXP(50, "Score parfait ⭐");
    }
  }

  const progress = (completed.size / lesson.sections.length) * 100;

  function renderSection(sec) {
    switch (sec.type) {
      case "hook":
        return (
          <div style={{ animation: "fadeUp 0.4s ease both" }}>
            <div style={{ padding: "20px 24px", borderRadius: 16,
              background: `rgba(${col.rgb},0.08)`, border: `1px solid rgba(${col.rgb},0.25)`,
              marginBottom: 20 }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: "var(--text)", fontFamily: "Syne, sans-serif", marginBottom: 8, lineHeight: 1.4 }}>
                {sec.content.question}
              </div>
              <div style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6 }}>{sec.content.context}</div>
            </div>
            <GraphSVG nodes={sec.content.nodes} edges={sec.content.edges} accentColor={lesson.color} />
            <button className="btn-primary" onClick={markDone}
              style={{ marginTop: 20, background: `linear-gradient(135deg, ${col.color}, ${col.color})`, borderColor: `rgba(${col.rgb},0.4)`, fontSize: 14, padding: "10px 22px" }}>
              Compris, on y va →
            </button>
          </div>
        );

      case "learn":
        return (
          <div style={{ animation: "fadeUp 0.4s ease both" }}>
            <LearnSection cards={sec.cards} />
            <button className="btn-primary" onClick={markDone}
              style={{ marginTop: 20, background: `linear-gradient(135deg, ${col.color}, ${col.color})`, borderColor: `rgba(${col.rgb},0.4)`, fontSize: 14, padding: "10px 22px" }}>
              J'ai mémorisé →
            </button>
          </div>
        );

      case "interactive-graph":
        return (
          <div style={{ animation: "fadeUp 0.4s ease both" }}>
            <InteractiveGraphSection graph={sec.graph} accentColor={lesson.color} />
            <button className="btn-primary" onClick={markDone}
              style={{ marginTop: 20, background: `linear-gradient(135deg, ${col.color}, ${col.color})`, borderColor: `rgba(${col.rgb},0.4)`, fontSize: 14, padding: "10px 22px" }}>
              Continuer →
            </button>
          </div>
        );

      case "matrix":
        return (
          <div style={{ animation: "fadeUp 0.4s ease both" }}>
            <div style={{ padding: "14px 18px", borderRadius: 12,
              background: `rgba(${col.rgb},0.08)`, border: `1px solid rgba(${col.rgb},0.2)`,
              fontSize: 14, color: "var(--text2)", marginBottom: 20 }}>
              {sec.explanation}
            </div>
            <MatrixBuilder nodes={sec.nodes} solution={sec.solution} onComplete={markDone} />
          </div>
        );

      case "matrix-power":
        return (
          <div style={{ animation: "fadeUp 0.4s ease both" }}>
            <MatrixPowerSection {...sec} onComplete={markDone} />
          </div>
        );

      case "warshall":
        return (
          <div style={{ animation: "fadeUp 0.4s ease both" }}>
            <WarshallSection {...sec} onComplete={markDone} />
          </div>
        );

      case "pert-table":
        return <PertTableSection onComplete={markDone} />;

      case "quiz":
        return <QuizSection questions={sec.questions} onComplete={markDone} accentColor={lesson.color} />;

      case "dst":
        return (
          <div style={{ animation: "fadeUp 0.4s ease both" }}>
            <DSTMode points={sec.points} />
            <button className="btn-primary" onClick={markDone}
              style={{ marginTop: 20, background: `linear-gradient(135deg, ${col.color}, ${col.color})`, borderColor: `rgba(${col.rgb},0.4)`, fontSize: 14, padding: "10px 22px" }}>
              Fiche terminée ✓
            </button>
          </div>
        );

      default: return null;
    }
  }

  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "0 0 40px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
        <button className="btn-ghost" onClick={onBack} style={{ padding: "8px 14px" }}>← Retour</button>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, fontFamily: "Syne, sans-serif", color: "var(--text)" }}>
            {lesson.title}
          </h2>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: "var(--text3)" }}>{completed.size}/{lesson.sections.length} sections</span>
          <span style={{ fontSize: 12, color: col.color }}>{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${progress}%`,
            background: `linear-gradient(90deg, ${col.color}, ${col.color}aa)` }} />
        </div>
      </div>

      {/* Section tabs */}
      <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 28, paddingBottom: 4 }}>
        {lesson.sections.map((s, i) => {
          const done = completed.has(s.id);
          const active = i === sectionIdx;
          return (
            <button key={s.id} className={`section-tab ${active ? "active" : done ? "done" : ""}`}
              style={active ? { background: col.color, borderColor: col.color } : {}}
              onClick={() => setSectionIdx(i)}>
              {done ? "✓ " : ""}{s.label}
            </button>
          );
        })}
      </div>

      {/* Section content */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "28px 28px" }}>
        <h3 style={{ margin: "0 0 24px", fontSize: 17, fontWeight: 600, fontFamily: "Syne, sans-serif",
          color: col.color, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 28, height: 28, borderRadius: 8, background: `rgba(${col.rgb},0.15)`,
            fontSize: 12, fontWeight: 700 }}>
            {sectionIdx + 1}
          </span>
          {section.label}
        </h3>
        <div key={section.id}>
          {renderSection(section)}
        </div>
      </div>

      {/* Nav arrows */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, gap: 10 }}>
        <button className="btn-ghost" disabled={sectionIdx === 0} onClick={() => setSectionIdx(i => i - 1)}>
          ← Précédent
        </button>
        <span style={{ fontSize: 13, color: "var(--text3)", alignSelf: "center" }}>
          {sectionIdx + 1} / {lesson.sections.length}
        </span>
        <button className="btn-ghost" disabled={sectionIdx === lesson.sections.length - 1}
          onClick={() => setSectionIdx(i => i + 1)}>
          Suivant →
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────── CHAPTER CARD ─────────────────────────── */
function ChapterCard({ chapter, onSelect, done }) {
  const col = C[chapter.color];
  const [hovered, setHovered] = useState(false);

  return (
    <div onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "24px", borderRadius: 20, cursor: "pointer", position: "relative", overflow: "hidden",
        background: hovered ? `rgba(${col.rgb},0.08)` : "var(--surface)",
        border: `1px solid ${done ? `rgba(107,232,138,0.35)` : hovered ? `rgba(${col.rgb},0.35)` : "var(--border)"}`,
        transform: hovered ? "translateY(-4px) scale(1.01)" : "none",
        boxShadow: hovered ? `0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(${col.rgb},0.15)` : "none",
        transition: "all 0.35s cubic-bezier(.34,1.2,.64,1)",
      }}>

      {/* Glow bg */}
      <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120,
        borderRadius: "50%", background: `rgba(${col.rgb},0.08)`, filter: "blur(30px)",
        pointerEvents: "none", transition: "opacity 0.3s", opacity: hovered ? 1 : 0 }} />

      {done && (
        <div style={{ position: "absolute", top: 14, right: 14,
          background: "rgba(107,232,138,0.15)", border: "1px solid rgba(107,232,138,0.35)",
          borderRadius: 8, padding: "2px 8px", fontSize: 11, color: "var(--green)", fontWeight: 600 }}>
          ✓ Terminé
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 22, background: `rgba(${col.rgb},0.12)`,
          border: `1px solid rgba(${col.rgb},0.25)`, color: col.color,
          boxShadow: hovered ? `0 0 20px rgba(${col.rgb},0.3)` : "none",
          transition: "box-shadow 0.3s" }}>
          {chapter.icon}
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", fontFamily: "Syne, sans-serif", marginBottom: 2 }}>
            {chapter.title}
          </div>
          <div style={{ fontSize: 12, color: "var(--text3)" }}>{chapter.subtitle}</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <span className="chip" style={{ background: `rgba(${col.rgb},0.1)`, color: col.color, border: `1px solid rgba(${col.rgb},0.2)` }}>
          {chapter.difficulty}
        </span>
        <span className="chip" style={{ background: "rgba(255,190,92,0.1)", color: "var(--amber)", border: "1px solid rgba(255,190,92,0.2)" }}>
          +{chapter.xp} XP
        </span>
        <span className="chip" style={{ background: "var(--surface2)", color: "var(--text3)", border: "1px solid var(--border)" }}>
          {chapter.sections} sections
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────── XP BAR ─────────────────────────── */
function XPBar({ xp, level, badges, streak, floatingXP }) {
  const xpForLevel = (level - 1) * 100;
  const xpNext = level * 100;
  const pct = Math.round(((xp - xpForLevel) / (xpNext - xpForLevel)) * 100);

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 100,
      display: "flex", alignItems: "center", gap: 16, padding: "12px 20px",
      background: "rgba(6,6,15,0.85)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--border)", flexWrap: "wrap" }}>

      {/* Level orb */}
      <div style={{ position: "relative" }}>
        <div style={{ width: 38, height: 38, borderRadius: "50%",
          background: "linear-gradient(135deg, var(--purple), #5c4fe0)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "Syne, sans-serif",
          boxShadow: "0 0 16px var(--purple-glow)" }}>
          {level}
        </div>
      </div>

      <div>
        <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 4, letterSpacing: "0.5px" }}>NIVEAU {level}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 100, height: 5, background: "var(--surface3)", borderRadius: 4 }}>
            <div style={{ width: `${pct}%`, height: "100%", borderRadius: 4,
              background: "linear-gradient(90deg, var(--purple), var(--blue))",
              transition: "width 0.5s ease" }} />
          </div>
          <span style={{ fontSize: 12, color: "var(--text2)", fontFamily: "Syne, sans-serif", fontWeight: 600 }}>
            {xp} XP
          </span>
        </div>
      </div>

      {streak > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "var(--amber)", fontWeight: 600 }}>
          🔥 {streak}
        </div>
      )}

      <div style={{ display: "flex", gap: 6 }}>
        {badges.slice(-3).map((b, i) => (
          <span key={i} className="chip" style={{ background: "rgba(255,190,92,0.1)", color: "var(--amber)", border: "1px solid rgba(255,190,92,0.2)", fontSize: 10 }}>{b}</span>
        ))}
      </div>

      {floatingXP && (
        <div key={floatingXP.id} style={{ position: "fixed", top: 60, right: 20, zIndex: 999,
          padding: "10px 18px", borderRadius: 12, background: "linear-gradient(135deg, var(--purple), #5c4fe0)",
          color: "#fff", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16,
          boxShadow: "0 8px 24px var(--purple-glow)",
          animation: "fadeUp 0.3s ease, fadeIn 0.3s ease reverse 1.2s forwards" }}>
          +{floatingXP.amount} XP ✨
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────── LANDING ─────────────────────────── */
function Landing({ onStart }) {
  const demoNodes = [
    { id: "A", x: 70, y: 70 }, { id: "B", x: 200, y: 40 },
    { id: "C", x: 270, y: 130 }, { id: "D", x: 130, y: 150 },
  ];
  const demoEdges = [
    { from: "A", to: "B" }, { from: "A", to: "D" },
    { from: "B", to: "C" }, { from: "D", to: "C" }, { from: "A", to: "A" },
  ];

  return (
    <div style={{ minHeight: "calc(100vh - 65px)", display: "flex", alignItems: "center",
      justifyContent: "center", padding: "48px 24px", position: "relative", overflow: "hidden" }}>

      {/* Background orbs */}
      <div style={{ position: "absolute", top: "15%", left: "10%", width: 400, height: 400,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(124,109,248,0.12) 0%, transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none", animation: "float 8s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "20%", right: "8%", width: 300, height: 300,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(45,232,176,0.1) 0%, transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none", animation: "float 10s 3s ease-in-out infinite" }} />

      <div style={{ maxWidth: 560, width: "100%", textAlign: "center", position: "relative" }}>
        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px",
          background: "rgba(124,109,248,0.1)", borderRadius: 20, fontSize: 12, color: "var(--purple)",
          marginBottom: 28, border: "1px solid rgba(124,109,248,0.25)", animation: "fadeUp 0.6s ease both" }}>
          <span style={{ animation: "pulse-ring 2s infinite" }}>◎</span>
          Graphes & Ordonnancement · BTS SIO
        </div>

        {/* Heading */}
        <h1 style={{ margin: "0 0 20px", fontFamily: "Syne, sans-serif", fontWeight: 800, lineHeight: 1.1,
          fontSize: "clamp(32px, 6vw, 52px)", color: "var(--text)",
          animation: "fadeUp 0.6s 0.1s ease both", opacity: 0, animationFillMode: "both" }}>
          Révise efficacement,<br />
          <span style={{ background: "linear-gradient(135deg, var(--purple), var(--blue))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            retiens durablement.
          </span>
        </h1>

        <p style={{ margin: "0 0 36px", fontSize: 16, color: "var(--text2)", lineHeight: 1.7,
          animation: "fadeUp 0.6s 0.2s ease both", opacity: 0, animationFillMode: "both" }}>
          Fiches interactives, quiz chronométrés, visualisations SVG animées et mode avant DST — maîtrise les graphes en une session.
        </p>

        {/* Graph demo */}
        <div style={{ background: "var(--surface)", borderRadius: 20, padding: "20px",
          border: "1px solid var(--border)", marginBottom: 36,
          boxShadow: "0 0 0 1px var(--border), 0 24px 48px rgba(0,0,0,0.3)",
          animation: "fadeUp 0.6s 0.3s ease both", opacity: 0, animationFillMode: "both",
          transition: "transform 0.4s", cursor: "default" }}
          onMouseEnter={e => e.currentTarget.style.transform = "perspective(600px) rotateX(2deg) rotateY(-2deg)"}
          onMouseLeave={e => e.currentTarget.style.transform = "none"}>
          <GraphSVG nodes={demoNodes} edges={demoEdges} accentColor="purple" />
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 36,
          animation: "fadeUp 0.6s 0.4s ease both", opacity: 0, animationFillMode: "both" }}>
          {[
            { icon: "◎", label: "4 chapitres", sub: "Graphes → PERT", color: "purple" },
            { icon: "▶", label: "Quiz chrono", sub: "Feedback immédiat", color: "coral" },
            { icon: "★", label: "Gamifié", sub: "XP + Badges", color: "amber" },
          ].map((f, i) => (
            <div key={i} style={{ padding: "16px 12px", background: "var(--surface)", borderRadius: 16,
              border: "1px solid var(--border)", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = `rgba(${C[f.color].rgb},0.35)`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "var(--border)"; }}>
              <div style={{ fontSize: 22, color: C[f.color].color, marginBottom: 6 }}>{f.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", fontFamily: "Syne, sans-serif" }}>{f.label}</div>
              <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{f.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ animation: "fadeUp 0.6s 0.5s ease both", opacity: 0, animationFillMode: "both" }}>
          <button className="btn-primary" onClick={onStart} style={{ fontSize: 16, padding: "16px 36px", borderRadius: 16 }}>
            Commencer à réviser ↗
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── CHAPTERS SCREEN ─────────────────────────── */
function ChaptersScreen({ onSelect, doneChapters }) {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ marginBottom: 32, animation: "fadeUp 0.5s ease both" }}>
        <h2 style={{ margin: "0 0 6px", fontSize: 28, fontWeight: 800, fontFamily: "Syne, sans-serif", color: "var(--text)" }}>
          Choisir un chapitre
        </h2>
        <p style={{ margin: 0, fontSize: 15, color: "var(--text2)" }}>
          Commence par les bases, avance à ton rythme.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {CHAPTERS.map((ch, i) => (
          <div key={ch.id} style={{ animation: `fadeUp 0.5s ${i * 0.08}s ease both`, opacity: 0, animationFillMode: "both" }}>
            <ChapterCard chapter={ch} done={doneChapters.includes(ch.id)} onSelect={() => onSelect(ch.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── APP ─────────────────────────── */
export default function App() {
  // Inject CSS
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const { xp, level, badges, streak, addXP, floatingXP } = useXP();
  const [screen, setScreen] = useState("landing");
  const [currentLesson, setCurrentLesson] = useState(null);
  const [doneChapters, setDoneChapters] = useState(() => JSON.parse(localStorage.getItem("done") || "[]"));

  const LESSONS = {
    "graphes-bases": LESSON_GRAPHES,
    "matrices": LESSON_MATRICES,
    "fermeture": LESSON_FERMETURE,
    "pert": LESSON_PERT,
  };

  function openLesson(chapterId) {
    const lesson = LESSONS[chapterId];
    if (lesson) { setCurrentLesson(lesson); setScreen("lesson"); }
  }

  function wrappedAddXP(amount, badgeName) {
    addXP(amount, badgeName);
    if (currentLesson && amount >= 20) {
      const chapterId = Object.keys(LESSONS).find(k => LESSONS[k] === currentLesson);
      if (chapterId && !doneChapters.includes(chapterId)) {
        const newDone = [...doneChapters, chapterId];
        setDoneChapters(newDone);
        localStorage.setItem("done", JSON.stringify(newDone));
      }
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {screen !== "landing" && (
        <XPBar xp={xp} level={level} badges={badges} streak={streak} floatingXP={floatingXP} />
      )}

      {screen === "landing" && <Landing onStart={() => setScreen("chapters")} />}

      {screen === "chapters" && (
        <ChaptersScreen doneChapters={doneChapters} onSelect={openLesson} />
      )}

      {screen === "lesson" && currentLesson && (
        <div style={{ padding: "32px 24px" }}>
          <LessonView lesson={currentLesson} onBack={() => setScreen("chapters")} addXP={wrappedAddXP} />
        </div>
      )}
    </div>
  );
}

'use client';
import { useState } from 'react';
import Sidebar from '@/components/Dashboard/Sidebar';

const graph: Record<string, Record<string, number>> = {
  'Mumbai': { 'Delhi': 1420, 'Bangalore': 980, 'Hyderabad': 710, 'Pune': 150, 'Chennai': 1330 },
  'Delhi': { 'Mumbai': 1420, 'Kolkata': 1500, 'Hyderabad': 1580, 'Pune': 1430 },
  'Chennai': { 'Bangalore': 350, 'Hyderabad': 630, 'Mumbai': 1330, 'Kolkata': 1670 },
  'Bangalore': { 'Mumbai': 980, 'Chennai': 350, 'Hyderabad': 570, 'Pune': 840 },
  'Hyderabad': { 'Mumbai': 710, 'Delhi': 1580, 'Bangalore': 570, 'Chennai': 630, 'Kolkata': 1500, 'Pune': 590 },
  'Kolkata': { 'Delhi': 1500, 'Hyderabad': 1500, 'Chennai': 1670 },
  'Pune': { 'Mumbai': 150, 'Bangalore': 840, 'Hyderabad': 590, 'Delhi': 1430 }
};

const cities = Object.keys(graph);

function dijkstra(startNode: string, endNode: string) {
  let distances: Record<string, number> = {};
  let previous: Record<string, string | null> = {};
  let queue: string[] = Object.keys(graph);

  for (let vertex of queue) {
    distances[vertex] = Infinity;
    previous[vertex] = null;
  }
  distances[startNode] = 0;

  while (queue.length > 0) {
    let current = queue.reduce((minNode, node) => 
      distances[node] < distances[minNode] ? node : minNode
    );
    
    if (distances[current] === Infinity) break;
    if (current === endNode) {
      let path = [];
      let temp: string | null = current;
      while (temp) {
        path.push(temp);
        temp = previous[temp];
      }
      return { path: path.reverse(), distance: distances[endNode] };
    }

    queue = queue.filter(node => node !== current);

    for (let neighbor in graph[current]) {
      let alt = distances[current] + graph[current][neighbor];
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = current;
      }
    }
  }
  return { path: [], distance: Infinity };
}

export default function SimulationPage() {
  const [origin, setOrigin] = useState(cities[0]);
  const [destination, setDestination] = useState(cities[1]);
  const [result, setResult] = useState<{ path: string[], distance: number } | null>(null);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const calculateRoute = () => {
    setRunning(true);
    setProgress(0);
    setResult(null);
    let p = 0;
    const interval = setInterval(() => {
      p += 5; setProgress(p);
      if (p >= 100) { 
        clearInterval(interval); 
        setRunning(false); 
        setResult(dijkstra(origin, destination));
      }
    }, 40);
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <h1>Route Simulation</h1>
            <p>Calculate smartest routes via Dijkstra&apos;s algorithm</p>
          </div>
          <div className="topbar-actions">
            <button
              className="btn btn-sm"
              style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(99,102,241,0.15))', border: '1px solid rgba(139,92,246,0.4)', color: 'var(--accent-purple)', fontWeight: 600 }}
            >
              ✦ Kingpin AI
            </button>
          </div>
        </header>

        <main className="page-content">
          <div className="layout-grid-sim" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: 20 }}>
            {/* Controls panel */}
            <div className="glass-card" style={{ padding: 24, height: 'fit-content' }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Dijkstra Route Finder</div>
              
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Origin Hub</label>
                <select 
                  className="input-field" 
                  value={origin} 
                  onChange={e => setOrigin(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-glass)', border: '1px solid var(--border)', borderRadius: 8, color: 'white' }}
                >
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Destination Hub</label>
                <select 
                  className="input-field" 
                  value={destination} 
                  onChange={e => setDestination(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-glass)', border: '1px solid var(--border)', borderRadius: 8, color: 'white' }}
                >
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <button 
                className="btn btn-primary" 
                style={{ width: '100%', justifyContent: 'center' }} 
                onClick={calculateRoute}
                disabled={origin === destination || running}
              >
                {running ? `Calculating... ${progress}%` : 'Find Shortest Path'}
              </button>
            </div>

            {/* Results Panel */}
            <div className="glass-card" style={{ padding: 24, minHeight: 400, position: 'relative', overflow: 'hidden' }}>
              <div className="map-container" style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
                 <div className="map-grid" />
              </div>
              
              <div style={{ position: 'relative', zIndex: 1, backgroundColor: 'rgba(5, 11, 24, 0.6)', backdropFilter: 'blur(10px)', padding: 20, borderRadius: 12, height: '100%' }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Optimal Route Network</h3>

                {running ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 200, gap: 14 }}>
                     <div className="typing-dot" style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--accent-purple)' }} />
                     <div style={{ color: 'var(--accent-purple)', fontWeight: 600 }}>Running Dijkstra Algorithm Graph Evaluator...</div>
                  </div>
                ) : result ? (
                  <div className="anim-fade-up">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 30 }}>
                       <div style={{ fontSize: 40 }}>🛣️</div>
                       <div>
                         <div style={{ fontSize: 24, fontWeight: 800 }}>{result.distance.toLocaleString()} km Total Distance</div>
                         <div style={{ fontSize: 14, color: 'var(--accent-green)', fontWeight: 600 }}>✓ Optimal Shortest Path Found</div>
                       </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'relative' }}>
                       <div style={{ position: 'absolute', left: 15, top: 20, bottom: 20, width: 2, background: 'var(--border)', zIndex: 0 }} />
                       {result.path.map((node, i) => (
                         <div key={node} style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative', zIndex: 1 }}>
                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: i === 0 || i === result.path.length - 1 ? 'var(--accent-blue)' : 'var(--bg-glass)', border: `2px solid ${i === 0 || i === result.path.length - 1 ? 'var(--accent-blue)' : 'var(--text-secondary)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: 14 }}>
                              {i + 1}
                            </div>
                            <div style={{ flex: 1, padding: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 8 }}>
                               <div style={{ fontWeight: 600 }}>{node}</div>
                               <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Logistics Hub</div>
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 200, gap: 14, color: 'var(--text-muted)' }}>
                     <div style={{ fontSize: 40 }}>🗺️</div>
                     <div>Select origin and destination to find the most efficient route.</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

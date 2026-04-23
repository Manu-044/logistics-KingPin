'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Dashboard/Sidebar';
import { mockUsers } from '@/lib/data';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  joinedAt: string;
  shipmentCount: number;
  status: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [settings, setSettings] = useState<{label: string; enabled: boolean}[]>([]);
  
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, settingsRes] = await Promise.all([
          fetch('/api/admin/users'),
          fetch('/api/admin/settings')
        ]);
        
        let usersData = await usersRes.json();
        const settingsData = await settingsRes.json();
        
        if (usersData.length === 0) {
          for (const u of mockUsers) {
            await fetch('/api/admin/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(u)
            });
          }
          const freshUsersRes = await fetch('/api/admin/users');
          usersData = await freshUsersRes.json();
        }
        
        setUsers(usersData);
        setSettings(settingsData);
        setIsLoaded(true);
      } catch (err) {
        console.error("Failed to fetch admin data", err);
        setIsLoaded(true);
      }
    };
    
    fetchData();
  }, []);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'admin' });

  // Toggle boolean setting
  const toggleSetting = async (label: string) => {
    const currentSetting = settings.find(s => s.label === label);
    if (!currentSetting) return;
    
    setSettings((prev) => prev.map(s => s.label === label ? { ...s, enabled: !s.enabled } : s));
    
    try {
      await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label, enabled: !currentSetting.enabled })
      });
    } catch(err) {
      console.error("Failed to update setting", err);
      setSettings((prev) => prev.map(s => s.label === label ? { ...s, enabled: currentSetting.enabled } : s));
    }
  };

  // Remove user by ID
  const removeUser = async (id: string) => {
    const previousUsers = [...users];
    setUsers((prev) => prev.filter((u) => u.id !== id));
    
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Delete failed");
    } catch(err) {
      console.error("Failed to delete user", err);
      setUsers(previousUsers);
    }
  };

  // Submit Add User form
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const initials = newUser.name.trim().split(' ').map(x => x[0]).join('').substring(0,2).toUpperCase() || '??';
    
    const newEntry = {
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: initials,
      joinedAt: new Date().toISOString().split('T')[0],
      shipmentCount: 0,
      status: 'active'
    };
    
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry)
      });
      const savedUser = await res.json();
      
      setUsers([savedUser, ...users]);
      setShowAddModal(false);
      setNewUser({ name: '', email: '', role: 'admin' });
    } catch (err) {
      console.error("Failed to add user", err);
    }
  };

  return (
    <div className="app-layout" style={{ position: 'relative' }}>
      <Sidebar />
      <div className="main-content">
        <header className="topbar" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <div className="topbar-left" style={{ flex: '1 1 300px' }}>
            <h1>Admin Panel</h1>
            <p>User management and platform configuration</p>
          </div>
          <div className="topbar-actions">
            <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)}>+ Add User</button>
          </div>
        </header>

        <main className="page-content">
          {/* Platform Overview */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
            {[
              { label: 'Total Users', value: users.length, icon: '👥', color: 'var(--accent-blue)' },
              { label: 'Active Now', value: '34', icon: '🟢', color: 'var(--accent-green)' },
              { label: 'New This Month', value: '12', icon: '📈', color: 'var(--accent-purple)' },
              { label: 'System Uptime', value: '99.9%', icon: '⚡', color: 'var(--accent-cyan)' },
            ].map((item) => (
              <div key={item.label} className="glass-card" style={{ padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: item.color }}>{item.value}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{item.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            {/* Users Table */}
            <div className="glass-card" style={{ flex: '2 1 500px', overflow: 'hidden' }}>
              <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <div style={{ fontSize: 16, fontWeight: 600 }}>User Management</div>
                <input className="input-field" placeholder="🔍 Search users..." style={{ maxWidth: 220 }} id="user-search" />
              </div>
              <div style={{ overflowX: 'auto', width: '100%' }}>
                <table className="data-table" style={{ minWidth: 600 }}>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Role</th>
                      <th>Shipments</th>
                      <th>Status</th>
                      <th>Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 34, height: 34, background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{u.avatar}</div>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 500 }}>{u.name}</div>
                              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{u.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span style={{
                            fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 10, textTransform: 'capitalize',
                            background: u.role === 'admin' ? 'rgba(59,130,246,0.15)' : u.role === 'manager' ? 'rgba(139,92,246,0.15)' : 'rgba(107,114,128,0.15)',
                            color: u.role === 'admin' ? 'var(--accent-blue)' : u.role === 'manager' ? 'var(--accent-purple)' : 'var(--text-secondary)',
                          }}>{u.role}</span>
                        </td>
                        <td style={{ fontSize: 13 }}>{u.shipmentCount}</td>
                        <td>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13 }}>
                            <span style={{ width: 7, height: 7, borderRadius: '50%', background: u.status === 'active' ? 'var(--accent-green)' : 'var(--text-muted)', display: 'inline-block' }} />
                            {u.status}
                          </span>
                        </td>
                        <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{u.joinedAt}</td>
                        <td>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button className="btn btn-secondary btn-sm" onClick={() => alert('Edit triggered for ' + u.name)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => removeUser(u.id)}>Remove</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-muted)' }}>No users found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Settings & Logs */}
            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="glass-card" style={{ padding: 22 }}>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>⚙️ Platform Settings</div>
                {settings.map((setting) => (
                  <div key={setting.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: 13 }}>{setting.label}</span>
                    <div 
                      onClick={() => toggleSetting(setting.label)}
                      style={{ 
                         width: 40, height: 22, borderRadius: 11, 
                         background: setting.enabled ? 'var(--accent-blue)' : 'var(--bg-glass)', 
                         border: '1px solid var(--border)', cursor: 'pointer', position: 'relative', 
                         transition: 'background 0.2s', flexShrink: 0 
                      }}
                    >
                      <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'white', position: 'absolute', top: 2, left: setting.enabled ? 20 : 2, transition: 'left 0.2s' }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass-card" style={{ padding: 22 }}>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>📋 Audit Log</div>
                {[
                  { action: 'User added via panel', user: 'Admin', time: 'Just now' },
                  { action: 'Shipment deleted', user: 'System', time: '1h ago' },
                  { action: 'Settings updated', user: 'Priya Sharma', time: '2h ago' },
                  { action: 'Report exported', user: 'Arjun Nair', time: '4h ago' },
                ].map((log, i) => (
                  <div key={i} style={{ padding: '8px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{log.action}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>by {log.user} · {log.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 100,
          background: 'rgba(5, 11, 24, 0.8)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="glass-card" style={{ padding: 30, width: '100%', maxWidth: 420, animation: 'fadeInUp 0.3s ease' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Add New User</h2>
            <form onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Full Name</label>
                <input 
                  required 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. Maya Ghosh" 
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Email Address</label>
                <input 
                  required 
                  type="email" 
                  className="input-field" 
                  placeholder="e.g. maya@kingpinlogistics.com" 
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Role</label>
                <select 
                  className="input-field" 
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="customer">Customer</option>
                  <option value="driver">Driver</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Create User</button>
                <button type="button" className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowAddModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

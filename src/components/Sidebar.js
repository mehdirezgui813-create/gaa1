import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Archive, 
  Users, 
  FolderOpen, 
  ShoppingCart, 
  Truck, 
  FileSpreadsheet, 
  WalletCards, 
  Settings, 
  UserCog, 
  BarChart2,
  Layers,
  PanelLeftClose,
  HelpCircle
} from 'lucide-react';
import '../styles/Sidebar.css';

function Sidebar({ open, onToggle }) {
  const location = useLocation();

  const sections = [
    {
      title: 'MENU PRINCIPAL',
      items: [
        { label: 'Tableau de Bord', path: '/dashboard', icon: <LayoutDashboard size={18} strokeWidth={1.5} /> },
        { label: 'Article', path: '/dashboard/articles', icon: <Archive size={18} strokeWidth={1.5} /> },
        { label: 'Fournisseurs', path: '/dashboard/fournisseurs', icon: <Users size={18} strokeWidth={1.5} /> }
      ]
    },
    {
      title: 'ACHATS',
      items: [
        { label: "Dossiers d'Achat", path: '/dashboard/dossiers', icon: <FolderOpen size={18} strokeWidth={1.5} /> },
        { label: 'Commandes', path: '/dashboard/commandes', icon: <ShoppingCart size={18} strokeWidth={1.5} /> },
        { label: 'Livraisons', path: '/dashboard/livraisons', icon: <Truck size={18} strokeWidth={1.5} /> }
      ]
    },
    {
      title: 'FINANCE',
      items: [
        { label: 'Factures', path: '/dashboard/factures', icon: <FileSpreadsheet size={18} strokeWidth={1.5} /> },
        { label: 'Règlements', path: '/dashboard/reglements', icon: <WalletCards size={18} strokeWidth={1.5} /> }
      ]
    },
    {
      title: 'CONFIGURATION',
      items: [
        { label: 'Paramètres', path: '/dashboard/parametres', icon: <Settings size={18} strokeWidth={1.5} /> },
        { label: 'Utilisateurs', path: '/dashboard/utilisateurs', icon: <UserCog size={18} strokeWidth={1.5} /> }
      ]
    },
    {
      title: 'ANALYSE',
      items: [
        { label: 'Rapport', path: '/dashboard/rapport', icon: <BarChart2 size={18} strokeWidth={1.5} /> }
      ]
    }
  ];

  return (
    <div className={open ? 'sidebar open' : 'sidebar closed'}>
      <div className="sidebar-header">
        <div className="sidebar-header-left">
          <div className="sidebar-header-icon">
            {/* Blue box with layers icon */}
            <Layers size={22} strokeWidth={1.5} color="#FFFFFF" />
          </div>
          <div className="sidebar-header-text">GAA</div>
        </div>
        <div className="sidebar-header-toggle" onClick={onToggle}>
          <PanelLeftClose size={22} strokeWidth={1.5} color="#9CA3AF" />
        </div>
      </div>

      <div className="sidebar-body">
        {sections.map((section) => (
          <div key={section.title} className="sidebar-section">
            <div className="section-title">{section.title}</div>
            <nav className="sidebar-nav">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                const iconColor = isActive ? '#3B82F6' : '#6B7280';
                return (
                  <Link
                    key={`${item.label}-${item.path}`}
                    to={item.path}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    title={!open ? item.label : ''}
                  >
                    {React.cloneElement(item.icon, { color: iconColor })}
                    <span className="nav-label">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Aide & Support footer */}
      <div className="sidebar-footer">
        <div className="sidebar-footer-item">
          <HelpCircle size={16} strokeWidth={1.5} color="#9CA3AF" />
          <span className="sidebar-footer-text">Aide & Support</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
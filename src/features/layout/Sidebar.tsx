import { Icon } from '../../shared/icons/Icon'
import { navItems } from '../../features/dashboard/data'

type SidebarProps = {
  activeNav: number
  onNavigate: (index: number) => void
  onLogout: () => void
}

export function Sidebar({ activeNav, onNavigate, onLogout }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <i>◆</i>
        <span className="label">Ascend</span>
      </div>

      <nav>
        {navItems.map((item, index) => (
          <button
            key={item.label}
            className={activeNav === index ? 'selected' : ''}
            onClick={() => onNavigate(index)}
            title={item.label}
          >
            <b><Icon name={item.icon} size={18} /></b>
            <span className="label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button title="Settings">
          <b><Icon name="settings" size={18} /></b>
          <span className="label">Settings</span>
        </button>
        <button title="Help & Feedback">
          <b><Icon name="help" size={18} /></b>
          <span className="label">Help &amp; Feedback</span>
        </button>
        <button className="logout" onClick={onLogout} title="Log out">
          <b><Icon name="logout" size={18} /></b>
          <span className="label">Log out</span>
        </button>
        <div className="profile">
          <div className="avatar">MD</div>
          <span className="label">
            <strong>Mukesh Dutt</strong>
            <small>mukesh@example.com</small>
          </span>
          <b><Icon name="chevronRight" size={18} /></b>
        </div>
      </div>
    </aside>
  )
}

import { Icon } from '../../shared/icons/Icon'

type HeaderProps = {
  search: string
  onSearchChange: (value: string) => void
  dark: boolean
  onToggleTheme: () => void
  onToggleSidebar: () => void
}

export function Header({ search, onSearchChange, dark, onToggleTheme, onToggleSidebar }: HeaderProps) {
  return (
    <header>
      <button className="menu" aria-label="Toggle menu" onClick={onToggleSidebar}>
        <Icon name="menu" size={22} />
      </button>

      <div className="search">
        <span>
          <Icon name="search" size={18} />
        </span>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search across all modules, topics, notes..."
        />
        <kbd>⌘ K</kbd>
      </div>

      <div className="header-actions">
        <button className="sun" aria-label="Light theme">
          <Icon name="sun" size={20} />
        </button>
        <button className="theme" onClick={onToggleTheme} aria-label="Toggle dark mode">
          <Icon name={dark ? 'sun' : 'moon'} size={16} />
        </button>
        <button>
          <Icon name="download" size={16} /> <strong>Export all (JSON)</strong>
        </button>
        <button>
          <Icon name="upload" size={16} /> <strong>Import (JSON)</strong>
        </button>
        <button className="bell" aria-label="Notifications">
          <Icon name="bell" size={22} />
          <em>3</em>
        </button>
      </div>
    </header>
  )
}

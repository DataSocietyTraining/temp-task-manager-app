import { Settings, UserCircle } from 'lucide-react'

type View = 'Tasks' | 'Focus' | 'Archive'

interface HeaderProps {
  currentView: View
  onChangeView: (view: View) => void
}

export const Header: React.FC<HeaderProps> = ({ currentView, onChangeView }) => {
  const navItems: View[] = ['Tasks', 'Focus', 'Archive']

  return (
    <header className="bg-[rgba(248,250,252,0.8)] backdrop-blur-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex max-w-[1024px] items-center justify-between px-[32px] py-[16px]">
        <div className="text-[20px] font-bold leading-[28px] tracking-[-1px] text-[#4c1d95]">Methodical Tasks</div>

        <nav className="flex items-center gap-[32px] text-[16px] font-semibold">
          {navItems.map((view) => (
            <button
              key={view}
              type="button"
              onClick={() => onChangeView(view)}
              className={`pb-[6px] ${
                currentView === view
                  ? 'border-b-2 border-[#4c1d95] text-[#4c1d95]'
                  : 'text-[#a78bfa]'
              }`}
            >
              {view}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-[16px]">
          <button
            type="button"
            className="flex h-[20px] w-[20px] items-center justify-center text-[#4c1d95]"
            aria-label="Settings"
          >
            <Settings size={18} strokeWidth={2} />
          </button>
          <div className="flex h-[32px] w-[32px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#5b3fa5] to-[#c27ae5]">
            <UserCircle className="h-full w-full text-white" />
          </div>
        </div>
      </div>
    </header>
  )
}

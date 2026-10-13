import React from 'react';
import {
  Github,
  Key,
  ShieldCheck,
  Globe,
  Settings,
  LogOut,
  ExternalLink,
  RefreshCw,
  Search,
} from 'lucide-react';
import { GitHubUser, AuthMethod } from '../types/github';

interface NavbarProps {
  user: GitHubUser | null;
  authMethod: AuthMethod;
  onOpenConnectModal: () => void;
  onOpenOAuthGuide: () => void;
  onLogout: () => void;
  onRefresh: () => void;
  onSearchUser: (username: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  authMethod,
  onOpenConnectModal,
  onOpenOAuthGuide,
  onLogout,
  onRefresh,
  onSearchUser,
}) => {
  const [quickSearch, setQuickSearch] = React.useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      onSearchUser(quickSearch.trim());
      setQuickSearch('');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
            <Github className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-slate-100 tracking-tight">GitHub Connect Hub</span>
              <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                v1.0
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-slate-400">
              实时链接与深度探查 GitHub 账号、仓库与提交动态
            </p>
          </div>
        </div>

        {/* Quick Search */}
        <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative max-w-xs w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 text-slate-500" />
          <input
            type="text"
            placeholder="搜索任意 GitHub 用户名..."
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Guide Button */}
          <button
            onClick={onOpenOAuthGuide}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg transition-colors"
            title="查看 OAuth 回调配置指南"
          >
            <Settings className="w-3.5 h-3.5 text-slate-400" />
            <span>OAuth 配置指南</span>
          </button>

          {/* Connection Status & Profile */}
          {user ? (
            <div className="flex items-center gap-2">
              {/* Method pill */}
              <div
                className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                  authMethod === 'oauth'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : authMethod === 'pat'
                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}
              >
                {authMethod === 'oauth' ? (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>OAuth 授权已连接</span>
                  </>
                ) : authMethod === 'pat' ? (
                  <>
                    <Key className="w-3.5 h-3.5" />
                    <span>PAT 令牌已连接</span>
                  </>
                ) : (
                  <>
                    <Globe className="w-3.5 h-3.5" />
                    <span>公开数据浏览</span>
                  </>
                )}
              </div>

              {/* Refresh */}
              <button
                onClick={onRefresh}
                className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent hover:border-slate-800 rounded-lg transition-colors"
                title="刷新数据"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              {/* User Dropdown Preview */}
              <div className="flex items-center gap-2 pl-1 border-l border-slate-800">
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-1 hover:bg-slate-900 rounded-lg transition-colors group"
                >
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-8 h-8 rounded-full border border-slate-700 object-cover"
                  />
                  <div className="hidden sm:block text-left">
                    <div className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors flex items-center gap-1">
                      <span>{user.name || user.login}</span>
                      <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">@{user.login}</div>
                  </div>
                </a>

                {/* Change Account or Logout */}
                <button
                  onClick={onOpenConnectModal}
                  className="hidden sm:block text-xs text-indigo-400 hover:text-indigo-300 px-2 py-1 hover:bg-indigo-500/10 rounded-md transition-colors"
                >
                  切换账号
                </button>

                <button
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                  title="断开连接"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenConnectModal}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
            >
              <Github className="w-4 h-4" />
              <span>链接我的 GitHub</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

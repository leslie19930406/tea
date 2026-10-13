import React, { useState } from 'react';
import {
  Github,
  Key,
  Search,
  ExternalLink,
  Shield,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  X,
  HelpCircle,
} from 'lucide-react';
import { AuthConfig } from '../types/github';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AuthConfig | null;
  onOpenOAuthGuide: () => void;
  onSuccess: (data: { username?: string; token?: string }) => void;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({
  isOpen,
  onClose,
  config,
  onOpenOAuthGuide,
  onSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'oauth' | 'pat' | 'username'>('oauth');
  const [patToken, setPatToken] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // 1. Popup-based OAuth Flow directly to GitHub's Authorization URL
  const handleOAuthConnect = async () => {
    setError(null);
    setLoading(true);

    try {
      const redirectUri = `${window.location.origin}/auth/callback`;
      const res = await fetch(`/api/auth/github/url?redirect_uri=${encodeURIComponent(redirectUri)}`);
      const data = await res.json();

      if (!res.ok || !data.url) {
        setError(data.error || '未配置 GitHub OAuth Client ID，请参考配置指南或使用 PAT 令牌连接。');
        setLoading(false);
        return;
      }

      // Open OAuth provider's URL directly in popup (iframe-safe)
      const width = 600;
      const height = 750;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const authWindow = window.open(
        data.url,
        'github_oauth_popup',
        `width=${width},height=${height},top=${top},left=${left},status=no,resizable=yes,scrollbars=yes`
      );

      if (!authWindow) {
        setError('弹出窗口被浏览器拦截，请允许本站弹出窗口以完成 GitHub 授权。');
        setLoading(false);
        return;
      }

      // The window message listener in App.tsx or parent will catch OAUTH_AUTH_SUCCESS!
      // Here we set a timeout warning if user closed it manually
      const checkClosed = setInterval(() => {
        if (authWindow.closed) {
          clearInterval(checkClosed);
          setLoading(false);
        }
      }, 1000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError('发起 GitHub 授权失败: ' + message);
      setLoading(false);
    }
  };

  // 2. Personal Access Token (PAT)
  const handlePatConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patToken.trim()) {
      setError('请输入有效的 GitHub 访问令牌');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/pat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: patToken.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || '验证失败，请确认令牌有效');
      }

      onSuccess({ token: patToken.trim(), username: data.user.login });
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // 3. Username Lookup
  const handleUsernameLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim()) {
      setError('请输入 GitHub 用户名');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/github/user?username=${encodeURIComponent(usernameInput.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || '未找到该 GitHub 用户');
      }

      onSuccess({ username: data.user.login });
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-100">链接您的 GitHub 账号</h2>
              <p className="text-xs text-slate-400">支持 OAuth 官方授权、个人令牌 (PAT) 与账号免密查看</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-800 bg-slate-950/30 px-6 pt-3 gap-2">
          <button
            onClick={() => {
              setActiveTab('oauth');
              setError(null);
            }}
            className={`pb-3 px-3 text-xs font-medium border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'oauth'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            OAuth 授权登录
          </button>
          <button
            onClick={() => {
              setActiveTab('pat');
              setError(null);
            }}
            className={`pb-3 px-3 text-xs font-medium border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'pat'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            个人访问令牌 (PAT)
          </button>
          <button
            onClick={() => {
              setActiveTab('username');
              setError(null);
            }}
            className={`pb-3 px-3 text-xs font-medium border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'username'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            用户名免密探查
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-300 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-400" />
              <div className="flex-1">{error}</div>
            </div>
          )}

          {activeTab === 'oauth' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2 text-slate-200 font-medium">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>标准 OAuth 2.0 授权机制</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  点击后将在独立弹窗中打开 GitHub 官方授权确认页面，获取读取公开/私有仓库、提交历史和用户信息的只读权限。
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-[11px]">
                  <span className="text-slate-400">
                    OAuth 状态:{' '}
                    {config?.hasOAuthConfig ? (
                      <span className="text-emerald-400 font-medium">环境变量已配置</span>
                    ) : (
                      <span className="text-amber-400 font-medium">待配置环境变量 (可快速查看指南)</span>
                    )}
                  </span>
                  <button
                    onClick={onOpenOAuthGuide}
                    type="button"
                    className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <HelpCircle className="w-3 h-3" />
                    <span>查看配置指南</span>
                  </button>
                </div>
              </div>

              <button
                onClick={handleOAuthConnect}
                disabled={loading}
                className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-750 text-white rounded-xl font-medium text-sm border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-2.5 shadow-lg group disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                    <span>等待 GitHub 授权弹窗完成...</span>
                  </>
                ) : (
                  <>
                    <Github className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                    <span>通过 GitHub 授权登录</span>
                  </>
                )}
              </button>

              {!config?.hasOAuthConfig && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300/90 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
                  <div className="flex-1">
                    当前尚未在环境变量中注入 <code className="bg-slate-900 px-1 py-0.5 rounded">GITHUB_CLIENT_ID</code>。
                    推荐切换到旁边的 <strong>「个人访问令牌 (PAT)」</strong> 标签页，零配置 5 秒即可直接连接！
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'pat' && (
            <form onSubmit={handlePatConnect} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                  <span>GitHub Personal Access Token</span>
                  <a
                    href="https://github.com/settings/tokens/new?scopes=repo,read:user,user:email&description=GitHub+Connect+Hub"
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 text-[11px] inline-flex items-center gap-1"
                  >
                    <span>在 GitHub 生成 Token</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="password"
                    placeholder="ghp_xxxxxxxxxxxx 或 github_pat_xxxxxxxxxxxx"
                    value={patToken}
                    onChange={(e) => setPatToken(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                    autoFocus
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  建议勾选 <code className="text-slate-400">repo</code> (查看所有公开及私有项目) 与{' '}
                  <code className="text-slate-400">read:user</code> 权限。令牌仅保存在当前会话安全 Cookie 中。
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !patToken.trim()}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-indigo-600/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>验证并连接中...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>验证并连接 GitHub 账号</span>
                  </>
                )}
              </button>
            </form>
          )}

          {activeTab === 'username' && (
            <form onSubmit={handleUsernameLookup} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  输入 GitHub 用户名 (免登录直接浏览公开项目与动态)
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    placeholder="例如: torvalds, shadcn, antfu, 或你的 GitHub 账号名"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                    autoFocus
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[11px] text-slate-500 self-center">快速体验:</span>
                {['torvalds', 'shadcn', 'antfu', 'yyx990803'].map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setUsernameInput(name)}
                    className="text-[11px] px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md border border-slate-700 transition-colors"
                  >
                    @{name}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={loading || !usernameInput.trim()}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium text-sm border border-slate-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                    <span>检索用户数据中...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>查看该用户主页与仓库</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

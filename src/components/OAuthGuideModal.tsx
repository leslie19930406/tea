import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Key, ShieldCheck, X } from 'lucide-react';
import { AuthConfig } from '../types/github';

interface OAuthGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AuthConfig | null;
}

export const OAuthGuideModal: React.FC<OAuthGuideModalProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const devCallback =
    config?.devCallbackUrl ||
    'https://ais-dev-zwnnrbifzfmvbypdulbi63-608436014397.asia-east1.run.app/auth/callback';
  const sharedCallback =
    config?.sharedCallbackUrl ||
    'https://ais-pre-zwnnrbifzfmvbypdulbi63-608436014397.asia-east1.run.app/auth/callback';
  const appUrl =
    config?.currentAppUrl ||
    'https://ais-dev-zwnnrbifzfmvbypdulbi63-608436014397.asia-east1.run.app';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-100">
                GitHub OAuth 官方授权接入配置指南
              </h2>
              <p className="text-xs text-slate-400">
                AI Studio 容器化预览环境回调设置与环境变量说明
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          {/* Step 1 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-medium text-slate-200">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold border border-indigo-500/30">
                1
              </span>
              <span>前往 GitHub 开发者控制台创建 OAuth App</span>
            </div>
            <p className="text-xs text-slate-400 ml-8">
              进入 GitHub 账号设置中的 Developer Settings 页面，注册一个新的 OAuth 应用程序。
            </p>
            <div className="ml-8">
              <a
                href="https://github.com/settings/developers"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-lg border border-slate-700 text-xs transition-colors"
              >
                <span>打开 GitHub Developer Settings</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-medium text-slate-200">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold border border-indigo-500/30">
                2
              </span>
              <span>填写 OAuth App 应用信息与回调地址 (Authorization callback URL)</span>
            </div>
            <div className="ml-8 space-y-3">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1.5">
                <div className="text-xs font-medium text-slate-400">Application name</div>
                <div className="font-mono text-xs text-slate-200">GitHub Connect Hub</div>
              </div>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1.5">
                <div className="text-xs font-medium text-slate-400">Homepage URL</div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-slate-200 truncate">{appUrl}</span>
                  <button
                    onClick={() => copyToClipboard(appUrl, 'appUrl')}
                    className="p-1 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded transition-colors"
                    title="复制"
                  >
                    {copiedKey === 'appUrl' ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-indigo-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-indigo-300">
                    Authorization callback URL (开发预览环境)
                  </div>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
                    当前环境
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <span className="font-mono text-xs text-emerald-400 select-all break-all">
                    {devCallback}
                  </span>
                  <button
                    onClick={() => copyToClipboard(devCallback, 'devCallback')}
                    className="flex-shrink-0 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors flex items-center gap-1 text-xs"
                  >
                    {copiedKey === 'devCallback' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">已复制</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>复制</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-slate-400">
                    Authorization callback URL (公开分享环境)
                  </div>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    发布后使用
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <span className="font-mono text-xs text-slate-300 select-all break-all">
                    {sharedCallback}
                  </span>
                  <button
                    onClick={() => copyToClipboard(sharedCallback, 'sharedCallback')}
                    className="flex-shrink-0 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors flex items-center gap-1 text-xs"
                  >
                    {copiedKey === 'sharedCallback' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">已复制</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>复制</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-medium text-slate-200">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold border border-indigo-500/30">
                3
              </span>
              <span>配置环境变量或使用个人访问令牌 (PAT) 极速接入</span>
            </div>
            <div className="ml-8 space-y-2 text-xs text-slate-400">
              <p>
                在创建 OAuth App 后，获取 <code className="text-amber-300">Client ID</code> 和点击生成的{' '}
                <code className="text-amber-300">Client Secret</code>，在 AI Studio 项目环境变量中配置：
              </p>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div>GITHUB_CLIENT_ID=&quot;你的_CLIENT_ID&quot;</div>
                <div>GITHUB_CLIENT_SECRET=&quot;你的_CLIENT_SECRET&quot;</div>
              </div>
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-300 flex items-start gap-2 mt-2">
                <Key className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>无需等待配置 OAuth：</strong>您也可以直接使用 GitHub Personal Access Token
                  (PAT) 或直接输入 GitHub 用户名，5 秒内直接完成链接并实时查看所有私有/公开仓库和提交记录！
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/70 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium transition-colors shadow-lg shadow-indigo-600/20"
          >
            知道了，返回
          </button>
        </div>
      </div>
    </div>
  );
};

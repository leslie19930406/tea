import React, { useState } from 'react';
import {
  ExternalLink,
  Key,
  Shield,
  Terminal,
  Copy,
  Check,
  Star,
  Code2,
  Settings,
  GitBranch,
} from 'lucide-react';
import { GitHubUser } from '../types/github';

interface QuickToolsProps {
  user: GitHubUser;
}

export const QuickTools: React.FC<QuickToolsProps> = ({ user }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const gitConfigName = `git config --global user.name "${user.name || user.login}"`;
  const gitConfigEmail = `git config --global user.email "${user.email || `${user.login}@users.noreply.github.com`}"`;
  const sshGenCmd = `ssh-keygen -t ed25519 -C "${user.email || `${user.login}@users.noreply.github.com`}"`;

  return (
    <div className="space-y-6">
      {/* Git Config Snippets */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-indigo-400" />
          <h3 className="text-sm font-semibold text-slate-200">本地 Git 全局配置快捷生成</h3>
        </div>
        <p className="text-xs text-slate-400">
          在本地终端中运行以下命令，即可将当前电脑的 Git 提交作者设置为此 GitHub 账号：
        </p>

        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
            <span className="text-slate-300 select-all">{gitConfigName}</span>
            <button
              onClick={() => copyToClipboard(gitConfigName, 'name')}
              className="p-1.5 bg-slate-850 hover:bg-slate-700 text-slate-300 rounded transition-colors flex items-center gap-1 text-[11px]"
            >
              {copiedKey === 'name' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'name' ? '已复制' : '复制'}</span>
            </button>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
            <span className="text-slate-300 select-all">{gitConfigEmail}</span>
            <button
              onClick={() => copyToClipboard(gitConfigEmail, 'email')}
              className="p-1.5 bg-slate-850 hover:bg-slate-700 text-slate-300 rounded transition-colors flex items-center gap-1 text-[11px]"
            >
              {copiedKey === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'email' ? '已复制' : '复制'}</span>
            </button>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
            <span className="text-slate-300 select-all">{sshGenCmd}</span>
            <button
              onClick={() => copyToClipboard(sshGenCmd, 'ssh')}
              className="p-1.5 bg-slate-850 hover:bg-slate-700 text-slate-300 rounded transition-colors flex items-center gap-1 text-[11px]"
            >
              {copiedKey === 'ssh' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'ssh' ? '已复制' : '复制'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* GitHub Direct Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <a
          href="https://github.com/settings/keys"
          target="_blank"
          rel="noreferrer"
          className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-850 hover:border-slate-700 transition-all flex items-start gap-3 group"
        >
          <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
            <Key className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors flex items-center gap-1">
              <span>SSH & GPG 公钥管理</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">添加或查看已绑定的 SSH 密钥</p>
          </div>
        </a>

        <a
          href="https://github.com/settings/tokens"
          target="_blank"
          rel="noreferrer"
          className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-850 hover:border-slate-700 transition-all flex items-start gap-3 group"
        >
          <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors flex items-center gap-1">
              <span>Personal Access Tokens</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">管理个人访问令牌与权限范围</p>
          </div>
        </a>

        <a
          href={`https://gist.github.com/${user.login}`}
          target="_blank"
          rel="noreferrer"
          className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-850 hover:border-slate-700 transition-all flex items-start gap-3 group"
        >
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors flex items-center gap-1">
              <span>GitHub Gists 代码片段</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">查看个人发布的代码片段</p>
          </div>
        </a>

        <a
          href={`https://github.com/${user.login}?tab=stars`}
          target="_blank"
          rel="noreferrer"
          className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-850 hover:border-slate-700 transition-all flex items-start gap-3 group"
        >
          <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
            <Star className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors flex items-center gap-1">
              <span>已标星项目 (Stars)</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">查看在 GitHub 上收藏的所有仓库</p>
          </div>
        </a>

        <a
          href="https://github.com/settings/profile"
          target="_blank"
          rel="noreferrer"
          className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-850 hover:border-slate-700 transition-all flex items-start gap-3 group"
        >
          <div className="p-2 bg-slate-700/50 text-slate-300 rounded-lg border border-slate-600/30">
            <Settings className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors flex items-center gap-1">
              <span>GitHub 个人资料设置</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">修改公开昵称、个人简介与头像</p>
          </div>
        </a>

        <a
          href="https://github.com/new"
          target="_blank"
          rel="noreferrer"
          className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-850 hover:border-slate-700 transition-all flex items-start gap-3 group"
        >
          <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
            <GitBranch className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors flex items-center gap-1">
              <span>创建新仓库 (New Repo)</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">快速初始化新的开源或私有代码库</p>
          </div>
        </a>
      </div>
    </div>
  );
};

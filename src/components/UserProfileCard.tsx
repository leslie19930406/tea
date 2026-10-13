import React, { useState } from 'react';
import {
  Github,
  MapPin,
  Building,
  Link as LinkIcon,
  Twitter,
  Mail,
  Calendar,
  Users,
  BookOpen,
  Code2,
  ExternalLink,
  Copy,
  Check,
  Shield,
  Key,
} from 'lucide-react';
import { GitHubUser, AuthMethod } from '../types/github';

interface UserProfileCardProps {
  user: GitHubUser;
  authMethod: AuthMethod;
  onOpenConnectModal: () => void;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({
  user,
  authMethod,
  onOpenConnectModal,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyProfileUrl = () => {
    navigator.clipboard.writeText(user.html_url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const createdYear = new Date(user.created_at).getFullYear();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-6 md:p-8 backdrop-blur-xl shadow-xl">
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row gap-6 md:gap-8 items-start justify-between">
        {/* Left: Avatar & Primary Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative group">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-24 h-24 md:w-28 md:h-28 rounded-2xl border-2 border-slate-700/80 shadow-2xl object-cover bg-slate-800"
            />
            <div className="absolute -bottom-2 -right-2 bg-slate-900 p-1.5 rounded-xl border border-slate-700 text-indigo-400 shadow-lg">
              <Github className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
                {user.name || user.login}
              </h1>
              {authMethod && (
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    authMethod === 'oauth'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : authMethod === 'pat'
                      ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}
                >
                  {authMethod === 'oauth' ? (
                    <>
                      <Shield className="w-3 h-3" />
                      OAuth 已授权
                    </>
                  ) : authMethod === 'pat' ? (
                    <>
                      <Key className="w-3 h-3" />
                      PAT 密钥认证
                    </>
                  ) : (
                    '公开账号探查'
                  )}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-slate-400 font-mono text-sm">
              <span>@{user.login}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-xs">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                {createdYear} 年加入 GitHub
              </span>
            </div>

            {user.bio && (
              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed pt-1">
                {user.bio}
              </p>
            )}

            {/* Meta details */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-2 text-xs text-slate-400">
              {user.company && (
                <div className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-500" />
                  <span>{user.company}</span>
                </div>
              )}
              {user.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.email && (
                <a
                  href={`mailto:${user.email}`}
                  className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>{user.email}</span>
                </a>
              )}
              {user.blog && (
                <a
                  href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors truncate max-w-xs"
                >
                  <LinkIcon className="w-3.5 h-3.5 text-slate-500" />
                  <span>{user.blog.replace(/^https?:\/\//, '')}</span>
                </a>
              )}
              {user.twitter_username && (
                <a
                  href={`https://twitter.com/${user.twitter_username}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
                >
                  <Twitter className="w-3.5 h-3.5 text-slate-500" />
                  <span>@{user.twitter_username}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium border border-slate-700 transition-all shadow-md group"
          >
            <span>访问 GitHub 主页</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
          </a>

          <button
            onClick={handleCopyProfileUrl}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-medium border border-slate-800 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">已复制链接</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>复制主页地址</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenConnectModal}
            className="sm:hidden flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600/20 text-indigo-300 rounded-xl text-xs font-medium border border-indigo-500/30"
          >
            切换账号
          </button>
        </div>
      </div>

      {/* Numerical Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
        <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/60 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg md:text-xl font-bold text-slate-100">
              {user.public_repos}
              {user.total_private_repos !== undefined && (
                <span className="text-xs text-slate-500 font-normal ml-1">
                  (+{user.total_private_repos} 私有)
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-400">公开开源仓库</div>
          </div>
        </div>

        <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/60 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg md:text-xl font-bold text-slate-100">
              {user.followers.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400">关注者 (Followers)</div>
          </div>
        </div>

        <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/60 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg md:text-xl font-bold text-slate-100">
              {user.following.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400">正在关注 (Following)</div>
          </div>
        </div>

        <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/60 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg md:text-xl font-bold text-slate-100">
              {user.public_gists}
            </div>
            <div className="text-[11px] text-slate-400">代码片段 (Gists)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

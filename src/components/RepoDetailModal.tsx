import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  Star,
  GitFork,
  GitCommit,
  BookOpen,
  Terminal,
  Copy,
  Check,
  Loader2,
  FileCode,
  Shield,
  CircleDot,
} from 'lucide-react';
import { GitHubRepo, GitHubCommit } from '../types/github';
import { formatTimeAgo, getLanguageColor } from '../utils/colors';

interface RepoDetailModalProps {
  repo: GitHubRepo | null;
  onClose: () => void;
  tokenAvailable: boolean;
}

export const RepoDetailModal: React.FC<RepoDetailModalProps> = ({
  repo,
  onClose,
  tokenAvailable,
}) => {
  const [activeTab, setActiveTab] = useState<'readme' | 'commits' | 'clone'>('readme');
  const [readmeHtml, setReadmeHtml] = useState<string | null>(null);
  const [readmeLoading, setReadmeLoading] = useState(false);
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [commitsLoading, setCommitsLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [starCount, setStarCount] = useState<number>(0);
  const [isStarring, setIsStarring] = useState(false);

  useEffect(() => {
    if (!repo) return;
    setStarCount(repo.stargazers_count);
    setActiveTab('readme');

    // Fetch README
    setReadmeLoading(true);
    fetch(`/api/github/repos/${repo.owner.login}/${repo.name}/readme`)
      .then((res) => {
        if (!res.ok) throw new Error('No readme');
        return res.json();
      })
      .then((data) => {
        setReadmeHtml(data.html || null);
      })
      .catch(() => {
        setReadmeHtml(null);
      })
      .finally(() => {
        setReadmeLoading(false);
      });

    // Fetch Commits
    setCommitsLoading(true);
    fetch(`/api/github/repos/${repo.owner.login}/${repo.name}/commits`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCommits(data);
        } else {
          setCommits([]);
        }
      })
      .catch(() => setCommits([]))
      .finally(() => setCommitsLoading(false));
  }, [repo]);

  if (!repo) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleToggleStar = async () => {
    if (!tokenAvailable) {
      alert('请先使用 GitHub OAuth 或 Personal Access Token 登录以进行加星标操作。');
      return;
    }
    setIsStarring(true);
    try {
      const res = await fetch(`/api/github/repos/${repo.owner.login}/${repo.name}/star`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'star' }),
      });
      if (res.ok) {
        setStarCount((prev) => prev + 1);
      }
    } catch {
      // ignore
    } finally {
      setIsStarring(false);
    }
  };

  const cloneHttps = `git clone ${repo.clone_url}`;
  const cloneSsh = `git clone ${repo.ssh_url}`;
  const cloneGh = `gh repo clone ${repo.full_name}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 truncate">
            <img
              src={repo.owner.avatar_url}
              alt={repo.owner.login}
              className="w-8 h-8 rounded-lg border border-slate-700 object-cover"
            />
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-100 truncate">{repo.full_name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  {repo.private ? 'Private' : 'Public'}
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate max-w-lg">
                {repo.description || '无项目描述'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleToggleStar}
              disabled={isStarring}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition-colors"
              title="标星该仓库"
            >
              <Star className="w-3.5 h-3.5 text-amber-400" />
              <span>{starCount}</span>
            </button>

            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors"
              title="在 GitHub 中打开"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Header */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 gap-2">
          <button
            onClick={() => setActiveTab('readme')}
            className={`py-3 px-3 text-xs font-medium border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'readme'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            README 项目文档
          </button>
          <button
            onClick={() => setActiveTab('commits')}
            className={`py-3 px-3 text-xs font-medium border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'commits'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <GitCommit className="w-3.5 h-3.5" />
            最近提交 ({commits.length})
          </button>
          <button
            onClick={() => setActiveTab('clone')}
            className={`py-3 px-3 text-xs font-medium border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'clone'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            代码克隆与一键开发
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'readme' && (
            <div>
              {readmeLoading ? (
                <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-3">
                  <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
                  <span className="text-xs">加载 README 文档中...</span>
                </div>
              ) : readmeHtml ? (
                <div
                  className="prose prose-invert prose-slate max-w-none text-xs md:text-sm text-slate-200 leading-relaxed overflow-x-auto"
                  dangerouslySetInnerHTML={{ __html: readmeHtml }}
                />
              ) : (
                <div className="text-center py-16 text-slate-500 space-y-2">
                  <FileCode className="w-8 h-8 mx-auto text-slate-600" />
                  <p className="text-xs">此仓库根目录未提供 README.md 文档</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'commits' && (
            <div className="space-y-3">
              {commitsLoading ? (
                <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-3">
                  <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
                  <span className="text-xs">加载 Commit 提交历史中...</span>
                </div>
              ) : commits.length === 0 ? (
                <div className="text-center py-16 text-slate-500">
                  <p className="text-xs">暂无提交记录或无权限访问</p>
                </div>
              ) : (
                commits.map((c) => (
                  <div
                    key={c.sha}
                    className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/50 hover:bg-slate-950 transition-colors flex items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      {c.author?.avatar_url ? (
                        <img
                          src={c.author.avatar_url}
                          alt={c.author.login}
                          className="w-7 h-7 rounded-full border border-slate-700 object-cover mt-0.5"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-slate-400 border border-slate-700 mt-0.5">
                          {c.commit.author.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-semibold text-slate-200 leading-snug">
                          {c.commit.message.split('\n')[0]}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                          <span className="font-medium text-slate-300">
                            {c.author?.login || c.commit.author.name}
                          </span>
                          <span>•</span>
                          <span>{formatTimeAgo(c.commit.author.date)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="font-mono text-[11px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-indigo-300">
                        {c.sha.slice(0, 7)}
                      </span>
                      <a
                        href={c.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 hover:text-indigo-400 text-slate-500 transition-colors"
                        title="在 GitHub 查看该提交详情"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'clone' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Git 仓库克隆命令
                </h4>

                <div className="space-y-2">
                  <div className="text-xs text-slate-400">HTTPS 克隆</div>
                  <div className="flex items-center justify-between gap-2 p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs">
                    <span className="text-slate-300 select-all truncate">{cloneHttps}</span>
                    <button
                      onClick={() => copyToClipboard(cloneHttps, 'https')}
                      className="p-1.5 bg-slate-850 hover:bg-slate-700 text-slate-300 rounded transition-colors"
                    >
                      {copiedKey === 'https' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-slate-400">SSH 克隆 (推荐已配置 SSH Key)</div>
                  <div className="flex items-center justify-between gap-2 p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs">
                    <span className="text-slate-300 select-all truncate">{cloneSsh}</span>
                    <button
                      onClick={() => copyToClipboard(cloneSsh, 'ssh')}
                      className="p-1.5 bg-slate-850 hover:bg-slate-700 text-slate-300 rounded transition-colors"
                    >
                      {copiedKey === 'ssh' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-slate-400">GitHub CLI</div>
                  <div className="flex items-center justify-between gap-2 p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs">
                    <span className="text-slate-300 select-all truncate">{cloneGh}</span>
                    <button
                      onClick={() => copyToClipboard(cloneGh, 'gh')}
                      className="p-1.5 bg-slate-850 hover:bg-slate-700 text-slate-300 rounded transition-colors"
                    >
                      {copiedKey === 'gh' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Online Web IDE launch */}
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  在线 Web IDE 即刻编写代码
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={`https://github.dev/${repo.full_name}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-slate-950/70 hover:bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                        github.dev (Web 版 VS Code)
                      </div>
                      <div className="text-[11px] text-slate-400">在浏览器中即刻编辑代码与提交</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                  </a>

                  <a
                    href={`https://vscode.dev/github/${repo.full_name}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-slate-950/70 hover:bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                        vscode.dev
                      </div>
                      <div className="text-[11px] text-slate-400">微软官方轻量云端 VS Code 实例</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

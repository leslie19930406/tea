import React, { useState, useMemo } from 'react';
import {
  BookMarked,
  Star,
  GitFork,
  Lock,
  Search,
  ExternalLink,
  Code,
  FileText,
  Clock,
  Filter,
} from 'lucide-react';
import { GitHubRepo } from '../types/github';
import { getLanguageColor, formatTimeAgo } from '../utils/colors';

interface RepoListProps {
  repos: GitHubRepo[];
  loading: boolean;
  onSelectRepo: (repo: GitHubRepo) => void;
}

export const RepoList: React.FC<RepoListProps> = ({
  repos,
  loading,
  onSelectRepo,
}) => {
  const [search, setSearch] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [filterType, setFilterType] = useState<'all' | 'public' | 'private' | 'forks'>('all');
  const [sortBy, setSortBy] = useState<'updated' | 'stars' | 'forks' | 'name'>('updated');

  // Compute available languages
  const availableLanguages = useMemo(() => {
    const langs = new Set<string>();
    repos.forEach((r) => {
      if (r.language) langs.add(r.language);
    });
    return Array.from(langs).sort();
  }, [repos]);

  // Filtered and sorted repos
  const filteredRepos = useMemo(() => {
    return repos
      .filter((repo) => {
        // Search
        const matchesSearch =
          repo.name.toLowerCase().includes(search.toLowerCase()) ||
          (repo.description && repo.description.toLowerCase().includes(search.toLowerCase())) ||
          (repo.topics && repo.topics.some((t) => t.toLowerCase().includes(search.toLowerCase())));

        // Language
        const matchesLang =
          selectedLanguage === 'all' || repo.language === selectedLanguage;

        // Type
        let matchesType = true;
        if (filterType === 'public') matchesType = !repo.private && !repo.fork;
        else if (filterType === 'private') matchesType = repo.private;
        else if (filterType === 'forks') matchesType = repo.fork;

        return matchesSearch && matchesLang && matchesType;
      })
      .sort((a, b) => {
        if (sortBy === 'updated') {
          return new Date(b.pushed_at || b.updated_at).getTime() - new Date(a.pushed_at || a.updated_at).getTime();
        }
        if (sortBy === 'stars') {
          return b.stargazers_count - a.stargazers_count;
        }
        if (sortBy === 'forks') {
          return b.forks_count - a.forks_count;
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [repos, search, selectedLanguage, filterType, sortBy]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-slate-800/50 rounded-xl animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 space-y-3 animate-pulse"
            >
              <div className="h-5 w-40 bg-slate-800 rounded" />
              <div className="h-4 w-full bg-slate-800/60 rounded" />
              <div className="flex gap-4 pt-2">
                <div className="h-3 w-16 bg-slate-800 rounded" />
                <div className="h-3 w-12 bg-slate-800 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="筛选仓库或技术栈标签..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Type filters */}
          <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                filterType === 'all'
                  ? 'bg-slate-800 text-indigo-400 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              全部 ({repos.length})
            </button>
            <button
              onClick={() => setFilterType('public')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                filterType === 'public'
                  ? 'bg-slate-800 text-indigo-400 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              原创开源
            </button>
            <button
              onClick={() => setFilterType('forks')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                filterType === 'forks'
                  ? 'bg-slate-800 text-indigo-400 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              派生 (Forks)
            </button>
          </div>

          {/* Language filter */}
          {availableLanguages.length > 0 && (
            <div className="relative flex items-center">
              <Filter className="w-3.5 h-3.5 absolute left-2.5 text-slate-500 pointer-events-none" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-6 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors appearance-none cursor-pointer"
              >
                <option value="all">所有开发语言</option>
                {availableLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Sort selection */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
          >
            <option value="updated">按最近更新排序</option>
            <option value="stars">按 Star 标星数</option>
            <option value="forks">按 Fork 派生数</option>
            <option value="name">按项目名称</option>
          </select>
        </div>
      </div>

      {/* Repos Grid */}
      {filteredRepos.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-2xl border border-slate-800 bg-slate-900/40">
          <BookMarked className="w-8 h-8 text-slate-600 mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-300">没有找到匹配的仓库</p>
          <p className="text-xs text-slate-500 mt-1">请尝试清除搜索关键字或调整筛选条件</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRepos.map((repo) => {
            const langColor = getLanguageColor(repo.language);
            return (
              <div
                key={repo.id}
                onClick={() => onSelectRepo(repo)}
                className="group relative flex flex-col justify-between p-5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-850 hover:border-slate-700 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-0.5"
              >
                <div className="space-y-2.5">
                  {/* Repo header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 font-medium text-slate-200 group-hover:text-indigo-400 transition-colors truncate">
                      {repo.private ? (
                        <Lock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      ) : repo.fork ? (
                        <GitFork className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      ) : (
                        <BookMarked className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                      )}
                      <span className="truncate text-sm font-semibold tracking-tight">
                        {repo.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/60">
                        {repo.private ? 'Private' : repo.fork ? 'Fork' : 'Public'}
                      </span>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 hover:text-indigo-400 text-slate-500 rounded transition-colors"
                        title="在 GitHub 中打开"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed h-8">
                    {repo.description || '暂无项目简介描述'}
                  </p>

                  {/* Topics badges */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {repo.topics.slice(0, 4).map((topic) => (
                        <span
                          key={topic}
                          className="text-[10px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.2 rounded-md font-mono"
                        >
                          {topic}
                        </span>
                      ))}
                      {repo.topics.length > 4 && (
                        <span className="text-[10px] text-slate-500 self-center">
                          +{repo.topics.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer stats */}
                <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-800/70 text-xs text-slate-400">
                  <div className="flex items-center gap-4">
                    {repo.language && (
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: langColor }}
                        />
                        <span className="text-[11px] text-slate-300">{repo.language}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Star className="w-3 h-3 text-amber-400" />
                      <span>{repo.stargazers_count}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <GitFork className="w-3 h-3 text-slate-400" />
                      <span>{repo.forks_count}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>更新于 {formatTimeAgo(repo.pushed_at || repo.updated_at)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

import React from 'react';
import {
  GitCommit,
  Star,
  GitFork,
  BookOpen,
  Tag,
  CircleDot,
  Loader2,
  Activity,
  ExternalLink,
} from 'lucide-react';
import { GitHubEvent } from '../types/github';
import { formatTimeAgo } from '../utils/colors';

interface ActivityTimelineProps {
  events: GitHubEvent[];
  loading: boolean;
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  events,
  loading,
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
        <span className="text-xs">获取近期 GitHub 动态中...</span>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12 px-4 rounded-2xl border border-slate-800 bg-slate-900/40">
        <Activity className="w-8 h-8 text-slate-600 mx-auto mb-3" />
        <p className="text-sm font-medium text-slate-300">暂无近期公开动态</p>
        <p className="text-xs text-slate-500 mt-1">该用户近期可能未进行公开推送或标星活动</p>
      </div>
    );
  }

  const renderEventDetails = (event: GitHubEvent) => {
    switch (event.type) {
      case 'PushEvent': {
        const commits = event.payload.commits || [];
        return (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <span>推送了 {commits.length} 个提交至</span>
              <a
                href={`https://github.com/${event.repo.name}`}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-indigo-400 hover:underline"
              >
                {event.repo.name}
              </a>
            </div>
            {commits.slice(0, 3).map((c) => (
              <div
                key={c.sha}
                className="text-[11px] font-mono text-slate-400 bg-slate-950 p-2 rounded-lg border border-slate-800/80 truncate"
              >
                <span className="text-indigo-400 mr-2">{c.sha.slice(0, 7)}</span>
                <span>{c.message}</span>
              </div>
            ))}
          </div>
        );
      }
      case 'WatchEvent':
        return (
          <div className="text-xs text-slate-300 flex items-center gap-1.5">
            <span>标星了项目 (Star)</span>
            <a
              href={`https://github.com/${event.repo.name}`}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-indigo-400 hover:underline"
            >
              {event.repo.name}
            </a>
          </div>
        );
      case 'ForkEvent':
        return (
          <div className="text-xs text-slate-300 flex items-center gap-1.5">
            <span>派生了项目 (Fork)</span>
            <a
              href={`https://github.com/${event.repo.name}`}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-indigo-400 hover:underline"
            >
              {event.repo.name}
            </a>
          </div>
        );
      case 'CreateEvent':
        return (
          <div className="text-xs text-slate-300 flex items-center gap-1.5">
            <span>创建了 {event.payload.ref_type || '资源'}</span>
            <a
              href={`https://github.com/${event.repo.name}`}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-indigo-400 hover:underline"
            >
              {event.repo.name}
            </a>
            {event.payload.ref && (
              <span className="font-mono text-[11px] text-slate-400">
                ({event.payload.ref})
              </span>
            )}
          </div>
        );
      case 'IssuesEvent':
        return (
          <div className="text-xs text-slate-300 space-y-1">
            <div>
              <span>{event.payload.action} 了 Issue 在 </span>
              <a
                href={`https://github.com/${event.repo.name}`}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-indigo-400 hover:underline"
              >
                {event.repo.name}
              </a>
            </div>
            {event.payload.issue && (
              <div className="text-[11px] text-slate-400 bg-slate-950 p-2 rounded-lg border border-slate-800">
                #{event.payload.issue.number} {event.payload.issue.title}
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="text-xs text-slate-300">
            <span>在 </span>
            <a
              href={`https://github.com/${event.repo.name}`}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-indigo-400 hover:underline"
            >
              {event.repo.name}
            </a>
            <span> 触发了 {event.type}</span>
          </div>
        );
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'PushEvent':
        return <GitCommit className="w-4 h-4 text-emerald-400" />;
      case 'WatchEvent':
        return <Star className="w-4 h-4 text-amber-400" />;
      case 'ForkEvent':
        return <GitFork className="w-4 h-4 text-purple-400" />;
      case 'CreateEvent':
        return <BookOpen className="w-4 h-4 text-indigo-400" />;
      default:
        return <Activity className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative border-l border-slate-800 ml-4 space-y-6">
        {events.map((event) => (
          <div key={event.id} className="relative pl-6">
            {/* Event Icon Pin */}
            <div className="absolute -left-3 top-0.5 p-1 bg-slate-900 border border-slate-800 rounded-full shadow">
              {getEventIcon(event.type)}
            </div>

            {/* Event Card */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-850 transition-colors space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300">{event.type}</span>
                <span className="text-[11px] text-slate-500">{formatTimeAgo(event.created_at)}</span>
              </div>

              {renderEventDetails(event)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

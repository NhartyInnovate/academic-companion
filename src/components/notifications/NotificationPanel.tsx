import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, 
  X, 
  Flame, 
  BookOpen, 
  Calendar, 
  Sparkles, 
  CheckCheck 
} from 'lucide-react';

export const NotificationPanel: React.FC = () => {
  const { 
    notifications, 
    isNotificationPanelOpen, 
    setIsNotificationPanelOpen, 
    markNotificationAsRead, 
    markAllNotificationsAsRead,
    setCurrentRoute 
  } = useApp();

  if (!isNotificationPanelOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsNotificationPanelOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-white border-l border-slate-200 text-slate-900 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-base text-slate-900 editorial-serif">Notifications</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={markAllNotificationsAsRead}
                className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                title="Mark all notifications as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark read</span>
              </button>
              <button
                onClick={() => setIsNotificationPanelOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No notifications right now.
              </div>
            ) : (
              notifications.map((n) => {
                const getIcon = () => {
                  switch (n.type) {
                    case 'streak':
                      return <Flame className="w-4 h-4 text-orange-500" />;
                    case 'assessment':
                      return <Calendar className="w-4 h-4 text-rose-500" />;
                    case 'mission':
                      return <BookOpen className="w-4 h-4 text-indigo-600" />;
                    default:
                      return <Sparkles className="w-4 h-4 text-emerald-600" />;
                  }
                };

                return (
                  <div
                    key={n.id}
                    onClick={() => {
                      markNotificationAsRead(n.id);
                      if (n.actionRoute) {
                        setCurrentRoute(n.actionRoute);
                        setIsNotificationPanelOpen(false);
                      }
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      n.isRead
                        ? 'bg-slate-50 border-slate-200 opacity-75'
                        : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex-shrink-0">
                        {getIcon()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{n.title}</h4>
                          {!n.isRead && (
                            <span className="w-2 h-2 rounded-full bg-indigo-600 flex-shrink-0"></span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed mb-2">
                          {n.message}
                        </p>
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span>{n.timestamp}</span>
                          <span className="text-slate-900 font-semibold hover:underline">View details →</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Supportive Footer Note */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 text-center text-xs text-slate-500 font-serif italic">
            "One meaningful study step at a time."
          </div>
        </div>
      </div>
    </div>
  );
};

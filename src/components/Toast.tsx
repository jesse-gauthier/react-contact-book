import type { ToastMessage } from '../types';

export interface ToastProps {
  toasts: ToastMessage[];
}

export default function Toast({ toasts }: ToastProps) {
  return (
    <div className="toast toast-end z-50 bottom-28 md:bottom-6 gap-3">
      {toasts.map(t => (
        <div key={t.id} className={`alert alert-${t.type} shadow-2xl rounded-2xl border-2 border-${t.type}/20 backdrop-blur-lg animate-in slide-in-from-right duration-300`}>
          {t.type === 'success' && (
            <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {t.type === 'error' && (
            <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {t.type === 'info' && (
            <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <span className="font-semibold">{t.message}</span>
        </div>
      ))}
    </div>
  );
}



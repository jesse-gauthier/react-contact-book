import type { ToastMessage } from '../types';

export interface ToastProps {
  toasts: ToastMessage[];
}

export default function Toast({ toasts }: ToastProps) {
  return (
    <div className="toast toast-end z-50">
      {toasts.map(t => (
        <div key={t.id} className={`alert alert-${t.type}`}>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}



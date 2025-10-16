import { useId } from 'react';

export interface ConfirmDialogProps {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  title,
  description,
  confirmText,
  cancelText,
  open,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const modalId = useId();
  return (
    <dialog className="modal" open={open} aria-labelledby={`${modalId}-title`}>
      <div className="modal-box">
        <h3 id={`${modalId}-title`} className="font-bold text-lg">
          {title}
        </h3>
        {description ? <p className="py-4">{description}</p> : null}
        <div className="modal-action">
          <button className="btn" onClick={onCancel}>
            {cancelText ?? 'Cancel'}
          </button>
          <button className="btn btn-error" onClick={onConfirm}>
            {confirmText ?? 'Delete'}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop" onSubmit={(e) => e.preventDefault()}>
        <button onClick={onCancel}>close</button>
      </form>
    </dialog>
  );
}



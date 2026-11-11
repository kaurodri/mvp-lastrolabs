import { useRef, useState } from 'react';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import IconButton from '../ui/IconButton.jsx';
import { CheckCircleSolidIcon, CloudUploadIcon, FileCheckIcon, PencilIcon, TrashIcon } from '../icons/Icons.jsx';
import { ACCEPT_ATTR } from '../../utils/files.js';

/** Anel de progresso com a porcentagem no centro. */
function ProgressRing({ value }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative h-11 w-11" role="progressbar" aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={100}>
      <svg viewBox="0 0 44 44" className="h-full w-full -rotate-90">
        <circle cx="22" cy="22" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="4" />
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="#2196f3"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - value / 100)}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-slate-700">
        {Math.round(value)}%
      </span>
    </div>
  );
}

/**
 * Cartão de envio do laudo, com 3 estados:
 *  1. sem arquivo  → área tracejada para soltar/escolher o arquivo
 *  2. enviando     → anel de progresso + Cancelar
 *  3. enviado      → nome e tamanho do arquivo, com editar (substituir) e excluir
 */
export default function UploadCard({ file, upload, error, locked, onPick, onCancel, onRemove }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const choose = () => inputRef.current?.click();
  const handleFiles = (files) => files?.[0] && onPick(files[0]);

  return (
    <Card className="p-5 shadow-soft sm:p-6">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_ATTR}
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = ''; // permite escolher o mesmo arquivo de novo
        }}
      />

      {upload ? (
        <div className="flex h-[160px] flex-col items-center justify-center gap-2 rounded-lg border border-blue-700 text-center sm:h-[160px]">
          <ProgressRing value={upload.progress} />
          <p className="text-sm text-slate-800">Uploading...</p>
          <Button variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      ) : file ? (
        <>
          <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3 sm:px-4">
            <div className="flex min-w-0 items-center gap-3">
              <FileCheckIcon className="h-7 w-7 shrink-0 text-lastro-navy" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900" title={file.nome}>
                  {file.nome}
                </p>
                <p className="text-xs text-slate-500">{file.tamanho}</p>
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <IconButton
                tone="accent"
                icon={PencilIcon}
                label={locked ? 'Não é possível substituir o arquivo neste status' : 'Substituir arquivo'}
                disabled={locked}
                onClick={choose}
              />
              <IconButton
                tone="accent"
                icon={TrashIcon}
                label={locked ? 'Não é possível excluir o arquivo neste status' : 'Excluir arquivo'}
                disabled={locked}
                onClick={onRemove}
              />
            </div>
          </div>
          <p className="mt-4 flex items-center gap-3 text-sm text-slate-600">
            <CheckCircleSolidIcon className="h-5 w-5 text-green-600" />
            Envio realizado com sucesso.
          </p>
        </>
      ) : (
        <>
          <div
            role="button"
            tabIndex={0}
            aria-label="Upload do arquivo: clique ou solte o arquivo aqui"
            onClick={choose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), choose())}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleFiles(e.dataTransfer.files);
            }}
            className={`flex h-[160px] cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
              dragging ? 'border-accent bg-blue-50' : 'border-blue-700/70 hover:bg-slate-50'
            }`}
          >
            <CloudUploadIcon className="h-9 w-9 text-accent" strokeWidth={1.8} />
            <p className="mt-1 text-sm text-slate-800">
              Upload do <span className="font-semibold text-accent">Arquivo</span>
            </p>
            <p className="text-sm text-slate-500">Arquivos até 10 MB</p>
          </div>
          <p className="mt-3 text-sm text-slate-500">Arquivos em PDF, jpeg e zip</p>
        </>
      )}

      {error && (
        <p role="alert" className="mt-3 text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </Card>
  );
}

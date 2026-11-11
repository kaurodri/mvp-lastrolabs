import Card from '../ui/Card.jsx';
import { CheckIcon, CloseIcon } from '../icons/Icons.jsx';

const CIRCLE = {
  todo: 'border-2 border-slate-300 bg-white',
  current: 'border-2 border-lastro-cyan bg-white',
  done: 'bg-green-600 text-white',
  error: 'bg-red-600 text-white',
};

function StepMarker({ state }) {
  return (
    <span className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${CIRCLE[state]}`}>
      {state === 'done' && <CheckIcon className="h-3.5 w-3.5" />}
      {state === 'error' && <CloseIcon className="h-3.5 w-3.5" />}
      {state === 'current' && <span className="h-2.5 w-2.5 rounded-full bg-lastro-cyan" />}
    </span>
  );
}

/** "Rastreio do envio": 3 etapas com data; a linha fica verde nas etapas concluídas. */
export default function UploadTimeline({ steps }) {
  return (
    <Card className="p-5 shadow-soft sm:p-6" aria-labelledby="timeline-title">
      <h2 id="timeline-title" className="text-base font-semibold text-slate-800">
        Rastreio do envio
      </h2>

      <div className="mt-4 rounded-lg border border-slate-200">
        <p className="border-b border-slate-200 px-4 py-3 text-base text-slate-700">Acompanhe o avanço das etapas:</p>
        <ol className="px-3 py-4 sm:px-4">
          {steps.map((step, i) => (
            <li key={step.label} className="relative flex gap-4 pb-6 last:pb-1">
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`absolute left-3 top-6 -ml-px h-full w-0.5 ${step.state === 'done' ? 'bg-green-600' : 'bg-slate-300'}`}
                />
              )}
              <StepMarker state={step.state} />
              <div className="-mt-0.5">
                <p className="text-sm font-medium text-slate-900">{step.label}</p>
                <p className="text-xs text-slate-500">{step.date}</p>
                {step.state === 'error' && <p className="mt-0.5 text-xs font-medium text-red-600">Laudo não aprovado. Reenvie o arquivo.</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Card>
  );
}

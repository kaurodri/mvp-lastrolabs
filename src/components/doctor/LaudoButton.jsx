import Button from '../ui/Button.jsx';
import { ArrowUpRightIcon } from '../icons/Icons.jsx';
import { laudoAction } from '../../utils/requests.js';

/** "Enviar" (azul-marinho) quando o laudo precisa ser enviado; "Acompanhar" (ciano) depois. */
export default function LaudoButton({ request, onClick }) {
  const send = laudoAction(request) === 'Enviar';
  return (
    <Button
      variant={send ? 'primary' : 'accent'}
      icon={send ? ArrowUpRightIcon : undefined}
      onClick={() => onClick(request)}
      aria-label={`${send ? 'Enviar laudo de' : 'Acompanhar envio de'} ${request.nome}`}
      className="min-w-[104px] font-semibold!"
    >
      {send ? 'Enviar' : 'Acompanhar'}
    </Button>
  );
}

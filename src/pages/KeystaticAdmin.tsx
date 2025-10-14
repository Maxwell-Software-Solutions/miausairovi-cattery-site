import { Keystatic } from '@keystatic/core/ui';
import config from '../../keystatic.config';
import { AuthGuard } from '@/components/auth/AuthGuard';

export default function KeystaticAdmin() {
  return (
    <AuthGuard>
      {/* @ts-expect-error - Keystatic type definitions have issues with strict typing */}
      <Keystatic config={config} />
    </AuthGuard>
  );
}

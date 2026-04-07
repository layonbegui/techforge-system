import { ReactNode } from 'react';
import { PageHeader } from '../components/PageHeader';

export const AppLayout = ({ children }: { children: ReactNode }) => (
  <div className="page-shell">
    <div className="container">
      <PageHeader />
      {children}
    </div>
  </div>
);

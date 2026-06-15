import React from 'react';
import { Button } from './Button';

interface CareCardProps {
  title: string;
  text: string;
  actionText: string;
}

export const CareCard: React.FC<CareCardProps> = ({ title, text, actionText }) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-[var(--border-color)] shadow-sm">
      <h3 className="font-semibold text-[18px] text-[var(--text-primary)] mb-2">{title}</h3>
      <p className="text-[14px] text-[var(--text-secondary)] mb-4">{text}</p>
      <Button variant="secondary" className="w-full py-3 h-auto rounded-full font-semibold">
        {actionText}
      </Button>
    </div>
  );
};

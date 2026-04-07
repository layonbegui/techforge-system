import { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const InputField = ({ label, ...props }: Props) => (
  <label className="field">
    <span>{label}</span>
    <input {...props} />
  </label>
);

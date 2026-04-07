import { SelectHTMLAttributes } from 'react';

type Option = { value: string; label: string };

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: Option[];
};

export const SelectField = ({ label, options, ...props }: Props) => (
  <label className="field">
    <span>{label}</span>
    <select {...props}>
      <option value="">Selecione</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);

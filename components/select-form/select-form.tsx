import React from 'react'

type HtmlSelectProps = Omit<JSX.IntrinsicElements['select'], 'ref'>;

type Props = HtmlSelectProps & {
  label: string;
  options: Array<string>;
}

export const SelectForm: React.FC<Props> = ({label, options, ...props}) => {
  return (
    <div>
      <select
        id="location"
        name="location"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        {...props}
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

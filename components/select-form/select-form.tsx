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
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base focus:outline-none sm:text-sm rounded-md bg-stone-800 text-stone-300"
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

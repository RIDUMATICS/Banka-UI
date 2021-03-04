import react from 'react';

const ToggleButton = (props) => (
  <label className="flex items-center">
    <div className="order-2 ml-3 text-gray-700 font-medium">{props.label}</div>
    <div className="relative order-1">
      {/* Checkbox Input */}
      <input type="checkbox" className="hidden" checked={props.checked} onChange={(e) => props.onChange(e.target.checked)}/>
      {/* Line */}
      <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
      {/* Dot */}
      <div className="toggle__dot"></div>
    </div>

    {/* Label */}
  </label>
);

export default ToggleButton;

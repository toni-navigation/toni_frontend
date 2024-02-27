import React from 'react';
import { Text, TouchableOpacity, useColorScheme } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  buttonType: 'primary' | 'secondary' | 'primaryOutline' | 'secondaryOutline';
  disabled?: boolean | false;
}
function Button({ children, onPress, buttonType, disabled }: ButtonProps) {
  const colorscheme = useColorScheme();
  let buttonLook;
  switch (buttonType) {
    case 'primary':
      buttonLook =
        colorscheme === 'light'
          ? 'bg-primary-color-light'
          : 'bg-primary-color-dark';
      break;
    case 'secondary':
      buttonLook =
        colorscheme === 'light'
          ? 'bg-secondary-color-light color-white'
          : 'bg-secondary-color-dark';
      break;
    case 'primaryOutline':
      buttonLook =
        colorscheme === 'light'
          ? 'bg-primary-color-light border border-solid border-black-600'
          : 'bg-primary-color-dark border border-solid border-black-600';
      break;
    case 'secondaryOutline':
      buttonLook =
        colorscheme === 'light'
          ? 'bg-secondary-color-light border border-solid border-black-600'
          : 'bg-secondary-color-dark border border-solid border-black-600';
      break;
    default:
      buttonLook = 'bg-primary-color-light';
      break;
  }
  return (
    <TouchableOpacity
      className={`h-20 flex justify-center font-bold py-2 px-4 rounded ${disabled ? 'bg-disabled-color' : buttonLook}`}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        className="(colorscheme === 'light'
          ? 'text-white font-verdana'
          : 'text-dark font-verdana')
          text-white text-center text-lg"
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;

/*import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  buttonType: 'primary' | 'secondary' | 'primaryOutline' | 'secondaryOutline';
  disabled?: boolean | false;
}
function Button({ children, onPress, buttonType, disabled }: ButtonProps) {
  let buttonLook;
  switch (buttonType) {
    case 'primary':
      buttonLook = 'bg-primary-color-light dark:bg-primary-color-dark';
      break;
    case 'secondary':
      buttonLook = 'bg-secondary-color-light dark:bg-secondary-color-dark';
      break;
    case 'primaryOutline':
      buttonLook =
        'bg-primary-color-light border border-solid border-black-600 dark:bg-primary-color-dark border border-solid border-black-600';
      break;
    case 'secondaryOutline':
      buttonLook =
        'bg-secondary-color-light border border-solid border-black-600 dark:bg-secondary-color-dark border border-solid border-black-600';
      break;
    default:
      buttonLook = 'bg-primary-color-light';
      break;
  }
  console.log(buttonLook);
  return (
    <TouchableOpacity
      className={`h-20 flex justify-center font-bold py-2 px-4 rounded ${disabled ? 'bg-disabled-color' : buttonLook}`}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        className="('text-white font-verdana dark:text-black font-verdana')
          text-white text-center text-lg"
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;*/

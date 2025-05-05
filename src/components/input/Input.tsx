import { FC } from "react"
import styles from './Input.module.scss'

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'sm' | 'md' | 'lg'
  inputColor?: 'primary' | 'error'
}

const SIZES = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLG,
}

const COLORS = {
  primary: styles.primary,
  error: styles.error
}

const Input: FC<IInputProps> = ({ inputSize = 'sm', inputColor = 'primary', ...props }) => {

  return (
    <input className={`${styles.input} ${SIZES[inputSize]} ${COLORS[inputColor]}`}  {...props} />
  )
}

export default Input

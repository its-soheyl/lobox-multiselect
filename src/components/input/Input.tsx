import { FC, memo } from "react"
import styles from './Input.module.scss'

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'sm' | 'md' | 'lg'
  inputColor?: 'primary' | 'error'
  icon?: React.ReactNode
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

const Input: FC<IInputProps> = memo(({ inputSize = 'sm', inputColor = 'primary', icon, ...props }) => {

  return (
    <div className={styles.inputContainer}>
      <input className={`${styles.input} ${SIZES[inputSize]} ${COLORS[inputColor]}`}  {...props} />
      {icon && <span className={styles.inputIcon}>{icon}</span>}
    </div>
  )
})

export default Input

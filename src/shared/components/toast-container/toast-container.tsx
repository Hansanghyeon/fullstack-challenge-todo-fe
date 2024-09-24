import 'react-toastify/dist/ReactToastify.min.css'
import './toast-container.css'
import { cva } from 'class-variance-authority'
import { IoClose } from 'react-icons/io5'
import { MdError } from 'react-icons/md'
import { PiCheckCircleDuotone } from 'react-icons/pi'
import { ToastContainer as ToastContainerPrimitive } from 'react-toastify'
import { match } from 'ts-pattern'

const stateMap = {
  default: 'default',
  success: 'success',
  critical: 'critical',
} as const

/**
 * 우선 당장 필요한 UI만 정의했습니다.
 */
const toastVariants = cva(
  'mx-auto flex w-fit items-center break-keep rounded-full text-center',
  {
    variants: {
      size: {
        [stateMap.default]: 'px-3 py-2',
        [stateMap.success]: 'py-2 pl-3 pr-4',
        [stateMap.critical]: 'py-2 pl-3 pr-4',
      },
      state: {
        [stateMap.default]: '',
        [stateMap.success]: 'bg-green-500 text-[#F0F1F3]',
        [stateMap.critical]: 'bg-red-500 text-[#F0F1F3]',
      },
    },
    defaultVariants: {
      size: stateMap.default,
      state: stateMap.default,
    },
  },
)

export function ToastContainer() {
  return (
    <ToastContainerPrimitive
      toastClassName={(context) => {
        const state = match(context?.type)
          .with('error', () => stateMap.critical)
          .with('success', () => stateMap.success)
          .with('info', () => stateMap.success)
          .otherwise(() => stateMap.default)
        return toastVariants({
          state,
          size: state,
        })
      }}
      position="bottom-center"
      autoClose={3000}
      icon={(context) => {
        const result = match(context?.type)
          .with('success', () => <PiCheckCircleDuotone />)
          .with('error', () => <MdError />)
          .otherwise(() => null)
        return result
      }}
      hideProgressBar={true}
      closeButton={(context) => {
        const result = match(context?.type)
          .with('info', () => (
            <button
              type="button"
              onClick={context?.closeToast}
              className="ml-4"
            >
              <IoClose />
            </button>
          ))
          .otherwise(() => false)
        return result
      }}
    />
  )
}

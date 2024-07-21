import { pipe, flow } from 'fp-ts/function'
import * as R from 'fp-ts/Record'
import * as O from 'fp-ts/Option'
import { ControllerFieldState, Mode } from 'react-hook-form'
import { match } from 'ts-pattern'

/**
 * @description clay isValid를 react-hook-form controller field state 에 맞게 값을 구하는 함수
 */
export function IsValid(
  { isTouched, error, invalid }: ControllerFieldState,
  mode?: Mode,
) {
  if (mode === 'onSubmit') {
    return match<boolean>(true)
      .with(
        pipe(
          error,
          O.fromNullable,
          O.fold(
            () => false,
            flow(R.isEmpty, (e) => !e),
          ),
        ),
        () => false,
      )
      .otherwise(() => undefined)
  }
  return match<boolean>(true)
    .with(!isTouched && !invalid, () => undefined)
    .with(
      pipe(
        error,
        O.fromNullable,
        O.fold(
          () => false,
          flow(R.isEmpty, (x) => !x),
        ),
      ),
      () => false,
    )
    .otherwise(() => true)
}

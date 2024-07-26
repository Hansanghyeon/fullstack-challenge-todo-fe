import { pipe } from 'fp-ts/function'
import * as R from 'fp-ts/Record'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { FormProvider, useForm } from 'react-hook-form'
import {
  postPayloadSignUpRdo,
  postSignUp,
  TPostPayloadSignUpRdo,
} from '~/api/sign-up'
import { IsValid } from '~/shared/calc/is-valid'
import { Button } from '~/shared/components/ui/button'
import { Checkbox } from '~/shared/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/shared/components/ui/form'
import { Input } from '~/shared/components/ui/input'
import { toast } from 'react-toastify'

export const Route = createLazyFileRoute('/_auth/signup')({
  component: Register,
})

function Register() {
  const nativate = useNavigate()
  const form = useForm<TPostPayloadSignUpRdo>({
    resolver: zodResolver(postPayloadSignUpRdo),
    defaultValues: {
      user_email: '',
      password: '',
    },
  })

  const {
    handleSubmit,
    formState: { errors },
  } = form

  const { mutate } = useMutation({
    mutationFn: postSignUp(),
    onSuccess() {
      toast.success('회원가입이 완료되었습니다.')
      nativate({ to: '/signin' })
    },
    onError({ response }) {
      if (response?.data.message === 'User email aleady used!') {
        form.setError('user_email', {
          type: 'manual',
          message: '이미 사용중인 이메일입니다.',
        })
      }
    },
  })

  const onSubmit = handleSubmit(({ terms: _terms, ...payload }) => {
    mutate(payload)
  })

  return (
    <div className="mx-auto max-w-[400px] space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">회원가입</h1>
        <p className="text-muted-foreground">시작하려면 계정을 만드세요.</p>
      </div>
      <FormProvider {...form}>
        <form onSubmit={onSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="user_email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="hello@example.com"
                        isValid={IsValid(fieldState)}
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        isValid={IsValid(fieldState)}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="mt-10 flex items-start gap-2">
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      <Link href="/" className="underline underline-offset-4">
                        서비스 약관
                      </Link>{' '}
                      및{' '}
                      <Link href="/" className="underline underline-offset-4">
                        개인 정보 보호 정책
                      </Link>
                      에 동의합니다.
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="mt-6">
            <Button
              type="submit"
              className="w-full"
              disabled={pipe(errors, R.isEmpty, (e) => !e)}
            >
              회원가입
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

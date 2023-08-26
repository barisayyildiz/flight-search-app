type SuccessResponseType<T> = {
  data: T,
  isSucceed: true,
  message: null
}

type FailResponseType = {
  data: null,
  isSucceed: false,
  message: string
}

export type BaseResponseType<T> = 
  SuccessResponseType<T> | FailResponseType;

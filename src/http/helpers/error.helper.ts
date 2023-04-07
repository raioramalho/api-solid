import { StatusCodes } from 'http-status-codes'

export class ErrorHelper {
  userAreadyExists() {
    return {
      code: `${StatusCodes.CONFLICT}`,
      message: `This user already exist`,
    }
  }

  userNotFound() {
    return {
      code: `${StatusCodes.NOT_FOUND}`,
      message: `There's no user with this id`,
    }
  }

  userNotValid() {
    return {
      code: `${StatusCodes.UNAUTHORIZED}`,
      message: `Your user credrentials is not valid`,
    }
  }
}
